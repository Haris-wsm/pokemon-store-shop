import React from "react";

const Circle = ({ delay }) => {
  return (
    <div
      className="h-6 w-6 rounded-full bg-gray-300 animate-bounce "
      style={{
        animationDelay: delay,
      }}
    />
  );
};

const BouncingIcon = () => {
  return (
    <div className="flex gap-2">
      <Circle delay="0.2s" />
      <Circle delay="0.4s" />
      <Circle delay="0.6s" />
    </div>
  );
};
