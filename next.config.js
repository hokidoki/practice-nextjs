/** @type {import('next').NextConfig} */
const redirects = async () => [
  {
    source : "/",
    destination : "/contents",
    permanent : false
  }
]

const nextConfig = {
  reactStrictMode: false,
  redirects
}

module.exports = nextConfig
