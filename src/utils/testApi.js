// Test API endpoints
const API_URL = "https://assignment-10-server-three-kappa.vercel.app";

export const testApiEndpoints = async () => {
  const endpoints = [
    "/",
    "/test",
    "/dashboard/stats",
    "/dashboard/users",
    "/test-users",
  ];

  const results = {};

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${API_URL}${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`);
      const data = await response.json();

      results[endpoint] = {
        status: response.status,
        ok: response.ok,
        data: data,
      };

      console.log(`✅ ${endpoint}:`, response.status, data);
    } catch (error) {
      results[endpoint] = {
        status: "ERROR",
        error: error.message,
      };
      console.log(`❌ ${endpoint}:`, error.message);
    }
  }

  return results;
};

// Test specific dashboard users endpoint
export const testUsersEndpoint = async () => {
  try {
    const url = `${API_URL}/dashboard/users?page=1&limit=10`;
    console.log("Testing users endpoint:", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("Users endpoint response:", {
      status: response.status,
      ok: response.ok,
      data: data,
    });

    return { status: response.status, ok: response.ok, data };
  } catch (error) {
    console.error("Users endpoint error:", error);
    return { error: error.message };
  }
};
