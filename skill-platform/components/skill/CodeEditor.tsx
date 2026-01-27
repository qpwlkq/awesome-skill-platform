'use client';

import { cn } from '@/lib/utils';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
}

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  className,
  placeholder = "// Enter your skill content here...",
}: CodeEditorProps) {
  const lines = value.split('\n');

  return (
    <div className={cn("relative rounded-md border border-border-subtractive bg-[#111111] p-4", className)}>
      {/* Line Numbers */}
      <div className="absolute left-4 top-4 select-none text-[10px] text-text-muted">
        {lines.map((_, index) => (
          <div key={index} className="leading-6">
            {index + 1}
          </div>
        ))}
      </div>

      {/* Content */}
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        className="ml-6 w-full bg-transparent font-mono text-sm leading-6 text-text-secondary outline-none placeholder:text-text-muted"
        style={{ minHeight: '200px' }}
        spellCheck={false}
      />

      {/* Terminal Green Highlights for bullet points */}
      <div className="pointer-events-none absolute left-10 top-4 text-sm leading-6">
        {lines.map((line, index) => {
          if (line.trim().startsWith('-')) {
            return (
              <div key={index} className="text-terminal-green">
                -
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
