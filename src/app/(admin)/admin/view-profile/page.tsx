"use client";
import {useAppSelector} from "@/app/redux/hooks";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {FaEdit} from "react-icons/fa";




const ViewProfile: React.FC = () => { 
  const admin = useAppSelector( ( state: any ) => state?.superAdmin?.admin );
  const router = useRouter(); 

  return (
    <div className="lg:ml-64 bg-[#0A090F] text-white m-4 rounded-2xl w-full border border-[#28272D]">
      <div className="border-b border-[#28272D] px-4 py-4">
        <h1 className="text-xl px-6">View Profile</h1>
      </div>

      <div className="p-20 m-auto gap-10 flex">
        {/* Profile Image */}
        <img
          src={admin?.profileImage} // Fallback if no image
          alt="Profile"
          className="w-36 h-36 mt-5 rounded-full object-cover"
        />

        {/* User Info Section */}
        <div className="w-full">
          <div className="mb-2 flex justify-between">
            <h1 className="font-bold">View Profile</h1>
            <button className="flex gap-2 items-center text-[#999999]" onClick={()=>router.push('/admin/update-profile')}>
              Update Profile
              <FaEdit className="h-5 w-5" />
            </button>
          </div>

          <div className="border p-10 w-full border-[#28272D] rounded-lg overflow-scroll md:overflow-hidden">
            {/* Name Row */}
            <div className="flex justify-between items-center border-[#28272D] px-4 py-3 border-b">
              <div className="w-1/2 text-[#CCCCCC]">Name</div>
              <div className="w-1/2 text-sm">{admin?.name}</div>
            </div>
{/* role row */}
            <div className="flex justify-between items-center border-[#28272D] px-4 py-3 border-b">
              <div className="w-1/2 text-[#CCCCCC]">Role</div>
              <div className="w-1/2 text-sm">{admin?.role}</div>
            </div>
            {/* Email Row */}
            <div className="flex justify-between items-center border-[#28272D] px-4 py-3 border-b">
              <div className="w-1/2 text-[#CCCCCC]">E-mail</div>
              <div className="w-1/2 text-sm">{admin?.email}</div>
            </div>

            <div className="flex justify-between items-center px-4 py-3 border-b border-[#28272D] ">
              <div className=" w-1/2 text-[#CCCCCC]">Phone Number</div> 
              <div className=" w-1/2  text-sm">{admin?.phoneNumber || "Not Available"}</div>
            </div>


            {/* Email Row */}
            <div className="flex justify-between border-[#28272D] items-center px-4 py-3 border-b">
              <div className=" w-1/2 text-[#CCCCCC]">Country</div>
              <div className=" w-1/2 text-sm">India</div>
            </div>

            <div className="flex justify-between border-[#28272D] items-center px-4 py-3 border-b">
              <div className=" w-1/2 text-[#CCCCCC]">Address</div>
              <div className=" w-1/2 text-sm">55, 2nd Lane, Westend Marg, Saidullajab, Saket, New Delhi-110030</div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
