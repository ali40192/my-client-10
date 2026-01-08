import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import ServerStatus from "../Components/Debug/ServerStatus";

const DashMessage = () => {
  const { user } = useAuth();

  const {
    data: dashboardSummary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboardSummary", user?.email],
    queryFn: async () => {
      try {
        console.log(
          "Fetching dashboard summary from:",
          `${import.meta.env.VITE_API_URL}/dashboard/summary`
        );
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/summary`
        );
        console.log("Dashboard summary response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Dashboard summary API error:", error);
        console.error("Error details:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
        });
        // Return fallback data if API fails
        return {
          totalBooks: 0,
          totalViews: 0,
          totalComments: 0,
        };
      }
    },
    enabled: !!user?.email,
    staleTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const userName = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-6">
        {/* Greeting */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">
            {getGreeting()}, {userName}! 👋
          </h2>
          <p className="text-lg text-gray-300">
            Welcome to your dashboard. Here's what's happening today.
          </p>
        </div>

        {/* Summary */}
        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 w-full max-w-4xl">
            <div className="text-center">
              <h3 className="text-red-400 font-semibold mb-2">
                Failed to load dashboard data
              </h3>
              <p className="text-red-300 text-sm">
                Please try refreshing the page or check your connection
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-700 p-6 rounded-xl animate-pulse">
                <div className="h-4 bg-gray-600 rounded w-1/2 mb-2" />
                <div className="h-8 bg-gray-600 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl">
              <h3 className="text-sm text-blue-100 uppercase">Your Books</h3>
              <p className="text-3xl font-bold">
                {dashboardSummary?.totalBooks ?? 0}
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl">
              <h3 className="text-sm text-green-100 uppercase">Total Views</h3>
              <p className="text-3xl font-bold">
                {dashboardSummary?.totalViews ?? 0}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-xl">
              <h3 className="text-sm text-purple-100 uppercase">Comments</h3>
              <p className="text-3xl font-bold">
                {dashboardSummary?.totalComments ?? 0}
              </p>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-2xl">
          <Link
            to="/dashboard/statistics"
            className="dashboard-card text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium text-gray-700">Analytics</div>
          </Link>
          <Link
            to="/dashboard/users"
            className="dashboard-card text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium text-gray-700">Users</div>
          </Link>
          <Link
            to="/dashboard/mybooks"
            className="dashboard-card text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium text-gray-700">My Books</div>
          </Link>
          <Link
            to="/dashboard/myprofile"
            className="dashboard-card text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm font-medium text-gray-700">Profile</div>
          </Link>
        </div>

        {/* Server Status */}
        <div className="w-full max-w-4xl mb-8">
          <ServerStatus />
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-gradient-to-r from-blue-500 to-pink-500 px-6 py-2 rounded-full font-semibold hover:opacity-90"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default DashMessage;
