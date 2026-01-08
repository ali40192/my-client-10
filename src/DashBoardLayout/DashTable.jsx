import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

const DashTable = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Fetch users data with pagination
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dashboardUsers", page, limit],
    queryFn: async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const endpoint = `/dashboard/users?page=${page}&limit=${limit}`;
        const fullUrl = `${apiUrl}${endpoint}`;

        console.log("API URL:", apiUrl);
        console.log("Endpoint:", endpoint);
        console.log("Full URL:", fullUrl);

        const response = await axios.get(fullUrl, {
          timeout: 10000, // 10 second timeout
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Users response status:", response.status);
        console.log("Users response data:", response.data);
        return response.data;
      } catch (error) {
        console.error("Users fetch error:", error);
        console.error("Error details:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
          timeout: error.code === "ECONNABORTED",
        });

        // If server is completely down (404 on basic endpoints), use mock data
        if (error.response?.status === 404 || error.code === "ECONNABORTED") {
          console.log("Server appears to be down, using mock data...");

          // Return mock data to demonstrate the UI
          const mockUsers = [
            {
              _id: "mock1",
              email: "admin@library.com",
              displayName: "Library Admin",
              photoURL: "https://via.placeholder.com/150",
              role: "admin",
              status: "active",
              created_at: new Date(
                Date.now() - 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            {
              _id: "mock2",
              email: "user1@example.com",
              displayName: "John Doe",
              photoURL: "https://via.placeholder.com/150",
              role: "user",
              status: "active",
              created_at: new Date(
                Date.now() - 15 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            {
              _id: "mock3",
              email: "user2@example.com",
              displayName: "Jane Smith",
              photoURL: "https://via.placeholder.com/150",
              role: "user",
              status: "active",
              created_at: new Date(
                Date.now() - 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
          ];

          return {
            users: mockUsers,
            totalUsers: mockUsers.length,
            totalPages: 1,
            currentPage: 1,
            success: true,
            message: "Using mock data - server is currently unavailable",
          };
        }

        // If it's a 404, let's try alternative endpoints
        if (error.response?.status === 404) {
          console.log("Trying alternative endpoints as fallback...");

          // Try the simple users list endpoint
          try {
            const fallbackResponse = await axios.get(
              `${
                import.meta.env.VITE_API_URL
              }/users/list?page=${page}&limit=${limit}`
            );
            console.log("Fallback users/list response:", fallbackResponse.data);
            return fallbackResponse.data;
          } catch (fallbackError) {
            console.error("Fallback users/list failed:", fallbackError);
          }

          // Try the test-users endpoint
          try {
            const testResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/test-users`
            );
            console.log("Test users response:", testResponse.data);

            // Return mock data structure if test endpoint works
            return {
              users: [],
              totalUsers: 0,
              totalPages: 1,
              currentPage: 1,
              message: "Users endpoint not found, but server is accessible",
            };
          } catch (testError) {
            console.error("Test endpoint also failed:", testError);
          }
        }

        throw error;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404 errors or timeouts (server is down)
      if (error.response?.status === 404 || error.code === "ECONNABORTED") {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: 1000,
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;
  const totalUsers = data?.totalUsers || 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b font-semibold text-gray-700 flex justify-between items-center">
          <span>Recent Activity</span>
          <button className="btn btn-xs" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b font-semibold text-gray-700 flex justify-between items-center">
          <span>User Management</span>
          <button className="btn btn-xs" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-red-300 mx-auto mb-4" />
            <p className="text-red-600 mb-4">Failed to load user data</p>
            <p className="text-sm text-gray-500 mb-4">Error: {error.message}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> The server appears to be down. The
                dashboard will show mock data to demonstrate the UI.
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mr-2"
              >
                Try Again
              </button>
              <button
                onClick={async () => {
                  console.log("=== API DEBUG INFO ===");
                  console.log("API URL:", import.meta.env.VITE_API_URL);
                  console.log(
                    "Full URL:",
                    `${
                      import.meta.env.VITE_API_URL
                    }/dashboard/users?page=${page}&limit=${limit}`
                  );

                  // Test basic server connectivity
                  try {
                    const testResponse = await axios.get(
                      `${import.meta.env.VITE_API_URL}/`
                    );
                    console.log("Server root response:", testResponse.data);
                  } catch (err) {
                    console.error("Server root failed:", err.message);
                  }

                  // Test the test endpoint
                  try {
                    const testResponse = await axios.get(
                      `${import.meta.env.VITE_API_URL}/test`
                    );
                    console.log("Test endpoint response:", testResponse.data);
                  } catch (err) {
                    console.error("Test endpoint failed:", err.message);
                  }

                  // Test the debug routes endpoint
                  try {
                    const debugResponse = await axios.get(
                      `${import.meta.env.VITE_API_URL}/debug/routes`
                    );
                    console.log("Debug routes response:", debugResponse.data);
                  } catch (err) {
                    console.error("Debug routes failed:", err.message);
                  }

                  // Test the test-users endpoint
                  try {
                    const testUsersResponse = await axios.get(
                      `${import.meta.env.VITE_API_URL}/test-users`
                    );
                    console.log(
                      "Test users endpoint response:",
                      testUsersResponse.data
                    );
                  } catch (err) {
                    console.error("Test users endpoint failed:", err.message);
                  }
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Debug Info
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b font-semibold text-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>Recent Activity ({totalUsers} users)</span>
          {data?.message && data.message.includes("mock data") && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Mock Data
            </span>
          )}
        </div>
        <button className="btn btn-xs" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {users.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No users found</p>
            {data?.message && (
              <p className="text-sm text-gray-400">{data.message}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Total users in database: {totalUsers}
            </p>
            <button
              onClick={async () => {
                try {
                  console.log("Creating test user...");
                  const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/create-test-user`
                  );
                  console.log("Test user created:", response.data);
                  // Refetch data after creating test user
                  refetch();
                } catch (error) {
                  console.error("Failed to create test user:", error);
                }
              }}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Create Test User
            </button>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user._id || `user-${user.email}-${user.createdAt}`}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {(user.displayName || user.name || user.email)
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="font-medium text-gray-800">
                        {user.displayName || user.name || "Unknown User"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : user.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.status || "active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Unknown"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashTable;
