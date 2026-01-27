'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  showActions?: boolean;
  searchPlaceholder?: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
  };
}

export function Header({
  breadcrumb,
  title,
  subtitle,
  showActions = true,
  searchPlaceholder = "search...",
  primaryAction,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Title Section */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-text-tertiary">{breadcrumb}</p>
        <h1 className="text-4xl font-semibold text-text-primary">{title}</h1>
        {subtitle && (
          <p className="text-sm text-text-tertiary">{subtitle}</p>
        )}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <button className="flex items-center gap-2 rounded-md bg-bg-card px-3 py-2 text-sm text-text-tertiary hover:text-text-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span>{searchPlaceholder}</span>
            <span className="ml-auto text-[10px] text-text-muted">⌘K</span>
          </button>

          {/* Filter Button */}
          <button className="flex items-center gap-2 rounded-md bg-bg-card px-3 py-2 text-sm text-text-tertiary hover:text-text-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>[--filter]</span>
          </button>

          {/* Primary Action */}
          {primaryAction && (
            <Button onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
