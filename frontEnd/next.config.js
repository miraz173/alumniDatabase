/**
 *  @type {import('next').NextConfig} 
*/
// const nextConfig = {}

// module.exports = 
module.exports = {
    // nextConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dknq7gnuo/image/upload/**',
            },
        ],
    },
}
