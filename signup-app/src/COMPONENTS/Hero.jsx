import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 mx-4 sm:mx-8 lg:mx-16 xl:mx-24'>
      {/* Left Section */}
      <div className='w-full sm:w-1/2 flex items-center justify-start px-8 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20'>
        <div className='text-[#414141] max-w-md'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 sm:w-12 h-[2px] bg-[#414141]'></div>
            <p className='font-medium text-xs sm:text-sm tracking-wider'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-8 text-gray-900'>
            Latest Arrivals
          </h1>
          <div className='flex items-center gap-3'>
            <p
              onClick={() => navigate("/Collection")}
              className='font-semibold text-sm sm:text-base cursor-pointer hover:underline tracking-wide'
            >
              SHOP NOW
            </p>
            <div className='w-10 sm:w-12 h-[2px] bg-[#414141]'></div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className='w-full sm:w-1/2 relative overflow-hidden'>
        <img 
          className='w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] object-cover object-center' 
          src={assets.hero_img} 
          alt="Latest arrivals showcase" 
        />
      </div>
    </div>
  )
}

export default Hero
