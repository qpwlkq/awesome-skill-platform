'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { SkillCard } from '@/components/skill/SkillCard';
import { mockSkills } from '@/data/mockSkills';
import { ActivityItem } from '@/types/skill';

const mockActivities: ActivityItem[] = [
  { id: '1', symbol: '✓', text: 'published code_reviewer v1.2.0', time: '2h ago' },
  { id: '2', symbol: '+', text: 'starred git_helper by @alice_dev', time: '5h ago' },
  { id: '3', symbol: '○', text: 'draft sql_optimizer updated', time: '1d ago' },
];

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const [activeTab, setActiveTab] = useState('published');

  // Get initials from username
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-6 px-10 py-8 overflow-y-auto">
          {/* Profile Header */}
          <div className="flex flex-col gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              {/* Avatar - 80x80 */}
              <div className="flex h-20 w-20 items-center justify-center rounded bg-bg-surface text-3xl font-semibold text-text-secondary">
                {getInitials('sarah_dev')}
              </div>

              {/* User Details */}
              <div className="flex flex-1 flex-col gap-1">
                <h1 className="text-2xl font-semibold text-text-primary">sarah_dev</h1>
                <p className="text-sm text-text-tertiary">// full-stack developer</p>
                <p className="text-xs text-text-secondary">12 skills · 2.4k stars · 8.1k downloads</p>
              </div>

              {/* Actions */}
              <Button onClick={() => {}}>$ edit_profile()</Button>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="flex w-full">
            <div className="flex items-center gap-0">
              {/* Published Tab (Active) */}
              <button
                onClick={() => setActiveTab('published')}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'published'
                    ? 'rounded-l-md bg-bg-card text-terminal-green'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {activeTab === 'published' ? '> ' : ''}published
              </button>

              {/* Drafts Tab */}
              <button
                onClick={() => setActiveTab('drafts')}
                className={`px-4 py-3 text-sm ${
                  activeTab === 'drafts'
                    ? 'bg-bg-card text-terminal-green font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                drafts
              </button>

              {/* Starred Tab */}
              <button
                onClick={() => setActiveTab('starred')}
                className={`px-4 py-3 text-sm rounded-r-md ${
                  activeTab === 'starred'
                    ? 'rounded-r-md bg-bg-card text-terminal-green font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                starred
              </button>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-3 gap-4">
            {mockSkills.slice(0, 3).map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          {/* Activity Section */}
          <div className="flex flex-col gap-4">
            {/* Title */}
            <h2 className="text-base font-medium text-text-primary">
              activity_log <span className="text-text-tertiary">// recent actions</span>
            </h2>

            {/* Activities List */}
            <div className="flex flex-col gap-3">
              {mockActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 text-sm"
                >
                  {/* Symbol */}
                  <span className={`w-4 ${
                    activity.symbol === '✓' ? 'text-terminal-green' :
                    activity.symbol === '+' ? 'text-terminal-blue' :
                    'text-terminal-amber'
                  }`}>
                    {activity.symbol}
                  </span>

                  {/* Text */}
                  <span className="flex-1 text-text-secondary">{activity.text}</span>

                  {/* Time */}
                  <span className="text-text-tertiary">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
