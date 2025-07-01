import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .join('')
    .slice(0, 2);
}

const Profile = () => {
  const { user } = useContext(ShopContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg 3xl:text-xl 4xl:text-2xl">
        You are not logged in.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh">
      <div className="bg-white p-8 flex flex-col items-center gap-4 min-w-[320px] 3xl:min-w-[400px] 4xl:min-w-[500px]">
        <div className="w-24 h-24 3xl:w-32 3xl:h-32 4xl:w-40 4xl:h-40 rounded-full bg-[--primary-color] flex items-center justify-center text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-white mb-2">
          {getInitials(user.name)}
        </div>
        <div className="text-xl 3xl:text-2xl 4xl:text-3xl font-semibold text-gray-900">{user.name}</div>
        <div className="text-gray-500 3xl:text-xl 4xl:text-2xl">{user.email}</div>
      </div>
    </div>
  );
};

export default Profile;