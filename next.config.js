/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DISCORD_BOT_TOKEN: "MTA2MzU4ODMzNzg5NTYxNjYyMg.G4L7cK.vvkDhq3JDiZeSv12KLqfyBO2m67U1aspa52JkY",
    BASR_API_URL: "http://localhost:3000/api",
  },
  images: {
    domains: ['media.discordapp.net', 'cdn.discordapp.com', 'raw.githubusercontent.com']
  }
}

module.exports = nextConfig
