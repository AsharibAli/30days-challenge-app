/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'i.imgflip.com',
                protocol: 'https',
            },
            {
                hostname: 'images.unsplash.com',
                protocol: 'https',
            },
            {
                hostname: 'm.media-amazon.com',
                protocol: 'https',
            },
            {
                hostname: 'edamam-product-images.s3.amazonaws.com',
                protocol: 'https',
            },
        ],
    },
};

export default nextConfig;
