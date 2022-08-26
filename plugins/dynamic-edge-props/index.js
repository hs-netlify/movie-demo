import { getPaths } from "./utils.js";
import fs from "fs";

export const onPreBuild = async function ({
  utils: { build, status, cache, run, git },
}) {
  let paths = getPaths();

  let imports = paths.map((path, index) => {
    let moduleName = index;
    return {
      module: index,
      importText: `import {dynamicEdgeProps as dynamicProps${moduleName} } from '../../${path}'`,
    };
  });
  console.log(imports);

  fs.writeFileSync(
    "./lib/netlifyDynamicProp/modules.mjs",
    imports.map((module) => module.importText).join("\r\n")
  );
};
