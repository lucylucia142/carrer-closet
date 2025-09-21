import React from 'react'
import Hero from '../COMPONENTS/Hero.jsx'
import LatestCollection from '../COMPONENTS/LatestCollection'
import BestSeller from '../COMPONENTS/BestSeller'
import OurPolicy from '../COMPONENTS/OurPolicy.jsx'
import NewsletterBox from '../COMPONENTS/NewsLetterBox.jsx'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox/>

    </div>
  )
}

export default Home
