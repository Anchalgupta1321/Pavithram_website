/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'www.pavithram.online' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // NOTE: `redirects()` is not supported with `output: 'export'`.
  // The /certificate and /certificates redirects now live in `public/_redirects`
  // (Cloudflare Pages redirect rules).
};
export default nextConfig;
