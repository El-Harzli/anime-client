import { IoPersonSharp, IoSettings } from 'react-icons/io5';
import { GiBackwardTime } from 'react-icons/gi';
import { RiHeart3Fill } from 'react-icons/ri';
import { BsFillBellFill } from 'react-icons/bs';
import { useAuth } from '../../context/authContext';
import profile_pic from '@assets/profile_pic.jpg';

function DashboardHeader({ activeSetting, setActiveSetting }) {
  const { user } = useAuth();

  const links = [
    {
      icon: <IoPersonSharp className="text-xl sm:text-lg group-hover:text-secondary duration-300" />,
      label: 'Profile',
      stateName: 'profile',
    },
    {
      icon: <GiBackwardTime className="text-xl sm:text-lg group-hover:text-secondary duration-300" />,
      label: 'Continue Watching',
      stateName: 'continue-watching',
    },
    {
      icon: <RiHeart3Fill className="text-xl sm:text-lg group-hover:text-secondary duration-300" />,
      label: 'Watch List',
      stateName: 'watch-list',
    },
    {
      icon: <BsFillBellFill className="text-xl sm:text-lg group-hover:text-secondary duration-300" />,
      label: 'Notification',
      stateName: 'notification',
    },
    {
      icon: <IoSettings className="text-xl sm:text-lg group-hover:text-secondary duration-300" />,
      label: 'Settings',
      stateName: 'settings',
    },

  ];

  return (
    <header
      className="w-full flex flex-col items-center relative bg-cover bg-center pt-10"
      style={{ backgroundImage: `url(${profile_pic})`, width: '100%' }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-[50px]"></div>

      <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold text-center py-2 z-10 mb-5">Hi, {user.username}</h3>
      <ul className="flex items-center justify-center text-center p-1 flex-wrap z-10">
        {links.map(({ icon, label, stateName }) => (
          <li
            key={label}
            className={` flex items-center justify-start gap-x-2 cursor-pointer px-3 py-2 mx-2 group ${
              activeSetting === stateName ? 'text-secondary' : 'text-white'
            }`}
            onClick={() => setActiveSetting(stateName)}
          >
            {icon}
            <span className="hidden md:block font-medium group-hover:text-secondary transition-colors duration-300">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default DashboardHeader;
