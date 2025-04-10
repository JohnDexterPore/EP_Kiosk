import React from "react";

function Alacarte({ item, onClose }) {
  // Destructure props here
  return (
    <>
      <div className="bg-white rounded-xl p-5 w-2/3 h-3/6 shadow-2xl flex flex-col justify-center items-center border-1 border-gray-200">
        <div className="w-full h-4/6 flex flex-col justify-center items-center">
          <img
            src={`http://localhost:8081/images/${item.image_url
              .replace(/\\/g, "/")
              .replace(/\.\w+$/, ".png")}`}
            alt="Item"
            className="object-cover rounded-md"
          />
        </div>
        <div className="w-full h-1/6 flex flex-col justify-center items-center emanru-bold">
          <h2 className="text-xl font-bold mb-4 w-full">{item.name}</h2>
          <p className="mb-4 w-full">Price: P{item.retail_price}</p>
        </div>
        <div className="w-full h-1/6 flex flex-col justify-center items-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white rounded px-4 py-2 w-full"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default Alacarte;
