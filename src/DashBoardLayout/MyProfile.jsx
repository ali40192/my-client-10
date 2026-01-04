import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import Loader from "../Components/Loader/Loader";

const MyProfile = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [role, isRoleloading] = useRole();
  const { data: userDetails } = useQuery({
    queryKey: ["userDetails", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const profile = {
    name: user?.displayName || "Jannah",
    email: user?.email || "john@example.com",
    image: user?.photoURL || "https://i.ibb.co/2M7rtLk/avatar.png",

    role: role,
    status: userDetails?.status,
  };

  if (isRoleloading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={profile.image}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          {/* Role */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <span className="badge badge-info px-4 py-3">{profile.role}</span>
          </div>

          {/* Status */}
          <div className=" flex items-center justify-between">
            <div className="mb-2">
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span
                className={`badge px-4 py-3 ${
                  profile.status === "active" ? "badge-success" : "badge-error"
                }`}
              >
                {profile.status}
              </span>
            </div>
            <button className="btn btn-xs text-xs font-bold text-[#316945] border-[#316945] hover:bg-[#316945] hover:text-white">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
