import React from 'react'
import { Link } from 'react-router-dom';
import useImage from '@/hooks/useImage';

function Hotelcom({hotel,index}) {

  const {url} = useImage(hotel.name,index);

  return (
    <div>
        <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.name +','+ hotel?.address} target='_blank'>
                    
                    <div className='hover:scale-105 transition-all cursor-pointer'>
                        <img src={url} alt='Img' className='rounded-xl h-[180px] w-full object-cover'/>
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-medium'>{hotel.name}</h2>
                            <h2 className='text-xs text-gray-500'>📍 {hotel?.address}</h2>
                            <h2 className='text-sm'>💰 {hotel?.price}</h2>
                            <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
                        </div>
                    </div>
        </Link>
    </div>
  )
}

export default Hotelcom