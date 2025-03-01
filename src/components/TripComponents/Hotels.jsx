import React from 'react'
import Hotelcom from './HotelComponent';

function Hotels({trip}) {
    
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'> 
            {
                trip?.tripData?.hotels?.map((hotel,index)=>(
                    <Hotelcom hotel={hotel} key={index} index={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default Hotels