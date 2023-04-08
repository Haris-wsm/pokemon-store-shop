import React from "react";

const CenterScreen = ({ children }) => {
  return (
    <div className="h-[calc(100vh-60px)] w-full grid place-content-center">
      {children}
    </div>
  );
};

export default CenterScreen;
