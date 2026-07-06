/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'www.pavithram.online' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/certificate',
        destination: '/certifications',
        permanent: true,
      },
      {
        source: '/certificates',
        destination: '/certifications',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
