import { IoLogoDiscord } from 'react-icons/io5';
import { FaTelegramPlane } from 'react-icons/fa';
import { FcReddit } from 'react-icons/fc';
import { FaTwitter } from 'react-icons/fa6';

function SocialLinks() {
  return (
    <>
      <li className="hidden  text-sm text-gray-400 w-min leading-3.5 2xl:flex justify-center items-center mx-1">
        <span>Join now</span>
      </li>
      <li className="rounded-full h-8.5 w-8.5 text-lg text-white flex justify-center items-center bg-discord cursor-pointer ">
        <span>
          <IoLogoDiscord />
        </span>
      </li>
      <li className="rounded-full h-8.5 w-8.5 text-lg text-white flex justify-center items-center bg-telegram cursor-pointer  ">
        <span>
          <FaTelegramPlane />
        </span>
      </li>
      <li className="rounded-full h-8.5 w-8.5 text-lg text-white flex justify-center items-center bg-reddit cursor-pointer  ">
        <span>
          <FcReddit />
        </span>
      </li>
      <li className="rounded-full h-8.5 w-8.5 text-lg text-white flex justify-center items-center bg-twitter cursor-pointer ">
        <span>
          <FaTwitter />
        </span>
      </li>
    </>
  );
}

export default SocialLinks;
