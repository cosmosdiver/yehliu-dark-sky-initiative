/** @type {import('next').NextConfig} */
const nextConfig = {
  // 優化設定
  reactStrictMode: true,

  // 輸出設定（適合 Vercel 部署）
  output: 'standalone',
};

module.exports = nextConfig;
