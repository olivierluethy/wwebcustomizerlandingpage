/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Theme JSON files must DOWNLOAD, not render as raw JSON in the tab.
        // Content-Disposition: attachment forces a download and preserves the
        // filename from the URL (e.g. Midnight.json), which is what the blog
        // download buttons rely on. fetch() (a future theme gallery reading
        // index.json) ignores this header, so it is unaffected.
        source: "/themes/:path*",
        headers: [
          { key: "Content-Disposition", value: "attachment" },
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
    ];
  },
}

export default nextConfig
