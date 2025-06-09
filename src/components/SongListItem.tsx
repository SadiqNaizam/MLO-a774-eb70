import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, MoreHorizontal, Music, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  trackNumber?: number;
  albumArtUrl?: string; // Optional: for context in playlists
  isPlayable?: boolean; // e.g. for region restrictions - not used here yet
}

interface SongListItemProps {
  song: Song;
  isPlaying?: boolean; // Is this specific song playing?
  isActive?: boolean; // Is this song the active one in the player (playing or paused)?
  showTrackNumber?: boolean;
  showAlbumArt?: boolean;
  isLiked?: boolean;
  onPlayPause: (songId: string) => void;
  onLikeToggle?: (songId: string) => void;
  onOptions?: (songId: string, event: React.MouseEvent) => void;
  className?: string;
}

const SongListItem: React.FC<SongListItemProps> = ({
  song,
  isPlaying,
  isActive,
  showTrackNumber = true,
  showAlbumArt = false,
  isLiked,
  onPlayPause,
  onLikeToggle,
  onOptions,
  className,
}) => {
  console.log("Rendering SongListItem:", song.title);

  const handlePlayPauseClick = () => {
    onPlayPause(song.id);
  };
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering play/pause or other parent actions
    if (onLikeToggle) onLikeToggle(song.id);
  };

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOptions) onOptions(song.id, e);
  };

  return (
    <div
      className={cn(
        "group flex items-center p-2 hover:bg-accent/50 rounded-md cursor-default transition-colors w-full",
        isActive && "bg-accent",
        className
      )}
      onDoubleClick={handlePlayPauseClick} // Double click to play
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showTrackNumber && (
          <div className="w-8 text-sm text-muted-foreground text-center flex items-center justify-center">
            <span className="group-hover:hidden">{song.trackNumber || <Music className="h-4 w-4" />}</span>
            <Button
              variant="ghost"
              size="icon"
              className="hidden group-hover:flex h-8 w-8"
              onClick={handlePlayPauseClick}
              aria-label={isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
            >
              {isPlaying ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
            </Button>
          </div>
        )}
        {showAlbumArt && song.albumArtUrl && (
           <img src={song.albumArtUrl} alt={song.album || song.title} className="h-10 w-10 rounded object-cover" />
        )}
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium truncate", isActive && "text-primary")}>{song.title}</p>
          <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto pl-2">
        {onLikeToggle && (
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLikeClick} 
                className={cn("h-8 w-8 opacity-0 group-hover:opacity-100 focus:opacity-100", isLiked && "opacity-100")}
                aria-label={isLiked ? "Unlike song" : "Like song"}
            >
                <Heart className={cn("h-4 w-4", isLiked && "fill-primary text-primary")} />
            </Button>
        )}
        <span className="text-sm text-muted-foreground w-12 text-right hidden sm:inline-block">{song.duration}</span>
        {onOptions && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleOptionsClick} aria-label="More options">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SongListItem;