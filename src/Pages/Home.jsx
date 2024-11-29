import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -top-10 right-1/2 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-25 rounded-full blur-2xl"></div>

      {/* Content Section */}
      <div className="relative z-10 text-center px-6 py-12 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-xl rounded-2xl max-w-3xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">
            Welcome to <span className="text-yellow-400">Web Dev Quiz Master</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">Test your web development knowledge and become a master!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {/* Feature 1 */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-bold mb-3">📋 15 Questions</h3>
            <p>Carefully crafted questions to test your skills.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-bold mb-3">🌐 Multiple Topics</h3>
            <p>HTML, CSS, JavaScript, and React.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-br from-teal-500 to-green-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-bold mb-3">⚡ Instant Results</h3>
            <p>Get your score and analysis immediately.</p>
          </div>
        </div>

        <Link
          to="/quiz"
          className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-110"
        >
          Start Quiz Now 🚀
        </Link>
      </div>
    </div>
  );
};

export default Home;
