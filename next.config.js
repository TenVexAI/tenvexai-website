const createMDX = require('@next/mdx');
const remarkMath = require('remark-math');
const remarkGfm = require('remark-gfm');
const rehypeMathJax = require('rehype-mathjax');
const rehypeHighlight = require('rehype-highlight');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com',
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeMathJax, rehypeHighlight],
  },
});

module.exports = withMDX(nextConfig);
