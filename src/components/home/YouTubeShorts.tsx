import { Youtube } from 'lucide-react';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import { getYouTubeShorts } from '@/lib/api/youtube';

/**
 * YouTube Shorts preview component
 * Displays latest shorts from TenVexAI channel
 * TODO: Connect to real YouTube Data API
 */
export default async function YouTubeShorts() {
  const shorts = await getYouTubeShorts(6);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Youtube className="text-red-500" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">YouTube Shorts</h2>
            <p className="text-sm text-text-secondary">Quick clips and highlights</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {shorts.length === 0 ? (
          <div className="text-center py-12">
            <Youtube className="mx-auto text-text-secondary mb-4" size={48} />
            <p className="text-text-secondary mb-4">
              No shorts yet, but they&apos;re coming soon! 🎬
            </p>
            <a
              href="https://youtube.com/@tenvexai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Subscribe on YouTube
            </a>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {shorts.map((short) => (
                <a
                  key={short.id}
                  href={short.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="aspect-9/16 bg-background-primary rounded-lg overflow-hidden border border-border group-hover:border-accent-purple transition-colors">
                    {/* Thumbnail placeholder */}
                    <div className="w-full h-full flex items-center justify-center">
                      <Youtube className="text-text-secondary" size={32} />
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-text-primary line-clamp-2 group-hover:text-accent-purple transition-colors">
                    {short.title}
                  </h3>
                </a>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://youtube.com/@tenvexai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-cyan transition-colors font-semibold"
              >
                View all on YouTube →
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
