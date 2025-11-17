import React from 'react';

// Correctly destructure props here
function UserMenuItems({ icon, label, onItemClick }) {
  return (
    <div
      onClick={onItemClick}
      className="flex justify-start items-center gap-2 cursor-pointer px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-4xl group"
    >
      <span className="text-white text-lg group-hover:text-secondary">{icon}</span>
      <span className="text-white text-sm whitespace-nowrap group-hover:text-secondary">{label}</span>
    </div>
  );
}

export default UserMenuItems;
