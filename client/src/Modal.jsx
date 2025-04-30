import React, { useState, useEffect } from "react";
import axios from "axios";
import Alacarte from "./Alacarte";
import Meal from "./Meal";
import Group from "./Group";
import Orders from "./Orders";

const Modal = ({
  isOrdering,
  setIsOrdering,
  isOpen,
  onClose,
  item,
  orders,
  setOrders,
}) => {
  const [mealData, setMealData] = useState([]);
  const [isAlacarte, setIsAlacarte] = useState(0);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchItemData = (name) => {
    axios
      .get(`${apiBaseUrl}/item/${name}`)
      .then((res) => setMealData(res.data))
      .catch((err) => console.error("Error fetching meal data:", err));
  };

  // Only run when `item?.name` changes
  useEffect(() => {
    if (isOpen && item?.name && item?.category_id && item.category_id == 4) {
      fetchItemData(item.name);
      console.log("Item Data:", item);
      console.log("Meal Data:", mealData);
    }
  }, [isOpen, item?.name]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
      {/* Only show the selection div when item.name ends with "ALA CARTE" */}
      {item.category_id == 4 && !isAlacarte && isOrdering == 0 && (
        <div className="bg-white rounded-2xl px-10 pt-10 pb-20 w-2/3 h-3/7 shadow-2xl gap-10 flex flex-col justify-center items-center border-1 border-gray-200">
          <div className="h-2/8 w-full flex flex-row justify-center items-center">
            <h1 className="w-full esamanru-bold text-4xl text-gray-800">
              Would you like to make{" "}
              <a className="text-[#54c5d5]">{item.cleaned_name}</a> a meal?
            </h1>
          </div>
          <div className="h-5/8 w-full flex flex-row justify-center items-center gap-10 esamanru-medium ">
            <button
              onClick={() => setIsAlacarte(2)} // Set to show Alacarte
              className="p-5 h-full w-full rounded-2xl flex flex-col justify-end items-end gap-10 border border-gray-200 shadow-md"
            >
              {mealData.length > 0 &&
                mealData[0]?.image_url &&
                mealData[0]?.retail_price && (
                  <img
                    src={`${apiBaseUrl}/images/${mealData[0].image_url
                      .replace(/\\/g, "/")
                      .replace(/\.\w+$/, ".png")}`}
                    alt="Meal"
                  />
                )}
              <div className="flex flex-col justify-between w-full esamanru-medium">
                <h1 className="w-full text-2xl capitalize text-start text-[#ef3340]">
                  Yes, Make It a Meal
                </h1>
                <h1 className="w-full text-lg text-gray-600 text-start">
                  P{mealData[0]?.retail_price || 0}
                </h1>
              </div>
            </button>
            <button
              onClick={() => setIsAlacarte(1)} // Set to show Alacarte
              className="p-5 h-full w-full rounded-2xl flex flex-col justify-end items-end gap-10 border border-gray-200 shadow-md"
            >
              <img
                src={`${apiBaseUrl}/images/${item.image_url
                  .replace(/\\/g, "/")
                  .replace(/\.\w+$/, ".png")}`}
                alt="Item"
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full esamanru-medium">
                <h1 className="w-full text-2xl capitalize text-start text-[#ef3340]">
                  No, Item Only
                </h1>
                <h1 className="w-full text-lg text-gray-600 text-start">
                  P{item.retail_price}
                </h1>
              </div>
            </button>
          </div>

          <div className="h-1/8 w-full flex flex-row justify-center items-end">
            <button
              onClick={() => {
                onClose();
                setIsAlacarte(0);
              }}
              className="text-black text-xl rounded-lg px-4 py-2 w-full h-full esamanru-light shadow-md bg-white/90 border border-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Only show Group component for item names ending with "GROUP" or "SLIDER" */}

      {((item.category_id === 13 &&
        item.name.toLowerCase().includes("original")) ||
        item.category_id == 6 ||
        item.category_id == 1 ||
        isAlacarte == 1) &&
        isOrdering == 0 && (
          <Alacarte
            item={item}
            onClose={onClose}
            setIsAlacarte={setIsAlacarte}
            orders={orders}
            setOrders={setOrders}
          />
        )}
      {((item.category_id === 13 &&
        !item.name.toLowerCase().includes("original")) ||
        item.category_id === 14 ||
        isAlacarte == 2) &&
        isOrdering == 0 && (
          <Meal
            item={mealData[0] ?? item}
            onClose={onClose}
            setIsAlacarte={setIsAlacarte}
            orders={orders}
            setOrders={setOrders}
            mealData={mealData}
          setMealData={setMealData}
          
          />
        )}
      {isOrdering == 1 && (
        <Orders
          isOrdering={isOrdering}
          setIsOrdering={setIsOrdering}
          onClose={onClose}
          orders={orders}
          setOrders={setOrders}
        />
      )}
    </div>
  );
};

export default Modal;
