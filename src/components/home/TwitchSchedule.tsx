import { Calendar, Clock, Gamepad2 } from 'lucide-react';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import { getTwitchSchedule } from '@/lib/api/twitch';

/**
 * Twitch stream schedule component
 * Displays weekly streaming schedule with mock data
 * TODO: Connect to real Twitch API
 */
export default async function TwitchSchedule() {
  const schedule = await getTwitchSchedule();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-purple/10 rounded-lg">
            <Calendar className="text-accent-purple" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Stream Schedule</h2>
            <p className="text-sm text-text-secondary">Catch me live on Twitch!</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {schedule.length === 0 ? (
          <p className="text-text-secondary text-center py-8">
            No streams scheduled yet. Check back soon! 💜
          </p>
        ) : (
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-background-primary hover:bg-background-primary/50 transition-colors border border-border"
              >
                <div className="shrink-0 w-20 text-center">
                  <div className="text-sm font-semibold text-accent-purple">
                    {item.day}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-text-secondary mt-1">
                    <Clock size={12} />
                    {item.time}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Gamepad2 size={16} className="text-accent-cyan" />
                    <h3 className="font-semibold text-text-primary">{item.game}</h3>
                  </div>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 text-center">
          <a
            href="https://twitch.tv/tenvexai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-purple text-background-primary font-semibold rounded-lg hover:bg-[#8a6fd1] transition-colors"
          >
            Watch on Twitch
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
