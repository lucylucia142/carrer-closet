import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className='text-2xl text-center pt-8 border-t'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
          <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
        </div>
      </div>

      {/* Main About Section */}
      <div className='my-10 flex flex-col md:flex-row gap-16 mx-4 sm:mx-8 lg:mx-16 xl:mx-24'>
        <img className='w-full md:max-w-[450px] object-cover' src={assets.about_img} alt="About us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Career Closet was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we have worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We are dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4 mx-4 sm:mx-8 lg:mx-16 xl:mx-24'>
        <div className='text-2xl text-center mb-10'>
          <div className='inline-flex gap-2 items-center'>
            <p className='text-gray-500'>WHY <span className='text-gray-700 font-medium'>CHOOSE US</span></p>
            <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20 gap-8'>
          <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:bg-gray-50 transition-colors'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:bg-gray-50 transition-colors'>
            <b>Convenience:</b>
            <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:bg-gray-50 transition-colors'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className='text-2xl text-center mb-10 mx-4 sm:mx-8 lg:mx-16 xl:mx-24'>
        <div className='inline-flex gap-2 items-center'>
          <p className='text-gray-500'>OUR <span className='text-gray-700 font-medium'>TEAM</span></p>
          <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mx-4 sm:mx-8 lg:mx-16 xl:mx-24 mb-20'>
        <div className='text-center group'>
          <div className='w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden group-hover:scale-105 transition-transform'>
            <img 
              src= {'https://i.postimg.cc/LXb5Fdj1/sarah.jpg'} 
              alt="Team member" 
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className='font-semibold text-gray-800 mb-1'>Sarah Johnson</h3>
          <p className='text-gray-600 text-sm'>Founder & CEO</p>
        </div>
        
        <div className='text-center group'>
          <div className='w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden group-hover:scale-105 transition-transform'>
            <img 
              src={'https://i.postimg.cc/8sQmqQ7n/chen.avif'} 
              alt="Team member" 
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className='font-semibold text-gray-800 mb-1'>Michael Chen</h3>
          <p className='text-gray-600 text-sm'>Head of Design</p>
        </div>
        
        <div className='text-center group'>
          <div className='w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden group-hover:scale-105 transition-transform'>
            <img 
              src={'https://i.postimg.cc/0yFdCmGG/emily.jpg'} 
              alt="Team member" 
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className='font-semibold text-gray-800 mb-1'>Emily Rodriguez</h3>
          <p className='text-gray-600 text-sm'>Customer Experience</p>
        </div>
      </div>

      {/* Values Section */}
      <div className='bg-gray-50 py-16 px-4 sm:px-8 lg:px-16 xl:px-24'>
        <div className='text-2xl text-center mb-10'>
          <div className='inline-flex gap-2 items-center'>
            <p className='text-gray-500'>OUR <span className='text-gray-700 font-medium'>VALUES</span></p>
            <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
          <div className='group'>
            <div className='w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors'>
              <div className='w-8 h-8 bg-gray-800 rounded group-hover:bg-white transition-colors'></div>
            </div>
            <h4 className='font-semibold text-gray-800 mb-2'>Innovation</h4>
            <p className='text-gray-600 text-sm'>Constantly evolving to bring you the latest trends and technology.</p>
          </div>

          <div className='group'>
            <div className='w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors'>
              <div className='w-8 h-8 bg-gray-800 rounded group-hover:bg-white transition-colors'></div>
            </div>
            <h4 className='font-semibold text-gray-800 mb-2'>Quality</h4>
            <p className='text-gray-600 text-sm'>Every product is carefully selected to meet our high standards.</p>
          </div>

          <div className='group'>
            <div className='w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors'>
              <div className='w-8 h-8 bg-gray-800 rounded group-hover:bg-white transition-colors'></div>
            </div>
            <h4 className='font-semibold text-gray-800 mb-2'>Integrity</h4>
            <p className='text-gray-600 text-sm'>Building trust through transparency and honest business practices.</p>
          </div>

          <div className='group'>
            <div className='w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors'>
              <div className='w-8 h-8 bg-gray-800 rounded group-hover:bg-white transition-colors'></div>
            </div>
            <h4 className='font-semibold text-gray-800 mb-2'>Community</h4>
            <p className='text-gray-600 text-sm'>Creating connections and supporting our customers every step of the way.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
