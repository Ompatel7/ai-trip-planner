import useImage from '@/hooks/useImage'
import { Link } from 'react-router-dom'


function PlaceCarditem({place,index}) {

  const {url} = useImage(place.place,index);

  return (
    
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.place} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 
    transition-all hover:shadow-md cursor-pointer'>
        <img src={url} className='w-[130px] h-[130px] rounded-xl object-cover'/>
        <div>
          <h2 className='font-bold text-lg'>{place.place}</h2>
          <p className='text-sm text-gray-400'>{place.details}</p>
          <h2 className='mt-2'>{place.timeToSpend}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCarditem