// next.config.mjs
import { i18n } from "./next-i18next.config.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8080",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "be-shop-rmjd.onrender.com",
                pathname: "/**",
            },
        ],
    },
    i18n,
};

export default nextConfig;
