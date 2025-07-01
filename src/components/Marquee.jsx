import React, { useRef, useState } from 'react';

const Marquee = () => {
    const marqueeRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseEnter = () => {
        if (marqueeRef.current) {
            marqueeRef.current.style.animationPlayState = 'paused';
            setIsPaused(true);
        }
    };

    const handleMouseLeave = () => {
        if (marqueeRef.current) {
            marqueeRef.current.style.animationPlayState = 'running';
            setIsPaused(false);
        }
    };

    return (
        <div className="bg-[--primary-color] text-white py-2 3xl:py-3 4xl:py-4 overflow-hidden">
            <div
                ref={marqueeRef}
                className="animate-marquee whitespace-nowrap text-sm 3xl:text-lg 4xl:text-2xl"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Subscribe for 10% off your first order!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">🎉 Enjoy 10% off your Monthly Subscription!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Share your experience with us via a reel and receive a free product worth ₹185!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Subscribe for 10% off your first order!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">🎉 Enjoy 10% off your Monthly Subscription!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Share your experience with us via a reel and receive a free product worth ₹185!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Subscribe for 10% off your first order!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">🎉 Enjoy 10% off your Monthly Subscription!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Share your experience with us via a reel and receive a free product worth ₹185!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Subscribe for 10% off your first order!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">🎉 Enjoy 10% off your Monthly Subscription!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Share your experience with us via a reel and receive a free product worth ₹185!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Subscribe for 10% off your first order!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">🎉 Enjoy 10% off your Monthly Subscription!</span>
                <span className="mx-4 3xl:mx-6 4xl:mx-8">Share your experience with us via a reel and receive a free product worth ₹185!</span>
            </div>
        </div>
    );
};

export default Marquee;