import React from 'react';
import butterflyPea from '../assets/podiumProducts/01-Butterfly pea podium.webp'
import chamomile from '../assets/podiumProducts/02-Chamomile podium.webp'
import lavender from '../assets/podiumProducts/04-Lavender podium.webp'
import hibiscus from '../assets/podiumProducts/03-Hibuscus podium.webp'
import Title from './Title';
import { Link } from 'react-router-dom';


const teas = [
    {
        id: '683d64b1263acac9d115e73e',
        name: 'Butterfly Pea flower',
        image: butterflyPea,
        desc: 'Butterfly pea flower tea is rich in antioxidants, may support brain and eye health, aid in weight loss by boosting metabolism, reduce inflammation and promote relaxation.',
    },
    {
        id: '683d731602d7c07532f4094f',
        name: 'Chamomile',
        image: chamomile,
        desc: 'Chamomile tea promotes better sleep by calming the mind, reducing anxiety, and helping the body relax—making it the perfect natural bedtime drink',
    },
    {
        id: '683d792902d7c07532f40958',
        name: 'Lavender',
        image: lavender,
        desc: 'Lavender tea is known for its soothing aroma and natural stress-relief properties. It helps reduce anxiety, promotes relaxation and may ease headaches and digestive discomfort.',
    },
    {
        id: '683d76bd02d7c07532f40956',
        name: 'Hibiscus',
        image: hibiscus,
        desc: 'Hibiscus tea is rich in antioxidants and vitamin C, known to support heart health, lower blood pressure, boost immunity, and promote healthy, glowing skin—all with a tangy, refreshing taste.',
    },
];

const ProductPodium = () => {

    return (
        <section className="py-10 px-2 sm:px-8 text-center font-bold text-3xl">
            <Title text1="Our Teas" />
            <p className="text-gray-600 text-lg font-medium mb-8">Discover our premium selection of handpicked teas, each offering unique flavors and health benefits.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {teas.map((tea, idx) => (
                    <Link
                        // to={`/product/${tea.id}`}
                        // to={"#"}
                        // onClick={() => scrollTo(0, 0)}
                        key={idx}
                        className="bg-white text-start rounded-lg shadow flex flex-col items-center p-2"
                    >
                        <img
                            src={tea.image}
                            alt={tea.name}
                            className="w-full  object-contain rounded mb-4 shadow-md"
                            style={{ background: '#f3f3f3' }}
                        />
                        <h3 className={`w-full text-start text-[--primary-color] font-bold text-lg mb-2 ${tea.color}`}>{tea.name}</h3>
                        <p className="w-full text-sm text-gray-700 text-start font-medium">{tea.desc}</p>
                    </Link>
                ))}
            </div>
        </section >
    );
};

export default ProductPodium;