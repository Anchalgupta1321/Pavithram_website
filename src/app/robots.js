// Render robots.txt statically at build time (required for `output: 'export'`).
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.pavithramfoods.com/sitemap.xml',
  };
}
