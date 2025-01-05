import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import  Image  from '@/assets/landing.png'

function Hero() {
  
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>


      <h1 className='font-extrabold text-[50px] text-center mt-16 '>
        <span className='text-[#f56551]'>Discover Your Next Advanture with AI:</span>  Personalized ltineraries at Your Fingertips
      </h1>

        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        
        <Link to={'/create-trip'}>
        <Button>Get started, It's Free</Button>
        </Link>
        
        <div>
        <img src={Image} className='m-19'/>
        </div>
    </div>

  )
}

export default Hero