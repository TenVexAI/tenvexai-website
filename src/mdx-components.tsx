import type { MDXComponents } from 'mdx/types';

/**
 * MDX components configuration
 * Customize how MDX elements are rendered across all blog posts
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
