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
import Modal from "./Modal"; // Import your Modal component

function Dinein() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(4); // Auto-select promoonst [categoryData, setCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]); // Store fetched data
  const [greeting, setGreeting] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();
  const uniqueSubCategories = [
    ...new Set(categoryData.map((item) => item.sub_category_name)),
  ];
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    uniqueSubCategories[0] || ""
  );

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
      .get(`http://localhost:8081/category/${categoryId}`)
      .then((res) => setCategoryData(res.data))
      .catch((err) => console.error("Error fetching category data:", err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/dinein")
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

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };
  // Open modal and set selected item
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (categoryData.length > 0) {
      const uniqueSubCategories = [
        ...new Set(categoryData.map((item) => item.sub_category_name)),
      ];
      setSelectedSubCategory(uniqueSubCategories[0] || ""); // Set default sub-category
    }
  }, [categoryData]); // Runs when categoryData changes

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center overflow-hidden relative">
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
                  className={`h-1/12 w-full flex justify-left items-center gap-3 border border-gray-200 rounded-lg shadow-lg p-2 
                    ${
                      selectedCategory === category.id
                        ? "bg-gray-300"
                        : "bg-white hover:bg-gray-200"
                    }`}
                >
                  <img className="w-5/12" src={imgSrc} alt="" />
                  <h1 className="text-lg font-semibold capitalize text-gray-600">
                    {category.name}
                  </h1>
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-full w-3/4">
          <div className="h-2/10 w-full flex justify-start items-center ps-10">
            <div className="w-9/12 h-full flex justify-start items-center text-5xl/15 font-bold text-gray-600">
              <h1>{greeting}</h1>
            </div>
            <div className="w-3/12 h-full flex justify-end items-center">
              <button
                id="home"
                className="h-1/3 w-1/2 bg-[#54c5d5] rounded-s-2xl shadow-xl text-5xl"
                onClick={(e) => handleClick("/", e)}
              >
                <i className="lni lni-home-2" style={{ color: "white" }}></i>
              </button>
            </div>
          </div>
          <div className="h-8/10 w-full px-5 gap-5 content-start pb-20">
            <div className="w-full flex gap-3">
              {uniqueSubCategories.map((subCategory) => (
                <button
                  key={subCategory}
                  onClick={() => handleSubCategoryChange(subCategory)}
                  className={`w-fit text-xl text-gray-600 font-semibold px-5 py-1 rounded-3xl mb-2 shadow-2xl border border-gray-400 ${
                    selectedSubCategory === subCategory
                      ? "bg-gray-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {subCategory ? subCategory : "OTHERS"}
                </button>
              ))}
            </div>
            <div className="h-full w-full overflow-auto grid grid-cols-3 gap-5 content-start pb-20">
              {categoryData.length > 0 ? (
                categoryData
                  .filter(
                    (item) =>
                      item.sub_category_name === selectedSubCategory ||
                      (selectedSubCategory === "ALA CARTE" &&
                        item.sub_category_name === "")
                  )
                  .map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="h-60 w-full rounded-xl border border-gray-200 shadow-xl flex flex-col items-center justify-start"
                      onClick={() => openModal(item)}
                    >
                      {/* Item Image */}
                      <img
                        src={
                          item.image_url
                            ? `./src/${item.image_url
                                .replace(/\\/g, "/")
                                .replace(/\.\w+$/, ".png")}`
                            : "./src/default.png"
                        }
                        alt="Item"
                        className="object-cover rounded-md"
                      />
                      {/* Item Details */}
                      <div className="flex justify-between w-full">
                        <h1 className="w-3/4 font-semibold text-sm p-3 text-gray-600 text-start">
                          {item.name}
                        </h1>
                        <h1 className="w-1/4 font-semibold text-sm p-3 text-gray-600 text-end">
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
        <div className="w-1/4"></div>
        <div className="w-3/4 h-full flex items-center">
          <div className="relative w-1/4"></div>
          <div className="relative w-1/4">
            <img className="rounded-xl w-full" src={outline_logo} alt="" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-base font-bold px-4 py-2 rounded-full transform translate-x-1/2 -translate-y-1/2">
              5
            </span>
          </div>
          <div className="relative w-1/4"></div>
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}

export default Dinein;
