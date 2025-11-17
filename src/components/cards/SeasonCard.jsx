import { Link } from 'react-router';

function SeasonCard({ season, id }) {
  return (
    <Link
      key={season.id}
      to={`/${season.id}`}
      style={{
        backgroundImage: `url(${season.imageUrl})`,
      }}
      className={`relative  h-17 lg:h-15 px-3 py-2 text-center transition-colors duration-300  rounded-md flex justify-center items-center bg-center bg-no-repeat bg-cover hover:text-secondary ${
        id === season.id ? 'border border-secondary text-secondary' : ' text-white'
      }`}
    >
      {/* Overlay for blur effect */}
      <div className="absolute inset-0 rounded-md backdrop-blur-xs bg-black/60" />

      {/* Text always stays above blur */}
      <span className="relative z-10 text-sm font-medium line-clamp-2 overflow-hidden text-ellipsis break-words leading-tight">
        {season.label}
      </span>
    </Link>
  );
}

export default SeasonCard;
