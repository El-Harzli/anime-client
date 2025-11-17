import Button from '../shared/Button';
import { FaCirclePlay } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa';
import { IoMdPlayCircle } from 'react-icons/io';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { MdDateRange } from 'react-icons/md';

import Badges from '../shared/Badges';
import { getWatchUrl } from '@utils/getWatchUrl';


function HeroCard({ anime, index }) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 right-0 w-full h-full lg:w-9/10 xl:w-8/10 2xl:w-7/10">
        <div className=" overflow-hidden relative w-full h-full after:content-[''] after:absolute after:inset-[0] after:z-1 after:pointer-events-none after:[background:radial-gradient(transparent,rgb(32,31,49)_80%,rgb(32,31,49)_85%,rgb(32,31,49)_100%)]">
          <img src={anime.poster} alt="Hero" className="relative object-cover w-full h-full " />
        </div>
      </div>

      <div className="absolute bottom-3 left-0 w-full z-1 ps-4 pe-20 md:ps-10 md:w-1/2 md:pe-0">
        <p className="text-xs text-secondary sm:text-sm lg:text-lg mb-2.5 md:mb-5 ">#{index} spotlight</p>

        <h2 className="text-white font-medium xl:font-semibold text-[18px] sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 line-clamp-2 text-ellipsis">
          {anime.title}
        </h2>

        <div className="hidden md:flex mb-4 justify-start items-center gap-4 ">
          <div className="flex items-center justify-start text-white gap-0.5">
            <IoMdPlayCircle />
            {anime.type}
          </div>
          <div className="flex items-center justify-start text-white gap-0.5">
            <MdOutlineAccessTimeFilled />
            {anime.duration}
          </div>
          <div className="flex items-center justify-start text-white gap-0.5">
            <MdDateRange />
            {anime.releaseDate}
          </div>
          <div className="bg-secondary rounded-md text-sm px-1.5 font-semibold py-0.5">{anime.quality}</div>
          <Badges sub={anime.episodes.sub} dub={anime.episodes.dub} />
        </div>

        <div className="hidden md:block">
          <p className=" text-white  line-clamp-2 xl:line-clamp-3 mb-8">{anime.description}</p>
        </div>
        <div className="flex items-center justify-start">
          <Button
            label="Watch Now"
            customCss="bg-secondary rounded-3xl me-3 hover:bg-pink-300 transition-colors duration:300 text-sm md:text-[16px]"
            icon={<FaCirclePlay />}
            iconPosition="left"
            to={getWatchUrl(anime.id)}
          />
          <Button
            label="Details"
            customCss="bg-accent rounded-3xl text-white hover:bg-indigo-400/20 transition-colors duration:300 text-sm md:text-[16px] "
            icon={<FaChevronRight />}
            iconPosition="right"
            to={`/details/${anime.id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
