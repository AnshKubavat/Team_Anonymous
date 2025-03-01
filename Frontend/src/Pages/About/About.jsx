// import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Our Story */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-2xl border">
        <h2 className="text-3xl font-bold mb-4">📌 Our Story – Why We Started</h2>
        <p className="text-lg text-gray-700">
          In every city, newcomers struggle to find essential services like tailors, food joints, rickshaw pullers, and stationery shops.
          <strong> We saw a gap</strong>—local businesses lacked visibility, making it hard for customers to discover nearby services.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          That&apos;s why we built <strong>[Your Platform Name]</strong>—a one-stop solution to bridge this gap by connecting users with small businesses and local services effortlessly.
        </p>
        <img src="/images/story.png" alt="Our Story" className="mt-6 w-full rounded-lg" />
      </div>

      {/* Meet the Founders */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-2xl border">
        <h2 className="text-3xl font-bold mb-4">👨‍💻 Meet the Founders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Ansh Kubavat", "Dev Mali", "Neel Sathvara", "Nevil Nakrani"].map((name, index) => (
            <motion.div whileHover={{ scale: 1.05 }} key={index} className="text-center">
              <img
                src={`/images/founders/${name.toLowerCase().replace(/ /g, "_")}.png`}
                alt={name}
                className="w-32 h-32 mx-auto rounded-full"
              />
              <h3 className="text-xl font-semibold mt-3">{name}</h3>
              <p className="text-gray-500">Full Stack Developer</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Journey & Evolution */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-2xl border">
        <h2 className="text-3xl font-bold mb-4">🚀 Our Journey & Evolution</h2>
        <p className="text-lg text-gray-700">
          Since launching, we have:
          <ul className="list-disc ml-6 mt-2">
            <li>✔ Helped <strong>X</strong> small businesses gain online visibility.</li>
            <li>✔ Connected <strong>Y</strong> users with essential services.</li>
            <li>✔ Introduced <strong>real-time rickshaw booking</strong> for hassle-free transportation.</li>
          </ul>
        </p>
        <img src="/images/journey.png" alt="Our Journey" className="mt-6 w-full rounded-lg" />
      </div>

      {/* Our Mission & Vision */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-2xl border">
        <h2 className="text-3xl font-bold mb-4">🎯 Our Mission & Vision</h2>
        <p className="text-lg text-gray-700">
          ✅ Empower local businesses with <strong>digital visibility</strong>.
          <br />✅ Help newcomers <strong>explore a city effortlessly</strong>.
          <br />✅ Optimize <strong>local transportation and services</strong> using smart technology.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          💡 <strong>Vision:</strong> We aim to be the <strong>go-to digital assistant</strong> for every city, helping millions of users find trusted local businesses instantly.
        </p>
        <img src="/images/mission.png" alt="Our Mission" className="mt-6 w-full rounded-lg" />
      </div>

      {/* Call to Action */}
      <div className="text-center mt-6">
        <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Join Us Today
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
