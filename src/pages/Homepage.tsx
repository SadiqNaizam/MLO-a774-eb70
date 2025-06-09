import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MainContentArea from '@/components/layout/MainContentArea';
import AlbumCard, { Album } from '@/components/AlbumCard';
import Carousel from '@/components/Carousel';
import MusicPlayerBar, { TrackInfo } from '@/components/layout/MusicPlayerBar';
import { Button } from '@/components/ui/button'; // For potential use

const placeholderAlbums: Album[] = [
  { id: 'album1', title: 'Future Nostalgia', artist: 'Dua Lipa', coverUrl: 'https://picsum.photos/seed/futurenostalgia/400/400', year: 2020 },
  { id: 'album2', title: 'After Hours', artist: 'The Weeknd', coverUrl: 'https://picsum.photos/seed/afterhours/400/400', year: 2020 },
  { id: 'album3', title: 'Montero', artist: 'Lil Nas X', coverUrl: 'https://picsum.photos/seed/montero/400/400', year: 2021 },
  { id: 'album4', title: 'Sour', artist: 'Olivia Rodrigo', coverUrl: 'https://picsum.photos/seed/sour/400/400', year: 2021 },
  { id: 'album5', title: 'Planet Her', artist: 'Doja Cat', coverUrl: 'https://picsum.photos/seed/planether/400/400', year: 2021 },
  { id: 'album6', title: 'Happier Than Ever', artist: 'Billie Eilish', coverUrl: 'https://picsum.photos/seed/happier/400/400', year: 2021 },
];

const placeholderFeaturedAlbums: Album[] = [
  { id: 'feat1', title: 'Epic Soundscapes', artist: 'Cinematic Orchestra', coverUrl: 'https://picsum.photos/seed/epic/400/400', year: 2024 },
  { id: 'feat2', title: 'Lo-Fi Beats to Relax', artist: 'Chillhop Crew', coverUrl: 'https://picsum.photos/seed/lofi/400/400', year: 2023 },
  { id: 'feat3', title: 'Summer Vibes Mix', artist: 'Various Artists', coverUrl: 'https://picsum.photos/seed/summer/400/400', year: 2024 },
  { id: 'feat4', title: 'Indie Gems', artist: 'Hidden Talents', coverUrl: 'https://picsum.photos/seed/indie/400/400', year: 2023 },
];

const initialTrack: TrackInfo = {
  id: 'track1',
  title: 'Levitating',
  artist: 'Dua Lipa',
  albumTitle: 'Future Nostalgia',
  albumArtUrl: 'https://picsum.photos/seed/futurenostalgia/100/100',
  duration: 203, // seconds
  albumId: 'album1'
};

const Homepage = () => {
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  console.log('Homepage loaded');

  const handlePlayAlbum = (albumId: string) => {
    console.log('Play album:', albumId);
    // Dummy track from the album
    const album = [...placeholderAlbums, ...placeholderFeaturedAlbums].find(a => a.id === albumId);
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
      setProgress(0);
      setCurrentTime(0);
    }
  };
  
  const handleSearch = (query: string) => {
    console.log("Homepage search:", query);
    // Navigate to search results page, typically handled by router or context
    // For now, just log
  };

  const featuredAlbumSlides = placeholderFeaturedAlbums.map(album => (
    <AlbumCard key={album.id} album={album} onPlay={handlePlayAlbum} className="w-full" />
  ));

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar className="hidden md:flex h-full" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            userName="Demo User" 
            userAvatarUrl="https://picsum.photos/seed/user/40/40"
            onSearch={handleSearch}
        />
        <MainContentArea className="flex-1 overflow-y-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Featured Playlists & Albums</h2>
            <Carousel slides={featuredAlbumSlides} />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">New Releases</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {placeholderAlbums.map(album => (
                <AlbumCard key={album.id} album={album} onPlay={handlePlayAlbum} />
              ))}
            </div>
          </section>
          
          {/* Example of another section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Popular Artists</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {placeholderAlbums.slice(0,6).map(album => ( // Reusing album cards for artist representation
                <div key={`artist-${album.id}`} className="text-center">
                    <img src={`https://picsum.photos/seed/${album.artist}/200/200`} alt={album.artist} className="w-32 h-32 rounded-full mx-auto object-cover mb-2" />
                    <p className="font-semibold">{album.artist}</p>
                </div>
              ))}
            </div>
          </section>

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
          onLikeToggle={() => console.log('Like toggled')}
          onShuffleToggle={() => console.log('Shuffle toggled')}
          onRepeatToggle={() => console.log('Repeat toggled')}
        />
      </div>
    </div>
  );
};

export default Homepage;