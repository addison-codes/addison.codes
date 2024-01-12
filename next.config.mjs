/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'i.scdn.co' },
      { hostname: 'source.unsplash.com' },
    ],
  },
}

export default config
