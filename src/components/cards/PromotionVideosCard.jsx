import { FaCirclePlay } from 'react-icons/fa6';

function PromotionVideosCard({ data }) {
  return (
    <article className="flex flex-col rounded-md overflow-hidden ">
      <div className="w-full h-30 relative">
        {/* <FaPlay className="absolute" /> */}
        <FaCirclePlay className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-white rounded-full size-12 p-[2px] text-neutral-700" />
        <img className="w-full h-full object-cover" src={data.thumbnail} alt={data.title} />
      </div>
      <p className="text-white text-center bg-neutral-700 px-2 py-3 text-sm font-medium">{data.title}</p>
    </article>
  );
}

export default PromotionVideosCard;
