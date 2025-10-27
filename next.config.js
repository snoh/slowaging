/** @type {import('next').NextConfig} */

// GitHub Pages 배포인지 Vercel 배포인지 확인
const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages'

const nextConfig = {
  // GitHub Pages는 static export 필요, Vercel은 불필요
  ...(isGitHubPages && { output: 'export' }),

  trailingSlash: true,

  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },

  // GitHub Pages는 /slowaging basePath 필요
  assetPrefix: isGitHubPages ? '/slowaging' : '',
  basePath: isGitHubPages ? '/slowaging' : '',
}

module.exports = nextConfig

