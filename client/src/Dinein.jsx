import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import outlined_full_logo from "./img/outlined_logo_full.png";
import pizza_img from "./img/pizza.png";
import sides_img from "./img/sides.png";
import drinks_img from "./img/drinks.png";
import groups_img from "./img/group.png";
import slider_img from "./img/slider.png";
import outline_logo from "./img/icon.png";
import takeout_box from "./img/takeout.png";
import Modal from "./Modal";
import Prompt from "./Prompt";

function Dinein() {
  const [isOrdering, setIsOrdering] = useState(0);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(4); // Auto-select promoonst [categoryData, setCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]); // Store fetched data
  const [greeting, setGreeting] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [showPrompt, setShowPrompt] = useState(false);

  const handleProceed = () => {
    console.log("User confirmed!");
    setOrders([]);
    setShowPrompt(false);
  };

  const handleCancel = () => {
    console.log("User cancelled.");
    setShowPrompt(false);
  };
  const handleClick = (path, event) => {
    const rect = event.target.getBoundingClientRect();
    setAnimationPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setIsAnimating(true);
    setTimeout(() => {
      navigate(path);
    }, 300); // Slower transition
  };

  const fetchCategoryData = (categoryId) => {
    axios
      .get(`${apiBaseUrl}/category/${categoryId}`)
      .then((res) => setCategoryData(res.data))
      .catch((err) => console.error("Error fetching category data:", err));
  };

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/dinein`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const messages = [
      "Welcome! Please select your order.",
      "Delicious Choices Await! Start Your Order Below.",
      "Order Here for a Tasty Experience!",
      "Hungry? Let’s Get Your Order Started!",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setGreeting(randomMessage);
  }, []);

  useEffect(() => {
    fetchCategoryData(selectedCategory);
  }, [selectedCategory]);

  // Open modal and set selected item
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  useEffect(() => {
    setTotalPrice(orders.reduce((sum, item) => sum + item.retail_price, 0));
  }, [orders]);

  const order_count = orders.length;

  return (
    <div className="bg-gray-100/60 w-full h-screen flex flex-wrap justify-center items-center overflow-hidden relative">
      <div className="h-5/6 w-full flex flex-wrap items-center justify-center">
        <div className="h-full w-1/4">
          <div className="h-2/10 w-full flex justify-center items-center">
            <img className="w-12/12" src={outlined_full_logo} alt="" />
          </div>
          <div className="h-8/10 w-full px-5 flex flex-col gap-3">
            {categories.map((category) => {
              let imgSrc;
              switch (category.name.toUpperCase()) {
                case "PIZZA MENU":
                  imgSrc = pizza_img;
                  category.name = "Pizza";
                  break;
                case "SIDES":
                  imgSrc = sides_img;
                  break;
                case "BEVERAGE":
                  imgSrc = drinks_img;
                  break;
                case "GROUP":
                  imgSrc = groups_img;
                  break;
                case "GROUP SLIDER":
                  imgSrc = slider_img;
                  category.name = "Group Slider";
                  break;
                default:
                  imgSrc = pizza_img;
              }

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    fetchCategoryData(category.id);
                  }}
                  className={`h-1/7 w-full flex flex-col justify-left items-center gap-3 rounded-lg p-2 
                    ${
                      selectedCategory === category.id
                        ? "bg-[#54c5d5] text-white"
                        : "bg-white text-gray-600"
                    }`}
                >
                  <img className="w-2/3" src={imgSrc} alt="" />
                  <h1 className="text-lg capitalize  esamanru-medium text-start">
                    {category.name}
                  </h1>
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-full w-3/4">
          <div className="h-2/10 w-full flex justify-start items-center ps-10">
            <div className="w-9/12 h-full flex justify-start items-center text-5xl/15 text-[#ef3340]">
              <h1 className="esamanru-bold">{greeting}</h1>
            </div>
            <div className="w-3/12 h-full flex justify-end items-center">
              <button
                id="home"
                className="h-1/3 w-1/2 bg-[#54c5d5] rounded-s-2xl shadow-xl flex justify-center items-center"
                onClick={(e) => handleClick("/", e)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0 0 0)"
                  className="w-4/7"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.45 4.90342C12.1833 4.70342 11.8167 4.70342 11.55 4.90342L5.05 9.77842C4.86115 9.92006 4.75 10.1423 4.75 10.3784V18.4998C4.75 18.9141 5.08579 19.2498 5.5 19.2498H9V16.9998C9 15.343 10.3431 13.9998 12 13.9998C13.6569 13.9998 15 15.343 15 16.9998V19.2498H18.5C18.9142 19.2498 19.25 18.9141 19.25 18.4998V10.3784C19.25 10.1423 19.1389 9.92006 18.95 9.77842L12.45 4.90342ZM10.65 3.70342C11.45 3.10342 12.55 3.10342 13.35 3.70342L19.85 8.57842C20.4166 9.00334 20.75 9.67021 20.75 10.3784V18.4998C20.75 19.7425 19.7426 20.7498 18.5 20.7498H14.25C13.8358 20.7498 13.5 20.4141 13.5 19.9998V16.9998C13.5 16.1714 12.8284 15.4998 12 15.4998C11.1716 15.4998 10.5 16.1714 10.5 16.9998V19.9998C10.5 20.4141 10.1642 20.7498 9.75 20.7498H5.5C4.25736 20.7498 3.25 19.7425 3.25 18.4998V10.3784C3.25 9.67021 3.58344 9.00334 4.15 8.57842L10.65 3.70342Z"
                    fill="#ffffff"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="h-8/10 w-full px-5 gap-5 content-start  overflow-auto">
            <div className="h-full w-full grid grid-cols-3 gap-5 content-start pb-20">
              {categoryData.length > 0 ? (
                categoryData.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-3 h-60 w-full rounded-xl bg-white shadow-sm flex flex-col items-center justify-start"
                    onClick={() => {
                      openModal(item);
                      console.log(item);
                      isOrdering === 0;
                    }}
                  >
                    {/* Item Image */}
                    <img
                      src={`${apiBaseUrl}/images/${item.image_url
                        .replace(/\\/g, "/")
                        .replace(/\.\w+$/, ".png")}`}
                      alt="Item"
                      className="object-cover rounded-md"
                    />
                    {/* Item Details */}
                    <div className="flex justify-between w-full esamanru-medium">
                      <h1 className="w-3/4 text-sm capitalize p-3 text-gray-600 text-start">
                        {item.cleaned_name.toLowerCase()}
                      </h1>
                      <h1 className="w-1/4 text-sm p-3 text-gray-600 text-end">
                        P{item.retail_price}
                      </h1>
                    </div>
                  </motion.button>
                ))
              ) : (
                <p className="col-span-4 text-gray-600">No data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-1/6 w-full bg-white border-1 border-gray-200 text-gray-600 rounded-t-2xl shadow-2xl flex justify-center items-center">
        <div className="w-full h-full flex flex-row items-center justify-center">
          <div className="w-2/4 h-full flex flex-row items-center justify-center">
            <div className="relative w-2/4 flex items-center justify-center">
              <div className="relative w-2/4 flex items-center">
                <img className="rounded-xl w-full" src={outline_logo} alt="" />
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
            </div>
            <div className="w-2/4 flex flex-row gap-5 items-center justify-start text-5xl esamanru-bold">
              P{totalPrice}
            </div>
          </div>
          <div className="w-2/4 h-full flex flex-row items-center gap-5">
            <div className="h-full w-full flex flex-col items-center justify-center text-xl esamanru-medium">
              <div className="w-full h-full gap-5 flex flex-col items-center justify-center px-10 py-5">
                <button
                  onClick={() => {
                    setIsOrdering(1);
                    setIsModalOpen(true);
                  }}
                  disabled={orders.length === 0}
                  className={`w-full h-1/3 border border-gray-200 rounded-xl text-white shadow-lg ${
                    orders.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#54c5d5]"
                  }`}
                >
                  View My Order
                </button>

                <button
                  onClick={() => setShowPrompt(true)}
                  disabled={orders.length === 0}
                  className={`w-full h-1/3 border border-gray-300 rounded-xl shadow-lg ${
                    orders.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAnimating && (
        <motion.div
          initial={{
            scale: 0.5,
            x: animationPosition.x - window.innerWidth / 2,
            y: animationPosition.y - window.innerHeight / 2,
          }}
          animate={{ scale: 50, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-[#54c5d5] z-50 rounded-full"
        ></motion.div>
      )}
      <Modal
        isOrdering={isOrdering}
        setIsOrdering={setIsOrdering}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        orders={orders}
        setOrders={setOrders}
      />
      <Prompt
        isVisible={showPrompt}
        onConfirm={handleProceed}
        onCancel={handleCancel}
        message="Are you sure you want to continue?"
      />
    </div>
  );
}

export default Dinein;
