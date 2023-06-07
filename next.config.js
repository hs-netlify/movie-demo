module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "const-id";
  },

  assetPrefix: true
    ? "https://lucent-travesseiro-4df994.netlify.app/"
    : undefined,
  images: {
    domains: ["image.tmdb.org"],
  },
};
