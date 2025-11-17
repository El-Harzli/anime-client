/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import TrendingCard from '@components/cards/TrendingCard';
import { useAnime } from '@context/animeContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import TrendingCardSkeleton from '@components/cardsSkeleton/TrendingCardSkeleton';

function TrendSection() {
  const { animeData, loading, error } = useAnime();
  const [trendings, setTrendings] = useState();

  const [swiper, setSwiper] = useState();

  useEffect(() => {
    if (animeData?.trendings) {
      setTrendings(animeData.trendings);
    }
  }, [animeData]);

  return (
    <section className="mb-10 sm:my-container">
      <h2 className="mb-1 sm:mb-6 text-lg sm:text-xl font-bold text-secondary   ">Trending</h2>

      <div className="relative sm:pe-20">
        <Swiper
          className="mb-5"
          spaceBetween={10}
          slidesPerView={3}
          // scrollbar={{ draggable: true }}
          onSwiper={(Swiper) => setSwiper(Swiper)}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            540: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1700: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
        >
          {loading
            ? Array.from({ length: 10 }).map((_, i) => {
                return (
                  <SwiperSlide>
                    <TrendingCardSkeleton index={i + 1} />
                  </SwiperSlide>
                );
              })
            : trendings &&
              trendings.map((anime, index) => {
                return (
                  <SwiperSlide key={anime.id}>
                    <TrendingCard key={anime.id} anime={anime} index={index + 1} />
                  </SwiperSlide>
                );
              })}
        </Swiper>

        <div className="absolute top-0 right-0 flex-col items-center hidden h-full gap-5 sm:flex w-14">
          <FaChevronRight
            className="w-full p-5 text-lg text-white transition-colors duration-300 rounded-lg cursor-pointer flex-1/2 bg-white/10 backdrop-blur-3xl hover:bg-secondary hover:text-black"
            onClick={() => swiper.slideNext()}
          />
          <FaChevronLeft
            className="w-full p-5 text-lg text-white transition-colors duration-300 rounded-lg cursor-pointer flex-1/2 bg-white/10 backdrop-blur-3xl hover:bg-secondary hover:text-black"
            onClick={() => swiper.slidePrev()}
          />
        </div>
      </div>
    </section>
  );
}

export default TrendSection;
