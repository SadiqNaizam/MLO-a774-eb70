import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import SearchResultsPage from "./pages/SearchResultsPage";
import PlaylistAlbumDetailPage from "./pages/PlaylistAlbumDetailPage";
import YourLibraryPage from "./pages/YourLibraryPage";
import UserProfileSettingsPage from "./pages/UserProfileSettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          {/* For album detail page, using a dynamic segment for albumId */}
          <Route path="/album/:albumId" element={<PlaylistAlbumDetailPage />} />
          <Route path="/library" element={<Navigate to="/library/playlists" replace />} /> {/* Redirect base /library to a default tab */}
          <Route path="/library/:tab" element={<YourLibraryPage />} /> {/* Using :tab for dynamic content in library */}
          <Route path="/settings/profile" element={<UserProfileSettingsPage />} />
          
          {/* Keeping the example route structure similar for library for simplicity, could be refined */}
          <Route path="/library/playlists" element={<YourLibraryPage />} />
          <Route path="/library/albums" element={<YourLibraryPage />} />
          <Route path="/library/liked" element={<YourLibraryPage />} />
          <Route path="/library/artists" element={<YourLibraryPage />} />

          {/* You can add more specific routes for other sidebar items if they lead to distinct pages */}
          <Route path="/browse" element={<Homepage />} /> {/* Placeholder: browse could be its own page */}
          <Route path="/radio" element={<Homepage />} /> {/* Placeholder: radio could be its own page */}


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;