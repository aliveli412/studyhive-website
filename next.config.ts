import type { NextConfig } from "next";

/**
 * Static export for Hostinger shared hosting (no Node.js required).
 * Forms use PHP handlers in public/api/ (Resend via config.php on the server).
 * Deploy: GitHub Actions → FTP uploads the `out/` folder to public_html.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
