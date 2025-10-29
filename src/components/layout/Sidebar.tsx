import Link from 'next/link';
import Image from 'next/image';
import { Home, BookOpen, User } from 'lucide-react';
import { SiTwitch, SiYoutube, SiGithub, SiBluesky, SiTiktok, SiDiscord, SiX } from 'react-icons/si';
import SocialLink from '@/components/ui/SocialLink';

const socialLinks = [
  {
    name: 'Twitch',
    href: 'https://twitch.tv/tenvexai',
    icon: SiTwitch,
    color: 'hover:text-purple-400',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@tenvexai',
    icon: SiYoutube,
    color: 'hover:text-red-500',
  },
  {
    name: 'X',
    href: 'https://twitter.com/tenvexai',
    icon: SiX,
    color: 'hover:text-white',
  },
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/tenvexai.bsky.social',
    icon: SiBluesky,
    color: 'hover:text-blue-500',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@tenvexai',
    icon: SiTiktok,
    color: 'hover:text-pink-500',
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/tenvexai',
    icon: SiDiscord,
    color: 'hover:text-indigo-400',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/TenVexAI',
    icon: SiGithub,
    color: 'hover:text-gray-400',
  },
];

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'About', href: '/about', icon: User },
];

/**
 * Desktop/Tablet sidebar component
 * Fixed sidebar with avatar, social links, and navigation
 * Hidden on mobile (<768px)
 */
export default function Sidebar() {
  return (
    <aside className="hidden md:block fixed left-0 top-0 h-screen w-[260px] bg-background-secondary border-r border-border overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Logo/Avatar */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-50 h-50 relative">
            <Image
              src="/TenVexAI.png"
              alt="TenVexAI Logo"
              width={200}
              height={200}
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-accent-purple">TenVexAI</h1>
            <p className="text-xs text-text-secondary mt-1">
              That Time I Got Reincarnated<br />as an AI VTuber
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Navigate
          </h2>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-text-primary hover:bg-background-primary hover:text-accent-purple transition-colors"
              >
                <link.icon size={20} />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Connect
          </h2>
          <div className="space-y-2">
            {socialLinks.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
