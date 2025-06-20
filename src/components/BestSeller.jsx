import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const sliderRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Scroll logic
  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    setIsAtStart(el.scrollLeft <= 5);
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
  };

  const scrollLeft = () => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: -250, behavior: 'smooth' });
  };
  const scrollRight = () => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: 250, behavior: 'smooth' });
  };

  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestseller));
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [bestSeller]);

  return (
    <div className='my-10'>
      <div className='text-center font-bold mt-2 py-4 text-3xl'>
        <Title text1={'Best Sellers'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Handpicked favorites, loved by our Tea Troops! These blends have become staples in the daily rituals of our loyal customers.
        </p>
      </div>

      {/* Horizontal Scroll Slider with Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          disabled={isAtStart}
          className={`absolute hover:text-white  left-0 top-1/2 -translate-y-1/2 z-10 bg-green-300 border border-green-700 rounded-full shadow p-2 flex items-center justify-center transition-opacity duration-200 ${isAtStart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[--primary-color]'}`}
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          disabled={isAtEnd}
          className={`absolute hover:text-white right-0 top-1/2 -translate-y-1/2 z-10 bg-green-300 border border-green-700  rounded-full shadow p-2 flex items-center justify-center transition-opacity duration-200 ${isAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[--primary-color]'}`}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <div ref={sliderRef} className="overflow-x-auto scroll-smooth px-4 py-4">
          <div className="flex gap-6 snap-x snap-mandatory">
            {bestSeller.map((item, index) => (
              <div key={index} className="min-w-[220px] snap-start shrink-0">
                <ProductItem
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestSeller
