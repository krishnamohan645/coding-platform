import { useDispatch, useSelector } from "react-redux";
import { fetchUserStats } from "../profile/profile.slice";
import { useState } from "react";
import { useEffect } from "react";
import { getLanguages } from "../topicSidebar/language.slice";
import { Link } from "react-router-dom";
import ProgressBar from "../../components/ui/ProgressBar";

export default function Languages() {
  const dispatch = useDispatch();
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const languageDetails = useSelector((state) => state.Langauges);
  const { stats } = useSelector((state) => state.profile);

  const difficulties = [
    { id: "all", name: "All Levels", count: 1247, color: "text-gray-700" },
    { id: "easy", name: "Easy", count: 542, color: "text-emerald-600" },
    { id: "medium", name: "Medium", count: 463, color: "text-orange-600" },
    { id: "hard", name: "Hard", count: 242, color: "text-red-600" },
  ];

  useEffect(() => {
    dispatch(getLanguages());
    dispatch(fetchUserStats());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-[60px] px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 mt-6">
            <Link
              to="/dashboard"
              className="hover:text-blue-600 cursor-pointer"
            >
              Dashboard
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900 font-medium">Languages</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside
              className={`lg:w-1/4 ${
                sidebarOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Filter by Difficulty
                  </h3>
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    <i className="ri-close-line text-gray-500"></i>
                  </button>
                </div>

                <div className="space-y-3">
                  {difficulties.map((diff) => (
                    <label
                      key={diff.id}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        checked={selectedDifficulty === diff.id}
                        onChange={() => setSelectedDifficulty(diff.id)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <span className={`font-medium ${diff.color}`}>
                          {diff.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {diff.count}
                        </span>
                      </div>
                      {selectedDifficulty === diff.id && (
                        <i className="ri-check-line text-blue-600"></i>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Your Progress
                </h3>
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="6"
                      strokeDasharray={`${(stats.overallProgress.easy.percent + stats.overallProgress.medium.percent + stats.overallProgress.hard.percent)/3 * 2.83} 283`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round((stats.overallProgress.easy.percent + stats.overallProgress.medium.percent + stats.overallProgress.hard.percent)/3)}%
                      </div>
                      <div className="text-xs text-gray-600">Complete</div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {stats.problemsSolved} problems solved
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Programming Languages
                </h1>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden bg-white border border-gray-200 rounded-lg px-4 py-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-filter-line mr-2"></i>
                  Filters
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {languageDetails?.languages?.map((lang) => (
                  <div
                    key={lang.name}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div
                      className={`h-24 ${lang.gradient} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute top-4 left-6 flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <i className={`${lang.logo} text-2xl text-white`}></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {lang.name}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {lang.difficulty}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2 h-12">
                        {lang.description?.text || lang.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                          Est. {lang.estimatedTime}
                        </div>
                      </div>

                      <ProgressBar progress={lang.progress || 0} color="blue" />

                      <Link to={`/language-overview/${lang.id}`}>
                        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
