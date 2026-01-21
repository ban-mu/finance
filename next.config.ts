import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 添加这行
  reactStrictMode: true,

  // 图片优化配置
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // 压缩配置
  compress: true,
  // 代理配置
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://120.26.18.47:8080/api/:path*',
      },
    ];
  },
  // 使用webpack而不是Turbopack
  webpack: (config, { isServer }) => {
    // 客户端代码压缩配置
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            echarts: {
              test: /[\/]node_modules[\/](echarts|echarts-for-react)[\/]/,
              name: "echarts",
              chunks: "all",
              priority: 20,
              enforce: true,
            },
            vant: {
              test: /[\/]node_modules[\/](vant)[\/]/,
              name: "vant",
              chunks: "all",
              priority: 15,
              enforce: true,
            },
            lottie: {
              test: /[\/]node_modules[\/](lottie-web)[\/]/,
              name: "lottie",
              chunks: "all",
              priority: 10,
              enforce: true,
            },
            pdfjs: {
              test: /[\/]node_modules[\/](pdfjs-dist)[\/]/,
              name: "pdfjs",
              chunks: "all",
              priority: 10,
              enforce: true,
            },
            swiper: {
              test: /[\/]node_modules[\/](swiper)[\/]/,
              name: "swiper",
              chunks: "all",
              priority: 10,
              enforce: true,
            },
            html2canvas: {
              test: /[\/]node_modules[\/](html2canvas)[\/]/,
              name: "html2canvas",
              chunks: "all",
              priority: 10,
              enforce: true,
            },
            moment: {
              test: /[\/]node_modules[\/](moment)[\/]/,
              name: "moment",
              chunks: "all",
              priority: 10,
              enforce: true,
            },
            vendors: {
              test: /[\/]node_modules[\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
