import React from "react";
import "./FloatingLeaves.css";

const Leaf = ({ className }) => {
  return (
    <svg
      className={`floating-leaf ${className}`}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Exact simple leaf shape */}
      <path
        d="M12 500
           C18 410 48 330 105 250
           C165 165 255 75 490 0
           C510 -5 515 10 500 28
           C395 150 405 270 330 355
           C260 435 150 460 12 500Z"
        fill="#4caf50"
      />

      {/* Leaf vein */}
      <path
        d="M12 500
           C45 390 115 285 205 205
           C255 160 300 135 315 125"
        fill="none"
        stroke="#328c3b"
        strokeWidth="22"
        strokeLinecap="round"
      />
    </svg>
  );
};

const FloatingLeaves = () => {
  return (
    <div className="floating-leaves">

      <Leaf className="leaf-1" />
      <Leaf className="leaf-2" />
      <Leaf className="leaf-3" />
      <Leaf className="leaf-4" />
      <Leaf className="leaf-5" />

    </div>
  );
};

export default FloatingLeaves;