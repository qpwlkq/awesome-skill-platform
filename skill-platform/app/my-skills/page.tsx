'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/skill/MetricCard';
import { Tag } from '@/components/ui/tag';
import { metrics } from '@/data/mockSkills';

// Mock data for user's skills
const userSkills = [
  {
    id: '1',
    name: 'code_reviewer',
    description: 'AI-powered code review assistant for PRs',
    category: 'code_review',
    color: '#1F3A2A',
    stars: 342,
    downloads: 1247,
    updated: '2d ago',
  },
  {
    id: '2',
    name: 'test_generator',
    description: 'Auto-generate unit tests from source code',
    category: 'testing',
    color: '#1A2A3A',
    stars: 218,
    downloads: 856,
    updated: '5d ago',
  },
];

export default function MySkillsPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-6 px-10 py-8 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-text-tertiary">~/my_skills</p>
            <h1 className="text-3xl font-semibold text-text-primary">my_skills</h1>
            <p className="text-sm text-text-tertiary">// manage your published skills</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>

          {/* Actions Bar */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-md bg-bg-card px-3 py-2 text-sm text-text-tertiary hover:text-text-secondary">
              <span>[--filter]</span>
            </button>
            <button className="flex items-center gap-2 rounded-md bg-bg-card px-3 py-2 text-sm text-text-tertiary hover:text-text-secondary">
              <span>sort_by: stars</span>
            </button>
            <div className="flex-1" />
            <Button onClick={() => {}}>+ new_skill()</Button>
          </div>

          {/* Skills List */}
          <div className="flex flex-col gap-4">
            {userSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-4 rounded-md bg-bg-card p-4"
              >
                {/* Skill Info */}
                <div className="flex flex-1 flex-col gap-2">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-medium text-text-primary">{skill.name}</h3>
                    <Tag>{skill.category}</Tag>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-tertiary">// {skill.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-terminal-amber">★ {skill.stars} stars</span>
                    <span className="text-text-secondary">↓ {skill.downloads} downloads</span>
                    <span className="text-text-tertiary">updated: {skill.updated}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="rounded-md bg-bg-surface px-4 py-2 text-xs text-text-secondary hover:text-text-primary">
                    $ edit()
                  </button>
                  <button className="rounded-md bg-bg-surface px-4 py-2 text-xs text-text-secondary hover:text-text-primary">
                    view()
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
