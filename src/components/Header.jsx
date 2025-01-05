import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { Button } from './ui/button'
import { googleLogout } from '@react-oauth/google'
import { Link } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));

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
        localStorage.setItem('user',JSON.stringify(resp.data));
        window.location.reload();
      })
    }

  return (
    <div className='p-4 shadow-sm flex justify-between items-center px-3'>
      <Link to={'/'}>
      <img src={logo}/>
      </Link>

        <div>
        { user ? 
          <div className='flex items-center gap-3'>
            
            <Link to={'/create-trip'}>
            <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </Link>
            
            <Link to={'/my-trips'}>
            <Button variant="outline" className="rounded-full">My Trip</Button>
            </Link>
            
            <Popover>
            <PopoverTrigger>
            <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
            </PopoverTrigger>
            <PopoverContent>
            <button onClick={()=>{
              googleLogout();
              localStorage.clear();
              window.location.reload();

            }}>
              LogOut
            </button>
            </PopoverContent>
            </Popover>
           
          </div> :
          <Button onClick={login}>Sign In</Button>
        }
        </div>
    </div>
  )
}

export default Header

