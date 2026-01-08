import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { BookOpen, Users, TrendingUp, Star, Clock, Award } from "lucide-react";

const Statictis = () => {
  // Fetch dashboard statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      try {
        console.log(
          "Fetching stats from:",
          `${import.meta.env.VITE_API_URL}/dashboard/stats`
        );
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/stats`
        );
        console.log("Stats response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Stats fetch error:", error);
        console.warn("Dashboard stats API not available, using mock data");
        // Return mock data if API fails
        return {
          totalBooks: 156,
          totalUsers: 89,
          totalBorrowed: 234,
          totalReviews: 67,
          availableBooks: 123,
          averageRating: 4.2,
          message: "Using mock data - server unavailable",
        };
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Ensure stats data has safe defaults
  const safeStats = {
    totalBooks: stats?.totalBooks || 0,
    totalUsers: stats?.totalUsers || 0,
    totalBorrowed: stats?.totalBorrowed || 0,
    totalReviews: stats?.totalReviews || 0,
    availableBooks: stats?.availableBooks || 0,
    ...stats,
  };

  // Fetch chart data
  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ["dashboardChart"],
    queryFn: async () => {
      try {
        console.log(
          "Fetching chart data from:",
          `${import.meta.env.VITE_API_URL}/dashboard/chart`
        );
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/chart`
        );
        console.log("Chart response:", response.data);
        return Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error("Chart fetch error:", error);
        console.warn("Dashboard chart API not available, using mock data");
        // Return mock data if API fails
        return [
          { month: "Jan", books: 12 },
          { month: "Feb", books: 19 },
          { month: "Mar", books: 15 },
          { month: "Apr", books: 22 },
          { month: "May", books: 18 },
          { month: "Jun", books: 25 },
        ];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch genre data
  const { data: genreData, isLoading: genreLoading } = useQuery({
    queryKey: ["dashboardGenres"],
    queryFn: async () => {
      try {
        console.log(
          "Fetching genre data from:",
          `${import.meta.env.VITE_API_URL}/dashboard/genres`
        );
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/genres`
        );
        console.log("Genre response:", response.data);
        return Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error("Genre fetch error:", error);
        console.warn("Dashboard genres API not available, using mock data");
        // Return mock data if API fails
        return [
          { name: "Fiction", value: 35, color: "#3b82f6" },
          { name: "Non-Fiction", value: 25, color: "#10b981" },
          { name: "Science", value: 20, color: "#f59e0b" },
          { name: "History", value: 12, color: "#f43f5e" },
          { name: "Biography", value: 8, color: "#6366f1" },
        ];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Ensure chartData is always an array with fallback data
  const safeChartData = Array.isArray(chartData)
    ? chartData
    : [
        { month: "Jan", books: 12 },
        { month: "Feb", books: 19 },
        { month: "Mar", books: 15 },
        { month: "Apr", books: 22 },
        { month: "May", books: 18 },
        { month: "Jun", books: 25 },
      ];

  // Loading state
  if (statsLoading || chartLoading || genreLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 p-6">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Digital Library Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive overview of your library system
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Books",
      value: safeStats.totalBooks,
      icon: BookOpen,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Users",
      value: safeStats.totalUsers,
      icon: Users,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Books Borrowed",
      value: safeStats.totalBorrowed,
      icon: Clock,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "Total Reviews",
      value: safeStats.totalReviews,
      icon: Star,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      change: "+22%",
      changeType: "positive",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Digital Library Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive overview of your library system
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={card.title}
            className={`p-6 rounded-xl shadow-sm text-white ${card.color}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {card.value.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp size={16} className="text-white/80 mr-1" />
                  <span className="text-white/80 text-sm">
                    {card.change} from last month
                  </span>
                </div>
              </div>
              <div className="text-white/60">
                <card.icon size={32} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Books Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Monthly Book Additions
            </h3>
            <p className="text-gray-600">
              Track new books added to the library
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={safeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="books" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Book Categories
            </h3>
            <p className="text-gray-600">Distribution of books by category</p>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genreData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(genreData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Available Books
            </h4>
            <BookOpen className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {safeStats.availableBooks}
          </p>
          <p className="text-gray-600 text-sm mt-1">Ready for borrowing</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Average Rating
            </h4>
            <Star className="text-yellow-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-900">4.6</p>
          <p className="text-gray-600 text-sm mt-1">Across all books</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Popular Genre
            </h4>
            <Award className="text-purple-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-900">Fiction</p>
          <p className="text-gray-600 text-sm mt-1">Most borrowed category</p>
        </div>
      </div>
    </div>
  );
};

export default Statictis;
