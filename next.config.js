/** @type {import('next').NextConfig} */
const nextConfig = {
      webpack: (config) => {
            config.externals = [...config.externals, 'bcrypt'];
           return config;
         },
         images: {
            domains: ['res.cloudinary.com', 'localhost'],
          },
}

module.exports = nextConfig
