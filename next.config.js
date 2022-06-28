module.exports = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/working",
        destination: `/.netlify/builders/sitemap`,
      },
    ];
  },
};
