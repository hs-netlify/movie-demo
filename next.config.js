const base =   process.env.NETLIFY  ? process.env.CONTEXT === "production"
      ? "https://db.netlify-se-test.com"
      : process.env.DEPLOY_PRIME_URL
    : undefined,

module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "const-id";
  },

  assetPrefix: process.env.NETLIFY
    ? process.env.CONTEXT === "production"
      ? "https://db.netlify-se-test.com"
      : process.env.DEPLOY_PRIME_URL
    : undefined,
  async rewrites() {
    return [
      {
        source: '/_next/data/:path*',
        to: `${base}/_next/data/:path*`
      }
    ];
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};
