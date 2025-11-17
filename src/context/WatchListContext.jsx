import { createContext, useState, useContext, useEffect } from 'react';
import { axiosPrivate } from '@src/api/axiosInstance';
import { useAuth } from './authContext'; // 🔑 import your AuthContext
import { toast } from 'sonner';
import { IoMdCheckmarkCircle } from 'react-icons/io';

const WatchListContext = createContext({
  watchList: [],
});

export const WatchListProvider = ({ children }) => {
  const { isAuthenticated } = useAuth(); // ✅ check auth state
  const [watchList, setWatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 🧩 Fetch user watchlist
  const fetchWatchList = async () => {
    if (!isAuthenticated) return; // 🔒 Only fetch if logged in

    try {
      setIsLoading(true);
      const response = await axiosPrivate.get('/watchlist');
      setWatchList(response?.data || []);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load watchlist';
      console.error(message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // ➕ Add anime to watchlist
  const addToWatchList = async (animePayload, status) => {
    if (!isAuthenticated) return; // 🔒 block if not logged in
    try {
      setError('');
      const alreadyExists = watchList.some((item) => item.animeId === animePayload.animeId);
      if (alreadyExists) {
        setError('Anime already in watchlist');
        toast.info('Anime already in watchlist');

        return;
      }

      const payload = { ...animePayload, status };

      const response = await axiosPrivate.post('/watchlist', { payload });
      setWatchList((prev) => [...prev, response.data.data]);
      toast.success('', {
        className: '!bg-secondary !text-black !border-0',
        description: 'Anime added successfully',
        duration: 2500,
        icon: <IoMdCheckmarkCircle />,
      });
    } catch (err) {
      const message = err?.response?.data?.message || 'Error adding to watchlist';
      console.error(message);
      setError(message);
      toast.error('Error adding to watchlist');
    }
  };

  // 📝 Update anime status in watchlist
  const UpdateWatchList = async (animeId, status) => {
    if (!isAuthenticated) return; // 🔒 block if not logged in

    try {
      setError('');
      // Send a request to update the status
      const response = await axiosPrivate.put(`/watchlist/${animeId}`, { status });

      // Update the watchlist state with the updated anime entry
      setWatchList((prev) =>
        prev.map((anime) => (anime.animeId === animeId ? { ...anime, status: response.data.data.status } : anime))
      );

      toast.success('', {
        className: '!bg-secondary !text-black !border-0',
        description: 'Updated anime status successfully',
        duration: 2500,
        icon: <IoMdCheckmarkCircle />,
      });
    } catch (err) {
      const message = err?.response?.data?.message || 'Error updating status';
      console.error(message);
      setError(message);
      toast.error('Error updating watchlist');
    }
  };

  // ❌ Remove anime from watchlist
  const removeFromWatchList = async (animeId) => {
    if (!isAuthenticated) return; // 🔒 block if not logged in

    try {
      setError('');
      await axiosPrivate.delete(`/watchlist/${animeId}`);
      setWatchList((prev) => prev.filter((anime) => anime.animeId !== animeId));
      toast.success('', {
        className: '!bg-secondary !text-black !border-0',
        description: 'Anime removed successfully',
        duration: 2500,
        icon: <IoMdCheckmarkCircle />,
      });
    } catch (err) {
      const message = err?.response?.data?.message || 'Error removing from watchlist';
      console.error(message);
      setError(message);
      toast.error('Error removing from watchlist');
    }
  };

  // 🔁 Load watchlist when auth state changes
  useEffect(() => {
    if (isAuthenticated) fetchWatchList();
    else setWatchList([]); // clear on logout
  }, [isAuthenticated]); // 🔑 refetch whenever login/logout happens

  return (
    <WatchListContext.Provider
      value={{
        fetchWatchList,
        addToWatchList,
        UpdateWatchList,
        removeFromWatchList,
        watchList,
        setWatchList,
        isLoading,
        error,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => useContext(WatchListContext);
