import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import home_logo from "./img/home_background.jpg";
import qr from "./img/frame.png";
import outlined_full_logo from "./img/outlined_logo_full.png";
import takeout from "./img/takeout.png";
import dinein from "./img/dinein.png";
import button_bg from "./img/button_bg.png";

function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleClick = (path, event) => {
    const rect = event.target.getBoundingClientRect();
    setAnimationPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setIsAnimating(true);
    setTimeout(() => {
      navigate(path);
    }, 300); // Slower transition
  };

  return (
    <div
      className="h-screen w-full bg-cover relative overflow-hidden"
      style={{ backgroundImage: `url(${home_logo})` }}
    >
      <div className="h-screen w-full backdrop-blur-xs">
        {/* Content */}
        <div className="h-5/10 w-full flex justify-center items-center">
          <img src={outlined_full_logo} alt="" className="w-3/4 h-auto" />
        </div>

        {/* Bottom Section */}
        <div className="h-3/10 w-full flex items-start gap-30">
          <button
            className="h-8/10 w-full border-e-2 border-y-2 border-[#ec3f44] bg-white/90 rounded-e-3xl flex flex-col items-center justify-center gap-5 relative overflow-hidden"
            onClick={(e) => handleClick("/takeout", e)}
          >
            <h1 className="text-5xl text-gray-800 font-bold mb-4">Take-Out</h1>
            <img className="w-3/7" src={takeout} alt="" />
          </button>
          <button
            className="h-8/10 w-full border-s-2 border-y-2 border-[#54c5d5] bg-white/90 rounded-s-3xl flex flex-col items-center justify-center gap-5 relative overflow-hidden"
            onClick={(e) => handleClick("/dinein", e)}
          >
            <h1 className="text-5xl text-gray-800 font-bold mb-4">Dine-In</h1>
            <img className="w-3/7" src={dinein} alt="" />
          </button>
        </div>
        <div className="h-2/10 w-full p-5 flex justify-end items-end">
          <img className="w-1/6" src={qr} alt="" />
        </div>
      </div>
      {/* Animation Overlay */}
      {isAnimating && (
        <motion.div
          initial={{
            scale: 0,
            x: animationPosition.x - window.innerWidth / 2,
            y: animationPosition.y - window.innerHeight / 2,
          }}
          animate={{ scale: 50, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-white z-50 rounded-full"
        ></motion.div>
      )}
    </div>
  );
}

export default Home;
