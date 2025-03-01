import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../utils/localStorageManager";
// import Card from "../../components/Card";
import locales from "../../locales/local.json";
import { fetchAllSeller } from "../../features/businessSlice";
import Card from "../../components/Card";
import ad1 from "../../assets/ad1.jpg";
import ad2 from "../../assets/ad2.jpg";
import ad3 from "../../assets/ad3.png";
import ad4 from "../../assets/ad4.jpg";
import axiosClient from "../../utils/axiosClient";
const slides = [
  { id: 1, color: "bg-red-500", image: ad1 },
  { id: 2, color: "bg-blue-500", image: ad2 },
  { id: 3, color: "bg-yellow-400", image: ad3 },
  { id: 4, color: "bg-emerald-500", image: ad4 },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [businessList, setBusinessList] = useState([]);
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { language } = useSelector((state) => state.user);
  const { category } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const city = getItem("city");
  console.log(category);
  console.log(language);

  const t = locales[language];

  const fetchBusinesses = async () => {
    try {
      const result = await dispatch(fetchAllSeller({ city, category }));
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
  const userId = user?._id;

  const fetchRecommendations = async () => {
    try {
      if (!userId) return;
      console.log("Fetching recommendations for user:", userId);

      const response = await axiosClient.post("/recommend", {
        user_id: userId,
        city,
      });

      console.log("API Response:", response.data);

      if (response.data?.length > 0) {
        setRecommendations(response.data);
      } else {
        setRecommendations([]);
        console.log("No recommendations found");
      }
    } catch (error) {
      console.log(error);
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchBusinesses();
    }
    if (userId) {
      fetchRecommendations();
    }
  }, [city, userId, category]); // Fetch businesses & recommendations when city/user changes

  useEffect(() => {
    if (businessList.length > 0 && !isLocationFetched) {
       getUserLocationAndCalculateDistances();
      setIsLocationFetched(true);
    }
  }, [businessList]);
  
const getUserLocationAndCalculateDistances = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        try {
          const response = await axiosClient.post("/location", {
            userLatitude,
            userLongitude,
            businessLocations: businessList
              .filter(business => business.businessLocation?.latitude && business.businessLocation?.longitude)
              .map(business => ({
                id: business._id,
                latitude: business.businessLocation.latitude,
                longitude: business.businessLocation.longitude,
              }))
          });

          const updatedBusinessList = businessList.map(business => {
            const distanceInfo = response.data.find(item => item.id === business._id);
            return { ...business, distance: distanceInfo ? distanceInfo.distance : "N/A" };
          });

          setBusinessList(updatedBusinessList);
        } catch (error) {
          console.error("Error calculating distances:", error);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  useEffect(() => {
    if (businessList.length > 0 && !isLocationFetched) {
       getUserLocationAndCalculateDistances();
      setIsLocationFetched(true);
    }
  }, [businessList]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FEF6EF]">
      <div
        className={`sliderAx mt-2 mb-10 md:mb-20 relative w-full h-96 ${slides[currentSlide].color}`}
      >
        <img
          src={`${slides[currentSlide].image}`}
          className="w-full h-full object-cover "
          alt=""
        />
      </div>

      <div>
        <h1 className="text-xl md:text-4xl font-bold text-left mt-10 md:mt-16 ml-4 md:ml-10">
          {t.recommendation}
        </h1>
        <div>
          <section className="dark:bg-dark mt-4 mx-4 md:mx-10 pb-10 md:pb-20">
            <div className="container mx-auto">
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <Card businessList={recommendations} />
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  {t.no_recommendations}
                </p>
              )}
            </div>
          </section>
        </div>

        {/* All Businesses Section */}
        <h1 className="text-xl md:text-4xl font-bold text-left mt-10 md:mt-16 ml-4">
          {t.explore}
        </h1>

        <section className="dark:bg-dark mt-4 mx-4 md:mx-10 pb-10 md:pb-20">
          <div className="container mx-auto">
            {businessList.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card businessList={businessList} />
              </div>
            ) : (
              `${t.no_recommendations}`
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
