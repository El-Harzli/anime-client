import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';
import SearchAnimeInputLg from './SearchAnimeInputLg';
import SocialLinks from './SocialLinks';
import NavActions from './NavActions';

import SideBar from './SideBar';  

function LeftSideNav() {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSidebarVisibility = (value) => {
    setShowSideBar(value);
  };

  return (
    <>
      <nav className="flex items-center h-full gap-5 sm:gap-7 shrink-0 ">
        <GiHamburgerMenu onClick={() => toggleSidebarVisibility(true)} className="text-2xl sm:text-3xl text-white cursor-pointer" />
        <Link to="/" className="h-full py-1 cursor-pointer">
          <img className="h-full" src={logo} alt="HiAnime Logo" />
        </Link>
        <SearchAnimeInputLg />
        <div className="hidden lg:flex gap-1.5">
          <SocialLinks />
        </div>
        <NavActions />
      </nav>

      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[9999] ${
          showSideBar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => toggleSidebarVisibility(false)} // clicking backdrop closes sidebar
      >
        <SideBar isOpen={showSideBar} toggleSidebarVisibility={toggleSidebarVisibility} />
      </div>
    </>
  );
}

export default LeftSideNav;
