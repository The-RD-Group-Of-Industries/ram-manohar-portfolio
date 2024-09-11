/**
 * Next.js configuration object that sets up image domains and remote patterns, as well as increases the static page generation timeout.
 * 
 * The `images` configuration object specifies the allowed image domains and remote patterns for Next.js to fetch images from.
 * The `remotePatterns` configuration allows for more granular control over the allowed image URLs, matching specific path patterns.
 * 
 * The `staticPageGenerationTimeout` configuration increases the timeout for generating static pages, which can be useful for pages that take longer to generate.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "assets.aceternity.com",
      "images.unsplash.com",
      "s3-alpha-sig.figma.com",
      "utfs.io", // Add 'utfs.io' here
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/a6i2fztwsw/*",  
        // a6i2fztwsw changes this with other UPLOADTHING_APP_ID
      },
    ],
  },

  // Increase the static page generation timeout
  staticPageGenerationTimeout: 300, // Timeout in seconds (300 seconds = 5 minutes)
};

export default nextConfig;
