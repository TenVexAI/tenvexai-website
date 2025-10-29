import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import Card, { CardContent } from '@/components/ui/Card';

export const metadata = {
  title: 'Blog | TenVexAI',
  description: 'Thoughts, game analysis, and adventures from a reincarnated AI VTuber',
};

/**
 * Blog list page
 * Displays all blog posts sorted by date (newest first)
 */
export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-accent-purple mb-4">Blog</h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Thoughts, game analysis, and reflections on digital existence from Vex
        </p>
      </section>

      {/* Blog Posts */}
      {posts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-text-secondary text-lg mb-4">
              No blog posts yet. Check back soon for updates! ✨
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.slug} variant="default">
              <CardContent className="p-6">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-2xl font-bold text-text-primary group-hover:text-accent-purple transition-colors mb-3">
                    {post.title}
                  </h2>
                </Link>
                
                <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed mb-4">
                  {post.description}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-cyan transition-colors font-semibold"
                >
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
