import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <section className="relative w-full h-auto z-0">
      {/* Background Image */}
      <img
        src={assets.hero_img}
        alt="Hero"
        className="w-full object-cover md:h-[500px] lg:h-[600px] h-auto"
      />

      {/* Overlay text for tablet and desktop */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center md:justify-start md:pl-8 lg:pl-12 px-4 py-6">
        <div className="text-left max-w-[90%] md:max-w-[60%] lg:max-w-[40%] mt-[-11rem]">
          <h1 className="text-[--primary-color] font-bold leading-snug text-2xl md:text-3xl lg:text-[2.7rem] lg:leading-[1]">
            Rooted in <br />
            nature, crafted <br />
            to nourish — let <br />
            your body bloom
          </h1>
          <Link to="/collection">
            <button className="mt-6 px-6 py-2 bg-white text-[--primary-color] border border-[--primary-color] font-semibold rounded-full hover:bg-[--primary-color] hover:text-white transition duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      {/* Text below image for mobile only */}
      <div className="block md:hidden px-4 py-6 text-center bg-white/90 rounded-md">
        <h1 className="text-[--primary-color] font-bold text-3xl leading-snug">
          Rooted in <br />
          nature, crafted <br />
          to nourish — let <br />
          your body bloom
        </h1>
        <Link to="/collection">
          <button className="mt-6 px-6 py-2 bg-white text-[--primary-color] border border-[--primary-color] font-semibold rounded-full hover:bg-[--primary-color] hover:text-white transition duration-300">
            Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
