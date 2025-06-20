import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='flex items-center justify-between py-2 font-medium'>

            <Link to='/'><img src={assets.logo} className='w-44' alt="" /></Link>

            <ul className='hidden sm:flex gap-5 mt-2 text-sm text-[--primary-color]'>

                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[--primary-color] hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>SHOP</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[--primary-color] hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>OUR STORY</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[--primary-color] hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT US</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[--primary-color] hidden' />
                </NavLink>

            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                    {/* Dropdown Menu */}
                    {token &&
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-[--primary-color]'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-[--primary-color]'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-[--primary-color]'>Logout</p>
                            </div>
                        </div>}
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[--primary-color] text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`z-10 absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-[--primary-color]'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>SHOP</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>OUR STORY</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT US</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navbar
