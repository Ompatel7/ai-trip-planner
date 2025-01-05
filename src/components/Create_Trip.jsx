import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from './constent';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { chatSession } from './Ai_Model';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import logo from '../assets/logo.svg'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './fireBase';
import { useNavigate } from 'react-router-dom';



function CreateTrip() {

  const [openDailog,setOpenDailog] = useState(false)
  const [formData, setFormdata] = useState([]);
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()
  const handelInputChange =(name,value) => {
   setFormdata({
    ...formData,
    [name]:value
   })
  }

  const login = useGoogleLogin({
    onSuccess:(codeRes)=> GetUserProfile(codeRes),
    onError:(error) => console.log(error)
  })
  
  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      // console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data))
      setOpenDailog(false)
      onGenrateTrip()
    })
  }

  const onGenrateTrip = async ()=>{
    setLoading(true)
    const user = localStorage.getItem('user');

    if(!user){
      setOpenDailog(true)
      return;
    }

    if(formData?.onOfDays > 10 && !formData?.budget||!formData?.travler||!formData?.location){
      toast('Please fill all the Details')
      return;
    }
    
    const FINAL_PROMPT= AI_PROMPT
    .replace('{location}', formData?.location)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.travler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    // console.log(result?.response?.text())
    setLoading(false)
    SaveAiTrip(result?.response?.text())

  }

  const SaveAiTrip = async(TripData)=>{

    setLoading(true)
      const user = JSON.parse( localStorage.getItem('user'));
      const docId = Date.now().toString()
       await setDoc(doc(db, "AITrips", docId), {
        userSelection:formData,
        tripData: JSON.parse(TripData),
        userEmail:user?.email,
        id:docId
       });
    setLoading(false)
    navigate('/view-trip/'+docId)
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'> 
    <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
    <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

    <div className='mt-20 flex flex-col gap-9'>
      <div>
        <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
        <input type='text' className='border rounded w-full h-9'
       onChange={(e)=> {handelInputChange('location',e.target.value)}}/>
      </div>
    
      

       <div>
       <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
        <Input placeholder={'Ex.3'} type='number' onChange={(e)=> handelInputChange('noOfDays',e.target.value)}/>
       </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>

        <div className='grid grid-cols-3 gap-5 mt-5'>
         {SelectBudgetOptions.map((item,index)=>(
          <div key={index} 
          onClick={()=> handelInputChange('budget',item.title)}
          className={`p-4 border rounded-lg hover:shadow-lg
          ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
         ))}

        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>

        <div className='grid grid-cols-3 gap-5 mt-5'>
         {SelectTravelesList.map((item,index)=>(
          <div key={index}
          onClick={()=> handelInputChange('travler',item.people)}
          className={`p-4 border rounded-lg hover:shadow-lg
          ${formData?.travler == item.people && 'shadow-lg border-black'}`}>
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
         ))}

        </div>
      </div>
    </div>

    <div className='flex my-10 justify-end'>
    <Button 
    disabled={loading}
    onClick={onGenrateTrip}>
      {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> : 'Generate Trip'}
      </Button>
    </div>

    <Dialog open={openDailog}>
     <DialogContent>
       <DialogHeader>
  
         <DialogDescription>
           <img src={logo}/>
           <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
           <p>Sign in to the App with Google authantication Securly</p>

           <Button onClick={login}
           className='w-full mt-5 flex gap-4 items-center'>
           <FcGoogle className='h-7 w-7'/>
            Sign In With Google</Button>
         </DialogDescription>
       </DialogHeader>
     </DialogContent>
    </Dialog>


    </div>
  )
}

export default CreateTrip