import React from 'react';
import { FaBookOpen, FaPhoneAlt, FaTrophy, FaUsers, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="text-white body-font bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/school.jpg')" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-center">
              Welcome to Government High School Nalyapadavu
            </h1>
            <p className="mb-8 leading-relaxed text-center max-w-xl">
              We provide quality education and an excellent learning environment to empower your future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/academics')}
                className="inline-flex items-center gap-2 text-white bg-blue-400 border-0 py-2 px-6 focus:outline-none hover:bg-blue-500 transform hover:scale-105 transition duration-300 rounded text-lg shadow-md"
              >
                <FaBookOpen />
                Explore Us
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 text-white bg-transparent border border-white py-2 px-6 hover:bg-white hover:text-slate-800 transform hover:scale-105 transition duration-300 rounded text-lg"
              >
                <FaPhoneAlt />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Feature Highlights Section */}
      <section className="bg-blue-100 py-16 px-4 text-center text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-slate-800">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <FaBookOpen className="text-blue-600 text-4xl mb-3" />
              <h3 className="font-semibold text-lg mb-1">Strong Academics</h3>
              <p className="text-sm">Focused and value-based curriculum for all students.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaTrophy className="text-green-600 text-4xl mb-3" />
              <h3 className="font-semibold text-lg mb-1">Sports & Development</h3>
              <p className="text-sm">Sports and co-curriculars are top priorities.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaUsers className="text-purple-600 text-4xl mb-3" />
              <h3 className="font-semibold text-lg mb-1">Student Growth</h3>
              <p className="text-sm">We nurture leadership and personal development.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaStar className="text-yellow-500 text-4xl mb-3" />
              <h3 className="font-semibold text-lg mb-1">Trusted Support</h3>
              <p className="text-sm">Supported by Vidya Divige Trust, Padavu Club & Saraswatha Foundation.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
