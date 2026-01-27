'use client';

import Link from 'next/link';
import { Skill } from '@/types/skill';
import { Tag } from '@/components/ui/tag';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="flex w-[280px] flex-col overflow-hidden rounded-md bg-bg-card transition-transform hover:scale-[1.02]"
    >
      {/* Header with colored background */}
      <div
        className="flex min-h-[100px] flex-col justify-end p-4"
        style={{ backgroundColor: skill.color }}
      >
        <Tag className="w-fit">{skill.category}</Tag>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-4">
        {/* Title */}
        <h3 className="text-sm font-medium text-text-primary">{skill.name}</h3>

        {/* Description */}
        <p className="text-[10px] leading-relaxed text-text-tertiary">
          // {skill.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-secondary">{skill.author}</span>
          <span className="text-[10px] font-medium text-terminal-amber">
            ★ {skill.stars}
          </span>
        </div>
      </div>
    </Link>
  );
}
