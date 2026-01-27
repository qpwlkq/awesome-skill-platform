export interface Skill {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  author: string;
  stars: number;
  color: string;
  tags: string[];
  visibility?: 'public' | 'private';
  license?: string;
  version?: string;
}

export interface MetricCard {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ActivityItem {
  id: string;
  symbol: '✓' | '+' | '○';
  text: string;
  time: string;
}

export interface User {
  username: string;
  email?: string;
  avatar?: string;
  bio?: string;
  skillCount: number;
  starCount: number;
  downloadCount: number;
}
