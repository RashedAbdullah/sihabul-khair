import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
};

export default LoadingPage;
