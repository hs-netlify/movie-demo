module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "const-id";
  },

  assetPrefix: process.env.NETLIFY ? process.env.URL : undefined,
  images: {
    domains: ["image.tmdb.org"],
  },
};
