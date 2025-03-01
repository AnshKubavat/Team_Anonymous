import { motion } from "framer-motion";
import { useState } from "react";

const ProductCard = ({ product }) => {
    return (
        <motion.div
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 w-full max-w-full sm:w-72"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
        >
            
            <div className="w-full  h-40 overflow-hidden rounded-lg">
                <img src="../../../assets/nearbygo_logo.webp" alt={product.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold mt-3">{product.name}</h3>
            <p className="text-gray-600 mt-1">${product.price}</p>
            <p className="text-gray-500 mt-2 text-sm">{product.description}</p>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 mt-3  text-white px-4 py-2 rounded"
          >
            Book Service
          </motion.button>
        </motion.div>
    );
};

const ServiceSection = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            description: "High-quality wireless headphones with noise cancellation.",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            name: "Smartwatch",
            price: 199.99,
            description: "Feature-packed smartwatch with health tracking.",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 3,
            name: "Gaming Mouse",
            price: 49.99,
            description: "Ergonomic gaming mouse with RGB lighting.",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 3,
            name: "Gaming Mouse",
            price: 49.99,
            description: "Ergonomic gaming mouse with RGB lighting.",
            image: "https://via.placeholder.com/150"
        }
        , {
            id: 3,
            name: "Gaming Mouse",
            price: 49.99,
            description: "Ergonomic gaming mouse with RGB lighting.",
            image: "https://via.placeholder.com/150"
        }, {
            id: 3,
            name: "Gaming Mouse",
            price: 49.99,
            description: "Ergonomic gaming mouse with RGB lighting.",
            image: "https://via.placeholder.com/150"
        }, {
            id: 3,
            name: "Gaming Mouse",
            price: 49.99,
            description: "Ergonomic gaming mouse with RGB lighting.",
            image: "https://via.placeholder.com/150"
        }
    ]);

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className=" overflow-y-auto gap-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default ServiceSection;