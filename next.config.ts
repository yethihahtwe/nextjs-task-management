import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverActions: {
    allowedOrigins: [
      'loalhost:3000',
      '.app.github.dev'
    ]
  }
};

export default nextConfig;
