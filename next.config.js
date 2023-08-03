/** @type {import('next').NextConfig} */
const redirects = async () => [
  {
    source : "/",
    destination : "/contents",
    permanent : false
  }
]

const nextConfig = {
  reactStrictMode: true,
  redirects
}

module.exports = nextConfig
