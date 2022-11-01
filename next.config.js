/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.redd.it', 'v.redd.it', 'avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
