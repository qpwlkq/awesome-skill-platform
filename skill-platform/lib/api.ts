const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api/v1';

export interface Skill {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  author: string;
  stars: number;
}

export interface User {
  username: string;
  email: string;
  bio: string;
  skill_count: number;
  star_count: number;
  download_count: number;
}

export interface Activity {
  id: string;
  symbol: string;
  text: string;
  time: string;
}

export const skillApi = {
  getAll: async (): Promise<Skill[]> => {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
  },

  getBySlug: async (slug: string): Promise<Skill> => {
    const res = await fetch(`${API_BASE}/skills/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch skill');
    return res.json();
  },

  getUser: async (username: string): Promise<User> => {
    const res = await fetch(`${API_BASE}/users/${username}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  getActivity: async (): Promise<{ activities: Activity[] }> => {
    const res = await fetch(`${API_BASE}/activity`);
    if (!res.ok) throw new Error('Failed to fetch activity');
    return res.json();
  },
};
