import React from 'react';
import HeroSection from './Sections/HeroSection';
import TrendSection from './Sections/TrendSection';
import RankSection from './Sections/RankSection';
import MainSection from './Sections/MainSection';
import SideBarSection from './Sections/SideBarSection';
import MainWithSidebarLayout from '@components/layouts/MainWithSidebarLayout';

function MainPage() {
  return (
    <>
      <HeroSection />
      <TrendSection />
      <RankSection />
      <MainWithSidebarLayout>
        <MainSection />
        <SideBarSection />
      </MainWithSidebarLayout>
    </>
  );
}

export default MainPage;
