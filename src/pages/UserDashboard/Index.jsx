import React, { useEffect, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import ProfilePage from './ProfilePage';
import { useLocation } from 'react-router';
import ContinueWatchingPage from './ContinueWatchingPage';
import NotificationPage from './NotificationPage';
import SettingsPage from './SettingsPage';
import WatchListPage from './WatchListPage';

const pages = {
  profile: <ProfilePage />,
  'continue-watching': <ContinueWatchingPage />,
  notification: <NotificationPage />,
  settings: <SettingsPage />,
  'watch-list': <WatchListPage />,
};

function Index() {
  const location = useLocation();
  const incomingSetting = location.state?.setting; // e.g. 'watch-list / profile / continue-watching'
  const [activeSetting, setActiveSetting] = useState(incomingSetting || 'profile');

  // When dashboardSettingChange is emitted, update the active setting
  useEffect(() => {
    const handler = (e) => {
      setActiveSetting(e.detail);
    };
    window.addEventListener('dashboardSettingChange', handler);
    return () => window.removeEventListener('dashboardSettingChange', handler);
  }, []);

  useEffect(() => {
    window.history.replaceState({}, document.title); // clear state after using it
  }, []);

  return (
    <>
      <DashboardHeader activeSetting={activeSetting} setActiveSetting={setActiveSetting} />
      <div className="my-container">{pages[activeSetting] || <ProfilePage />}</div>
    </>
  );
}

export default Index;
