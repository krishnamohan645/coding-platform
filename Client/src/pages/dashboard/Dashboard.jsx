import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatsCard from "../../components/ui/StatsCard";
import ProgressBar from "../../components/ui/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, getTopics } from "../topicSidebar/language.slice";
import { getUserDetails } from "../../components/header/Header.slice";

import { fetchUserStats } from "../profile/profile.slice";

export default function Dashboard() {
  const languages = useSelector((state) => state.Langauges);
  const { stats } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.Users?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
    dispatch(getUserDetails());
    dispatch(fetchUserStats());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-[60px] px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mt-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || "Code Master"} 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Ready to level up your coding skills today?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                  title="Problems Solved"
                  value={stats.problemsSolved}
                  icon="ri-checkbox-circle-line"
                  color="green"
                />
                <StatsCard
                  title="Current Streak"
                  value={`${stats.streak} days`}
                  icon="ri-fire-line"
                  color="orange"
                />
                <StatsCard
                  title="Global Rank"
                  value={`#${stats.globalRank?.toLocaleString()}`}
                  icon="ri-trophy-line"
                  color="purple"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Your Programming Languages
                  </h2>
                  <Link
                    to="/languages"
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap"
                  >
                    View All
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {languages?.languages?.map((lang) => (
                    <div
                      className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${lang.color}`}
                      key={lang.name}
                      onClick={() => {
                        dispatch(getTopics(lang?.id));
                        navigate(`/language-overview/${lang?.id}`);
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 flex items-center justify-center mr-3">
                          <i className={`${lang.logo} text-xl`}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {lang.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {lang.estimatedTime}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        {lang.description?.text || lang.description}
                      </p>
                      <ProgressBar progress={lang.progress || 0} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Overall Progress
                </h3>
                <div className="space-y-4">
                  <ProgressBar
                    progress={stats.overallProgress.easy.percent}
                    label="Easy Problems"
                    color="green"
                  />
                  <ProgressBar
                    progress={stats.overallProgress.medium.percent}
                    label="Medium Problems"
                    color="orange"
                  />
                  <ProgressBar
                    progress={stats.overallProgress.hard.percent}
                    label="Hard Problems"
                    color="purple"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {stats.recentActivity.length > 0 ? (
                    stats.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.status === "solved"
                              ? "bg-emerald-100"
                              : "bg-orange-100"
                          }`}
                        >
                          <i
                            className={`${
                              activity.status === "solved"
                                ? "ri-check-line text-emerald-600"
                                : "ri-time-line text-orange-600"
                            } text-sm`}
                          ></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.problem}
                          </p>
                          <p className="text-xs text-gray-600">
                            {activity.language} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-4">No activity yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
