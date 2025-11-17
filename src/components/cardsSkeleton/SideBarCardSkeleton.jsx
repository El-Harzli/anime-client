import RankCardSkeleton from '@components/cardsSkeleton/RankCardSkeleton';
import { FaPlus } from 'react-icons/fa6';

function SideBarCardSkeleton() {
  return (
    <div className=" flex items-center justify-between gap-x-3">
      <RankCardSkeleton />
      <FaPlus className="text-white/25" />
    </div>
  );
}

export default SideBarCardSkeleton;
