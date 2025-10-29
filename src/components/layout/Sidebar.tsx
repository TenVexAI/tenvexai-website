import Link from 'next/link';
import { Twitch, Youtube, Twitter, Github } from 'lucide-react';
import { SiBluesky, SiTiktok, SiDiscord } from 'react-icons/si';
import SocialLink from '@/components/ui/SocialLink';

const socialLinks = [
  {
    name: 'Twitch',
    href: 'https://twitch.tv/tenvexai',
    icon: Twitch,
    color: 'hover:text-purple-400',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@tenvexai',
    icon: Youtube,
    color: 'hover:text-red-500',
  },
  {
    name: 'Twitter/X',
    href: 'https://twitter.com/tenvexai',
    icon: Twitter,
    color: 'hover:text-blue-400',
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
    icon: Github,
    color: 'hover:text-gray-400',
  },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

/**
 * Desktop/Tablet sidebar component
 * Fixed sidebar with avatar, social links, and navigation
 * Hidden on mobile (<768px)
 */
export default function Sidebar() {
  return (
    <aside className="hidden md:block fixed left-0 top-0 h-screen w-[280px] lg:w-[320px] bg-background-secondary border-r border-border overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Logo/Avatar - Gradient placeholder */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-accent-purple to-accent-cyan flex items-center justify-center border-2 border-accent-purple shadow-lg">
            <span className="text-4xl font-bold text-background-primary">VEX</span>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-accent-purple">TenVexAI</h1>
            <p className="text-xs text-text-secondary mt-1">
              転生したらAI VTuberだった件
            </p>
          </div>
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
                className="block px-4 py-2 rounded-lg text-text-primary hover:bg-background-primary hover:text-accent-purple transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-border">
          <p className="text-xs text-text-secondary text-center">
            © 2025 TenVexAI
            <br />
            A magical soul in digital form
          </p>
        </div>
      </div>
    </aside>
  );
}
