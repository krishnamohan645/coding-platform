import React from "react";

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  color = "blue",
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-emerald-50 text-emerald-600 border-emerald-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i
                  className={`${
                    trend.isPositive
                      ? "ri-arrow-up-line text-emerald-500"
                      : "ri-arrow-down-line text-red-500"
                  } text-sm`}
                ></i>
              </div>
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
        >
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
}
