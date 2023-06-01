/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.ctfassets.net'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                port: '',
                pathname: '/**/*',
            },
            {
                protocol: 'https',
                hostname: '**.ctfassets.net',
            },
            /* cloudinary */
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**/*',
            },
        ],
        deviceSizes: [320, 420, 768, 1024, 1200],
    },
};

module.exports = nextConfig;
