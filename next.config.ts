import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
};

export default withNextIntl(nextConfig);

