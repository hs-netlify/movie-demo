module.exports = {
  onPreBuild: ({ netlifyConfig }) => {
    if (!netlifyConfig.build.environment.SKIP_EF) {
      if (netlifyConfig.edge_functions) {
        netlifyConfig["edge_functions"].push({
          path: "/*",
          function: "example-ef",
        });
      } else {
        netlifyConfig["edge_functions"] = [
          {
            path: "/*",
            function: "example-ef",
          },
        ];
      }
    }
  },
};
