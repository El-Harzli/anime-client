// SideBar.jsx
import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router";

const links = [
  { name: "Home", path: "/" },
  { name: "Subbed Anime", path: "/subbed-anime" },
  { name: "Dubbed Anime", path: "/dubbed-anime" },
  { name: "Most Popular", path: "/most-popular" },
  { name: "Movies", path: "/movies" },
  { name: "Tv Series", path: "/tv" },
  { name: "OVAs", path: "/ova" },
  { name: "ONAs", path: "/ona" },
  { name: "Special", path: "/special" },
];

function SideBar({ isOpen, toggleSidebarVisibility }) {
  return (
    <nav
      onClick={(e) => e.stopPropagation()}
      className={`text-white h-screen bg-white/10 backdrop-blur-sm py-4 absolute top-0 left-0 flex flex-col w-full max-w-75 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="flex items-center justify-start gap-0.75 px-5 py-3 rounded-lg cursor-pointer"
        onClick={() => toggleSidebarVisibility(false)}
      >
        <MdArrowBackIos className="font-bold" /> <p>Close menu</p>
      </div>
      <ul className="divide-y divide-white/10 divide-solid">
        {links.map((link) => (
          <li
            key={link.name}
            className=" text-white cursor-pointer hover:text-secondary "
          >
            <Link to={link.path} className="block w-full h-full px-5 py-3" >
            {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideBar;
