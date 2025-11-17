import { createContext, useContext, useEffect, useState } from 'react';
import { useEpisodeListContext } from './episodeListContext';

const AnimeServersContext = createContext();

const defaultServer = {
  label: 'HD-1',
  type: 'sub',
};

export const AnimeServersProvider = ({ children }) => {
  const { currentEpisode } = useEpisodeListContext();
  const [animeServers, setAnimeServers] = useState({});
  const [currentServer, setCurrentServer] = useState(null);
  const [isServersLoading, setIsServersLoading] = useState(false);
  const [serversError, setServersError] = useState(null);

  // ✅ load preferred server from localStorage
  useEffect(() => {
    if (!currentServer) return;
    localStorage.setItem(
      'preferredServer',
      JSON.stringify({
        label: currentServer.label,
        type: currentServer.type,
      })
    );
  }, [currentServer]);

  useEffect(() => {
    if (!currentEpisode) return;
    const controller = new AbortController();
    const fetchServers = async () => {
      setIsServersLoading(true);
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/servers/${currentEpisode?.episodeId}`;
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch servers');
        const { data } = await res.json();
        setAnimeServers(data);
        // ✅ get preferred server from localStorage
        const stored = JSON.parse(localStorage.getItem('preferredServer') || 'null');

        let initialServer = null;

        if (stored) {
          // Try to find the same server inside fetched data
          if (stored.type === 'sub' && data?.sub?.length > 0) {
            const match = data.sub.find((s) => s.label === stored.label);
            if (match) {
              initialServer = { ...match, type: 'sub' };
            }
          }
          if (!initialServer && stored.type === 'dub' && data?.dub?.length > 0) {
            const match = data.dub.find((s) => s.label === stored.label);
            if (match) {
              initialServer = { ...match, type: 'dub' };
            }
          }
        }

        // ✅ fallback: pick first available or defaultServer
        if (!initialServer) {
          if (data?.sub?.length > 0) {
            initialServer = { ...data.sub[0], type: 'sub' };
          } else if (data?.dub?.length > 0) {
            initialServer = { ...data.dub[0], type: 'dub' };
          } else {
            initialServer = defaultServer;
          }
        }

        setCurrentServer(initialServer);
      } catch (err) {
        if (err.name !== 'AbortError') setServersError(err.message);
      } finally {
        setIsServersLoading(false);
      }
    };
    fetchServers();
    return () => controller.abort();
  }, [currentEpisode]);

  return (
    <AnimeServersContext.Provider
      value={{ animeServers, currentServer, setCurrentServer, isServersLoading, serversError, currentEpisode }}
    >
      {children}
    </AnimeServersContext.Provider>
  );
};

export const useAnimeServers = () => {
  return useContext(AnimeServersContext);
};
