import { useState, useEffect, useRef } from "react";
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
import { translateText } from "../../utils/translateService";
const slides = [
  { id: 1, color: "bg-red-500", image: ad1 },
  { id: 2, color: "bg-blue-500", image: ad2 },
  { id: 3, color: "bg-yellow-400", image: ad3 },
  { id: 4, color: "bg-emerald-500", image: ad4 },
];

const Home = () => {
  const currentSlide = useRef(0);
  const imageRef = useRef(null);
  const sliderRef = useRef(null); // Local state for rendering

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

  // #########################3

  const translateBusinessList = async (list, lang) => {
    if (!list.length) return list;
  
    return await Promise.all(
      list.map(async (business) => ({
        ...business,
        businessName: await translateText(business.businessName, lang),
        categoryOfBusiness: await translateText(business.categoryOfBusiness, lang),
        city: await translateText(business.city, lang), // ✅ Translate city names
      }))
    );
  };
  

  const fetchBusinesses = async () => {
    try {
      const result = await dispatch(fetchAllSeller({ city, category }));
      if (result.payload?.success) {
        const fetchedBusinesses = result.payload?.message?.businesses;

        // 🔹 Apply translation
        const translatedBusinesses = await translateBusinessList(fetchedBusinesses, language);
        setBusinessList(translatedBusinesses);
      } else {
        setBusinessList([]);
      }
    } catch (error) {
      console.error("Error in fetchBusinesses:", error);
    }
  };

  useEffect(() => {
    const applyTranslation = async () => {
      if (businessList.length > 0) {
        const translatedBusinesses = await translateBusinessList(businessList, language);
        setBusinessList(translatedBusinesses);
        const translatedRecommendation = await translateText(recommendations,language)
        setRecommendations(translatedRecommendation)
      }
    };
  
    applyTranslation();
  }, [language]);

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
        const translatedRecommendation = await translateBusinessList(recommendations, language);
        setRecommendations(translatedRecommendation)
        
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
  }, [city, category]); // Fetch businesses & recommendations when city/user chan
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
    const interval = setInterval(() => {
      currentSlide.current = (currentSlide.current + 1) % slides.length;

      // Update the image source directly
      if (imageRef.current) {
        imageRef.current.src = slides[currentSlide.current].image;
      }

      // Update the background color directly
      if (sliderRef.current) {
        sliderRef.current.className = `sliderAx mt-2 mb-10 md:mb-20 relative w-full h-96 ${slides[currentSlide.current].color}`;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FEF6EF]">
 <div ref={sliderRef} className={`sliderAx mt-2 mb-10 md:mb-20 relative w-full h-96 ${slides[0].color}`}>
      <img
        ref={imageRef}
        src={slides[0].image}
        className="w-full h-full object-cover"
        alt="Ad Slide"
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
