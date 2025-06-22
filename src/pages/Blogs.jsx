import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Blog1 from '../assets/blogs/Hibiscus_tea.jpg';
import Blog2 from '../assets/blogs/Lavender_Tea.jpg';
import Blog3 from '../assets/blogs/ButterflyPeaFlowerTea.jpg';
import Blog4 from '../assets/blogs/Belly_Fat.jpg';
import Blog1Content from '../components/Blogs/Blog1';
import Blog2Content from '../components/Blogs/Blog2';
import Blog3Content from '../components/Blogs/Blog3';
import Blog4Content from '../components/Blogs/Blog4';

export const blogData = [
    {
        id: 'hibiscus-tea-blog',
        title: "Glow Naturally: Unlock Radiant Skin with Hibiscus Tea",
        image: Blog1,
        date: 'Jun 18, 2025',
        excerpt: "Tired of chemical skincare? Discover the natural glow of hibiscus tea with its collagen-boosting, anti-aging, and anti-acne benefits.",
        content: <Blog1Content />
    },
    {
        id: 'lavender-tea-blog',
        title: "Lavender Tea: Your Secret to Stress-Free Living & Deep Relaxation",
        image: Blog2,
        date: 'Jun 18, 2025',
        excerpt: "Sip your way to serenity with lavender tea. Say goodbye to stress, sleep issues, and inflammation—naturally!",
        content: <Blog2Content />
    },
    {
        id: 'butterfly-pea-flower-tea-blog',
        title: "Butterfly Pea Flower Tea: A Natural Ayurvedic & Herbal Elixir",
        image: Blog3,
        date: 'Jun 18, 2025',
        excerpt: "From glowing skin to mental clarity, explore the colorful benefits of Butterfly Pea Tea and elevate your wellness routine.",
        content: <Blog3Content />
    },
    {
        id: 'blast-away-belly-fat-blog',
        title: "Blast Away Belly Fat: Unlock the Power of Tea Troops Herbal Infusion",
        image: Blog4,
        date: 'Jun 18, 2025',
        excerpt: "Struggling with stubborn belly fat? Get Fit Tea helps boost metabolism and slim your waist with every natural sip.",
        content: <Blog4Content />
    },
];

const Blogs = () => {
    const navigate = useNavigate();

    return (
        <div className="px-4 py-10 max-w-7xl mx-auto border-t">
            <div className="text-center font-bold text-3xl mb-10">
                <Title text1="Blogs" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogData.map((blog, index) => (
                    <div
                        key={index}
                        className="cursor-pointer bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 group flex flex-col"
                        onClick={() => navigate(`/blog/${blog.id}`)}
                    >
                        <div className="relative w-full aspect-[16/9] bg-gray-100">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2 bg-white/80 text-xs text-gray-700 font-bold px-2 py-1 rounded">
                                TEA TROOPS
                            </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <h2 className="text-lg font-semibold text-[--primary-color] text-center">{blog.title}</h2>
                            <p className="text-sm text-gray-600 mt-2 text-center">{blog.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
