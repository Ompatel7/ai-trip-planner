import { collection, getDocs, where, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../fireBase';
import UserTripCardItem from './UserTripCardItem';

function MyTrips() {

    const navigate = useNavigate();
    const [userTrips,setUserTrips] = useState([])

    useEffect(()=>{
        GetUserTrips();
    },[])

    const GetUserTrips=async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate('/')
            return;
        }
        const q = query(collection(db,'AITrips'),where('userEmail','==',user?.email))
        const querySnapshot = await getDocs(q);
        setUserTrips([]); 
        querySnapshot.forEach((doc) => {
        //  console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal => [...prevVal,doc.data()])
        })

        // For All Collected trips
        // const querySnapshot = await getDocs(collection(db,'AITrips'));
        // querySnapshot.forEach((doc)=>{
        //     console.log(doc.id," => ", doc.data())
        //     setUserTrips(prevVal => [...prevVal,doc.data()])
        // })

        
    }
    
  return ( 
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>My Trips</h2>

        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
            {userTrips.map((trip,index) =>(
                <UserTripCardItem trip={trip} key={index} index={index}/>
            ))}
        </div>
    </div>
  )
}

export default MyTrips