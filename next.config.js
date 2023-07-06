/** @type {import('next').NextConfig} */

const path = require("path")
const webpack = (config) => {
    config.resolve.alias['@mock'] = path.join(__dirname,"/src/mock")
    return config
}

const nextConfig = {
    webpack,
    reactStrictMode: true,
    images: {
      domains: ['lecture-1.vercel.app', 'search.pstatic.net'],
    },
}

module.exports = nextConfig
