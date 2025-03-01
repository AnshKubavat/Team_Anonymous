import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../utils/localStorageManager";
// import Card from "../../components/Card";
import { fetchAllSeller } from "../../features/businessSlice";
import Card from "../../components/Card";
import image from "../../assets/image.jpg"

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
  const [businessList, setBusinessList] = useState([]);
  const [isLocationFetched, setIsLocationFetched] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { language } = useSelector((state) => state.user);
  const { category } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const city = getItem("city");
  console.log(category);

  const fetchBusinesses = async () => {
    try {
      const result = await dispatch(fetchAllSeller(city, category));
      if (result.payload?.success) {
        setBusinessList(result.payload?.message?.businesses);
      } else {
        setBusinessList([]);
        console.error("Error in fetchBusinesses:", result.payload?.message);
      }
    } catch (error) {
      console.error("Error in fetchBusinesses:", error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchBusinesses();
    }
  }, [city]);

  useEffect(() => {
    if (businessList.length > 0 && !isLocationFetched) {
      // getUserLocationAndCalculateDistances();
      setIsLocationFetched(true);
    }
  }, [businessList]);

  const dummyBusinessList = [
  {
    _id: "1",
    businessName: "Sunrise Cafe",
    categoryOfBusiness: "Restaurant",
    city: "Vallabh Vidyanagar",
    distance: "1.2 km",
    image: image,
  },
  {
    _id: "2",
    businessName: "Tech Hub",
    categoryOfBusiness: "Electronics Store",
    city: "Vallabh Vidyanagar",
    distance: "3.5 km",
    image: image,
  },
  {
    _id: "3",
    businessName: "Green Earth",
    categoryOfBusiness: "Organic Market",
    city: "Vallabh Vidyanagar",
    distance: "2.1 km",
    image: image,
  },
  {
    _id: "4",
    businessName: "Fit Life Gym",
    categoryOfBusiness: "Fitness Center",
    city: "Vallabh Vidyanagar",
    distance: "4.8 km",
    image: image,
  },
  {
    _id: "5",
    businessName: "Dream Salon",
    categoryOfBusiness: "Beauty & Spa",
    city: "Vallabh Vidyanagar",
    distance: "3.0 km",
    image: image,
  },
];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className={`sliderAx mt-2 mb-10 md:mb-20 relative w-full h-60 ${slides[currentSlide].color}`}
      ></div>

      <div>
        <h1 className="text-xl md:text-4xl font-bold text-left mt-10 md:mt-16 ml-4 md:ml-10">
          Recommended for you
        </h1>
        <div>
        
        <section className="dark:bg-dark mt-4 mx-4 md:mx-10 pb-10 md:pb-20">
          <div className="container mx-auto">
            {dummyBusinessList.length > 0 ? (
              <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card businessList={dummyBusinessList} />
              </div>
            ) : (
              <p className="text-center text-gray-500">
                no record found
              </p>
            )}
          </div>
          </section>
          </div>

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
