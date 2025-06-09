import React from 'react';
import { cn } from '@/lib/utils';

interface MainContentAreaProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const MainContentArea: React.FC<MainContentAreaProps> = ({ children, title, className }) => {
  console.log("Rendering MainContentArea with title:", title);
  return (
    <main className={cn("flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto", className)}>
      {title && (
        <h1 className="text-3xl font-bold tracking-tight mb-6">{title}</h1>
      )}
      {children}
    </main>
  );
};

export default MainContentArea;