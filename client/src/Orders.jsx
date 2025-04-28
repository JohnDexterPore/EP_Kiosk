import React, { useState, useEffect } from "react";
import outline_logo from "./img/icon.png";

function Orders({ isOrdering, setIsOrdering, onClose, orders, setOrders }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const order_count = orders.length;
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrement = (item) => {
    setOrders([...orders, item]);
  };

  const handleDecrement = (item) => {
    const index = orders.findIndex(
      (order) =>
        order.name === item.name && order.retail_price === item.retail_price
    );
    if (index !== -1) {
      const updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      setOrders(updatedOrders);
    }
  };

  const countItem = (item) => {
    return orders.filter(
      (order) =>
        order.name === item.name && order.retail_price === item.retail_price
    ).length;
  };

  useEffect(() => {
    const total = orders.reduce((sum, item) => sum + item.retail_price, 0);
    setTotalPrice(total);
    console.log("Updated Orders:", orders);
  }, [orders]);

  return (
    <>
      <div className="bg-gray-100/60 w-full h-screen flex flex-wrap justify-center items-center overflow-hidden relative">
        <div className="h-9/12 w-full bg-white flex flex-wrap items-center justify-center">
          <div className="h-full w-11/12 px-10 flex flex-col gap-5">
            <div className="h-1/10 flex justify-start items-center gap-5 esamanru-bold text-5xl text-gray-900">
              <img className="rounded-xl w-1/8" src={outline_logo} alt="" />
              <p>Your Order</p>
            </div>
            <div className="h-9/10 flex flex-col justify-start items-center">
              {orders.length > 0 ? (
                [
                  ...new Map(
                    orders.map((item) => [item.name + item.retail_price, item])
                  ).values(),
                ]
                  .sort((a, b) => a.name.localeCompare(b.name)) // Sorting by item name (ascending)
                  .map((item, index) => {
                    // Count how many times the item appears in orders
                    const itemCount = orders.filter(
                      (order) => order.id === item.id
                    ).length;

                    // Calculate the total price based on the quantity of the item
                    const totalPrice = item.retail_price * itemCount;

                    return (
                      <div
                        key={index}
                        className={`w-full flex flex-row gap-5 items-center justify-start border-b border-gray-200 ${
                          orders.category_id === 1 ? "h-1/12" : "h-2/12"
                        }`}
                      >
                        <button
                          className="w-2/12 h-1/4 flex justify-center items-center rounded-xl text-gray-500 shadow-lg border border-gray-200"
                          onClick={() => {
                            // Remove the item by id
                            setOrders((prevOrders) =>
                              prevOrders.filter((order) => order.id !== item.id)
                            );
                          }}
                        >
                          Remove
                        </button>
                        <img
                          className="rounded-xl w-2/12"
                          src={`${apiBaseUrl}/images/${item.image_url
                            .replace(/\\/g, "/")
                            .replace(/\.\w+$/, ".png")}`}
                          alt=""
                        />
                        <div className="w-4/12 h-full flex gap-5 items-center justify-start text-lg esamanru-medium text-wrap">
                          <p>{item.name}</p>
                        </div>
                        <div className="w-2/12 h-full flex gap-5 items-center justify-start text-lg esamanru-medium text-wrap">
                          <div className="w-full h-1/3 flex justify-center items-center esamanru-bold">
                            <button
                              onClick={() => handleDecrement(item)}
                              className="bg-[#ef3340] w-2/12 h-1/2 flex justify-center items-center rounded-lg text-white shadow-md"
                            >
                              -
                            </button>
                            <div className="w-8/12 h-3/5 text-center flex justify-center items-center text-xl esamanru-bold">
                              <h1 className="border border-gray-200 w-5/6 h-5/6 flex justify-center items-center rounded-2xl">
                                <input
                                  className="text-center w-full"
                                  type="number"
                                  readOnly
                                  value={itemCount} // Show the quantity of the item
                                />
                              </h1>
                            </div>
                            <button
                              onClick={() => handleIncrement(item)}
                              className="bg-[#54c5d5] w-2/12 h-4/9 flex justify-center items-center rounded-lg text-white shadow-md"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="w-1/12 h-full flex gap-5 items-center justify-start text-lg esamanru-medium text-wrap">
                          <p>P{totalPrice}</p>{" "}
                          {/* Display total price for the item */}
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="col-span-4 text-gray-600">No data available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Section */}
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
                    {orders.filter((order) => order.category_id === 2).length >
                      0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-base px-4 py-2 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {
                          orders.filter((order) => order.category_id === 2)
                            .length
                        }
                      </span>
                    )}
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
                  // Make sure setIsModalOpen is defined somewhere
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
