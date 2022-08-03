module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "const-id";
  },

  images: {
    domains: ["image.tmdb.org"],
  },
};
