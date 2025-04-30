import React, { useState, useEffect, useMemo } from "react";
import outline_logo from "./img/icon.png";
import Prompt from "./Prompt";

function Orders({ isOrdering, setIsOrdering, onClose, orders, setOrders }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [showPrompt, setShowPrompt] = useState(false);
  const [buttons, setButtons] = useState("");
  const [targetItem, setTargetItem] = useState(null);

  const handleProceed = () => {
    if (buttons === "Remove") {
      setOrders((prevOrders) => {
        if (targetItem?.item_number != null) {
          const targetName = targetItem.name;
          const itemNumbersToRemove = prevOrders
            .filter((o) => o.name === targetName)
            .map((o) => o.item_number);

          return prevOrders.filter(
            (order) =>
              order.name !== targetName &&
              !itemNumbersToRemove.includes(order.parent_number)
          );
        } else {
          const refCode = targetItem.code;
          return prevOrders.filter((order) => order.code !== refCode);
        }
      });
      setTargetItem(null); // reset after action
      setShowPrompt(false);
    } else {
      setIsOrdering(0);
      setOrders([]);
      setShowPrompt(false);
      onClose();
    }
  };

  const handleCancel = () => {
    console.log("User cancelled.");
    setShowPrompt(false);
  };

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

  const totalPrice = useMemo(
    () => orders.reduce((sum, item) => sum + item.retail_price, 0),
    [orders]
  );

  const { mealGroups, standaloneItems } = useMemo(() => {
    const meals = [];
    const standalones = [];

    orders.forEach((order) => {
      if (order.item_number) {
        const linkedDrinks = orders
          .filter(
            (o) => o.parent_number === order.item_number && !o.item_number
          )
          .sort((a, b) => a.name.localeCompare(b.name));
        const signature = `${order.name}|${linkedDrinks
          .map((d) => d.name)
          .join(",")}`;

        const existingGroup = meals.find(
          (group) => group.signature === signature
        );
        if (existingGroup) {
          existingGroup.count++;
        } else {
          meals.push({
            meal: order,
            drinks: linkedDrinks,
            count: 1,
            signature,
          });
        }
      } else if (!order.item_number && !order.parent_number) {
        const match = standalones.find((o) => o.name === order.name);
        if (match) {
          match.count++;
        } else {
          standalones.push({ ...order, count: 1 });
        }
      }
    });
    return { mealGroups: meals, standaloneItems: standalones };
  }, [orders]);

  const renderQuantityControls = (item, count) => (
    <div className="w-full h-full flex justify-center items-center esamanru-bold">
      <button
        onClick={() => handleDecrement(item)}
        className="bg-[#ef3340] w-3/12 h-1/2 flex justify-center items-center rounded-lg text-white shadow-md"
      >
        -
      </button>
      <div className="w-6/12 h-3/5 text-center flex justify-center items-center text-xl esamanru-bold">
        <input
          className="border border-gray-200 w-5/6 h-5/6 rounded-2xl text-center"
          type="number"
          readOnly
          value={count}
        />
      </div>
      <button
        onClick={() => handleIncrement(item)}
        className="bg-[#54c5d5] w-3/12 h-4/9 flex justify-center items-center rounded-lg text-white shadow-md"
      >
        +
      </button>
    </div>
  );

  const renderItem = (item, count, isMeal, drinks = []) => (
    <div
      key={item.item_number || item.name}
      className="py-5 w-full flex flex-col justify-start items-start border-b border-gray-200"
    >
      <div className="flex flex-row gap-5 items-center justify-start">
        <button
          className="w-2/12 h-1/2 flex justify-center items-center rounded-xl text-gray-500 shadow-lg border border-gray-200"
          onClick={() => {
            setButtons("Remove");
            setTargetItem(item); // <-- store the current item
            setShowPrompt(true);
          }}
        >
          Remove
        </button>

        <img
          className="rounded-xl w-2/12"
          src={`${apiBaseUrl}/images/${item.image_url
            .replace(/\\/g, "/")
            .replace(/\.\w+$/, ".png")}`}
          alt={item.name}
        />
        <div className="w-4/12 flex items-center text-lg esamanru-medium text-wrap">
          <p>{item.name}</p>
        </div>
        <div className="w-3/12 h-2/3">{renderQuantityControls(item, count)}</div>
        <div className="w-1/12 text-lg esamanru-medium">
          <p>P{item.retail_price * count}</p>
        </div>
      </div>

      {/* Render associated drinks for meals */}
      {isMeal &&
        drinks.map((drink, dIndex) => (
          <div
            key={`${item.item_number}-drink-${dIndex}`}
            className="flex flex-row w-full gap-5 items-center justify-start  text-md esamanru-light"
          >
            <div className="w-4/12 me-8"></div>
            <div className="w-4/12">
              <p>--{drink.name}</p>
            </div>
            <div className="w-2/12"></div>
            <div className="w-2/12">
              <p>P{drink.retail_price * count}</p>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="bg-gray-100/60 w-full h-screen flex flex-col overflow-hidden relative">
      {/* Order Display Section */}
      <div className="h-9/12 w-full bg-white flex justify-center items-center">
        <div className="h-full w-11/12 px-10 flex flex-col gap-5 overflow-auto">
          <div className="h-1/10 flex items-center gap-5 esamanru-bold text-5xl text-gray-900">
            <img className="rounded-xl w-1/8" src={outline_logo} alt="Logo" />
            <p>Your Order</p>
          </div>
          <div className="flex flex-col items-center justify-start gap-4 overflow-auto h-9/10">
            {orders.length > 0 ? (
              <>
                {mealGroups.map((group, idx) =>
                  renderItem(group.meal, group.count, true, group.drinks)
                )}
                {standaloneItems.map((item, idx) =>
                  renderItem(item, item.count, false)
                )}
              </>
            ) : (
              <p className="text-gray-600 text-xl text-center mt-10">
                No data available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="h-3/12 w-full bg-white border-t border-gray-200 rounded-t-2xl shadow-2xl">
        <div className="h-3/8 flex justify-between items-center px-20 text-5xl esamanru-bold">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <img
                className="rounded-xl w-full h-full"
                src={outline_logo}
                alt="Logo"
              />
              {orders.filter(
                (order) => order.category_id !== 2 && order.category_id !== 12
              ).length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-base px-4 py-2 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {
                    orders.filter(
                      (order) =>
                        order.category_id !== 2 && order.category_id !== 12
                    ).length
                  }
                </span>
              )}
            </div>
            <span>Total:</span>
          </div>
          <span>P{totalPrice}</span>
        </div>

        <div className="h-5/8 px-20 flex flex-col justify-center gap-4 text-2xl esamanru-medium">
          <button
            className="w-full h-1/3 bg-[#54c5d5] text-white rounded-xl shadow-lg"
            onClick={() => setIsOrdering(1)}
          >
            Complete Order
          </button>
          <div className="flex gap-5 h-1/4">
            <button
              className="w-1/3 h-full border border-gray-300 text-gray-400 rounded-xl"
              onClick={() => {
                setButtons("Start Over");
                setShowPrompt(true);
              }}
            >
              Start Over
            </button>
            <button
              className="w-2/3 h-full border border-gray-300 text-gray-400 rounded-xl"
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
      <Prompt
        isVisible={showPrompt}
        onConfirm={handleProceed}
        onCancel={handleCancel}
        message="Are you sure you want to continue?"
      />
    </div>
  );
}

export default Orders;
