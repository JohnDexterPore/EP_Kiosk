import React from "react";
import outline_logo from "./img/icon.png";
import kiosk from "./img/kiosk.png";
import counter from "./img/counter.png";

const Payment = ({ isComplete, orders }) => {
  if (!isComplete) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 esamanru-light">
      <div className="h-full w-full bg-white rounded-xl shadow-lg px-20 text-center space-y-4">
        <div className="h-1/12 flex justify-center">
          <img className="rounded-xl h-full" src={outline_logo} alt="Logo" />
        </div>
        <div className="h-10/12 w-full flex flex-col justify-center items-center gap-10">
          <p className="text-7xl esamanru-bold p-10">
            Where would you like to pay?
          </p>
          <div className="h-1/4 w-full flex flex-row gap-15 justify-center items-center esamanru-medium text-xl">
            <button
              disabled
              className="h-full w-1/2 bg-gray-200 shadow-md border border-gray-300 text-gray-400 rounded-2xl flex flex-col justify-center items-center py-2 gap-5 opacity-50 cursor-not-allowed"
            >
              <img className="w-1/2 grayscale" src={kiosk} alt="" />
              Pay Here
            </button>

            <button className="h-full w-1/2 shadow-md border border-gray-300 text-gray-400 rounded-2xl flex flex-col justify-center items-center py-2 gap-5">
              <img className="w-1/2" src={counter} alt="" />
              <div>Pay at the Counter (Cash Payment)</div>
            </button>
          </div>
        </div>
        <div className="h-1/12 flex gap-5">
          <button className="w-1/2 h-1/2  border border-gray-300 text-gray-400 rounded-md">
            Start Over
          </button>
          <button className="w-1/2 h-1/2  border border-gray-300 text-gray-400 rounded-md">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default Payment;
