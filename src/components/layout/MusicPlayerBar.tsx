import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress'; // Using Progress for song progress
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize2,
  Heart,
  Repeat,
  Shuffle,
  ListMusic
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  albumTitle?: string;
  albumArtUrl?: string;
  duration: number; // in seconds
  albumId?: string;
}

interface MusicPlayerBarProps {
  currentTrack?: TrackInfo;
  isPlaying: boolean;
  progress: number; // 0-100
  currentTime: number; // in seconds
  volume: number; // 0-100
  isMuted: boolean;
  isShuffle?: boolean;
  isRepeat?: 'off' | 'context' | 'track';
  isLiked?: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (value: number) => void; // value 0-100
  onVolumeChange: (value: number) => void; // value 0-100
  onMuteToggle: () => void;
  onShuffleToggle?: () => void;
  onRepeatToggle?: () => void;
  onLikeToggle?: () => void;
  onQueueToggle?: () => void;
  onFullScreenToggle?: () => void;
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  currentTrack,
  isPlaying,
  progress,
  currentTime,
  volume,
  isMuted,
  isShuffle,
  isRepeat,
  isLiked,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onShuffleToggle,
  onRepeatToggle,
  onLikeToggle,
  onQueueToggle,
  onFullScreenToggle,
}) => {
  console.log("Rendering MusicPlayerBar. Current track:", currentTrack?.title, "Playing:", isPlaying);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-background border-t border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-full max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Left: Track Info */}
        <div className="flex items-center gap-3 w-1/3 min-w-0">
          {currentTrack ? (
            <>
              <Avatar className="h-12 w-12 rounded">
                <AvatarImage src={currentTrack.albumArtUrl} alt={currentTrack.albumTitle || currentTrack.title} />
                <AvatarFallback>{currentTrack.title[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <Link 
                  to={currentTrack.albumId ? `/album/${currentTrack.albumId}` : '#'} 
                  className="font-semibold text-sm truncate hover:underline"
                  title={currentTrack.title}
                >
                  {currentTrack.title}
                </Link>
                <p className="text-xs text-muted-foreground truncate" title={currentTrack.artist}>{currentTrack.artist}</p>
              </div>
              {onLikeToggle && (
                <Button variant="ghost" size="icon" onClick={onLikeToggle} className="ml-2 hidden sm:inline-flex">
                  <Heart className={cn("h-4 w-4", isLiked && "fill-primary text-primary")} />
                </Button>
              )}
            </>
          ) : (
            <div className="text-sm text-muted-foreground">No song playing</div>
          )}
        </div>

        {/* Center: Player Controls & Progress */}
        <div className="flex flex-col items-center justify-center w-1/3 max-w-lg">
          <div className="flex items-center gap-2 mb-1">
            {onShuffleToggle && (
              <Button variant="ghost" size="icon" onClick={onShuffleToggle} className="hidden sm:inline-flex">
                <Shuffle className={cn("h-4 w-4", isShuffle && "text-primary")} />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onPrevious} disabled={!currentTrack}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button variant="default" size="icon" className="h-10 w-10 rounded-full" onClick={onPlayPause} disabled={!currentTrack}>
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext} disabled={!currentTrack}>
              <SkipForward className="h-5 w-5" />
            </Button>
            {onRepeatToggle && (
              <Button variant="ghost" size="icon" onClick={onRepeatToggle} className="hidden sm:inline-flex">
                <Repeat className={cn("h-4 w-4", isRepeat !== 'off' && "text-primary")} />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <Slider
              defaultValue={[0]}
              value={[progress]}
              max={100}
              step={1}
              className="w-full cursor-pointer"
              onValueChange={(value) => onSeek(value[0])}
              disabled={!currentTrack}
              aria-label="Song progress"
            />
            <span>{currentTrack ? formatTime(currentTrack.duration) : '0:00'}</span>
          </div>
        </div>

        {/* Right: Volume & Other Controls */}
        <div className="flex items-center gap-2 w-1/3 justify-end">
          {onQueueToggle && (
            <Button variant="ghost" size="icon" onClick={onQueueToggle} className="hidden md:inline-flex">
              <ListMusic className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onMuteToggle}>
            {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Slider
            defaultValue={[50]}
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            className="w-24 hidden md:inline-block cursor-pointer"
            onValueChange={(value) => onVolumeChange(value[0])}
            aria-label="Volume control"
          />
          {onFullScreenToggle && (
            <Button variant="ghost" size="icon" onClick={onFullScreenToggle} className="hidden md:inline-flex">
              <Maximize2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayerBar;