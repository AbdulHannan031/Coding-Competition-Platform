import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Header Section */}
      <motion.h1
        className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 tracking-wide mt-10 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Welcome to SCIT Coding Arena
      </motion.h1>
      <motion.p
        className="text-center text-lg md:text-xl lg:text-2xl mt-4 mb-8 text-gray-400 px-4 md:px-20 lg:px-40 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        Your ultimate coding training ground designed to prepare you for real-world challenges.
      </motion.p>

      {/* What is SCIT Coding Arena? */}
      <motion.div
        className="max-w-4xl bg-gray-800 text-gray-300 p-8 rounded-lg shadow-lg z-10 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">What is SCIT Coding Arena?</h2>
        <p>
          SCIT Coding Arena is an advanced platform for aspiring coders, programming enthusiasts, and professionals. 
          It offers a wide variety of challenges to help you enhance your skills in a real-world environment.
        </p>
      </motion.div>

      {/* What is the Coding Arena? */}
      <motion.div
        className="max-w-4xl bg-gray-800 text-gray-300 p-8 rounded-lg shadow-lg z-10 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">What is the Coding Arena?</h2>
        <p>
          The Coding Arena allows participants to solve programming challenges and improve their skills. Choose your preferred language and test your problem-solving abilities.
        </p>
        <ul className="list-disc pl-6 mt-4">
          <li>C</li>
          <li>C++</li>
          <li>Python</li>
          <li>Java</li>
        </ul>
      </motion.div>

      {/* Coding Arena Section */}
      <motion.div
        className="max-w-4xl bg-gray-800 text-gray-300 p-8 rounded-lg shadow-lg z-10 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Welcome to SCIT Coding Arena</h2>
        <p>
          Choose your preferred programming language and dive into solving exciting challenges. Our AI-powered judge will evaluate your solutions and provide instant feedback.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {['C', 'C++', 'Python', 'Java'].map((language, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-gray-800 border border-yellow-400 text-yellow-400 p-4 rounded-lg shadow-lg"
              whileHover={{ scale: 1.1, rotate: 3 }}
            >
              <h3 className="text-xl font-bold mb-2">{language}</h3>
              
            </motion.div>
          ))}
        </div>
      </motion.div>

      
      {/* Footer Section */}
      <div className="flex space-x-4 mt-6 z-10">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px 2px yellow" }}
          className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-lg transition-all duration-300"
          onClick={() => navigate('/about')}
        >
          Home
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px 2px yellow" }}
          className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-lg transition-all duration-300"
          onClick={() => navigate('/')}
        >
          Enter the Arena!
        </motion.button>
      </div>
    </div>
  );
}

export default LearnMore;
