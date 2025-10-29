'use client';

import { useState } from 'react';
import { Menu, X as CloseIcon, Home, BookOpen, User } from 'lucide-react';
import Link from 'next/link';
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
 * Mobile navigation component
 * Hamburger menu with slide-out drawer
 * Only visible on mobile (<768px)
 */
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background-secondary border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="font-bold text-accent-purple">TenVexAI</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-text-primary hover:text-accent-purple transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed top-16 left-0 bottom-0 w-[260px] bg-background-secondary border-r border-border z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Navigate
            </h3>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
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
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Connect
            </h3>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <div key={link.name} onClick={closeMenu}>
                  <SocialLink {...link} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header on mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
