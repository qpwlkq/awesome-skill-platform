'use client';

import { MetricCard as MetricCardType } from '@/types/skill';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  metric: MetricCardType;
}

export function MetricCard({ metric }: MetricCardProps) {
  const trendColors = {
    up: 'text-terminal-green',
    down: 'text-terminal-red',
    neutral: 'text-text-tertiary',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '—',
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-md bg-bg-card p-5">
      {/* Label */}
      <p className="text-xs text-text-tertiary">{metric.label}</p>

      {/* Value */}
      <p className="text-[28px] font-semibold leading-none text-text-primary">
        {metric.value}
      </p>

      {/* Change Indicator */}
      <div className="flex items-center gap-1.5">
        <span className={cn('text-sm font-medium', trendColors[metric.trend])}>
          {trendIcons[metric.trend]}
        </span>
        <span className={cn('text-sm font-medium', trendColors[metric.trend])}>
          {metric.change}
        </span>
      </div>
    </div>
  );
}
