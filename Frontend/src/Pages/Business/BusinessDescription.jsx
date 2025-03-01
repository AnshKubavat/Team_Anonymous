import { motion } from 'framer-motion';
import { Star } from 'lucide-react'; // Assuming you have an icon library like Lucide for stars

const BusinessDescription = ({ business}) => {
  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src="../../../assets/nearbygo_logo.webp"
        alt={business.name}
        className="md:w-64 md:h-64 w-48 h-48 mx-auto rounded-2xl mt-3 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{business.name}</h2>
        <p className="text-gray-700 mb-4">{business.description}</p>
        
        <div className="flex items-center mb-4">
          <span className="text-gray-700 font-semibold mr-2">Rating:</span>
          <div className="flex">
            {renderStars(business.rating)}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-gray-700"><strong>City:</strong> {business.city}</p>
          <p className="text-gray-700"><strong>Category:</strong> {business.category}</p>
          <p className="text-gray-700"><strong>Address:</strong> {business.address}</p>
          <p className="text-gray-700"><strong>Facility:</strong> {business.facility}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessDescription;