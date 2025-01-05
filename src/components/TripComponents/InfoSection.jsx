import React from 'react'
import { Button } from '../ui/button'
import { IoIosSend } from "react-icons/io";
import useImage from '@/hooks/useImage'
import { Link } from 'react-router-dom';


function InfoSection({trip}) {

  const {url} = useImage(trip?.userSelection?.location,1)
  
  return (
    <div>
        <img src={url} alt='img' className='h-[340px] w-full  rounded-xl' />

        <div className='flex justify-between items-center'>
          <div className='flex flex-col my-5 gap-2'>
              <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
              <div className='flex gap-5'>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm '>🗓️ {trip.userSelection?.noOfDays} Day</h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm'>💰 {trip.userSelection?.budget} Budget</h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm'>🥂 No. Of Traveler: {trip.userSelection?.travler}</h2>

              </div>
          </div>

         <Link to={'https://www.google.com/maps/search/?api=1&query='+trip?.userSelection?.location} target='_blank'>
          <Button><IoIosSend /></Button>
         </Link>
        </div>
    </div>
  )
}

export default InfoSection