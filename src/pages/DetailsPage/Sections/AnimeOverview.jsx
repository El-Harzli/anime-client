import Button from '@components/shared/Button';
import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaPlay } from 'react-icons/fa';
import DetailsBadges from '@components/shared/DetailsBadges';
import { Link } from 'react-router';
import { getWatchUrl } from '@utils/getWatchUrl';

import StatusDropdown from '@components/widgets/StatusDropdown';
import { toast } from 'sonner';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';

import { useAuth } from '@context/authContext';
import { useWatchList } from '../../../context/WatchListContext';

function AnimeOverview({ animeDetails }) {
  const [showDescription, setShowDescription] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const { isAuthenticated } = useAuth();
  const [isInWatchList, setIsInWatchList] = useState(false);
  const { watchList } = useWatchList();
  const [previewedAnime, setPreviewedAnime] = useState(null);

  const [animePayload, setAnimePayload] = useState({});

  const editButtonRef = useRef();

  useEffect(() => {
    if (!animeDetails) return;

    setAnimePayload({
      animeId: animeDetails.id, // or _id if your API returns _id
      poster: animeDetails.poster,
      episodes: {
        sub: animeDetails.episodes?.sub || null, // Set to null if missing
        dub: animeDetails.episodes?.dub || null, // Set to null if missing
      },
      title: animeDetails.title,
      type: animeDetails.type || 'TV',
    });
  }, [animeDetails]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const foundAnime = watchList.find((a) => a.animeId === animeDetails.id);
    setPreviewedAnime(foundAnime || null);
    setIsInWatchList(Boolean(foundAnime));
  }, [watchList, animeDetails.id, isAuthenticated]);

  const handleShowStatus = () => {
    if (isAuthenticated) {
      setShowStatus((prev) => !prev);
    } else {
      toast.info('', {
        description: 'Please Login to perform this action',
        duration: 2500,
      });
    }
  };
  return (
    <>
      <div className="relative flex flex-col w-full px-1 mb-8 xl:flex-row py-7 sm:py-10 sm:px-4 lg:px-0 lg:py-13 2xl:px-20">
        {/* Background Cover Image */}
        <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden grayscale -z-10 ">
          <img
            className="object-cover w-full h-full scale-125 bg-center opacity-35 blur-xl "
            src={animeDetails.poster}
            alt={animeDetails.title}
          />
        </div>
        {/* Main Details */}
        <div className="flex flex-col items-center justify-start w-full mb-5 sm:flex-row sm:items-start sm:gap-8 lg:gap-10 xl:gap-12 lg:px-10 xl:mb-0 ">
          {/* Poster Image */}
          <div className="w-40 md:w-45 shrink-0">
            <img className="object-contain w-full mb-6" src={animeDetails.poster} alt={animeDetails.title} />
          </div>
          {/* Anime Main Details */}
          <div className="flex flex-col items-center sm:items-start w-full">
            {/* Anime Title */}
            <div className="mb-3 text-2xl font-medium text-white lg:text-3xl xl:text-4xl text-center sm:text-start">
              {animeDetails.title}
            </div>
            {/* Badges */}
            <DetailsBadges
              rating={animeDetails.rating}
              quality={animeDetails.quality}
              sub={animeDetails.episodes?.sub}
              dub={animeDetails.episodes?.dub}
              type={animeDetails.type}
              duration={animeDetails.duration}
            />
            <div className="flex gap-2 mb-4">
              <Button
                label="Watch now"
                icon={<FaPlay />}
                iconPosition="left"
                customCss="bg-secondary text-black rounded-4xl cursor-pointer hover:bg-pink-300 transition-colors duration-300"
                to={getWatchUrl(animeDetails.id)}
              />
              <div ref={editButtonRef} className="relative">
                <Button
                  handleOnClick={(e) => {
                    e.stopPropagation(); // prevent click bubbling
                    handleShowStatus();
                  }}
                  label={`${isAuthenticated && isInWatchList ? 'Edit Watch List' : 'Add to List'}`}
                  icon={isAuthenticated && isInWatchList ? <FaEdit /> : <FaPlus />}
                  iconPosition="left"
                  customCss="bg-white text-black rounded-4xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-300"
                />
                {isAuthenticated && showStatus && (
                  <StatusDropdown
                    visible={showStatus}
                    animePayload={animePayload}
                    previewedAnime={previewedAnime}
                    isInWatchList={isInWatchList}
                    setVisible={setShowStatus}
                    editButtonRef={editButtonRef}
                    position={'bottom'}
                  />
                )}
              </div>
            </div>
            <p className="hidden text-sm text-white sm:block">
              {showDescription ? animeDetails.description : animeDetails.description?.slice(0, 250) + '...'}
              <span
                className="text-sm font-semibold text-white transition-colors duration-300 cursor-pointer ps-2 hover:text-secondary"
                onClick={() => setShowDescription((prev) => !prev)}
              >
                {showDescription ? '- Less' : '+ More'}
              </span>
            </p>
          </div>
        </div>

        {/* OverView */}
        <div className="w-full xl:w-[37.5%] lg:px-10 xl:px-3  ">
          <div className="mb-3 text-sm">
            <div className=" sm:hidden">
              <span className="text-neutral-300 pe-0.5">Overview: </span>
              <div className="px-1 py-3">
                <div className="overflow-y-auto text-white  max-h-[6.5em] leading-snug ">
                  {animeDetails.description}
                </div>
              </div>
            </div>
            <div className="mb-2.5">
              <span className="text-neutral-300 pe-0.5">Japanese: </span>
              <span className="text-white">{animeDetails.japaneseTitle}</span>
            </div>
            <div className="mb-2.5">
              <span className="text-neutral-300 pe-0.5">Aired: </span>
              <span className="text-white">{animeDetails.info?.aired}</span>
            </div>
            <div className="mb-2.5">
              <span className="text-neutral-300 pe-0.5">Premiered: </span>
              <span className="text-white">{animeDetails.info?.premiered}</span>
            </div>
            <div className="mb-2.5">
              <span className="text-neutral-300 pe-0.5">Duration: </span>
              <span className="text-white">{animeDetails.info?.duration}</span>
            </div>
            <div className="mb-2.5">
              <span className="text-neutral-300 pe-0.5">Status: </span>
              <span className="text-white">{animeDetails.info?.status}</span>
            </div>
            <div className="mb-2.5">
              <span className="text-neutral-300 pe-0.5">MAL Score: </span>
              <span className="text-white">{animeDetails.info?.mal_score}</span>
            </div>

            <div className="mb-2.5 flex flex-wrap gap-2 xl:border-y xl:py-3 xl:border-y-gray-400">
              <span className="text-neutral-300 pe-0.5">Genres: </span>
              {animeDetails.genres &&
                animeDetails.genres?.map((genre) => (
                  <Link
                    to={`/genre/${genre.toLowerCase()}`}
                    className="leading-tight px-2 py-1 text-xs text-white transition-colors duration-300 border cursor-pointer hover:text-secondary border-gray-50 rounded-xl hover:border-secondary"
                    key={genre}
                  >
                    {genre}
                  </Link>
                ))}
            </div>
            <div className="mb-2.5">
              <span className="text-neutral-300 pe-0.5">Studios: </span>
              {animeDetails?.studios &&
                animeDetails?.studios?.map((studio, index) => {
                  return (
                    <Link
                      to={`/producer/${studio
                        .replace(/\s+/g, '-') // Replace spaces with '-'
                        .replace(/[^\w-]/g, '') // Remove any characters that are not word characters or hyphens
                        .toLowerCase()}`}
                      className="text-white transition-colors duration-300 cursor-pointer hover:text-secondary"
                      key={studio}
                    >
                      {studio}
                      {index + 1 !== animeDetails.studios.length ? ',' : null}
                    </Link>
                  );
                })}
            </div>
            <div className="mb-2.5">
              <span className="text-neutral-300 pe-0.5">Producers: </span>
              {animeDetails?.producers &&
                animeDetails.producers?.map((producer, index) => (
                  <Link
                    to={`/producer/${producer
                      .replace(/\s+/g, '-') // Replace spaces with '-'
                      .replace(/[^\w-]/g, '') // Remove any characters that are not word characters or hyphens
                      .toLowerCase()}`}
                    className="text-white transition-colors duration-300 cursor-pointer me-1.5 hover:text-secondary "
                    key={producer}
                  >
                    {producer}
                    {index + 1 !== animeDetails.producers.length ? ',' : null}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimeOverview;
