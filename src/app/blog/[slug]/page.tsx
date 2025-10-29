import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import GiscusComments from '@/components/blog/GiscusComments';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeMathJax from 'rehype-mathjax';
import rehypeHighlight from 'rehype-highlight';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all blog posts
 * Enables static generation at build time
 */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata for blog post
 */
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | TenVexAI',
    };
  }

  return {
    title: `${post.title} | TenVexAI Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/**
 * Individual blog post page
 * Renders MDX content with syntax highlighting and math support
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.content) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-cyan transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      {/* Article Container with Grey Background */}
      <div className="bg-background-secondary rounded-lg border border-border p-8">
        {/* Article Header */}
        <article className="prose prose-lg prose-invert max-w-none">
        <header className="mb-8 pb-8 border-b border-border">
          <h1 className="text-4xl font-bold text-text-primary mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={16} />
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        {/* MDX Content */}
        <div className="prose-headings:text-text-primary prose-p:text-text-primary prose-li:text-text-primary prose-strong:text-text-primary">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath, remarkGfm],
                rehypePlugins: [rehypeMathJax, rehypeHighlight],
              },
            }}
          />
        </div>
      </article>
      </div>

      {/* Comments Section */}
      <div className="mt-8 bg-background-secondary rounded-lg border border-border p-8">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Comments</h2>
        <GiscusComments />
      </div>
    </div>
  );
}
