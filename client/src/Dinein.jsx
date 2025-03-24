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

function Dinein() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(4); // Auto-select promo
  const [categoryData, setCategoryData] = useState([]); // Store fetched data
  const [greeting, setGreeting] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

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
      .get(`http://172.16.0.95:8081/category/${categoryId}`)
      .then((res) => setCategoryData(res.data))
      .catch((err) => console.error("Error fetching category data:", err));
  };

  useEffect(() => {
    axios
      .get("http://172.16.0.95:8081/dinein")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    setGreeting(
      hours < 12
        ? "Good Morning."
        : hours < 18
        ? "Good Afternoon."
        : "Good Evening."
    );

    // Fetch data for the initially selected category
    fetchCategoryData(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center overflow-hidden relative">
      <div className="h-5/6 w-full flex flex-wrap items-center justify-center">
        <div className="h-full w-1/4">
          <div className="h-2/10 w-full flex justify-center items-center">
            <img className="w-10/12" src={outlined_full_logo} alt="" />
          </div>
          <div className="h-8/10 w-full px-5 flex flex-col gap-3">
            {categories.map((category) => {
              let imgSrc;
              switch (
                category.name.toUpperCase() // Normalize to uppercase
              ) {
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
                    fetchCategoryData(category.id); // Fetch data when clicked
                  }}
                  className={`h-1/12 w-full flex justify-left items-center gap-3 border border-gray-200 rounded-lg shadow-lg p-2 
                    ${
                      selectedCategory === category.id
                        ? "bg-gray-300" // Selected button styling
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
          <div className="h-2/10 w-full flex justify-start items-center ps-20 pe-10 text-5xl font-bold text-gray-600">
            <div className="w-7/10 h-full flex justify-start items-center">
              <h1>{greeting}</h1>
            </div>
            <div className="w-3/10 h-full flex justify-end items-center">
              <button
                id="home"
                className="h-1/4 w-1/2 bg-[#54c5d5] rounded-2xl shadow-xl"
                onClick={(e) => handleClick("/", e)}
              >
                <i className="lni lni-home-2" style={{ color: "white" }}></i>
              </button>
            </div>
          </div>
          {/* Display fetched category data */}
          <div className="h-8/10 w-full px-5 overflow-auto grid grid-cols-3 gap-5 content-start pb-20">
            {categoryData.length > 0 ? (
              categoryData.map((item) => (
                <button
                  key={item.id}
                  className="h-60 w-full rounded-md border border-gray-200 shadow-xl flex flex-col items-center justify-star"
                >
                  <img
                    src={
                      item.image_url
                        ? `./src/${
                            item.image_url
                              .replace(/\\/g, "/") // Fix backslashes
                              //.replace(/Picture/, "Pictures") // Correct folder name
                              //.replace(/\.\w+$/, ".jpg") // Convert extension to .png
                              .replace(/\.\w+$/, ".png") // Convert extension to .png
                          }`
                        : "./src/default.png" // Fallback image
                    }
                    alt="Item"
                    className="object-cover rounded-md"
                  />
                  <div className="flex justify-between w-full">
                    <h1 className="w-3/4 font-semibold text-sm p-3 text-gray-600 text-start">
                      {item.name}
                    </h1>
                    <h1 className="w-1/4 font-semibold text-sm p-3 text-gray-600 text-end">
                      P{item.retail_price}
                    </h1>
                  </div>
                </button>
              ))
            ) : (
              <p className="col-span-4 text-gray-600">No data available.</p>
            )}
          </div>
        </div>
      </div>
      <div className="h-1/6 w-full bg-white border-1 border-gray-200 text-gray-600 rounded-t-2xl shadow-2xl px-5 pt-5"></div>
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
    </div>
  );
}

export default Dinein;
