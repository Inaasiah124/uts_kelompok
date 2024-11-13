import React from 'react';

function Footer() {
  return (
    <footer className="relative bg-white text-gray-800 shadow-md">
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(67, 56, 200, 0.2)" // Warna indigo transparan
            d="M0,32L48,53.3C96,75,192,117,288,122.7C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,90.7C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="rgba(67, 56, 200, 0.4)" // Warna indigo transparan yang lebih gelap
            d="M0,96L48,106.7C96,117,192,139,288,133.3C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Aplikasi kami. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
