'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag } from '@/components/ui/tag';
import { CodeEditor } from '@/components/skill/CodeEditor';

export default function CreateSkillPage() {
  const [skillName, setSkillName] = useState('my_awesome_skill');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('code_review');
  const [tags, setTags] = useState(['code', 'ai']);
  const [content, setContent] = useState(`# Code Reviewer Skill

You are an expert code reviewer.
Review the provided code changes and provide detailed feedback on:
- Code quality and best practices
- Potential bugs or issues
- Security vulnerabilities
- Performance improvements`);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [license, setLicense] = useState('MIT');

  const handleAddTag = () => {
    const newTag = prompt('Enter tag name:');
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-6 px-10 py-8 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-text-tertiary">~/skills/new</p>
            <h1 className="text-4xl font-semibold text-text-primary">create_skill</h1>
            <p className="text-sm text-text-tertiary">// define your new skill for the community</p>
          </div>

          {/* Form */}
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto rounded-md bg-bg-card p-8">
            {/* Name and Category */}
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="skill_name"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="my_awesome_skill"
              />
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-secondary">category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green"
                >
                  <option value="code_review">code_review</option>
                  <option value="testing">testing</option>
                  <option value="devops">devops</option>
                  <option value="documentation">documentation</option>
                  <option value="security">security</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-secondary">description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="describe what your skill does..."
                className="flex min-h-[72px] w-full rounded-md border border-border-subtle bg-bg-surface p-3 text-sm text-text-secondary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-secondary">tags:</label>
              <div className="flex items-center gap-2">
                {tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                <button
                  onClick={handleAddTag}
                  className="rounded-md border border-border-subtle border-dashed bg-bg-surface px-2 py-1 text-[10px] text-text-tertiary hover:text-text-secondary"
                >
                  + add_tag
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border-divider" />

            {/* Skill Content */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-secondary">
                skill_content: // paste your prompt or skill definition
              </label>
              <CodeEditor
                value={content}
                onChange={setContent}
                placeholder="# Enter your skill content here..."
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-border-divider" />

            {/* Settings */}
            <div className="flex items-center gap-8">
              {/* Visibility */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-text-secondary">visibility:</span>

                <button
                  onClick={() => setVisibility('public')}
                  className={cn(
                    "flex items-center gap-1.5 text-sm",
                    visibility === 'public'
                      ? 'text-text-primary'
                      : 'text-text-tertiary'
                  )}
                >
                  <div
                    className={cn(
                      'h-3 w-3 rounded-full',
                      visibility === 'public'
                        ? 'bg-terminal-green'
                        : 'border border-text-tertiary'
                    )}
                  />
                  public
                </button>

                <button
                  onClick={() => setVisibility('private')}
                  className={cn(
                    "flex items-center gap-1.5 text-sm",
                    visibility === 'private'
                      ? 'text-text-primary'
                      : 'text-text-tertiary'
                  )}
                >
                  <div
                    className={cn(
                      'h-3 w-3 rounded-full',
                      visibility === 'private'
                        ? 'bg-terminal-green'
                        : 'border border-text-tertiary'
                    )}
                  />
                  private
                </button>
              </div>

              {/* License */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-text-secondary">license:</span>
                <button
                  onClick={() => setLicense('MIT')}
                  className="flex items-center gap-2 rounded-md bg-bg-surface px-3 py-1.5 text-sm text-text-primary border border-border-subtle"
                >
                  MIT
                  <span className="text-text-tertiary">▾</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="secondary">$ cancel</Button>
              <Button>$ publish_skill()</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
