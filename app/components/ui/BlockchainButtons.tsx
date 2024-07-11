import React from 'react';

const BlockchainButtons: React.FC = () => {
  return (
    <div className="text-center mt-0 sm:mt-0 md:mt-0 lg:mt-0">
      <div className="shimmer-container mt-2 sm:mt-2 lg:mt-2 relative overflow-hidden rounded-full inline-flex">
        <a
          href="https://discord.gg/pugdag"
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-white text-[#273c75] font-bold py-3 px-4 sm:py-4 sm:px-8 rounded-full mr-2 inline-flex items-center border border-[#273c75]" // Ajoutez la classe border ici
        >
          Join us
          <svg
            className="ml-2 w-5 h-5 sm:w-6 sm:h-6 svg-sway"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
          <div className="shimmer-line"></div>
        </a>
        <a
          href="/whitepaper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-[#273c75]/20 text-[#273c75] font-bold py-2 px-3 sm:py-4 sm:px-8 rounded-full backdrop-blur-md border border-[#273c75] inline-flex items-center"
        >
          Read the whitepaper
        </a>
      </div>
      <div className="mt-16">
        <img src="/pugVsDoge.png" alt="PugDAG Illustration" className="inline-block" />
      </div>
    </div>
  );
};

export default BlockchainButtons;

