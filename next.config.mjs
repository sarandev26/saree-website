/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/helper.html',
        destination: '/helper',
      },
    ];
  },
};

export default nextConfig;
