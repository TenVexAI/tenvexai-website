'use client';

import Giscus from '@giscus/react';

/**
 * Giscus comments component for blog posts
 * Uses GitHub Discussions for comment storage
 */
export default function GiscusComments() {
  const repo = (process.env.NEXT_PUBLIC_GISCUS_REPO || 'TenVexAI/tenvexai-website') as `${string}/${string}`;

  return (
    <Giscus
      id="comments"
      repo={repo}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
}
