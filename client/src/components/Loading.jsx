import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="ml-4 text-xl font-semibold text-blue-500">Loading...</p>
    </div>
  );
};

export default Loading;