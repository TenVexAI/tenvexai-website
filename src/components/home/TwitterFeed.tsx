'use client';

import { SiX } from 'react-icons/si';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import { useEffect } from 'react';

/**
 * X feed component using embedded timeline
 * Uses X's widget script for easy integration
 * No API key required
 */
export default function XFeed() {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black/30 rounded-lg">
            <SiX className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Latest from X</h2>
            <p className="text-sm text-text-secondary">Follow along on X</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Twitter Timeline Embed */}
        <div className="max-h-[600px] overflow-hidden">
          <a
            className="twitter-timeline"
            data-height="500"
            data-theme="dark"
            data-chrome="noheader nofooter noborders"
            href="https://twitter.com/tenvexai?ref_src=twsrc%5Etfw"
          >
            Loading posts...
          </a>
        </div>
        <div className="mt-4 text-center">
          <a
            href="https://twitter.com/tenvexai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-cyan transition-colors font-semibold"
          >
            Follow on X →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
