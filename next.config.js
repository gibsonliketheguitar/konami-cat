/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.redd.it', 'v.redd.it', 'avatars.githubusercontent.com', 'media.tenor.com', 'i.imgur.com'],
  },
}

module.exports = nextConfig
