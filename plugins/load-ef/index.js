const { isCompositeComponent } = require("react-dom/test-utils");

module.exports = {
  onPreBuild: ({ netlifyConfig }) => {
    console.log("Env var:", netlifyConfig.build.environment.SKIP_EF);
    if (netlifyConfig.build.environment.SKIP_EF !== "true") {
      console.log("Deploying Edge functions for redirects");
      if (netlifyConfig.edge_functions) {
        netlifyConfig["edge_functions"].push({
          path: "/*",
          function: "example-ef",
        });
        console.log("Edge function deployed");
      } else {
        netlifyConfig["edge_functions"] = [
          {
            path: "/*",
            function: "example-ef",
          },
        ];
        console.log("Edge function deployed");
      }
    } else {
      console.log("Skipping Edge functions deployment");
    }
  },
};
