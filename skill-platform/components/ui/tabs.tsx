import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const TabsContext = React.createContext<{
  activeValue: string;
  setActiveValue: (value: string) => void;
}>({
  activeValue: '',
  setActiveValue: () => {},
});

const Tabs = ({ defaultValue, children, className }: TabsProps) => {
  const [activeValue, setActiveValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <div className={cn("inline-flex border-b border-border-divider", className)}>
      {children}
    </div>
  );
};

const TabsTrigger = ({ value, children, isActive, onClick, className }: TabsTriggerProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex px-5 py-3 text-sm font-medium transition-colors",
        isActive
          ? "border-b-2 border-terminal-green text-terminal-green"
          : "text-text-secondary hover:text-text-primary",
        className
      )}
    >
      {isActive && '> '}
      {children}
    </button>
  );
};

export { Tabs, TabsList, TabsTrigger };
