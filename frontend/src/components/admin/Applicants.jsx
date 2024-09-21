import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { useEffect } from 'react';

export default function Applicants() {
  const params =useParams();
  const dispatch =useDispatch();
  const {applicants}= useSelector(store=>store.application);

  useEffect(()=>{
    //calling API
    const fetchAllApplicants =async()=>{
      try{
      const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
      
      dispatch(setAllApplicants(res.data.job));
      }
      catch(error){
        console.log(error);
      }
    }
    fetchAllApplicants();
  },[]);
  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable/>
      </div>
    </div>
  )
}