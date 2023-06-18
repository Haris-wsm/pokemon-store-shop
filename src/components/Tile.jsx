import React, { useRef } from "react";

const Tile = (props) => {
  const tiltRef = useRef(null);

  const handleMove = (e) => {
    const el = tiltRef.current;
    const height = el.clientHeight;
    const width = el.clientWidth;
    const xVal = e.nativeEvent.offsetX;
    const yVal = e.nativeEvent.offsetY;
    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);
    const string = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    el.style.transform = string;
  };

  const handleMouseOut = () => {
    const el = tiltRef.current;
    el.style.transform = "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  };

  const handleMouseDown = () => {
    const el = tiltRef.current;
    el.style.transform = "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
  };

  const handleMouseUp = () => {
    const el = tiltRef.current;
    el.style.transform = "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={tiltRef}
      className="tilt"
      onMouseMove={handleMove}
      onMouseOut={handleMouseOut}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {props.children}
    </div>
  );
};

export default Tile;
