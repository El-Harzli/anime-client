import { FaClosedCaptioning } from 'react-icons/fa';
import { FaMicrophone } from 'react-icons/fa';

function DetailsBadges({ rating, quality, sub, dub, totalEpisodes, type, duration  }) {
  return (
    <div className="flex flex-wrap items-center justify-start gap-x-0.5 gap-y-2.5  mb-5">
      {rating && (
        <div
          className={`min-w-fit leading-snug flex justify-start items-center text-xs gap-1 bg-white px-1.5 font-semibold py-0.5 rounded-tl-md rounded-bl-md
            ${quality ? 'rounded-tr-none rounded-br-none' : 'rounded-tr-md rounded-br-md'}
            `}
        >
          {rating}
        </div>
      )}
      {quality && (
        <div
          className={` leading-snug flex justify-start items-center text-xs gap-1 bg-secondary px-1.5 font-semibold py-0.5 
            ${rating ? 'rounded-tl-none rounded-bl-none' : 'rounded-tl-md rounded-bl-md'}
            ${sub ? 'rounded-tr-none rounded-br-none' : 'rounded-tr-md rounded-br-md'}
            `}
        >
          {quality}
        </div>
      )}
      {sub > 0 && (
        <div
          className={` leading-snug flex justify-start items-center text-xs gap-1 bg-green-300 px-1.5 font-semibold py-0.5
            ${quality ? 'rounded-tl-none rounded-bl-none' : 'rounded-tl-md rounded-bl-md'}
            ${dub ? 'rounded-tr-none rounded-br-none' : 'rounded-tr-md rounded-br-md'}
            `}
        >
          <FaClosedCaptioning className="text-sm leading-snug" /> {sub}
        </div>
      )}
      {dub > 0 && (
        <div
          className={`leading-snug flex justify-start items-center text-xs gap-1 bg-blue-300 px-1.5 font-semibold  py-0.5
            ${sub ? 'rounded-tl-none rounded-bl-none' : 'rounded-tl-md rounded-bl-md'}
            ${totalEpisodes ? 'rounded-tr-none rounded-br-none' : 'rounded-tr-md rounded-br-md'}
        `}
        >
          <FaMicrophone className="text-sm leading-snug" /> {dub}
        </div>
      )}

      {/* I am too lazy to add this one, I'll leave the code but I won't extract the totalEpisodes from the backend */}
      {totalEpisodes > 0 && (
        <div
          className={`leading-snug flex justify-start items-center text-xs gap-1 bg-blue-300 px-1.5 font-semibold  py-0.5 rounded-tr-md rounded-br-md
            ${dub ? 'rounded-tl-none rounded-bl-none' : 'rounded-tl-md rounded-bl-md'}
        `}
        >
          <FaMicrophone className="text-sm leading-snug" /> {dub}
        </div>
      )}
      <div className="size-1.5 bg-white/30 backdrop-blur-md rounded-full mx-2"></div>

      <div className='text-sm text-gray-50'>{type}</div>
      <div className="size-1.5 bg-white/30 backdrop-blur-md rounded-full mx-2"></div>
      <div className='text-sm text-gray-50'>{duration}</div>
    </div>
  );
}

export default DetailsBadges;
