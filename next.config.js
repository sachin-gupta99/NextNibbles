/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "***.amazonaws.com",
        port: "",
      },
    ],
  },
};
