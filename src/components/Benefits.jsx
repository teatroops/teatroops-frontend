import React from 'react'
import Title from './Title'
import CaffeineFreeIcon from '../assets/img/Caffeine free.svg'
import SugarFree from '../assets/img/Sugar free.svg'
import Natural from '../assets/img/Natural.svg'
import NoArtificalColour from '../assets/img/No Artificial Colour.svg'

const Benefits = ({ showDescription = true }) => {
    const benefitsData = [
        {
            title: 'Caffeine Free',
            description: 'Ideal for those avoiding caffeine, including pregnant women and sensitive individuals.',
            image: (
                <img src={CaffeineFreeIcon} alt="Caffeine Free Icon" className="w-40 h-40" />
            ),
        },
        {
            title: 'Sugar Free',
            description: 'Naturally sugar-free, making it a low or zero-calorie wellness beverage.',
            image: (
                <img src={SugarFree} alt="Caffeine Free Icon" className="w-40 h-40" />
            ),
        },
        {
            title: '100% Natural',
            description: 'Only real herbs and flowers—nothing artificial, just the goodness of nature.',
            image: (
                <img src={Natural} alt="Caffeine Free Icon" className="w-40 h-40" />
            ),
        },
        {
            title: 'No Artificial Colour',
            description: 'Free from synthetic flavors, preservatives, and chemical additives.',
            image: (
                <img src={NoArtificalColour} alt="Caffeine Free Icon" className="w-40 h-40" />
            ),
        },
    ]

    return (
        <div className="">
            <div className="max-w-7xl mx-auto sm:px-32 px-8 text-center mb-8">
                {/* <div className='text-center text-3xl'>
                    <Title text1="OUR" text2="BENEFITS" />
                </div>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10">
                    At Tea Troops, every sip is crafted with care—free from caffeine, sugar, and synthetic ingredients.
                    Discover how pure, natural herbal blends can support your wellness journey.
                </p> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-6 gap-8">
                    {benefitsData.map(({ title, description, image }, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                            <div className="mb-[-2rem]">{image}</div>
                            <h3 className="text-xl font-semibold text-[--primary-color] mb-2">{title}</h3>
                            {showDescription && <p className="text-gray-600 text-sm">{description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Benefits
