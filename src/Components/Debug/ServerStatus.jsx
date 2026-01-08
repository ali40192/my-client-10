import { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const ServerStatus = () => {
  const [status, setStatus] = useState({
    isOnline: null,
    lastChecked: null,
    error: null,
    endpoints: {},
  });
  const [isChecking, setIsChecking] = useState(false);

  const checkServerStatus = async () => {
    setIsChecking(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    const endpoints = [
      { name: "Root", path: "/" },
      { name: "Test", path: "/test" },
      { name: "Dashboard Stats", path: "/dashboard/stats" },
      { name: "Dashboard Users", path: "/dashboard/users" },
      { name: "Test Users", path: "/test-users" },
    ];

    const results = {};
    let serverOnline = false;

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${apiUrl}${endpoint.path}`, {
          timeout: 5000,
        });
        results[endpoint.name] = {
          status: "success",
          code: response.status,
          message: "OK",
        };
        serverOnline = true;
      } catch (error) {
        results[endpoint.name] = {
          status: "error",
          code: error.response?.status || "TIMEOUT",
          message: error.message,
        };
      }
    }

    setStatus({
      isOnline: serverOnline,
      lastChecked: new Date(),
      error: serverOnline ? null : "Server appears to be down",
      endpoints: results,
    });

    setIsChecking(false);
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  const getStatusIcon = (endpointStatus) => {
    if (endpointStatus.status === "success") {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getOverallStatusIcon = () => {
    if (status.isOnline === null) {
      return <RefreshCw className="w-5 h-5 text-gray-500 animate-spin" />;
    }
    if (status.isOnline) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getOverallStatusIcon()}
          <h3 className="text-lg font-semibold">Server Status</h3>
        </div>
        <button
          onClick={checkServerStatus}
          disabled={isChecking}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1"
        >
          <RefreshCw
            className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`}
          />
          Check
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          API URL:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            {import.meta.env.VITE_API_URL}
          </code>
        </p>
        {status.lastChecked && (
          <p className="text-xs text-gray-500 mt-1">
            Last checked: {status.lastChecked.toLocaleTimeString()}
          </p>
        )}
      </div>

      {status.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-red-700 font-medium">Server Issue Detected</p>
          </div>
          <p className="text-red-600 text-sm mt-1">{status.error}</p>
          <div className="mt-3 text-sm text-red-600">
            <p className="font-medium">Possible solutions:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>The Vercel deployment may need to be redeployed</li>
              <li>Check if the server code was properly deployed</li>
              <li>Verify the MongoDB connection is working</li>
              <li>Check Vercel deployment logs for errors</li>
            </ul>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Endpoint Status:</h4>
        {Object.entries(status.endpoints).map(([name, endpoint]) => (
          <div
            key={name}
            className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
          >
            <div className="flex items-center gap-2">
              {getStatusIcon(endpoint)}
              <span className="text-sm font-medium">{name}</span>
            </div>
            <div className="text-sm text-gray-600">
              {endpoint.code} - {endpoint.message}
            </div>
          </div>
        ))}
      </div>

      {!status.isOnline && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> The dashboard is currently using mock data to
            demonstrate the UI. Once the server is fixed, real data will be
            displayed.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServerStatus;
