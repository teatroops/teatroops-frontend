import React, { useState, useEffect } from 'react'
import hero1 from '../assets/slider Images/01 slide-Butterfly pea.webp'
import hero2 from '../assets/slider Images/02 slide-Chamomile.webp'
import hero3 from '../assets/slider Images/03 slide - Hibiscus.webp'
import hero4 from '../assets/slider Images/04 slide-Lavender.webp'
import hero5 from '../assets/slider Images/05 slide-PCOD.webp'
import Title from './Title'

// Example images, replace with your actual image imports or URLs
const images = [
    hero3,
    hero1,
    hero2,
    hero4,
    hero5
]

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0)
    const total = images.length

    const prevSlide = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1))
    const nextSlide = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1))

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1))
        }, 5000)
        return () => clearInterval(interval)
    }, [total])

    return (
        <>
            <div className="text-center font-bold mt-2 py-4 text-3xl 3xl:text-4xl 4xl:text-5xl">
                <Title text1={'Organic Herbal Teas'} />
                <p className="w-3/4 m-auto text-xs font-semibold sm:text-sm md:text-base 3xl:text-lg 4xl:text-2xl text-gray-600 ">
                    Discover the magic of nature in every sip—whether it's the calming embrace of chamomile, the immune-boosting lemon & ginger, or the metabolism-supporting butterfly pea flower. Crafted from 100% organic leaves, our herbal teas offer pure, rich flavors while nurturing both your well-being and the planet.
                </p>
            </div>
            <div className="relative w-full h-[250px] sm:h-[500px] md:h-[400px] lg:h-[500px] 3xl:h-[700px] 4xl:h-[900px] flex items-center justify-center overflow-hidden">
                {/* Images */}
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`slide-${idx}`}
                        className={`absolute w-full h-full object-contain sm:object-fill transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    />
                ))}
                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-[--primary-color] rounded-full p-1 sm:p-2 shadow-md z-20"
                    aria-label="Previous Slide"
                >
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 3xl:w-8 3xl:h-8 4xl:w-10 4xl:h-10 text-[--primary-color] hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-[--primary-color] rounded-full p-1 sm:p-2 shadow-md z-20"
                    aria-label="Next Slide"
                >
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 3xl:w-8 3xl:h-8 4xl:w-10 4xl:h-10 text-[--primary-color] hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 md:w-3 md:h-3 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 rounded-full ${idx === current ? 'bg-[--primary-color]' : 'bg-white border border-[--primary-color]'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default HeroCarousel