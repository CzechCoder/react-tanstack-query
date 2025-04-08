import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tomasburian.com",
        port: "",
        pathname: "/dev/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
