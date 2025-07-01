import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div>
      <div className='text-center font-bold text-3xl 3xl:text-4xl 4xl:text-5xl pt-10 border-t'>
        <Title text1={'Contact Us'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] 3xl:max-w-[600px] 4xl:max-w-[700px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl 3xl:text-2xl 4xl:text-3xl text-gray-600'>Our Store</p>
          <p className='text-gray-500 3xl:text-xl 4xl:text-2xl'>
            C-54, Khasra no 17/3/3, Gali Number 7<br />
            Near ICICI ATM, Gokalpuri<br />
            North East Delhi, New Delhi - 110094<br />
            Delhi, India
          </p>
          <p className='text-gray-500 3xl:text-xl 4xl:text-2xl'>Tel: +91 9990033206 <br /> Email: teatroopsindia@gmail.com</p>
          <p className='font-semibold text-xl 3xl:text-2xl 4xl:text-3xl text-gray-600'>Our Tea Selection</p>
          <p className='text-gray-500 3xl:text-xl 4xl:text-2xl'>Discover our premium teas sourced from the finest gardens.</p>
          <Link to={'/collection'} className='border border-black px-8 py-4 text-sm 3xl:text-lg 4xl:text-xl hover:bg-[--primary-color] hover:text-white transition-all duration-500'>Explore Teas</Link>
        </div>
      </div>

      {/* <NewsletterBox /> */}
    </div>
  )
}

export default Contact
