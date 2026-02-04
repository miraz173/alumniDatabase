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
    async rewrites() {// to redirect api calls from frontend to backend inside docker network
    return [
      {//nextJS rewrite rule object, source can't have domain name, only path. must start with /
        source: "/api_server/:path*",//frontend URL clicked by browser or frontend code.
        destination: "https://alumniserver.up.railway.app/:path*",//front URL rewritten by nextJS
      },
    ];
  },
}
