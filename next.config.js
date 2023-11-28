/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  async redirects() {
    return [
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "refreshToken",
          },
        ],
        permanent: false,
        destination: "/dashboard",
      },
      {
        source: "/sign-up",
        has: [
          {
            type: "cookie",
            key: "refreshToken",
          },
        ],
        permanent: false,
        destination: "/dashboard",
      },
    ];
  },
};

module.exports = nextConfig;
