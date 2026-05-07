/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
  async redirects() {
    // Drops is no longer a separate route — it lives as a section
    // inside the marketplace at /market#drops. This catches any old
    // bookmarks, search hits, or cached links and 308-permanents them.
    // Hash fragments aren't sent to the server but the browser
    // preserves them across the redirect Location header.
    return [
      { source: '/drops', destination: '/market#drops', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
