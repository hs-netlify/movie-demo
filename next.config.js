const securityHeaders = [
  {
    key: "Test-Henry-Next",
    value: "true",
  },
];

module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "const-id";
  },
  images: {
    domains: ["image.tmdb.org"],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
