/** @type {import('next').NextConfig} */
const nextConfig = {
    httpAgentOptions: {
        keepAlive: true,
    },
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
        minimumCacheTTL: 60 * 60 * 24 * 7,
    },
    /* Add cache-control in images */
    async headers() {
        return [
            {
                source: '/(.*).jpg',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
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
