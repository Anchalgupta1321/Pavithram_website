/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages (no Node.js server / adapter required).
  // Produces an `out/` folder of static HTML/CSS/JS.
  output: 'export',
  images: {
    // Required for static export: the default Image Optimization loader needs a server.
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
