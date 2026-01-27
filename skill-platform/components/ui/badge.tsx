import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const colorClasses = {
      default: 'text-text-tertiary',
      success: 'text-terminal-green',
      warning: 'text-terminal-amber',
      error: 'text-terminal-red',
    };

    return (
      <div
        className={cn(
          "inline-flex items-center text-xs font-medium",
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

Badge.displayName = "Badge";

export { Badge };
