import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

interface SocialLinkProps {
  name: string;
  href: string;
  icon: LucideIcon | IconType;
  color: string;
}

/**
 * Social media link component with icon and hover effects
 * Used in sidebar and mobile navigation
 * Supports both Lucide icons and react-icons
 * 
 * @param name - Display name of the social platform
 * @param href - URL to the social media profile
 * @param icon - Icon component (Lucide or react-icons)
 * @param color - Tailwind hover color class
 */
export default function SocialLink({ name, href, icon: Icon, color }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-lg',
        'text-text-primary transition-all duration-200',
        'hover:bg-background-primary',
        color
      )}
    >
      <Icon size={20} />
      <span className="font-medium">{name}</span>
    </Link>
  );
}
