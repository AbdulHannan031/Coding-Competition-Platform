import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Title */}
      <motion.h1
        className=" text-center text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 tracking-wide mb-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        SSCIT Coding ARENA
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-center text-lg md:text-xl lg:text-2xl mt-4 mb-8 text-gray-400 px-4 md:px-20 lg:px-40 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        Dive into the thrilling world of coding challenges and unlock your programming potential with us.
      </motion.p>

      {/* Animated Technology Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12 px-4 md:px-12 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        {['C', 'C++', 'Python', 'Java'].map((tech, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-center bg-gray-800 border border-yellow-400 text-yellow-400 p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {tech}
          </motion.div>
        ))}
      </motion.div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6 z-10">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px 2px yellow" }}
          className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-lg transition-all duration-300"
          onClick={() => navigate('/learnmore')}
        >
          Learn More
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px 2px yellow" }}
          className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-lg transition-all duration-300"
          onClick={() => navigate('/')}
        >
          Enter the Arena!
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px 2px yellow" }}
          className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-lg transition-all duration-300"
          onClick={() => navigate('/SSCIT')}
        >
          About
        </motion.button>
      </div>
    </div>
  );
}

export default About;