import React from 'react';
import '../pages/SSCIT.css'; // Assuming a separate CSS file for detailed styling
import '@fortawesome/fontawesome-free/css/all.min.css';
import SS from '../assets/SS.png'
import { Link } from 'react-router-dom';
const SCITPage = () => {
  return (
    <div className="bg-black text-green-400 text-center h-screen flex flex-col justify-between font-mono">
      {/* Banner Section with smooth fade-in */}
      <div className="py-12 flex flex-col items-center animate-fadeIn">
        <img src={SS} alt="SCIT Logo" className="w-32 h-auto mx-auto animate-pulse" />
        <div className="text-5xl font-extrabold mt-6 text-neon-green animate-glow">Abdulhannan</div>
        <div className="text-2xl mt-2 mb-6 text-neon-orange animate-type">SSCIT Coding Arena Champion</div>
      </div>

      {/* Contact Section */}
      <div className="text-lg mb-8 animate-slideInUp">
        Reach out: 
        <a 
          href="mailto:abdulhannan@scitcodingarena.com" 
          className="text-neon-green hover:text-neon-orange transition duration-300"
        >
          abdulhannan03086@gmail.com
        </a>
      </div>

      {/* Links Section */}
      <div className="flex justify-center gap-4 mb-6 animate-slideInUp">
        
          <a
            
            href="https://github.com/AbdulHannan031?tab=repositories"
            className="border-2 border-neon-green py-2 px-4 rounded hover:bg-neon-green hover:text-black transition duration-300 transform hover:scale-105 shadow-neon"
            target='_blank'
          >
            Projects
          </a>
          <Link to='/about'  className="border-2 border-neon-green py-2 px-4 rounded hover:bg-neon-green hover:text-black transition duration-300 transform hover:scale-105 shadow-neon"> About</Link>
        
      </div>

      {/* Social Icons Section */}
      <div className="flex justify-center gap-6 mt-6 animate-slideInUp">
        {[
          { icon: 'github', url: 'https://github.com/AbdulHannan031' },
         
          { icon: 'instagram', url: 'https://www.instagram.com/waithoneywho/' },
          { icon: 'linkedin', url: 'https://www.linkedin.com/in/abdul-hannan-99b743281/' },
          
        ].map((social, index) => (
          <a
            key={index}
            href={social.url}
            className="text-green-400 text-3xl hover:text-neon-orange transition duration-300 transform hover:scale-110"
            target="_blank"
          >
            <i className={`fab fa-${social.icon}`}></i>
          </a>
        ))}
      </div>

      {/* FontAwesome Script */}
      <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></script>
    </div>
  );
};

export default SCITPage;

