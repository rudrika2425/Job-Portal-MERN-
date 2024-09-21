import React from "react";
import { Button } from "./ui/button";
import { Badge} from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark } from 'lucide-react'
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
 
  const navigate=useNavigate();
  //const jobId="wertyui"

  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime =new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60))
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt)==0?"Today": `${daysAgoFunction(job?.createdAt)} days Ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        </Button>
      </div>
      <div>
        <h1 className="text-6xl text-gray-700 text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-3xl my-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 group">{job?.title}</h1>
        <p className="text-sm text-gray-500">{job?.description}</p>
      </div>
      <div className="flex item-center gap-2 mt-4">
        <Badge className="text-indigo-600 font-bold" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-pink-600 font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-purple-600 font-bold" variant="ghost">{job?.salary} LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={()=> navigate(`/description/${job?._id}`)}  variant="outline" >Details</Button>
        <Button className="bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 group">Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
