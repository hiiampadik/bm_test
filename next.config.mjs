/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['default', "cs", "en"],
        defaultLocale: "cs",
        localeDetection: false,
    },
};

export default nextConfig;
