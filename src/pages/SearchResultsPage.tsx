import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MainContentArea from '@/components/layout/MainContentArea';
import AlbumCard, { Album } from '@/components/AlbumCard';
import SongListItem, { Song } from '@/components/SongListItem';
import MusicPlayerBar, { TrackInfo } from '@/components/layout/MusicPlayerBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const allPlaceholderAlbums: Album[] = [
  { id: 'res-album1', title: 'Queried Beats', artist: 'Search Funk', coverUrl: 'https://picsum.photos/seed/queried/400/400', year: 2023 },
  { id: 'res-album2', title: 'Found Grooves', artist: 'Result Master', coverUrl: 'https://picsum.photos/seed/found/400/400', year: 2022 },
];

const allPlaceholderSongs: Song[] = [
  { id: 'res-s1', title: 'Search Anthem', artist: 'Query AI', album: 'Queried Beats', duration: '3:15', trackNumber: 1, albumArtUrl: 'https://picsum.photos/seed/queried/100/100' },
  { id: 'res-s2', title: 'Echoes of Result', artist: 'Result Master', album: 'Found Grooves', duration: '4:02', trackNumber: 2, albumArtUrl: 'https://picsum.photos/seed/found/100/100' },
  { id: 'res-s3', title: 'Lost and Found', artist: 'Explorer', duration: '2:55', trackNumber: 3 },
];

const SearchResultsPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    setSearchQuery(query);
    console.log('SearchResultsPage loaded with query:', query);
    // Here you would typically fetch search results based on the query
  }, [location.search]);
  
  const handlePlaySong = (songId: string) => {
    console.log('Play song:', songId);
    const song = allPlaceholderSongs.find(s => s.id === songId);
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
      setProgress(0);
      setCurrentTime(0);
    }
  };

  const handlePlayAlbum = (albumId: string) => {
    console.log('Play album from search:', albumId);
     const album = allPlaceholderAlbums.find(a => a.id === albumId);
    if (album) {
      setCurrentTrack({
        id: `${album.id}-track1`, // Placeholder for first track
        title: `Track 1 from ${album.title}`,
        artist: album.artist,
        albumTitle: album.title,
        albumArtUrl: album.coverUrl,
        duration: 180, 
        albumId: album.id,
      });
      setIsPlaying(true);
    }
  };

  const handleHeaderSearch = (query: string) => {
    // This would typically navigate to /search-results?q=query
    // For simplicity, we just update the state here if already on the page
    setSearchQuery(query); 
    console.log("Search initiated from SearchResultsPage header:", query);
    // In a real app, you'd update the URL: history.pushState({}, '', `/search-results?q=${query}`)
  };


  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar className="hidden md:flex h-full" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            userName="Demo User" 
            userAvatarUrl="https://picsum.photos/seed/user/40/40"
            onSearch={handleHeaderSearch} 
        />
        <MainContentArea title={searchQuery ? `Search Results for "${searchQuery}"` : "Search Results"} className="flex-1 overflow-y-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Top Results / Songs</h3>
                <div className="space-y-1">
                    {allPlaceholderSongs.map(song => (
                        <SongListItem 
                            key={song.id} 
                            song={song} 
                            onPlayPause={handlePlaySong} 
                            showAlbumArt 
                            isPlaying={currentTrack?.id === song.id && isPlaying}
                            isActive={currentTrack?.id === song.id}
                        />
                    ))}
                </div>
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-3">Albums</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {allPlaceholderAlbums.map(album => (
                    <AlbumCard key={album.id} album={album} onPlay={handlePlayAlbum} />
                  ))}
                </div>
              </section>
            </TabsContent>
            <TabsContent value="songs">
              <div className="space-y-1">
                {allPlaceholderSongs.map(song => (
                   <SongListItem 
                        key={song.id} 
                        song={song} 
                        onPlayPause={handlePlaySong} 
                        showAlbumArt 
                        isPlaying={currentTrack?.id === song.id && isPlaying}
                        isActive={currentTrack?.id === song.id}
                    />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {allPlaceholderAlbums.map(album => (
                  <AlbumCard key={album.id} album={album} onPlay={handlePlayAlbum} />
                ))}
              </div>
            </TabsContent>
             <TabsContent value="artists">
                <p className="text-muted-foreground">Artist results would appear here.</p>
            </TabsContent>
            <TabsContent value="playlists">
                <p className="text-muted-foreground">Playlist results would appear here.</p>
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

export default SearchResultsPage;