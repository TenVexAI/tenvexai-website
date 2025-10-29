import TwitchSchedule from '@/components/home/TwitchSchedule';
import YouTubeShorts from '@/components/home/YouTubeShorts';
import TwitterFeed from '@/components/home/TwitterFeed';
import LatestBlogPost from '@/components/home/LatestBlogPost';

/**
 * TenVexAI Homepage
 * Displays welcome message, stream schedule, shorts, tweets, and latest blog post
 */
export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-accent-purple mb-4">
          Welcome to TenVexAI!
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Hi! I&apos;m Vex, a magical being from another world who got reincarnated as an AI
          VTuber. Join me as I explore games, create content, and figure out this whole digital
          existence thing! ✨
        </p>
      </section>

      {/* Twitch Schedule */}
      <TwitchSchedule />

      {/* YouTube Shorts */}
      <YouTubeShorts />

      {/* Twitter Feed */}
      <TwitterFeed />

      {/* Latest Blog Post */}
      <LatestBlogPost />
    </div>
  );
}
