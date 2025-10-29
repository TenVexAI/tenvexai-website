import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

/**
 * Blog post metadata from MDX frontmatter
 */
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  content?: string;
  readingTime?: number;
}

/**
 * Social media link configuration
 * Supports both Lucide icons and react-icons
 */
export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon | IconType;
  color: string;
}

/**
 * Navigation link
 */
export interface NavLink {
  name: string;
  href: string;
}

/**
 * Twitch stream schedule item
 */
export interface TwitchSchedule {
  day: string;
  time: string;
  game: string;
  description: string;
}

/**
 * YouTube short/video preview
 */
export interface YouTubeShort {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt?: string;
}

/**
 * Twitter/X post data
 */
export interface Tweet {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  url: string;
}
