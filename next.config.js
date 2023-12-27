/** @type {import('next').NextConfig} */
const nextConfig = {
      webpack: (config) => {
            config.externals = [...config.externals, 'bcrypt'];
           return config;
         },
         images: {
            domains: ['res.cloudinary.com', 'localhost'],
          },

          eslint: {
            ignoreDuringBuilds: true,
          },
          typescript: {
            // !! WARN !!
            // Dangerously allow production builds to successfully complete even if
            // your project has type errors.
            // !! WARN !!
            ignoreBuildErrors: true,
          },
}

module.exports = nextConfig
