import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div>

      <div className='text-center font-bold text-3xl pt-10 border-t'>
        <Title text1={'Contact Us'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className=' text-gray-500'>B-12, Connaught Place <br /> 2nd Floor, New Delhi, India</p>
          <p className=' text-gray-500'>Tel: +91 9990033206 <br /> Email: teatroopsindia@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Our Tea Selection</p>
          <p className=' text-gray-500'>Discover our premium teas sourced from the finest gardens.</p>
          <Link to={'/collection'} className='border border-black px-8 py-4 text-sm hover:bg-[--primary-color] hover:text-white transition-all duration-500'>Explore Teas</Link>
        </div>
      </div>

      {/* <NewsletterBox /> */}
    </div>
  )
}

export default Contact
