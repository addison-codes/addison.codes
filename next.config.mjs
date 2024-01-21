/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'i.scdn.co' },
      { hostname: 'source.unsplash.com' },
      { hostname: 'media.dev.to' },
    ],
  },
}

export default config
