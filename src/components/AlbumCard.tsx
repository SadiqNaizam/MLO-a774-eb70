import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year?: number;
}

interface AlbumCardProps {
  album: Album;
  className?: string;
  onPlay?: (albumId: string) => void; // Optional: for playing the whole album directly
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, className, onPlay }) => {
  console.log("Rendering AlbumCard:", album.title);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if card is a link
    e.stopPropagation();
    if (onPlay) {
      onPlay(album.id);
    }
    console.log("Play album clicked:", album.id);
  };

  return (
    <Card className={cn("w-full group overflow-hidden transition-all hover:shadow-xl", className)}>
      <Link to={`/album/${album.id}`} className="block">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={1 / 1}>
            <img
              src={album.coverUrl || '/placeholder.svg'}
              alt={album.title}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
          {onPlay && (
             <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-2 right-2 h-12 w-12 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                onClick={handlePlayClick}
                aria-label={`Play ${album.title}`}
            >
                <PlayCircle className="h-8 w-8" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-3">
          <h3 className="font-semibold text-base truncate group-hover:text-primary">{album.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
          {album.year && <p className="text-xs text-muted-foreground">{album.year}</p>}
        </CardContent>
      </Link>
      {/* CardFooter can be used for additional actions if needed */}
    </Card>
  );
};

export default AlbumCard;