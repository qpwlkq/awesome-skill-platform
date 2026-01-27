import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Card } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { skillApi } from '@/lib/api';

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let skill;
  try {
    skill = await skillApi.getBySlug(id);
  } catch (error) {
    notFound();
  }

  // Add default tags for display
  const skillWithTags = {
    ...skill,
    tags: skill.category ? [skill.category] : [],
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-6 px-10 py-8 overflow-y-auto">
          {/* Breadcrumb */}
          <p className="text-xs text-text-tertiary">~/skills/{skill.slug}</p>

          {/* Skill Header */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-semibold text-text-primary">{skill.name}</h1>
                <p className="mt-1 text-sm text-text-tertiary">// {skill.description}</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Star Button */}
                <button className="flex items-center gap-2 rounded-md bg-bg-card px-3 py-2 text-sm text-text-secondary hover:text-text-primary">
                  <span className="text-terminal-amber">★</span>
                  <span>star</span>
                  <span className="font-medium text-text-primary">{skill.stars}</span>
                </button>

                {/* Fork Button */}
                <Button>fork()</Button>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-text-secondary">by {skill.author}</span>
              <span className="text-text-muted">·</span>
              <span className="text-terminal-green">v1.2.0</span>
              <span className="text-text-muted">·</span>
              <span className="text-text-secondary">MIT</span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 gap-6 overflow-y-auto">
            {/* README Panel (Left) */}
            <Card className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-6">
                {/* Description */}
                <div>
                  <h2 className="mb-2 text-sm font-medium text-text-primary">## description</h2>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    A powerful skill that reviews your code changes and provides detailed feedback on code quality, potential bugs, security issues, and best practices. Works seamlessly with Git diffs and pull request workflows.
                  </p>
                </div>

                <div className="h-px bg-border-divider" />

                {/* Usage */}
                <div>
                  <h2 className="mb-2 text-sm font-medium text-text-primary">## usage</h2>
                  <div className="rounded-md bg-bg-surface p-4 font-mono text-sm">
                    <p className="text-terminal-green">$ /skill run code_reviewer</p>
                    <p className="text-text-secondary"></p>
                    <p className="text-text-tertiary"># with options</p>
                    <p className="text-terminal-green">$ /skill run code_reviewer --diff HEAD~3</p>
                    <p className="text-terminal-green">$ /skill run code_reviewer --lang python</p>
                  </div>
                </div>

                <div className="h-px bg-border-divider" />

                {/* Configuration */}
                <div>
                  <h2 className="mb-2 text-sm font-medium text-text-primary">## configuration</h2>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    Configure the skill by adding a .skill-config.json file to your project root. Supports custom rules, language-specific settings, and severity thresholds.
                  </p>
                </div>
              </div>
            </Card>

            {/* Stats Panel (Right) */}
            <div className="flex w-[300px] flex-col gap-5 overflow-y-auto">
              {/* Stats Card */}
              <Card className="flex flex-col gap-4 p-5">
                <h2 className="text-sm font-medium text-text-primary">stats</h2>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">★ stars</span>
                    <span className="text-sm font-medium text-text-primary">{skill.stars}</span>
                  </div>
                  <div className="h-px bg-border-divider" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">↓ downloads</span>
                    <span className="text-sm font-medium text-text-primary">1,247</span>
                  </div>
                  <div className="h-px bg-border-divider" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">◈ forks</span>
                    <span className="text-sm font-medium text-text-primary">23</span>
                  </div>
                  <div className="h-px bg-border-divider" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">updated</span>
                    <span className="text-sm font-medium text-text-primary">2 days ago</span>
                  </div>
                </div>
              </Card>

              {/* Tags Card */}
              <Card className="flex flex-col gap-3 p-5">
                <h2 className="text-sm font-medium text-text-primary">tags</h2>

                <div className="flex flex-wrap gap-2">
                  {skillWithTags.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Card>

              {/* Author Card */}
              <Card className="flex flex-col gap-3 p-5">
                <h2 className="text-sm font-medium text-text-primary">author</h2>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-bg-surface text-xs font-medium text-text-secondary">
                    SD
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-text-primary">{skill.author}</p>
                    <p className="text-[10px] text-text-tertiary">// senior engineer</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
