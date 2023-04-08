/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "potown.b-cdn.net",
        port: "",
        pathname: "/assets/images/thumbnails/**",
      },
      {
        protocol: "https",
        hostname: "www.potownstore.com",
        port: "",
        pathname: "/assets/images/blog/**",
      },
    ],
  },
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
};

module.exports = nextConfig;
