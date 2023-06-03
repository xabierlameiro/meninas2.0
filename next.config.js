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
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**/*',
            },
        ],
        deviceSizes: [320, 420, 768, 1024, 1200],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(graphql|gql)/,
            exclude: /node_modules/,
            loader: 'graphql-operations-string-loader',
        });

        return config;
    },
};

module.exports = nextConfig;
