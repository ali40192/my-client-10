import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 600 },
  { name: "Apr", sales: 800 },
];
const Statictis = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Overview</h1>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Revenue"
            value="$24,500"
            change="+12.5%"
            color="text-green-600"
          />
          <StatCard
            title="Active Users"
            value="1,205"
            change="+5.2%"
            color="text-blue-600"
          />
          <StatCard
            title="New Orders"
            value="48"
            change="-2.4%"
            color="text-red-600"
          />
        </div>

        {/* CHART */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-gray-700">
            Monthly Sales Analytics
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="sales"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
const StatCard = ({ title, value, change, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
      {title}
    </p>
    <div className="flex items-end justify-between mt-2">
      <h2 className="text-3xl font-black text-slate-800 tracking-tight">
        {value}
      </h2>
      <span
        className={`text-xs font-bold px-2 py-1 rounded-lg bg-gray-50 ${color}`}
      >
        {change}
      </span>
    </div>
  </div>
);

export default Statictis;
