import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Activity,
  Edit3,
  Camera,
  Calendar,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import Loader from "../Components/Loader/Loader";

const MyProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
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
    joinDate: "January 2024",
    location: "New York, USA",
    phone: "+1 (555) 123-4567",
    website: "www.example.com",
  };

  if (isRoleloading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/30 shadow-2xl">
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100">
                <Camera size={16} className="text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
              <p className="text-white/80 text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} />
                {profile.email}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    profile.role === "admin"
                      ? "bg-yellow-400/20 text-yellow-100 border border-yellow-400/30"
                      : "bg-blue-400/20 text-blue-100 border border-blue-400/30"
                  }`}
                >
                  <Shield size={14} className="inline mr-1" />
                  {profile.role}
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    profile.status === "active"
                      ? "bg-green-400/20 text-green-100 border border-green-400/30"
                      : "bg-red-400/20 text-red-100 border border-red-400/30"
                  }`}
                >
                  <Activity size={14} className="inline mr-1" />
                  {profile.status}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center gap-2 font-semibold"
            >
              <Edit3 size={18} />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <User size={24} className="text-indigo-600" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="group">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Full Name
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                  <User size={18} className="text-gray-400" />
                  <span className="text-gray-800 font-medium">
                    {profile.name}
                  </span>
                </div>
              </div>

              <div className="group">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Email Address
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-gray-800">{profile.email}</span>
                </div>
              </div>

              <div className="group">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Phone Number
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                  <Phone size={18} className="text-gray-400" />
                  <span className="text-gray-800">{profile.phone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Location
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                  <MapPin size={18} className="text-gray-400" />
                  <span className="text-gray-800">{profile.location}</span>
                </div>
              </div>

              <div className="group">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Website
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                  <Globe size={18} className="text-gray-400" />
                  <span className="text-gray-800">{profile.website}</span>
                </div>
              </div>

              <div className="group">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Member Since
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                  <Calendar size={18} className="text-gray-400" />
                  <span className="text-gray-800">{profile.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex gap-3">
                <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Status & Quick Actions */}
        <div className="space-y-6">
          {/* Account Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield size={20} className="text-indigo-600" />
              Account Status
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Role</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    profile.role === "admin"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {profile.role}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    profile.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {profile.status}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h3>

            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-indigo-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <Edit3 size={16} className="text-indigo-600" />
                  </div>
                  <span className="font-medium text-gray-700">
                    Edit Profile
                  </span>
                </div>
              </button>

              <button className="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Shield size={16} className="text-green-600" />
                  </div>
                  <span className="font-medium text-gray-700">
                    Security Settings
                  </span>
                </div>
              </button>

              <button className="w-full text-left p-3 rounded-lg hover:bg-purple-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Activity size={16} className="text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-700">
                    Activity Log
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
