import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  text-sm bg-green-50 p-8'>

        {/* Logo/About */}
        <div className="flex flex-col">
          <img src={assets.logo} className='mb-5 w-32' alt="" />
          <p className='text-gray-600'>
            At Tea Troops, we're passionate about bringing you the finest organic herbal flower teas. Our carefully curated blends are sourced from sustainable farms and handcrafted to perfection. Experience the beauty of nature in every sip.
          </p>
        </div>

        {/* Company */}
        <div className='flex flex-col sm:items-center'>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-[--primary-color] font-medium'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/collection">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div className='flex flex-col sm:items-center'>
          <p className='text-xl font-medium mb-5'>POLICIES</p>
          <ul className='flex flex-col gap-1 text-[--primary-color] font-medium'>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/terms">T&C</Link></li>
            <li><Link to="/refund-policy">Cancellation & Refund Policy</Link></li>
          </ul>
        </div>

        {/* Get in Touch + Social + Copyright */}
        <div className="flex flex-col items-start lg:items-end">
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600 mb-4'>
            <li><a href="tel:+919990033206">+91 9990033206</a></li>
            <li>teatroopsindia@gmail.com</li>
          </ul>
          <p className="text-[--primary-color] font-medium mb-2">Connect With Us</p>
          <div className="flex items-center gap-4 mb-2">
            <a href="https://www.instagram.com/tea.troops?igsh=MWswaTJ0cGs2Y3Ribw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-7 h-7 text-gray-600 hover:text-[--primary-color] transition" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center text-[--primary-color]'>Copyright 2024@ Tea troops.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
