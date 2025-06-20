import React, { useState, useEffect } from 'react'
import Title from './Title';

const testimonialsData = [
    {
        text: '"The best hibiscus tea I’ve ever had. Smooth, aromatic, and actually helps my sleep! 🌙"',
        name: '– Suman Kumar Rana',
    },
    {
        text: '"No artificial flavors, just natural goodness. Exactly what I was looking for. 🍃"',
        name: '– Suneja Mohit',
    },
    {
        text: '"Soothing and flavorful. Replaced my regular tea with this every morning. ☕"',
        name: '– Mugdha Sachdeva',
    },
    {
        text: '"Best herbal teas! The aromas are subtle and natural – loved all the flavors. 🌼"',
        name: '– Mugdha Sachdeva',
    },
    {
        text: '"Natural product 🌿 – calming and refreshing tea for anytime of day!"',
        name: '– Shilpi Rana',
    },
    {
        text: '"Great in taste and fragrance – flower based teas that feel close to nature. 🌸"',
        name: '– Sunil Singh',
    },
    {
        text: '"Best tea with health benefits! Hibiscus tea is amazing for BP and immunity. 💪"',
        name: '– Asheeran Punjabi',
    },
    {
        text: '"A peaceful sip from the peaks 🏔️ – Chamomile tea with a calming experience."',
        name: '– Juhi Gaur',
    },
    {
        text: '"Nice! Organic teas with good aroma and value for money. 👍"',
        name: '– Suneja Mohit',
    },
    {
        text: '"The best! Helped me sleep better and tastes smooth. 🎁✨"',
        name: '– Suman Kumar Rana',
    },
];

const getSlidesToShow = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
};

const Testimonials = () => {
    const [current, setCurrent] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

    useEffect(() => {
        const handleResize = () => setSlidesToShow(getSlidesToShow());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = testimonialsData.length - slidesToShow;
    const goPrev = () => setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1));
    const goNext = () => setCurrent((prev) => (prev === maxIndex ? 0 : prev + 1));

    // Ensure current index is always valid if slidesToShow changes
    useEffect(() => {
        if (current > maxIndex) setCurrent(0);
    }, [slidesToShow, maxIndex, current]);

    return (
        <div className='my-10 text-center relative'>
            <div className='text-center font-bold mt-2 py-4 text-3xl'>
                <Title text1={'Our Customer Say'} />
            </div>
            <div className="relative flex items-center justify-center mt-6 px-4">
                {/* Left Arrow */}
                <button
                    onClick={goPrev}
                    className="absolute left-0 z-10  bg-white/80 hover:bg-[--primary-color] rounded-full p-2 shadow-md"
                    aria-label="Previous"
                >
                    <svg className="w-6 h-6  hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                {/* Testimonials */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto `}>
                    {testimonialsData.slice(current, current + slidesToShow).map((t, idx) => (
                        <div
                            key={idx}
                            className='p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-between min-h-[180px] h-full'
                        >
                            <p className='italic text-gray-600'>{t.text}</p>
                            <p className='mt-2 text-[--primary-color] text-sm font-semibold text-right'>{t.name}</p>
                        </div>
                    ))}
                </div>
                {/* Right Arrow */}
                <button
                    onClick={goNext}
                    className="absolute right-0 z-10 bg-white/80 hover:bg-[--primary-color] rounded-full p-2 shadow-md hover:text-white"
                    aria-label="Next"
                >
                    <svg className="w-6 h-6 hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: testimonialsData.length - slidesToShow + 1 }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full ${idx === current ? 'bg-green-600' : 'bg-white border border-green-600'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;