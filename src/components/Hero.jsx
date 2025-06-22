import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <section className="relative w-full h-auto z-0">
      {/* Background Image for Desktop/Tablet */}
      <img
        src={assets.hero_img}
        alt="Hero"
        className="w-full object-cover h-auto hidden md:block md:h-[500px] lg:h-[600px]"
      />
      {/* Background Image for Mobile */}
      <img
        src={assets.hero_img_mobile}
        alt="Hero Mobile"
        className="w-full object-cover block md:hidden"
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

      {/* Overlay text for mobile only (on image) */}
      <div className="block md:hidden absolute inset-0  flex-col items-center justify-center px-4 py-6 text-center">
        <h1 className="text-white font-bold text-2xl leading-tight  rounded-md px-2 py-1">
          Rooted in nature, <br />
          crafted to nourish — <br />
          let your body bloom <br />

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
