import React from 'react'
import PlaceCarditem from './PlaceCarditem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to visit</h2>

        <div>
            {
                trip.tripData?.itinerary.map((item,index) => (
                    <div className='mt-5' key={index}>
                        <h2 className='font-medium text-lg'>Day {item.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                        {item.plan.map((place,index)=>(
                            <div key={index}>
                                <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                                <PlaceCarditem place={place} key={index} index={index}/> 
                            </div>
                        ))}
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default PlacesToVisit