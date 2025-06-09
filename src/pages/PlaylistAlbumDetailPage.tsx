import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MainContentArea from '@/components/layout/MainContentArea';
import SongListItem, { Song } from '@/components/SongListItem';
import MusicPlayerBar, { TrackInfo } from '@/components/layout/MusicPlayerBar';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Shuffle, PlusCircle, Heart } from 'lucide-react';

// Mock data - in a real app, this would be fetched based on albumId
const mockAlbumData: { [key: string]: { name: string, artist: string, year: number, coverUrl: string, songs: Song[] } } = {
  'album1': { 
    name: 'Future Nostalgia', 
    artist: 'Dua Lipa', 
    year: 2020, 
    coverUrl: 'https://picsum.photos/seed/futurenostalgia/300/300',
    songs: [
      { id: 's1-1', title: 'Future Nostalgia', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:04', trackNumber: 1, albumArtUrl: 'https://picsum.photos/seed/futurenostalgia/60/60' },
      { id: 's1-2', title: 'Don\'t Start Now', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:03', trackNumber: 2, albumArtUrl: 'https://picsum.photos/seed/futurenostalgia/60/60' },
      { id: 's1-3', title: 'Cool', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:29', trackNumber: 3, albumArtUrl: 'https://picsum.photos/seed/futurenostalgia/60/60' },
      { id: 's1-4', title: 'Physical', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:13', trackNumber: 4, albumArtUrl: 'https://picsum.photos/seed/futurenostalgia/60/60' },
      { id: 's1-5', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', trackNumber: 5, albumArtUrl: 'https://picsum.photos/seed/futurenostalgia/60/60' },
    ]
  },
  // Add more mock albums if needed by matching IDs from Homepage/SearchResults
  'feat1': {
    name: 'Epic Soundscapes',
    artist: 'Cinematic Orchestra',
    coverUrl: 'https://picsum.photos/seed/epic/300/300',
    year: 2024,
    songs: [
        { id: 'fs1', title: 'The Awakening', artist: 'Cinematic Orchestra', album: 'Epic Soundscapes', duration: '5:12', trackNumber: 1, albumArtUrl: 'https://picsum.photos/seed/epic/60/60' },
        { id: 'fs2', title: 'Journey to the Stars', artist: 'Cinematic Orchestra', album: 'Epic Soundscapes', duration: '4:30', trackNumber: 2, albumArtUrl: 'https://picsum.photos/seed/epic/60/60' },
    ]
  }
};

const PlaylistAlbumDetailPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albumDetails, setAlbumDetails] = useState(albumId ? mockAlbumData[albumId] : null);

  const [currentTrack, setCurrentTrack] = useState<TrackInfo | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    console.log('PlaylistAlbumDetailPage loaded for album ID:', albumId);
    if (albumId) {
      // Simulate fetching data
      setAlbumDetails(mockAlbumData[albumId] || { name: 'Unknown Album', artist: 'Unknown Artist', year: 0, coverUrl: 'https://picsum.photos/seed/unknown/300/300', songs: [] });
    }
  }, [albumId]);

  const handlePlaySong = (songId: string) => {
    const song = albumDetails?.songs.find(s => s.id === songId);
    if (song && albumDetails) {
      setCurrentTrack({
        id: song.id,
        title: song.title,
        artist: song.artist,
        albumTitle: albumDetails.name,
        albumArtUrl: song.albumArtUrl || albumDetails.coverUrl,
        duration: parseInt(song.duration.split(':')[0]) * 60 + parseInt(song.duration.split(':')[1]),
        albumId: albumId
      });
      setIsPlaying(true);
      setProgress(0);
      setCurrentTime(0);
    }
  };
  
  const handlePlayAll = () => {
    if (albumDetails && albumDetails.songs.length > 0) {
        handlePlaySong(albumDetails.songs[0].id);
        // In a real app, you'd queue all songs
        console.log("Play All from album:", albumDetails.name);
    }
  };

  if (!albumDetails) {
    return (
        <div className="flex h-screen bg-background text-foreground">
            <Sidebar className="hidden md:flex h-full" />
            <div className="flex-1 flex flex-col">
                <Header userName="Demo User" userAvatarUrl="https://picsum.photos/seed/user/40/40" />
                <MainContentArea title="Loading album...">
                    <p>Loading details...</p>
                </MainContentArea>
                <MusicPlayerBar isPlaying={false} progress={0} currentTime={0} volume={50} isMuted={false} onPlayPause={() => {}} onNext={() => {}} onPrevious={() => {}} onSeek={() => {}} onVolumeChange={() => {}} onMuteToggle={() => {}} />
            </div>
      </div>
    );
  }

  const totalDuration = albumDetails.songs.reduce((acc, song) => {
    const parts = song.duration.split(':');
    return acc + (parseInt(parts[0]) * 60) + parseInt(parts[1]);
  }, 0);
  const totalDurationStr = `${Math.floor(totalDuration / 60)} min ${totalDuration % 60} sec`;


  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar className="hidden md:flex h-full" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Demo User" userAvatarUrl="https://picsum.photos/seed/user/40/40" />
        <MainContentArea className="flex-1 overflow-y-auto">
          <Card className="mb-8 border-0 shadow-none md:flex md:gap-8 p-4 md:p-0">
            <CardHeader className="p-0 md:w-1/4 flex-shrink-0">
              <img src={albumDetails.coverUrl} alt={albumDetails.name} className="w-full h-auto object-cover rounded-lg aspect-square" />
            </CardHeader>
            <div className="md:w-3/4 flex flex-col justify-end pt-4 md:pt-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Album</p>
              <h1 className="text-4xl md:text-6xl font-bold my-2">{albumDetails.name}</h1>
              <CardContent className="p-0 text-muted-foreground">
                <p className="text-lg">{albumDetails.artist}</p>
                <p className="text-sm">{albumDetails.year} • {albumDetails.songs.length} songs, {totalDurationStr}</p>
              </CardContent>
              <CardFooter className="p-0 mt-6 flex gap-2">
                <Button size="lg" onClick={handlePlayAll}>
                  <PlayCircle className="mr-2 h-5 w-5" /> Play All
                </Button>
                <Button variant="outline" size="lg">
                  <Shuffle className="mr-2 h-5 w-5" /> Shuffle
                </Button>
                <Button variant="ghost" size="icon" aria-label="Like album">
                    <Heart className="h-5 w-5" />
                </Button>
                 <Button variant="ghost" size="icon" aria-label="Add to library">
                    <PlusCircle className="h-5 w-5" />
                </Button>
              </CardFooter>
            </div>
          </Card>

          <div className="space-y-1">
            {albumDetails.songs.map((song, index) => (
              <SongListItem
                key={song.id}
                song={{ ...song, trackNumber: index + 1 }}
                onPlayPause={handlePlaySong}
                showTrackNumber
                isPlaying={currentTrack?.id === song.id && isPlaying}
                isActive={currentTrack?.id === song.id}
              />
            ))}
          </div>
        </MainContentArea>
        <MusicPlayerBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          currentTime={currentTime}
          volume={volume}
          isMuted={isMuted}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => console.log('Next track')}
          onPrevious={() => console.log('Previous track')}
          onSeek={(val) => setProgress(val)}
          onVolumeChange={(val) => { setVolume(val); setIsMuted(false); }}
          onMuteToggle={() => setIsMuted(!isMuted)}
        />
      </div>
    </div>
  );
};

export default PlaylistAlbumDetailPage;