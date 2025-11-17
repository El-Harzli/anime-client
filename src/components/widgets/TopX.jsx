import SideBarCard from '@components/cards/SideBarCard';
import SideBarCardSkeleton from '@components/cardsSkeleton/SideBarCardSkeleton';

function TopX({ title, data, loading }) {
  return (
    <section className="mb-7">
      <h2 className="mb-1 sm:mb-6 text-lg sm:text-xl font-bold text-secondary">{title}</h2>
      <div className="rounded-md bg-white/10 px-5 py-2 divide-y divide-white/10 divide-solid">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SideBarCardSkeleton key={i} />)
          : data.map((anime) => {
              return <SideBarCard key={anime.id} data={anime} />;
            })}
      </div>
    </section>
  );
}

export default TopX;
