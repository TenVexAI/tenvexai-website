import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
}

/**
 * Reusable card component for content containers
 * Provides consistent styling across the site
 */
export default function Card({ className, variant = 'default', children, ...props }: CardProps) {
  const baseStyles = 'rounded-lg border border-border overflow-hidden';

  const variants = {
    default: 'bg-background-secondary',
    elevated: 'bg-background-secondary shadow-lg',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Card header component
 */
export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 border-b border-border', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Card content component
 */
export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Card footer component
 */
export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 border-t border-border', className)} {...props}>
      {children}
    </div>
  );
}
