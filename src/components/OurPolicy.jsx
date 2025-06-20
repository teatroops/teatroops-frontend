import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center pt-20 text-xs sm:text-sm md:text-base text-gray-700'>

      <div className='bg-green-50 p-6 rounded-lg shadow-sm'>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Easy Exchange Policy</p>
        <p className=' text-gray-400'>Seamless exchange for a worry-free herbal experience.</p>
      </div>
      <div className='bg-green-50 p-6 rounded-lg shadow-sm'>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>7 Days Return Policy</p>
        <p className=' text-gray-400'>7-day return, no questions asked — nature’s promise.</p>
      </div>
      <div className='bg-green-50 p-6 rounded-lg shadow-sm'>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Best customer support</p>
        <p className=' text-gray-400'>Real people, real support, always here for your sip needs.</p>
      </div>

    </div>
  )
}

export default OurPolicy
