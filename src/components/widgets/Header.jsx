import { useState } from 'react';
import LeftSideNav from '../navigation/LeftSideNav';
import RightSideNav from '../navigation/RightSideNav';
import { Link } from 'react-router';
import { FaFilter } from 'react-icons/fa';
import SearchAnimeInputSm from '../navigation/SearchAnimeInputSm';

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  const handleShowSearch = () => {
    setShowSearch((prev) => !prev);
  };

  

  return (
    <header className=" h-fit my-container">
      {/* <header className=" h-fit py-2 mx-auto max-w-8xl px-4"> */}
      <div className="flex  w-full  items-center justify-between py-2 h-13  sm:h-15">
        <LeftSideNav />
        <RightSideNav handleShowSearch={handleShowSearch} />
      </div>

      {showSearch && (
        <div className="w-full flex items-center py-2 h-15 gap-4 relative">
          <Link
            to="/filter"
            className="backdrop-blur-md bg-white/10 p-3 min-w-fit inline-block rounded-sm cursor-pointer hover:bg-secondary hover:text-white transition-colors duration-300"
          >
            <FaFilter className="text-white text-xl font-bold " />
          </Link>
          <SearchAnimeInputSm />
        </div>
      )}
    </header>
  );
}

export default Header;
