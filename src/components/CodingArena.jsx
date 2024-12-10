import React from 'react';
import logo from '../assets/logo.png';
import Sponser from '../assets/a.png';
import { Link } from 'react-router-dom';
import im from '../assets/com.png';
const CodingArena = () => {

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-12 text-center px-4 md:px-8 lg:px-16">
      {/* SSCIT Logo */}
      <img src={logo} alt="SSCIT Logo" className="w-24 h-auto mb-4 md:w-32 lg:w-40" />

      {/* Title and Subtitle */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome to SSCIT Coding Arena!</h1>
      <p className="text-gray-600 mt-2 mb-8 text-base md:text-lg lg:text-xl">
        Dive into the thrilling world of coding challenges and unlock your programming potential with us.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center space-x-0 space-y-4 md:space-y-0 md:space-x-4 mb-12">
        <Link
          to="/challenges"
          className="bg-yellow-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 w-full md:w-auto"
        >
          Start Challenges
        </Link>
        <Link
          to="/scoreboard"
          className="bg-yellow-700 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-800 w-full md:w-auto"
        >
          View Scoreboard
        </Link>
        <a
          href="https://case.edu.pk/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-800 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-900 w-full md:w-auto"
        >
          SSCIT Official Website
        </a>
      </div>

      {/* Technical Sponsor Section */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 mt-8">Technical Sponsor</h2>
      <a href="https://codify.kesug.com" target="_blank" rel="noopener noreferrer">
        <img src={Sponser} alt="Technical Sponsor" className="w-16 h-auto mt-4 mb-12 md:w-20" />
      </a>

      {/* Upcoming Event Section */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-700">Upcoming Event!</h2>
      <img src={im} alt="Upcoming Event" className="w-24 h-auto mt-4 md:w-32" />
      <p className="text-gray-800 mt-2 text-base md:text-lg font-bold">Speed Code</p>
      <p className="text-gray-500 text-sm">BY IEEE</p>
    </div>
  );
};

export default CodingArena;
