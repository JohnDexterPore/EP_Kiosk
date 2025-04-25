import React, { useState, useEffect } from "react";
import outline_logo from "./img/icon.png";

function Orders({ isOrdering, setIsOrdering, onClose, orders, setOrders }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const order_count = orders.length;
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(orders.reduce((sum, item) => sum + item.retail_price, 0));
  }, [orders]);
  return (
    <>
      <div className="bg-gray-100/60 w-full h-screen flex flex-wrap justify-center items-center overflow-hidden relative">
        <div className="h-9/12 w-full bg-white  flex flex-wrap items-center justify-center"></div>
        <div className="h-3/12 w-full bg-white border-1 border-gray-200 text-gray-600 rounded-t-2xl shadow-2xl">
          <div className="h-3/8 w-full bg-white text-gray-600 flex justify-center items-center">
            <div className="w-3/4 px-10 h-full flex flex-row items-end justify-center">
              <div className="w-2/4 h-2/3 flex flex-row items-center justify-start">
                <div className="relative w-2/3 flex justify-start">
                  <div className="relative w-2/4 flex items-center">
                    <img
                      className="rounded-xl w-full"
                      src={outline_logo}
                      alt=""
                    />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-base px-4 py-2 rounded-full transform translate-x-1/2 -translate-y-1/2">
                      {order_count}
                    </span>
                  </div>
                </div>
                <div className="w-2/4 flex flex-row gap-5 items-center justify-start text-5xl esamanru-bold">
                  Total:
                </div>
              </div>
              <div className="h-2/3 w-2/4 flex flex-row gap-5 items-center justify-end text-5xl esamanru-bold">
                P{totalPrice}
              </div>
            </div>
          </div>
          <div className="h-5/8 w-full bg-white text-gray-600 flex justify-center items-center">
            <div className="w-3/4 h-full gap-5 flex flex-col items-center justify-center px-10 text-2xl esamanru-medium">
              <button
                className="w-full h-1/3 border border-gray-200 rounded-xl text-white shadow-lg bg-[#54c5d5]"
                onClick={() => {
                  setIsOrdering(1);
                  setIsModalOpen(true);
                }}
              >
                Complete Order
              </button>
              <div className="w-full h-1/5 flex flex-row gap-5 items-center justify-center">
                <button
                  className="w-1/3 h-full border border-gray-300 rounded-xl text-gray-400"
                  onClick={() => {
                    setIsOrdering(0);
                    setOrders([]);
                    onClose();
                  }}
                >
                  Start Over
                </button>
                <button
                  className="w-2/3 h-full border border-gray-300 rounded-xl text-gray-400"
                  onClick={() => {
                    setIsOrdering(0);
                    onClose();
                  }}
                >
                  Order More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
