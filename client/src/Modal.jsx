import React, { useState, useEffect } from "react";
import axios from "axios";
import Alacarte from "./Alacarte";
import Group from "./Group";
import EP_logo from "./img/icon.png";

const Modal = ({ isOpen, onClose, item }) => {
  const [mealData, setMealData] = useState([]);
  const [isAlacarte, setIsAlacarte] = useState(false); // State for showing Alacarte
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchItemData = (name) => {
    axios
      .get(`${apiBaseUrl}/item/${name}`)
      .then((res) => setMealData(res.data))
      .catch((err) => console.error("Error fetching meal data:", err));
  };

  // Only run when `item?.name` changes
  useEffect(() => {
    if (item?.name && item?.category_id && item.category_id == 4) {
      fetchItemData(item.name);
    }
  }, [item?.name]);

  console.log("Modal item:", mealData);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
      {/* Only show the selection div when item.name ends with "ALA CARTE" */}
      {item.category_id == 4 && !isAlacarte && (
        <div className="bg-white rounded-xl p-5 w-2/3 h-3/6 shadow-2xl flex flex-col justify-center items-center border-1 border-gray-200">
          <div className="h-1/4 w-full flex flex-row justify-center items-center gap-10">
            <h1 className="w-full esamanru-bold text-4xl">
              Would you like to make {item.cleaned_name} a meal?
            </h1>
          </div>
          <div className="h-2/4 w-full flex flex-row justify-center items-center gap-10 esamanru-medium ">
            <button className="p-5 h-full w-full rounded-2xl flex flex-col justify-end items-end gap-10 border border-gray-200 shadow-md">
              {mealData.length > 0 &&
                mealData[0]?.image_url &&
                mealData[0]?.retail_price && (
                  <img
                    src={`http://localhost:8081/images/${mealData[0].image_url
                      .replace(/\\/g, "/")
                      .replace(/\.\w+$/, ".png")}`}
                    alt="Meal"
                  />
                )}
              <div className="flex flex-col justify-between w-full esamanru-medium">
                <h1 className="w-full text-2xl capitalize text-start">
                  Yes, Make It a Meal
                </h1>
                <h1 className="w-full text-lg text-gray-600 text-start">
                  P{mealData[0]?.retail_price || 0}
                </h1>
              </div>
            </button>
            <button
              onClick={() => setIsAlacarte(true)} // Set to show Alacarte
              className="p-5 h-full w-full rounded-2xl flex flex-col justify-end items-end gap-10 border border-gray-200 shadow-md"
            >
              <img
                src={`http://localhost:8081/images/${item.image_url
                  .replace(/\\/g, "/")
                  .replace(/\.\w+$/, ".png")}`}
                alt="Item"
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full esamanru-medium">
                <h1 className="w-full text-2xl capitalize text-start">
                  No, Item Only
                </h1>
                <h1 className="w-full text-lg text-gray-600 text-start">
                  P{item.retail_price}
                </h1>
              </div>
            </button>
          </div>

          <div className="h-1/6 w-full flex flex-row justify-center items-end">
            <button
              onClick={() => {
                onClose();
                setMealData([]);
                setIsAlacarte(false); // Reset Alacarte state when closed
              }}
              className="text-black text-xl rounded-lg px-4 py-2 w-full h-1/2 esamanru-light shadow-md bg-white/90 border border-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Only show Group component for item names ending with "GROUP" or "SLIDER" */}
      {(item.category_id == 13 || item.category_id == 14) && <Group />}
      {/* Show Alacarte when isAlacarte state is true */}
      {isAlacarte && <Alacarte item={item} onClose={onClose} />}
    </div>
  );
};

export default Modal;
