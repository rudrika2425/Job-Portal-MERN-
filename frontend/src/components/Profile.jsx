import React ,{useState}from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'



const isResume=true;
const Profile = () => {
  useGetAppliedJobs();
  const [open,setOpen]=useState(false);
  const {user}=useSelector(store=>store.auth);
  console.log("Resume URL:", user?.profile?.resume);

  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className=" flex justify-between">
          <div className="flex items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src= {user?.profile?.profilePhoto} alt="profile"/>
        </Avatar>
        <div>
        <h1 className="font-medium text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600">
  {user?.fullname}
</h1>

          <p className="text-gray-400">{user?.profile?.bio}</p>
          </div>
           </div>
           <Button onClick={()=>setOpen(true)} className="text-right" variant="outline"><Pen/></Button>
           </div>

           <div className="my-5">
            <div className="flex items-center gap-3 my-2 ">
            <Mail/>
            <span className="text-gray-400">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2 ">
            <Contact/>
            <span className="text-gray-400">{user?.phoneNumber}</span>
            </div>
           </div>
           <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1 ">
            {
              user?.profile?.skills.length!=0?user?.profile?.skills.map((item,index)=><Badge key={index}>{item}</Badge>): <span>NA</span>
            }
           </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="text-md font-bold text-gray-600">Resume</Label>
      {
          isResume ? <a target='blank' href={user?.profile?.resume} className='text-gray-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
      }
      </div>
      </div>
      <div className="max-w-4xl  mx-auto bg-white rounded-2xl">
      <h1 className="font-bold text-lg my-5 bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
  Applied Jobs
</h1>

        {/* Application Table */}
        <AppliedJobTable></AppliedJobTable>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen}/>

    </div>
  )
}

export default Profile