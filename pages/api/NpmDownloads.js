
const NetlifyGraph = require("../../lib/netlifyGraph");

exports.handler = async (req, res) => {
  // By default, all API calls use no authentication
  let accessToken = null;

  //// If you want to use the client's accessToken when making API calls on the user's behalf:
  // accessToken = req.headers["authorization"]?.split(" ")[1];

  //// If you want to use the API with your own access token:
  // accessToken = process.env.NETLIFY_GRAPH_TOKEN;
      
  const eventBodyJson = req.body || {};

  const name = typeof req.query?.name === 'string' ? req.query?.name : req.query?.name[0];

  if (name === undefined || name === null) {
    return res.status(422).json({
        errors: ["You must supply parameters for: `name`"],
    });
  }

  const { errors, data } = await NetlifyGraph.fetchNpmDownloads({ name: name }, {accessToken: accessToken}); 

  if (errors) {
    console.error(JSON.stringify(errors, null, 2));
  }

  console.log(JSON.stringify(data, null, 2));

  res.setHeader("Content-Type", "application/json");

  return res.status(200).json({
    errors, data
  });
};

exports.default = exports.handler;

/** 
 * Client-side invocations:
 * Call your Netlify function from the browser with this helper:
 */

/**
async function fetchNpmDownloads(params) {
  const {name} = params || {};
  const resp = await fetch(`/api/NpmDownloads?name=${name}`, {
    method: "GET"
  });

  const text = await resp.text();

  return JSON.parse(text);
}
*/