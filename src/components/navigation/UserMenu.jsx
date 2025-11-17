import React, { useState, useRef } from 'react';
import profile_pic from '@assets/profile_pic.jpg';
import { useAuth } from '../../context/authContext';

import { IoPersonSharp } from 'react-icons/io5';
import { GiBackwardTime } from 'react-icons/gi';
import { RiHeart3Fill } from 'react-icons/ri';
import { BsFillBellFill } from 'react-icons/bs';
import { IoSettings } from 'react-icons/io5';

import UserMenuItems from '../widgets/UserMenuItems';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';

const userSettings = [
  { icon: <IoPersonSharp />, label: 'Profile', stateName: 'profile' },
  { icon: <GiBackwardTime />, label: 'Continue Watching', stateName: 'continue-watching' },
  { icon: <RiHeart3Fill />, label: 'Watch List', stateName: 'watch-list' },
  { icon: <BsFillBellFill />, label: 'Notification', stateName: 'notification' },
  { icon: <IoSettings />, label: 'Settings', stateName: 'settings' },
];

function UserMenu() {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const handleMenuClick = (setting) => {
    setShowUserDropdown(false);

    // If already on /dashboard, emit an event instead of navigating
    if (location.pathname === '/dashboard') {
      window.dispatchEvent(
        new CustomEvent('dashboardSettingChange', { detail: setting.stateName })
      );
    } else {
      navigate('/dashboard', { state: { setting: setting.stateName } });
    }
  };

  return (
    <div className="relative">
      <img
        className="h-10 w-10 rounded-full border-2 border-white/70 cursor-pointer"
        src={profile_pic}
        alt="Profile Pic"
        onClick={() => setShowUserDropdown((prev) => !prev)}
      />
      {showUserDropdown && (
        <div
          ref={dropdownRef}
          className="bg-primary p-3 rounded-xl shadow-md min-w-fit w-[200px] max-w-[250px] absolute right-0 top-full z-50 mt-1 border-1 border-white/20"
        >
          <p className="text-secondary font-medium">{user?.username}</p>
          <p className="text-white py-2 font-medium">{user?.email}</p>
          <div className="mt-2 flex flex-col gap-2">
            {userSettings.map((setting, index) => (
              <div
                key={index}
                onClick={() => handleMenuClick(setting)}
                className="cursor-pointer"
              >
                <UserMenuItems icon={setting.icon} label={setting.label} />
              </div>
            ))}
          </div>
          <div
            onClick={handleLogout}
            className="w-full group flex justify-end items-center cursor-pointer mt-3 gap-x-2 px-2"
          >
            <p className="text-sm font-medium text-white group-hover:text-secondary">Logout</p>
            <span>
              <FaArrowRightLong className="text-lg text-white group-hover:text-secondary" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
