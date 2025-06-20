import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Testimonials from '../components/Testimonials'
import Benefits from '../components/Benefits'
import Faq from '../components/FAQs'
import HeroCarousel from '../components/HeroCarousel'
import ProductPodium from '../components/ProductPodium'

const Home = () => {
  return (
    <div>
      <Hero />
      <Benefits />
      <HeroCarousel />
      <BestSeller />
      {/* <LatestCollection /> */}
      <ProductPodium />
      <Testimonials />
      <Faq />
      {/* <OurPolicy /> */}
      {/* <NewsletterBox /> */}
    </div>
  )
}

export default Home
