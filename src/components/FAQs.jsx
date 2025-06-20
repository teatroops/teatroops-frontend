import React, { useState } from 'react';
import Title from './Title';

const faqs = [
    {
        question: "What is herbal tea? 🌿",
        answer: "Herbal tea is a natural, caffeine-free drink made by infusing dried herbs, flowers, fruits, or spices in hot water. Unlike traditional teas, it doesn't contain tea leaves.",
    },
    {
        question: "Is herbal tea caffeine-free? ☕🚫",
        answer: "Yes! Most herbal teas are naturally caffeine-free, making them ideal for anyone looking to reduce caffeine—especially pregnant women or those with sensitivity to caffeine.",
    },
    {
        question: "What are the benefits of drinking herbal tea? 💪🍵",
        answer: "Different herbs offer different benefits. Herbal teas may help with digestion, relaxation, sleep, immunity, hydration, and even skin health.",
    },
    {
        question: "Can I drink herbal tea every day? 📅✅",
        answer: "Absolutely! Most herbal teas are gentle enough for daily use. However, it's good to check specific ingredients if you're pregnant, nursing, or on medication.",
    },
    {
        question: "How do I make herbal tea? 🫖🔥",
        answer: "Just steep 1–2 teaspoons of dried herbs or 1 tea bag in hot water for 5–10 minutes. Strain if needed, then sip and enjoy.",
    },
    {
        question: "Are there any side effects? ⚠️",
        answer: "Herbal teas are generally safe, but some people may have allergies or sensitivities. If you're unsure about an herb, consult a healthcare professional.",
    },
];

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="py-12">
            <div className="max-w-4xl mx-auto font-bold mt-2 py-4 text-3xl">
                <Title text1={'Frequently Asked Questions'} />
                <div className="space-y-4 mt-6">
                    {faqs.map((item, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                            <button
                                className="w-full text-left flex justify-between items-center focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <h3 className="text-lg font-medium text-gray-700">{item.question}</h3>
                                <span className="transform transition-transform duration-200 text-[--primary-color]">
                                    {activeIndex === index ? '▲' : '▼'}
                                </span>
                            </button>
                            {activeIndex === index && (
                                <p className="text-gray-600 text-sm sm:text-base mt-2">{item.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
