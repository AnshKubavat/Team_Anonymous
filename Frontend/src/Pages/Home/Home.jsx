import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllSeller } from "../../features/businessSlice";
import { getItem } from "../../utils/localStorageManager";
import axiosClient from "../../utils/axiosClient";

const slides = [
  { id: 1, color: "bg-red-500", img: "Slider-1.jpg", text: "YP's Hotel" },
  { id: 2, color: "bg-blue-500" },
  { id: 3, color: "bg-yellow-400" },
  { id: 4, color: "bg-emerald-500" },
  { id: 5, color: "bg-violet-500" },
  { id: 6, color: "bg-orange-500" },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const city = getItem("city");








  return (
    <div>
      <div className="sliderAx mt-2 mb-10 md:mb-20 relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-full ${index === currentSlide ? "block" : "hidden"}`}
          >
            <img
              className="w-full h-auto max-h-[60vh] object-cover"
              src="/Slider-1.jpg"
              alt={slide.text}
            />
          </div>
        ))}
      </div>

      <div>
        <h1 className="text-xl md:text-4xl font-bold text-left mt-10 md:mt-16 ml-4 md:ml-10">
        Recommended for you
        </h1>
        <section className="dark:bg-dark mt-4 mx-4 md:mx-10 pb-10 md:pb-20">
          <div className="container mx-auto">
          </div>
        </section>

        {/* All Businesses Section */}
        <h1 className="text-xl md:text-4xl font-bold text-left mt-10 md:mt-16 ml-4">
        Explore Businesses
        </h1>

        <section className="dark:bg-dark mt-4 mx-4 md:mx-10 pb-10 md:pb-20">
          <div className="container mx-auto">
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
