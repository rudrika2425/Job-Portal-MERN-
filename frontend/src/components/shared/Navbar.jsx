import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { PopoverContent, Popover, PopoverTrigger } from "../ui/popover";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { User2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 mx-auto">
        <div className="flex items-center justify-start w-full">
          <h1 className="text-6xl font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">
            Career Sphere
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-small items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li className="relative text-2xl font-times font-medium leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 group">
                  <Link to="/admin/companies">Companies</Link>
                  <span className="absolute left-0 bottom-0 w-16 h-1 bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 scale-y-50" />
                </li>
                <li className="relative text-2xl font-times font-medium leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 group">
                  <Link to="/admin/jobs">Jobs</Link>
                  <span className="absolute left-0 bottom-0 w-16 h-1 bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 scale-y-50" />
                </li>
              </>
            ) : (
              <>
                <li className="relative text-2xl font-times font-medium leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 group">
                  <Link to="/">Home</Link>
                  <span className="absolute left-0 bottom-0 w-16 h-1 bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 scale-y-50" />
                </li>
                <li className="relative text-2xl font-times font-medium leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 group">
                  <Link to="/jobs">Jobs</Link>
                  <span className="absolute left-0 bottom-0 w-16 h-1 bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 scale-y-50" />
                </li>
                <li className="relative text-2xl font-times font-medium leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 group">
                  <Link to="/browse">Browse</Link>
                  <span className="absolute left-0 bottom-0 w-16 h-1 bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 scale-y-50" />
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className=" flex items-center gap-0">
              <Link to="/login">
                <button className="m-2 p-0.5 rounded-full from-indigo-400 via-pink-500 to-purple-500 bg-gradient-to-r">
                  <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                    Login
                  </span>
                </button>
              </Link>

              <Link to="/signup">
                <button className="m-2 p-0.5 rounded-full from-indigo-400 via-pink-500 to-purple-500 bg-gradient-to-r">
                  <span className="block px-4 py-2 font-semibold rounded-full text-white bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 transition hover:bg-transparent hover:text-white">
                    SignUp
                  </span>
                </button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col  text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 my-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
