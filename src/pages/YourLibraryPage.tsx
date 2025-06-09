import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MainContentArea from '@/components/layout/MainContentArea';
import AlbumCard, { Album } from '@/components/AlbumCard';
import SongListItem, { Song } from '@/components/SongListItem';
import MusicPlayerBar, { TrackInfo } from '@/components/layout/MusicPlayerBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const libraryPlaylists: Album[] = [
  { id: 'lib-pl1', title: 'Chill Vibes', artist: 'You', coverUrl: 'https://picsum.photos/seed/chillvibes/400/400', year: 2023 },
  { id: 'lib-pl2', title: 'Workout Hits', artist: 'You', coverUrl: 'https://picsum.photos/seed/workout/400/400', year: 2022 },
];

const libraryAlbums: Album[] = [
  { id: 'lib-album1', title: 'Currents', artist: 'Tame Impala', coverUrl: 'https://picsum.photos/seed/currents/400/400', year: 2015 },
  { id: 'lib-album2', title: 'Discovery', artist: 'Daft Punk', coverUrl: 'https://picsum.photos/seed/discovery/400/400', year: 2001 },
];

const libraryLikedSongs: Song[] = [
  { id: 'liked-s1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', albumArtUrl: 'https://picsum.photos/seed/bohemian/60/60' },
  { id: 'liked-s2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: '8:02', albumArtUrl: 'https://picsum.photos/seed/stairway/60/60' },
];

const YourLibraryPage = () => {
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  console.log('YourLibraryPage loaded');

  const handlePlaySong = (songId: string) => {
    const song = libraryLikedSongs.find(s => s.id === songId); // Assuming only liked songs can be played directly here
    if (song) {
      setCurrentTrack({
        id: song.id,
        title: song.title,
        artist: song.artist,
        albumTitle: song.album,
        albumArtUrl: song.albumArtUrl,
        duration: parseInt(song.duration.split(':')[0]) * 60 + parseInt(song.duration.split(':')[1]),
      });
      setIsPlaying(true);
    }
  };
  
  const handlePlayAlbum = (albumId: string) => {
    console.log('Play album from library:', albumId);
    const album = [...libraryPlaylists, ...libraryAlbums].find(a => a.id === albumId);
    if (album) {
      setCurrentTrack({
        id: `${album.id}-track1`,
        title: `First Track of ${album.title}`,
        artist: album.artist,
        albumTitle: album.title,
        albumArtUrl: album.coverUrl,
        duration: 180,
        albumId: album.id,
      });
      setIsPlaying(true);
    }
  };


  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar className="hidden md:flex h-full" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Demo User" userAvatarUrl="https://picsum.photos/seed/user/40/40" />
        <MainContentArea title="Your Library" className="flex-1 overflow-y-auto">
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="songs">Liked Songs</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
            </TabsList>
            <TabsContent value="playlists">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {libraryPlaylists.map(album => (
                  <AlbumCard key={album.id} album={album} onPlay={handlePlayAlbum} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {libraryAlbums.map(album => (
                  <AlbumCard key={album.id} album={album} onPlay={handlePlayAlbum} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="songs">
              <div className="space-y-1">
                {libraryLikedSongs.map(song => (
                  <SongListItem 
                    key={song.id} 
                    song={song} 
                    onPlayPause={handlePlaySong} 
                    showAlbumArt 
                    isLiked // All songs here are liked by definition
                    isPlaying={currentTrack?.id === song.id && isPlaying}
                    isActive={currentTrack?.id === song.id}
                    />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="artists">
                <p className="text-muted-foreground">Your followed artists would appear here.</p>
                 {/* Example artists list */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                    {libraryAlbums.map(album => (
                        <div key={`artist-${album.id}`} className="flex flex-col items-center p-4 hover:bg-accent rounded-lg cursor-pointer">
                            <img src={`https://picsum.photos/seed/${album.artist.replace(/\s+/g, '')}/150/150`} alt={album.artist} className="w-24 h-24 rounded-full object-cover mb-2"/>
                            <p className="font-semibold text-center">{album.artist}</p>
                        </div>
                    ))}
                </div>
            </TabsContent>
          </Tabs>
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

export default YourLibraryPage;