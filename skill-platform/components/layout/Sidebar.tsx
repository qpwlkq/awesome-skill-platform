'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'explore', id: 'explore' },
  { href: '/my-skills', label: 'my_skills', id: 'my-skills' },
  { href: '/shared', label: 'shared', id: 'shared' },
  { href: '/favorites', label: 'favorites', id: 'favorites' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[240px] flex-col justify-between border-r border-border-subtle bg-bg-page px-5 py-8">
      {/* Logo Section */}
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-terminal-green">~</span>
          <span className="text-base font-medium text-text-primary">skill_hub</span>
          <div className="h-[18px] w-2 bg-terminal-green" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm",
                  isActive
                    ? "bg-bg-card text-terminal-green"
                    : "text-text-secondary"
                )}
              >
                <span className="w-3">{isActive ? '>' : ' '}</span>
                <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Account Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 rounded-md bg-bg-card p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-bg-surface text-xs font-medium text-text-secondary">
            JD
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-text-primary">john_doe</span>
            <span className="text-[10px] text-text-tertiary">john@dev.io</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
