import React from 'react'
import { Link } from 'react-router-dom'
import useImage from '@/hooks/useImage'

function UserTripCardItem({trip,index}) {

  const {url} = useImage(trip?.userSelection?.location,index);
  
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 duration-300 transition-all'>
        <img src={url}
        className='h-[180px] w-full object-cover rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem