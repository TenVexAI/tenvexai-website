import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import { getLatestPost } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

/**
 * Latest blog post preview component
 * Shows the most recent blog post with link to full article
 */
export default async function LatestBlogPost() {
  const post = await getLatestPost();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-purple/10 rounded-lg">
            <BookOpen className="text-accent-purple" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Latest Blog Post</h2>
            <p className="text-sm text-text-secondary">Thoughts and adventures</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!post ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-text-secondary mb-4" size={48} />
            <p className="text-text-secondary mb-4">
              No blog posts yet. Stay tuned for updates! ✨
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-cyan transition-colors font-semibold"
            >
              View Blog
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <Link
                href={`/blog/${post.slug}`}
                className="group"
              >
                <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors mb-2">
                  {post.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
                <Calendar size={14} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {post.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-purple text-background-primary font-semibold rounded-lg hover:bg-[#8a6fd1] transition-colors"
              >
                Read Full Post
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-cyan transition-colors font-semibold"
              >
                All Posts →
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
