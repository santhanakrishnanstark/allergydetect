/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';
import withPWAInit from "@ducanh2912/next-pwa";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true
  }
});

const nextConfig = withPWA({
  output: 'export',
  experimental: {
    cssChunking: 'strict',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/scss')],
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Match all files in the public folder
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
});

export default nextConfig;
