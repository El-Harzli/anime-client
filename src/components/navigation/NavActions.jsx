import React from "react";
import { TbRadar2 } from "react-icons/tb";
import { FaRandom } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { FaLanguage } from "react-icons/fa";

function NavActions() {
  return (
    <ul className="hidden md:flex items-center justify-center gap-4">
      <li className="relative group flex flex-col items-center gap-0.75 text-white transition duration-300 cursor-pointer hover:text-secondary">
        <TbRadar2 className="text-xl text-secondary" />
        <p className="text-xs basis-auto">Watch2gether</p>

        {/* Tooltip */}
        <div className="absolute mt-2 transition -translate-x-1/2 opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100 z-10">
          <div className="relative bg-white text-black  py-1.5 px-2 rounded shadow-lg whitespace-nowrap text-xs text-center">
            Watch with friends
            {/* Arrow */}
            <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-white -top-1 left-1/2"></div>
          </div>
        </div>
      </li>
      <li className="relative group flex flex-col items-center gap-0.75 text-white transition duration-300 cursor-pointer hover:text-secondary">
        <FaRandom className="text-xl text-secondary" />
        <p className="text-xs basis-auto">Random</p>

        {/* Tooltip */}
        <div className="absolute mt-2 transition -translate-x-1/2 opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100 z-10">
          <div className="relative bg-white text-black  py-1.5 px-2 rounded shadow-lg whitespace-nowrap text-xs text-center">
            Watch random anime
            {/* Arrow */}
            <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-white -top-1 left-1/2"></div>
          </div>
        </div>
      </li>
      <li className="relative group flex flex-col items-center gap-0.75 text-white transition duration-300 cursor-pointer hover:text-secondary">
        <FaLanguage className="text-xl text-secondary" />
        <p className="text-xs basis-auto">Anime Name</p>

        {/* Tooltip */}
        <div className="absolute mt-2 transition -translate-x-1/2 opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100 z-10">
          <div className="relative bg-white text-black  py-1.5 px-2 rounded shadow-lg  text-xs min-w-40 text-center ">
            Select language of anime name to display
            {/* Arrow */}
            <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-white -top-1 left-1/2"></div>
          </div>
        </div>
      </li>
      <li className="relative group flex flex-col items-center gap-0.75 text-white transition duration-300 cursor-pointer hover:text-secondary">
        <FaWifi className="text-xl text-secondary" />
        <p className="text-xs basis-auto">News</p>

        {/* Tooltip */}
        <div className="absolute mt-2 transition -translate-x-1/2 opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100 z-10">
          <div className="relative bg-white text-black  py-1.5 px-2 rounded shadow-lg whitespace-nowrap text-xs text-center">
            News
            {/* Arrow */}
            <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-white -top-1 left-1/2"></div>
          </div>
        </div>
      </li>
      <li className="relative group flex flex-col items-center gap-0.75 text-white transition duration-300 cursor-pointer hover:text-secondary">
        <IoMdChatbubbles className="text-xl text-secondary" />
        <p className="text-xs basis-auto">Community</p>

        {/* Tooltip */}
        <div className="absolute mt-2 transition -translate-x-1/2 opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100 z-10">
          <div className="relative bg-white text-black  py-1.5 px-2 rounded shadow-lg whitespace-nowrap text-xs text-center">
            HiAnime Connect
            {/* Arrow */}
            <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-white -top-1 left-1/2"></div>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default NavActions;
