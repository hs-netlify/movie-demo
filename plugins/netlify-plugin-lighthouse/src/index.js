//require("dotenv").config();
const { join, dirname } = require("path");

const chalk = require("chalk");
const fs = require("fs").promises;
const minify = require("html-minifier").minify;
const { getConfiguration } = require("./config");
const { getBrowserPath, runLighthouse } = require("./lighthouse");
const { makeReplacements } = require("./replacements");
const { time } = require("console");
const execSync = require("child_process").execSync;
const fetch = require("node-fetch");

const createServer = async (publishDir) => {
  execSync(`mv ${publishDir} ${publishDir}_temp`);
  execSync("netlify dev > /dev/null 2>&1 &");
  console.log("Initiating server");
  let ready = false;
  while (!ready) {
    try {
      console.log("Checking Server");
      const res = await fetch("http://localhost:8888");
      console.log("res", res.status);
      await timeout(3000);
      ready = true;
    } catch (error) {
      await timeout(3000);
    }
  }
  console.log("Server Initiated");
  return;
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const belowThreshold = (id, expected, categories) => {
  const category = categories.find((c) => c.id === id);
  if (!category) {
    console.warn(`Could not find category ${chalk.yellow(id)}`);
  }
  const actual = category ? category.score : Number.MAX_SAFE_INTEGER;
  return actual < expected;
};

const getError = (id, expected, categories, audits) => {
  const category = categories.find((c) => c.id === id);

  const categoryError = `Expected category ${chalk.cyan(
    category.title
  )} to be greater or equal to ${chalk.green(expected)} but got ${chalk.red(
    category.score !== null ? category.score : "unknown"
  )}`;

  const categoryAudits = category.auditRefs
    .filter(({ weight, id }) => weight > 0 && audits[id].score < 1)
    .map((ref) => {
      const audit = audits[ref.id];
      return `   '${chalk.cyan(
        audit.title
      )}' received a score of ${chalk.yellow(audit.score)}`;
    })
    .join("\n");

  return { message: categoryError, details: categoryAudits };
};

const formatResults = ({ results, thresholds }) => {
  const categories = Object.values(results.lhr.categories).map(
    ({ title, score, id, auditRefs }) => ({ title, score, id, auditRefs })
  );

  const categoriesBelowThreshold = Object.entries(thresholds).filter(
    ([id, expected]) => belowThreshold(id, expected, categories)
  );

  const errors = categoriesBelowThreshold.map(([id, expected]) =>
    getError(id, expected, categories, results.lhr.audits)
  );

  const summary = categories.map(({ title, score, id }) => ({
    title,
    score,
    id,
    ...(thresholds[id] ? { threshold: thresholds[id] } : {}),
  }));

  const shortSummary = categories
    .map(({ title, score }) => `${title}: ${score * 100}`)
    .join(", ");

  const formattedReport = makeReplacements(results.report);

  const report = minify(formattedReport, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    removeOptionalTags: true,
    removeEmptyElements: true,
    minifyCSS: true,
    minifyJS: true,
  });

  return { summary, shortSummary, report, errors };
};

const persistResults = async ({ report, path }) => {
  await fs.mkdir(dirname(path), { recursive: true });
  await fs.writeFile(path, report);
};

const getUtils = ({ utils }) => {
  const failBuild =
    (utils && utils.build && utils.build.failBuild) ||
    ((message, { error } = {}) => {
      console.error(message, error && error.message);
      process.exitCode = 1;
    });

  const show =
    (utils && utils.status && utils.status.show) ||
    (({ summary }) => console.log(summary));

  return { failBuild, show };
};

const runAudit = async ({ path, url, thresholds, output_path }) => {
  try {
    const browserPath = await getBrowserPath();

    const { error, results } = await new Promise(async (resolve) => {
      try {
        const results = await runLighthouse(browserPath, url);

        resolve({ error: false, results });
      } catch (error) {
        resolve({ error });
      }
    });

    if (error) {
      return { error };
    } else {
      const { summary, shortSummary, report, errors } = formatResults({
        results,
        thresholds,
      });

      if (output_path) {
        await persistResults({ report, path: join(path, output_path) });
      }

      return {
        summary,
        shortSummary,
        report,
        errors,
      };
    }
  } catch (error) {
    return { error };
  }
};

const prefixString = ({ path, url, str }) => {
  if (path) {
    return `\n${chalk.red("Error")} for directory '${chalk.cyan(
      path
    )}':\n${str}`;
  } else if (url) {
    return `\n${chalk.red("Error")} for url '${chalk.cyan(url)}':\n${str}`;
  } else {
    return `\n${str}`;
  }
};

const processResults = ({ data, errors }) => {
  if (errors.length > 0) {
    const error = errors.reduce(
      (acc, { path, url, errors }) => {
        const message = prefixString({
          path,
          url,
          str: errors.map((e) => e.message).join("\n"),
        });
        const details = prefixString({
          path,
          url,
          str: errors.map((e) => `${e.message}\n${e.details}`).join("\n"),
        });

        return {
          message: `${acc.message}\n${message}`,
          details: `${acc.details}\n${details}`,
        };
      },
      {
        message: "",
        details: "",
      }
    );
    return {
      error,
    };
  } else {
    const reports = [];
    return {
      summary: data
        .map(({ path, url, summary, shortSummary, report }) => {
          const obj = { report };

          if (summary) {
            obj.summary = summary.reduce((acc, item) => {
              acc[item.id] = item.score * 100;
              return acc;
            }, {});
          }

          if (path) {
            obj.path = path;
            reports.push(obj);
            return `Summary for directory '${chalk.magenta(
              path
            )}': ${shortSummary}`;
          }
          if (url) {
            obj.url = url;
            reports.push(obj);
            return `Summary for url '${chalk.magenta(url)}': ${shortSummary}`;
          }
          return `${shortSummary}`;
        })
        .join("\n"),
      extraData: reports,
    };
  }
};

module.exports = {
  onPostBuild: async ({ constants, utils, inputs } = {}) => {
    const { failBuild, show } = getUtils({ utils });

    try {
      console.log("creating Server");
      await createServer(constants.PUBLISH_DIR);
      const { audits } = getConfiguration({
        constants,
        inputs,
      });

      const allErrors = [];
      const data = [];
      for (let { path, url, thresholds, output_path } of audits) {
        path = null;
        url = "http://localhost:8888/";
        let { errors, summary, shortSummary, report } = await runAudit({
          path,
          url,
          thresholds,
          output_path,
        });
        if (summary) {
          console.log({ results: summary });
        }

        if (report) {
          const size = Buffer.byteLength(JSON.stringify(report));
          console.log(
            `Report collected: audited_uri: '${chalk.magenta(
              url || path
            )}', html_report_size: ${chalk.magenta(size / 1024)} KiB`
          );
        }

        if (Array.isArray(errors) && errors.length > 0) {
          allErrors.push({ path, url, errors });
        } else {
          data.push({
            path,
            url,
            summary,
            shortSummary,
            report,
          });
        }
      }

      const { error, summary, extraData } = processResults({
        data,
        errors: allErrors,
        show,
      });

      if (error) {
        throw error;
      }
      execSync(`rm -fr ${constants.PUBLISH_DIR}`);
      execSync(`mv ${constants.PUBLISH_DIR}_temp ${constants.PUBLISH_DIR}`);
      show({ summary, extraData });
    } catch (error) {
      if (error.details) {
        console.error(error.details);
        failBuild(`${chalk.red("Failed with error:\n")}${error.message}`);
      } else {
        failBuild(`${chalk.red("Failed with error:\n")}`, { error });
      }
    }
  },
};
