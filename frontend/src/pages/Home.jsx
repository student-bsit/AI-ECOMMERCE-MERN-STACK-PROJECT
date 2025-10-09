import React, { useEffect } from 'react'
import Background from '../components/Background'
import Hero from '../components/Hero'
import { useState } from 'react'
import Product from './Product'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'
import Footer from '../components/Footer'

function Home() {

  let HeroData = [
    { text1: "30% OFF limited offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fasion Fit", text2: "Limited Time Only!" },
    { text1: "Explore our Best Collection", text2: "Shop Now" },
    { text1: "Choose your Perfect Fasion Fit", text2: "Now on Scale!" }
  ]

  let [heroCount, setHeroCount] = useState(0);

  useEffect(() => {

    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1))
    }, 3000)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className='overflow-x-hidden relative top-[70px]'>
      <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] 
      bg-gradient-to-l from-[#141414] to-[#0c2025]'>

        <Background
          heroCount={heroCount}
        />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={HeroData[heroCount]}
        />
      </div>

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
