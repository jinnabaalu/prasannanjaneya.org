import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dyibvm2q7/**",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
};

export default withNextIntl(nextConfig);

