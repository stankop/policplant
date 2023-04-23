module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return{ 
            fallback: [
            {
              source: '/api/:slug*',
              destination: `http://localhost:8000/api/:slug*/`,
            },
            {
                source: "/ducks",
                destination: "https://random-d.uk/api/random",
            },
            {
                source: '/:path*',
                destination: '/',
            },
          ]
        }
    },
    
}


