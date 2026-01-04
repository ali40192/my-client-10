import React from "react";
import { NavLink } from "react-router";
import { Users } from "lucide-react";

const DashTable = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b font-semibold text-gray-700 flex justify-between items-center">
        <span>Recent Activity</span>

        <button className="btn btn-xs" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-gray-800">
                Arif Rahman
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">Oct 24, 2023</td>
            </tr>

            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-gray-800">
                Nabila Islam
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">Oct 23, 2023</td>
            </tr>

            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-gray-800">
                Tanvir Ahmed
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">Oct 22, 2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashTable;
