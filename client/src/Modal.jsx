import React from "react";

const Modal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-5 w-2/3 h-3/6 shadow-2xl flex flex-col justify-center items-center border-1 border-gray-200">
        <div className="w-full h-4/6 flex flex-col justify-center items-center">
          <img
            src={
              item.image_url
                ? `./src/${item.image_url
                    .replace(/\\/g, "/")
                    .replace(/\.\w+$/, ".png")}`
                : "./src/default.png"
            }
            alt={item.name}
            className="w-3/4 h-auto mb-4 rotate"
          />
        </div>
        <div className="w-full h-1/6 flex flex-col justify-center items-center">
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
    </div>
  );
};

export default Modal;
