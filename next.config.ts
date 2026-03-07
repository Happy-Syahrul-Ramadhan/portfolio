import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.devtunnels.ms',
        '*.trycloudflare.com',
        '*.ngrok.io',
      ],
    },
  },
};

export default nextConfig;
