import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './TripComponents/InfoSection';
import Hotels from './TripComponents/Hotels';
import PlacesToVisit from './TripComponents/PlacesToVisit';
import Footer from './TripComponents/Footer';
import { db } from './fireBase';

function ViewTrip() {

    const {tripId} = useParams()
    const [trip,setTrip] = useState([]);

    useEffect(()=>{
        tripId && GetTripData()
    },[tripId])

    // used to get Trip Information from firebase

    const GetTripData = async () => {
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            // console.log('Document:',docSnap.data());
            setTrip(docSnap.data())
        }
        else{
            console.log("No Such Document")
            toast('NO trip Found!')
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information Section */}
        <InfoSection trip={trip}/>
        {/* Recommended Hotels  */}
        <Hotels trip={trip}/>
        {/* Daily Plan */}
        <PlacesToVisit trip={trip}/>
        {/* Footer */}
        <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip