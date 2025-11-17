function MainWithSidebarLayout({ children }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-y-4 xl:gap-y-0 xl:gap-x-6 my-container">{children}</div>
  );
}

export default MainWithSidebarLayout;
