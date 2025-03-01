import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../utils/localStorageManager";
import Card from "../../components/Card";

const slides = [
  { id: 1, color: "bg-red-500", text: "YP's Hotel" },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={`sliderAx mt-2 mb-10 md:mb-20 relative w-full h-60 ${slides[currentSlide].color}`}></div>

      <div>
        <h1 className="text-xl md:text-4xl font-bold text-left mt-10 md:mt-16 ml-4 md:ml-10">
          Recommended for you
        </h1>
        <section className="dark:bg-dark mt-4 mx-4 md:mx-10 pb-10 md:pb-20">
          <div className="container mx-auto"></div>
        </section>

        {/* All Businesses Section */}
        <h1 className="text-xl md:text-4xl font-bold text-left mt-10 md:mt-16 ml-4">
          Explore Businesses
        </h1>

        <section className="dark:bg-dark mt-4 mx-4 md:mx-10 pb-10 md:pb-20">
          <div className="container mx-auto"></div>
        </section>
      </div>
    </div>
  );
};

export default Home;
