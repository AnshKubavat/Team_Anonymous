import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Card = ({ businessList = [] }) => {
  const navigate = useNavigate();
  console.log(businessList);

  const renderStars = (count) => {
    return Array(count)
      .fill()
      .map((_, i) => <span key={i}>⭐</span>);
  };

  return businessList.map((business, index) => (
    <motion.div
      key={index}
      onClick={() => navigate(`/business/${business._id}`)}
      className="relative p-5 bg-white rounded-2xl shadow-lg overflow-hidden"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={business.image}
        alt={business.image}
        className="w-full h-40 object-cover rounded-xl"
      />
      <h2 className="mt-4 text-lg text-black text-center font-bold">
        {business.businessName}
      </h2>
      <p className="text-sm text-center md:text-lg text-black mt-2">
        {business.categoryOfBusiness}
      </p>

      <motion.div
        className="flex items-center justify-center gap-1"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {renderStars(5)}
      </motion.div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-blue-500 font-medium">
          {business.city} | {business?.distance || "2.4 km"}
        </span>
      </div>
    </motion.div>
  ));
};

export default Card;
