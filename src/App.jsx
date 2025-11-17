import Header from '@components/widgets/Header';
import Footer from '@components/widgets/Footer';

import StreamingPage from './pages/StreamingPage/StreamingPage';
import { Routes, Route } from 'react-router';

import MainPage from './pages/MainPage/MainPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';

import FilterPageV1 from './pages/FilterPage/FilterPageV1';
import FilterPageV2 from './pages/FilterPage/FilterPageV2';
import GenrePage from './pages/GenrePage/GenrePage';
import AnimeListPage from '@components/layouts/AnimeListPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';

import ProtectedRoute from '@components/auth/ProtectedRoute';
import Index from './pages/UserDashboard/Index';
import { Toaster } from 'sonner';
import { useResponsiveToastPosition } from './hooks/useResponsiveToastPosition';
import { StreamingProviders } from './providers/StreamingProviders';

import NotFoundPage from './pages/NotFoundPage';

const animeListRoutes = [
  {
    path: '/recently-updated',
    title: 'Recently Updated',
    endpoint: 'recently-updated',
    dataKey: 'recentlyUpdatedAnime',
  },
  { path: '/recently-added', title: 'Recently Added', endpoint: 'recently-added', dataKey: 'recentlyAddedAnime' },
  { path: '/top-upcoming', title: 'Top Upcoming', endpoint: 'top-upcoming', dataKey: 'topUpcomingAnime' },
  { path: '/completed', title: 'Completed', endpoint: 'completed', dataKey: 'completedAnime' },
  { path: '/most-favorite', title: 'Most Favorite', endpoint: 'most-favorite', dataKey: 'mostFavoriteAnime' },
  { path: '/most-popular', title: 'Most Popular', endpoint: 'most-popular', dataKey: 'mostPopularAnime' },
  { path: '/top-airing', title: 'Top Airing', endpoint: 'top-airing', dataKey: 'topAiringAnime' },
  { path: '/dubbed-anime', title: 'Dubbed Anime', endpoint: 'dubbed-anime', dataKey: 'dubbedAnime' },
  { path: '/subbed-anime', title: 'Subbed Anime', endpoint: 'subbed-anime', dataKey: 'subbedAnime' },
  { path: '/movies', title: 'Movie Anime', endpoint: 'movie', dataKey: 'movies' },
  { path: '/tv', title: 'Tv Anime', endpoint: 'tv', dataKey: 'tv' },
  { path: '/ova', title: 'OVA Anime', endpoint: 'ova', dataKey: 'ova' },
  { path: '/ona', title: 'ONA Anime', endpoint: 'ona', dataKey: 'ona' },
  { path: '/special', title: 'Special Anime', endpoint: 'special', dataKey: 'special' },
  { path: '/producer/:id', title: '', endpoint: 'producer', dataKey: 'producer' },
];

function App() {
  const { toastPosition } = useResponsiveToastPosition();
  return (
    <>
      <Toaster position={toastPosition} richColors />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/filter" element={<FilterPageV1 />} />
        {/* <Route path="/filter" element={<FilterPageV2 />} /> */}
        <Route path="/genre/:genre" element={<GenrePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        {/* 🛡️ Protected route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Index />} />
        </Route>

        {animeListRoutes.map(({ path, title, endpoint, dataKey }) => (
          <Route
            key={path}
            path={path}
            element={<AnimeListPage title={title} endpoint={endpoint} dataKey={dataKey} />}
          />
        ))}

        <Route
          path="/watch/:id"
          element={
            <StreamingProviders>
              <StreamingPage />
            </StreamingProviders>
          }
        />

        {/* This always needs to be on the bottom level  */}
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
