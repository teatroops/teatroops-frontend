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
        className="w-full object-cover h-auto hidden md:block md:h-[300px] lg:h-[600px] 3xl:h-[800px] 4xl:h-[1000px]"
      />
      {/* Background Image for Mobile */}
      <img
        src={assets.hero_img_mobile}
        alt="Hero Mobile"
        className="w-full object-cover block md:hidden"
      />

      {/* Overlay text for tablet and desktop */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center md:justify-start md:pl-8 lg:pl-12 px-4 py-6">
        <div className="text-left max-w-[90%] md:max-w-[60%] lg:max-w-[40%] mt-[-6rem] md:mt-[-5rem] lg:mt-[-12rem] 3xl:mt-[-13rem] 4xl:mt-[-15rem]">
          <h1 className="text-[--primary-color] font-bold leading-snug text-xl md:text-2xl lg:text-[2.7rem] 3xl:text-[3.5rem] 4xl:text-[5rem] lg:leading-[1]">
            Rooted in <br />
            nature, crafted <br />
            to nourish — let <br />
            your body bloom
          </h1>
          <Link to="/collection">
            <button className="mt-6 px-6 py-2 bg-white text-[--primary-color] border border-[--primary-color] font-semibold rounded-full hover:bg-[--primary-color] hover:text-white transition duration-300 md:px-6 md:py-2 md:text-sm lg:px-10 lg:py-4 lg:text-xl 3xl:px-8 3xl:py-3 3xl:text-lg 4xl:px-14 4xl:py-4 4xl:text-2xl">
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
