import React, { useState, useEffect } from "react";
import outline_logo from "./img/icon.png";
import kiosk from "./img/kiosk.png";
import counter from "./img/counter.png";

const Payment = ({ showComplete }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [countdown, setCountdown] = useState(5); // Start at 5 seconds

  useEffect(() => {
    if (orderNumber) {
      const frame = requestAnimationFrame(() => {
        setTimeout(() => {
          window.print();
        }, 100); // Add a short delay to ensure DOM is painted
      });

      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      //const redirectTimer = setTimeout(() => {
      //  window.location.href = "/"; // Redirect when countdown reaches 0
      // }, 5000);

      return () => {
        clearInterval(timer); // Stop countdown updates
        //  clearTimeout(redirectTimer); // Prevent unnecessary redirects
      };
    }
  }, [orderNumber]);

  if (!showComplete) return null;

  const handleCounterPayment = () => {
    const newOrderNumber = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNumber);
  };

  //const handleCounterPayment = async () => {
  //  try {
  //    const response = await axios.get(`${window.location.href}/orderNumber`); // Replace with your API URL
  //    setOrderNumber(response.data.orderNumber); // Assuming the API returns { orderNumber: 123456 }
  //  } catch (error) {
  //    console.error("Error fetching order number:", error);
  // }
  //};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 esamanru-light">
      <div className="h-full w-full bg-white flex flex-col justify-center items-center text-center space-y-10">
        {orderNumber ? (
          <>
            <p>We're preparing your order, please take your receipt</p>
            <div className="receipt-container border border-gray-300 gap-20 w-2/3 h-1/3 flex flex-col justify-center items-center text-center">
              <p className="text-6xl esamanru-medium">Your Order</p>
              <p className="text-8xl esamanru-bold gap-5 flex items-center justify-center">
                <span className="text-6xl esamanru-medium">No.</span>
                {1}
              </p>
            </div>
            <p className="text-2xl esamanru-medium">
              Redirecting in {countdown} seconds...
            </p>
          </>
        ) : (
          <>
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

              <button
                className="h-full w-1/2 shadow-md border border-gray-300 text-gray-400 rounded-2xl flex flex-col justify-center items-center py-2 gap-5"
                onClick={handleCounterPayment}
              >
                <img className="w-1/2" src={counter} alt="" />
                <div>Pay at the Counter (Cash Payment)</div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
