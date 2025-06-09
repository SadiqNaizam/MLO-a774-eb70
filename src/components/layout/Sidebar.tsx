import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button, buttonVariants } from '@/components/ui/button';
import { Home, Library, ListMusic, Radio, Search, PlusCircle, Heart, Users } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Browse', href: '/browse', icon: Search }, // Assuming a browse page
  { label: 'Radio', href: '/radio', icon: Radio }, // Assuming a radio page
];

const libraryNavItems: NavItem[] = [
  { label: 'Playlists', href: '/library/playlists', icon: ListMusic },
  { label: 'Albums', href: '/library/albums', icon: Library },
  { label: 'Liked Songs', href: '/library/liked', icon: Heart },
  { label: 'Artists', href: '/library/artists', icon: Users }, // Assuming artists in library
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  console.log("Rendering Sidebar");

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => (
      <Link
        key={item.label}
        to={item.href}
        className={cn(
          buttonVariants({ variant: location.pathname === item.href ? 'secondary' : 'ghost' }),
          'w-full justify-start h-10 px-3'
        )}
      >
        <item.icon className="mr-3 h-5 w-5" />
        {item.label}
      </Link>
    ));
  };

  return (
    <aside className={cn("h-full w-64 border-r bg-background flex flex-col", className)}>
      <ScrollArea className="flex-grow py-4 px-2">
        <div className="space-y-1 mb-4">
          {renderNavItems(mainNavItems)}
        </div>
        
        <h2 className="mb-2 px-3 text-lg font-semibold tracking-tight">
          Your Library
        </h2>
        <div className="space-y-1 mb-4">
          {renderNavItems(libraryNavItems)}
        </div>
        
        <Button variant="ghost" className="w-full justify-start h-10 px-3">
          <PlusCircle className="mr-3 h-5 w-5" />
          Create Playlist
        </Button>
      </ScrollArea>
      {/* Optional: Album art or currently playing snippet at the bottom of sidebar */}
    </aside>
  );
};

export default Sidebar;