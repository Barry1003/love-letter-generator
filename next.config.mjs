/** @type {import('next').NextConfig} */
const nextConfig = {
  // Card payloads (with base64 photos) can be a few MB — allow larger request bodies.
  experimental: {
    serverActions: { bodySizeLimit: '8mb' },
  },
};

export default nextConfig;
