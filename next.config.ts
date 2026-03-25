import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Configuración de imágenes para Cloudflare R2 y fuentes externas
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pub-74c8755bca1e4a65990fe823e0a3793a.r2.dev' },
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: '*.unsplash.com' },
    ],
  },
};

export default nextConfig;
