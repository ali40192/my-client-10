import { useState } from "react";
import { testApiEndpoints, testUsersEndpoint } from "../../utils/testApi";

const ApiTest = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    try {
      const testResults = await testApiEndpoints();
      const usersTest = await testUsersEndpoint();

      setResults({
        endpoints: testResults,
        usersSpecific: usersTest,
      });
    } catch (error) {
      console.error("Test error:", error);
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">API Endpoint Test</h2>

      <button
        onClick={runTests}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test API Endpoints"}
      </button>

      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
