import { useState, useEffect, useRef } from 'react';
import Button from '@components/shared/Button';
import { FaPlus, FaPlay, FaCheck } from 'react-icons/fa';
import { MdOutlineStar } from 'react-icons/md';
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router';
import Badges from '../shared/Badges';
import { useWatchList } from '@context/WatchListContext';
import StatusDropdown from '@components/widgets/StatusDropdown';

import { toast } from 'sonner';
import { useAuth } from '@context/authContext';

import { getWatchUrl } from '@utils/getWatchUrl'; // adjust path if needed

function PreviewCard({ anime }) {
  const id = anime.animeId || anime.id;

  const ENDPOINT = import.meta.env.VITE_API_URL + '/qtip/' + id;

  const { watchList } = useWatchList(); // ✅ Only need watchList from context here
  const [animeDetails, setAnimeDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [previewedAnime, setPreviewedAnime] = useState(null);
  const [animePayload, setAnimePayload] = useState({});

  const { isAuthenticated } = useAuth();

  const editBtnRef = useRef();

  // ✅ Detect if the anime is already in the user's watchlist
  useEffect(() => {
    if (!isAuthenticated) return;
    const foundAnime = watchList.find((a) => a.animeId === id);
    setPreviewedAnime(foundAnime || null);
    setIsInWatchList(Boolean(foundAnime));
  }, [watchList, id, isAuthenticated]);

  useEffect(() => {
    if (!anime || !animeDetails) return;
    setAnimePayload({
      animeId: anime.id, // or _id if your API returns _id
      poster: anime.poster,
      episodes: {
        sub: anime.episodes?.sub || animeDetails.episodes?.sub || null, // Set to null if missing
        dub: anime.episodes?.dub || animeDetails.episodes?.dub || null, // Set to null if missing
      },
      title: anime.title,
      type: anime.type || 'TV',
    });
    return () => {};
  }, [anime, animeDetails]);

  // ✅ Fetch anime details by ID
  useEffect(() => {
    const controller = new AbortController();

    const fetchAnimeById = async () => {
      try {
        const res = await fetch(ENDPOINT, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch anime data by id');
        const { data } = await res.json();
        setAnimeDetails(data.details);
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchAnimeById();

    return () => controller.abort();
  }, [id]);

  const handleShowStatus = () => {
    if (isAuthenticated) {
      setShowStatus((prev) => !prev);
    } else {
      toast.info('', {
        // className: '!bg-secondary !text-black !border-0',
        description: 'Please Login to perform this action',
        duration: 2500,
      });
    }
  };

  return (
    <div className="hidden md:block rounded-md py-3 px-4 bg-accent/75 backdrop-blur-md w-80">
      {loading ? (
        <div className="w-full flex justify-center">
          <BeatLoader color="white" />
        </div>
      ) : error ? (
        <div className="text-red-400 text-sm text-center py-4">{error}</div>
      ) : (
        <>
          {/* Title */}
          <h2 className="text-white font-medium mb-3">{animeDetails.title}</h2>

          {/* Info row */}
          <div className="flex justify-between items-center w-full mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MdOutlineStar className="text-yellow-300" />
                <span className="text-xs text-gray-200">{animeDetails.rating || 'N/A'}</span>
              </div>
              <Badges sub={animeDetails.episodes?.sub} dub={animeDetails.episodes?.dub} />
            </div>
            <div className="bg-secondary text-xs px-1.5 py-0.5 rounded-md font-semibold leading-snug">
              {animeDetails.type}
            </div>
          </div>

          {/* Description */}
          <p className="text-neutral-300 line-clamp-3 text-xs mb-3">{animeDetails.description}</p>

          {/* Details */}
          <div className="mb-3 text-xs">
            <div>
              <span className="text-neutral-300 pe-0.5">Japanese: </span>
              <span className="text-white">{animeDetails.japaneseTitle}</span>
            </div>
            <div>
              <span className="text-neutral-300 pe-0.5">Aired: </span>
              <span className="text-white">{animeDetails.info?.aired}</span>
            </div>
            <div>
              <span className="text-neutral-300 pe-0.5">Status: </span>
              <span className="text-white">{animeDetails.info?.status}</span>
            </div>
            <div className="inline-flex justify-start items-start gap-x-1 flex-wrap">
              <span className="text-neutral-300 pe-0.5">Genres: </span>
              {animeDetails.genres?.map((genre) => (
                <Link
                  key={genre}
                  to={`/genre/${genre.toLowerCase()}`}
                  className="text-white text-xs cursor-pointer hover:text-secondary"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-start items-center gap-1">
            <Button
              label="Watch now"
              customCss="text-sm bg-secondary text-black w-full gap-1 rounded-3xl cursor-pointer hover:bg-pink-300 transition-colors duration-300"
              icon={<FaPlay />}
              iconPosition="left"
              to={getWatchUrl(id)}
            />

            {/* Watchlist Button */}
            <div className="relative">
              <Button
                ref={editBtnRef}
                label=""
                customCss="text-xs bg-white text-black h-full aspect-square text-center rounded-full cursor-pointer hover:bg-black hover:text-white transition-colors duration-300"
                icon={isInWatchList ? <FaCheck /> : <FaPlus />}
                iconPosition="left"
                handleOnClick={() => handleShowStatus()}
              />

              {/* Dropdown */}
              {isAuthenticated && animePayload  && (
                <StatusDropdown
                  visible={showStatus}
                  animePayload={animePayload}
                  previewedAnime={previewedAnime}
                  isInWatchList={isInWatchList}
                  setVisible={setShowStatus}
                  position={'top'}
                  editButtonRef={editBtnRef}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PreviewCard;
