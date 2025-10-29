import { YouTubeShort } from '@/types';

/**
 * Get YouTube channel ID from handle or channel ID
 */
async function getChannelId(handleOrId: string, apiKey: string): Promise<string> {
  // If it starts with @, it's a handle - need to resolve to channel ID
  if (handleOrId.startsWith('@')) {
    const handle = handleOrId.substring(1); // Remove @
    
    // Use the channels endpoint with forHandle parameter (more reliable)
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${apiKey}`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('YouTube API error:', errorData);
      throw new Error('Failed to resolve YouTube channel handle');
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      throw new Error('YouTube channel not found');
    }

    return data.items[0].id;
  }

  // Already a channel ID
  return handleOrId;
}

/**
 * Fetch YouTube shorts/videos from channel using YouTube Data API v3
 * Falls back to empty array if API fails or credentials not configured
 * 
 * @param limit - Number of shorts to fetch (default 6)
 * @returns Array of YouTube shorts
 */
export async function getYouTubeShorts(limit = 6): Promise<YouTubeShort[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelHandle = process.env.YOUTUBE_CHANNEL_ID || '@tenvexai';

    if (!apiKey) {
      console.warn('YouTube API key not configured, returning empty array');
      return [];
    }

    // Simplify: search by channel name/handle
    const username = channelHandle.startsWith('@') ? channelHandle.substring(1) : channelHandle;
    
    // Fetch recent videos from the channel by searching for channel
    // Note: YouTube API doesn't have a specific "shorts" filter, so we fetch recent videos
    // Shorts are typically videos under 60 seconds
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&q=${encodeURIComponent(username)}&type=video&maxResults=${limit * 2}&order=date&key=${apiKey}`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );

    if (!response.ok) {
      throw new Error('Failed to fetch YouTube videos');
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Get video details to check duration (shorts are under 60 seconds)
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?` +
        `part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 300 } }
    );

    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch video details');
    }

    const detailsData = await detailsResponse.json();

    // Filter for shorts (videos under 60 seconds) and transform
    const shorts: YouTubeShort[] = [];
    
    for (let i = 0; i < data.items.length && shorts.length < limit; i++) {
      const item = data.items[i];
      const details = detailsData.items.find((d: any) => d.id === item.id.videoId);
      
      if (details) {
        // Parse ISO 8601 duration (e.g., "PT1M30S" = 1 minute 30 seconds)
        const duration = details.contentDetails.duration;
        const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
        const minutes = parseInt(match?.[1] || '0');
        const seconds = parseInt(match?.[2] || '0');
        const totalSeconds = minutes * 60 + seconds;

        // Only include videos under 60 seconds (shorts)
        if (totalSeconds <= 60) {
          shorts.push({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
            url: `https://www.youtube.com/shorts/${item.id.videoId}`,
            publishedAt: item.snippet.publishedAt,
          });
        }
      }
    }

    return shorts;
  } catch (error) {
    console.error('Error fetching YouTube shorts:', error);
    // Return empty array as fallback
    return [];
  }
}
