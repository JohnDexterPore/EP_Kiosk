import React, { useState, useEffect } from "react";
import axios from "axios";
import outlined_full_logo from "./img/outlined_logo_full.png";
import pizza from "./img/pizza.png";
import sides from "./img/sides.png";
import drinks from "./img/drinks.png";
import groups from "./img/group.png";
import slider from "./img/slider.png";

function TakeOut() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://172.16.0.95:8081/takeout")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center">
      <div className="h-5/6 w-full flex flex-wrap items-center justify-center">
        <div className="h-full w-1/4">
          <div className="h-2/10 w-full flex justify-center items-center">
            <img className="w-10/12" src={outlined_full_logo} alt="" />
          </div>
          <div className="h-8/10 w-full px-5 flex flex-col gap-5">
            {data.map((category, index) => {
              let imgSrc;
              switch (category.id) {
                case 3:
                  imgSrc = pizza;
                  break;
                case 4:
                  imgSrc = sides;
                  break;
                case 5:
                  imgSrc = drinks;
                  break;
                case 10:
                  imgSrc = groups;
                  break;
                case 11:
                  imgSrc = slider;
                  break;
                default:
                  imgSrc = pizza; // Default image if id doesn't match
              }
              return (
                <div
                  key={index}
                  className="h-1/12 w-full flex justify-left items-center gap-3 border-0 rounded-2xl shadow-xl"
                >
                  <img className="w-5/12" src={imgSrc} alt="" />

                  <h1 className="text-2xl font-bold text-gray-500 ">
                    {category.name}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-full w-3/4">sample</div>
      </div>
      <div className="h-1/6 w-full bg-[#54c5d5] border-0 rounded-2xl shadow-2xl"></div>
    </div>
  );
}

export default TakeOut;
