import React, { useState, useEffect } from "react";
import axios from "axios";

function Meal({ item, onClose, setIsAlacarte }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [eDrinks, setEDrinks] = useState([]);
  const [orderCount, setOrderCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(item.retail_price);
  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/edrinks`)
      .then((res) => setEDrinks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDecrement = () => {
    if (orderCount > 1) {
      setOrderCount(orderCount - 1);
    }
  };
  useEffect(() => {
    setTotalAmount(item.retail_price * orderCount);
  }, [orderCount, item.retail_price]);

  const handleDrinkClick = (drink) => {
    if (selectedDrink === drink.code) {
      setSelectedDrink(null); // Deselect the drink if it's already selected
    } else {
      setSelectedDrink(drink.code); // Select the new drink
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-15 w-2/3 h-5/6 shadow-2xl flex flex-col justify-center items-center border-1 border-gray-200">
        <div className="w-full h-5/12 flex flex-col justify-center items-center">
          <img
            src={`${apiBaseUrl}/images/${item.image_url
              .replace(/\\/g, "/")
              .replace(/\.\w+$/, ".png")}`}
            alt="Item"
            className="object-cover rounded-md"
          />
        </div>
        <div className="w-full h-1/12 flex flex-wrap justify-center items-center esamanru-bold">
          <h2 className="text-xl font-bold w-9/12">{item.name}</h2>
          <p className="w-3/12 text-end text-xl">Price: P{totalAmount}</p>
        </div>
        <div className="w-full h-1/12 flex justify-center items-center esamanru-bold">
          <button
            onClick={handleDecrement}
            className="bg-[#ef3340] w-2/12 h-4/9 flex justify-center items-center rounded-lg text-white shadow-md"
          >
            <svg
              className="w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.875 12C4.875 11.3787 5.37868 10.875 6 10.875H18.0007C18.622 10.875 19.1257 11.3787 19.1257 12C19.1257 12.6213 18.622 13.125 18.0007 13.125H6C5.37868 13.125 4.875 12.6213 4.875 12Z"
                fill="#ffffff"
              />
            </svg>
          </button>
          <div className="w-8/12 h-3/5 text-center flex justify-center items-center text-xl esamanru-bold">
            <h1 className="border border-gray-200 w-5/6 h-5/6 flex justify-center items-center rounded-2xl">
              <input
                className="text-center"
                type="number"
                min="1"
                value={orderCount}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  setOrderCount(value);
                }}
              />
            </h1>
          </div>
          <button
            onClick={setOrderCount.bind(this, orderCount + 1)}
            className="bg-[#54c5d5] w-2/12 h-4/9 flex justify-center items-center rounded-lg text-white shadow-md"
          >
            <svg
              className="w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                d="M12.0002 4.875C12.6216 4.875 13.1252 5.37868 13.1252 6V10.8752H18.0007C18.622 10.8752 19.1257 11.3789 19.1257 12.0002C19.1257 12.6216 18.622 13.1252 18.0007 13.1252H13.1252V18.0007C13.1252 18.622 12.6216 19.1257 12.0002 19.1257C11.3789 19.1257 10.8752 18.622 10.8752 18.0007V13.1252H6C5.37868 13.1252 4.875 12.6216 4.875 12.0002C4.875 11.3789 5.37868 10.8752 6 10.8752H10.8752V6C10.8752 5.37868 11.3789 4.875 12.0002 4.875Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>
        <div className="h-4/12 flex flex-wrap justify-center items-center gap-3 w-full overflow-auto">
          {Array.isArray(eDrinks) && eDrinks.length > 0 ? (
            eDrinks.map((drink) => (
              <button
                key={drink.code}
                onClick={() => handleDrinkClick(drink)} // Handle the click
                className={`h-3/12 w-full flex justify-left items-center border border-gray-200 rounded-lg shadow-lg p-2
                ${selectedDrink === drink.code ? "bg-[#54c5d5]" : ""}`} // Conditional darkening for selected drink
              >
                <img
                  className="w-3/12"
                  src={
                    drink.image_url
                      ? `${apiBaseUrl}/images/${drink.image_url
                          .replace(/\\/g, "/")
                          .replace(/\.\w+$/, ".png")}`
                      : "default-image-path.png"
                  }
                  alt={drink.name || "Drink image"}
                />

                <h1
                  className={`text-lg capitalize esamanru-medium text-start w-9/12
                  ${
                    selectedDrink === drink.code
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {drink.name}
                </h1>
                <p
                  className={`text-lg  w-3/12 esamanru-medium text-end ${
                    selectedDrink === drink.code
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  Price: P{drink.retail_price}
                </p>
              </button>
            ))
          ) : (
            <p>No drinks available</p>
          )}
        </div>
        <div className="w-full h-1/12 flex flex-row justify-center items-center gap-10">
          <button
            onClick={() => {
              onClose();
              setIsAlacarte(0);
            }}
            className="text-black text-xl rounded-lg px-4 py-2 w-1/2 h-1/2 esamanru-light shadow-md bg-white/90 border border-gray-200"
          >
            Cancel
          </button>
          <button className="text-black text-xl rounded-lg px-4 py-2 w-1/2 h-1/2 esamanru-light shadow-md bg-white/90 border border-gray-200">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Meal;
