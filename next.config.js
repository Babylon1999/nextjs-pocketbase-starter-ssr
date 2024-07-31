/** @type {import('next').NextConfig} */

const cspHeader = `
    frame-src https://challenges.cloudflare.com;
    default-src 'self' http://localhost:3000/signups;
    script-src 'self'  https://challenges.cloudflare.com 'unsafe-eval' 'unsafe-inline';
    style-src 'self' http://localhost:3000/signup 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const nextConfig = (module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
});
module.exports = nextConfig;
