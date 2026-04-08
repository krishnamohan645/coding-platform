import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStats } from "./profile.slice";
import StatsCard from "../../components/ui/StatsCard";
import ProgressBar from "../../components/ui/ProgressBar";

export default function Profile() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.profile);
  const user = useSelector((state) => state.Users.user);

  useEffect(() => {
    dispatch(fetchUserStats());
  }, [dispatch]);

  const getInitials = (name) => {
    if (!name) return "US";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  if (loading && !stats.problemsSolved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {getInitials(user?.name)}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{user?.name || "Code Master"}</h1>
              <p className="text-gray-500 mb-4">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {user?.authProvider === 'google' ? 'Google Account' : 'Email User'}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Active Learner
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Breakdown */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Expertise Level</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Easy</span>
                    <span className="text-gray-500">{stats.overallProgress.easy.count} solved</span>
                  </div>
                  <ProgressBar progress={stats.overallProgress.easy.percent} color="green" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Medium</span>
                    <span className="text-gray-500">{stats.overallProgress.medium.count} solved</span>
                  </div>
                  <ProgressBar progress={stats.overallProgress.medium.percent} color="orange" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Hard</span>
                    <span className="text-gray-500">{stats.overallProgress.hard.count} solved</span>
                  </div>
                  <ProgressBar progress={stats.overallProgress.hard.percent} color="purple" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Coding Activity</h2>
              {stats.recentActivity.length > 0 ? (
                <div className="space-y-6">
                  {stats.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        activity.status === 'solved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        <i className={activity.status === 'solved' ? 'ri-check-double-line text-xl' : 'ri-code-line text-xl'}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 capitalize">{activity.problem}</h3>
                        <p className="text-sm text-gray-500">{activity.language} • {activity.time}</p>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                          activity.status === 'solved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <i className="ri-inbox-line text-5xl mb-4 opacity-20"></i>
                  <p>No recent activity found. Start coding!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
