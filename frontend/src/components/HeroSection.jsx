import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const HeroSection = () => {

  const [query,setQuery]=useState("");
   const dispatch=useDispatch();
   const navigate=useNavigate();

   
  const searchJobHandler =()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
        
<span className="mx-auto px-4 py-2 rounded-full bg-gray-100 font-medium">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600">
  Prime Career Opportunities
  </span>
</span>


      <h1 className="text-5xl font-bold text-gray-300">Elevate Your Skills & <br/> Unlock  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600">New Opportunities</span></h1>
      <p className="text-gray-500">Elevate your skills to stand out in today’s competitive job market. <br></br>Unlock new opportunities that align with your passions and ambitions. <br></br>Embrace growth and watch your career soar to new heights!</p>
      <div className="flex w-[40%] shadow-lg border-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 pl-3 rounded-full items-center gap-4 mx-auto">
        <input type="text" 
        placeholder="Find Your dream Jobs"
        className="outline-none border-none w-full"
        onChange={(e)=> setQuery(e.target.value)}
        />
        <Button onClick={searchJobHandler} className="rounded-r-full bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 transition hover:bg-transparent hover:text-white">
            <Search className="h-5 w-5"/>
        </Button>
      </div>
        </div>
       </div>
  )
}

export default HeroSection
