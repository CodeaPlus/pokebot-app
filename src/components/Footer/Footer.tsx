import React from 'react';
import { FloatButton } from 'antd';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-[90px] pb-12 bg-[#ea5c8a]">
      <div className="footer-divier-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
        </svg>
      </div>
      <div className="container mx-auto text-white text-center font-semibold">
        <p>All Content is © Copyright of Pokebot.online {currentYear}.</p>
        <p>Pokémon and All Respective Names are Trademark & © of Nintendo 1996-{currentYear}</p>
      </div>
      <FloatButton.BackTop shape='square' />
    </footer>
  );
}

export default Footer;