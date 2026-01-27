import * as React from "react";
import { cn } from "@/lib/utils";

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'blue' | 'amber' | 'red' | 'purple';
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const colorClasses = {
      default: 'text-terminal-green',
      blue: 'text-terminal-blue',
      amber: 'text-terminal-amber',
      red: 'text-terminal-red',
      purple: 'text-purple-500',
    };

    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-md bg-bg-surface px-2 py-1 text-xs font-medium",
          colorClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };
