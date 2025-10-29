import { TwitchSchedule } from '@/types';

/**
 * Fetch Twitch stream schedule
 * TODO: Implement with real Twitch Helix API
 * 
 * @returns Mock schedule data for now
 */
export async function getTwitchSchedule(): Promise<TwitchSchedule[]> {
  // Mock data - replace with actual Twitch API call
  return [
    {
      day: 'Monday',
      time: '7:00 PM PST',
      game: 'Pokemon Showdown',
      description: 'Ranked battles and team building',
    },
    {
      day: 'Wednesday',
      time: '7:00 PM PST',
      game: 'Dev Stream',
      description: 'Building new features for Vex',
    },
    {
      day: 'Friday',
      time: '7:00 PM PST',
      game: 'Variety Gaming',
      description: 'Trying out new games with chat!',
    },
  ];
}
