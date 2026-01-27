'use client';

import { cn } from '@/lib/utils';
import { ActivityItem } from '@/types/skill';

interface ActivityLogProps {
  activities: ActivityItem[];
  title?: string;
  subtitle?: string;
}

const symbolColors = {
  '✓': 'text-terminal-green',
  '+': 'text-terminal-blue',
  '○': 'text-terminal-amber',
};

export function ActivityLog({ activities, title, subtitle }: ActivityLogProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      {(title || subtitle) && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {title && <p className="text-base font-medium text-text-primary">{title}</p>}
            {subtitle && <p className="text-xs text-text-tertiary">// {subtitle}</p>}
          </div>
          <button className="text-xs font-medium text-terminal-blue hover:underline">
            view_all()
          </button>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col rounded-md bg-bg-card p-0">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-center gap-3 py-3.5",
              index < activities.length - 1 && "border-b border-border-divider"
            )}
          >
            {/* Symbol */}
            <span className={cn("text-sm font-medium", symbolColors[activity.symbol])}>
              {activity.symbol}
            </span>

            {/* Text */}
            <p className="flex-1 text-sm text-text-secondary">
              {activity.text}
            </p>

            {/* Time */}
            <span className="text-[10px] text-text-muted">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
