import { TwitchSchedule } from '@/types';

// Cache the access token
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get Twitch OAuth token using Client Credentials flow
 */
async function getTwitchToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn('Twitch credentials not configured, using mock data');
    throw new Error('Twitch credentials not configured');
  }

  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get Twitch access token');
  }

  const data = await response.json();
  
  // Cache token (expires in 1 hour, cache for 50 minutes to be safe)
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + 50 * 60 * 1000,
  };

  return data.access_token;
}

/**
 * Get Twitch user ID from username
 */
async function getTwitchUserId(username: string, token: string): Promise<string> {
  const clientId = process.env.TWITCH_CLIENT_ID!;

  const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get Twitch user ID');
  }

  const data = await response.json();
  if (!data.data || data.data.length === 0) {
    throw new Error('Twitch user not found');
  }

  return data.data[0].id;
}

/**
 * Fetch Twitch stream schedule from Helix API
 * Falls back to mock data if API fails or credentials not configured
 */
export async function getTwitchSchedule(): Promise<TwitchSchedule[]> {
  try {
    const token = await getTwitchToken();
    const channelName = process.env.TWITCH_CHANNEL_ID || 'tenvexai';
    const userId = await getTwitchUserId(channelName, token);
    const clientId = process.env.TWITCH_CLIENT_ID!;

    const response = await fetch(
      `https://api.twitch.tv/helix/schedule?broadcaster_id=${userId}&first=20`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${token}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Twitch schedule');
    }

    const data = await response.json();

    if (!data.data || !data.data.segments || data.data.segments.length === 0) {
      // No schedule set up, return empty array
      return [];
    }

    // Get start of today and end of 6 days from now (7 days total)
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfSeventhDay = new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Filter segments to only include today through next 6 days and transform
    const upcomingSchedule = data.data.segments
      .filter((segment: any) => {
        const startTime = new Date(segment.start_time);
        return startTime >= startOfToday && startTime < endOfSeventhDay;
      })
      .map((segment: any) => {
        const startTime = new Date(segment.start_time);
        const dayOfWeek = startTime.toLocaleDateString('en-US', { weekday: 'long' });
        const time = startTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          timeZoneName: 'short',
        });

        return {
          day: dayOfWeek,
          time: time,
          game: segment.category?.name || 'Just Chatting',
          description: segment.title || '',
        };
      });

    return upcomingSchedule;
  } catch (error) {
    console.error('Error fetching Twitch schedule:', error);
    // Return mock data as fallback
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
}
