import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoadmaps,
  toggleTopicCompletionAsync,
} from "./roadmap.slice";
import StatsCard from "../../components/ui/StatsCard";

const Roadmap = () => {
  const dispatch = useDispatch();
  const {
    data: roadmaps,
    loading,
    error,
  } = useSelector((state) => state.roadmap);

  useEffect(() => {
    dispatch(fetchRoadmaps());
  }, [dispatch]);

  // ---------- STATS CALCULATION ----------
  const stats = useMemo(() => {
    const totalRoadmaps = roadmaps.length;
    const totalTopics = roadmaps.reduce((sum, r) => sum + r.topics.length, 0);
    const completedTopics = roadmaps.reduce(
      (sum, r) => sum + r.topics.filter((t) => t.completed).length,
      0
    );

    const progress =
      totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

    return {
      totalRoadmaps,
      totalTopics,
      completedTopics,
      progress,
    };
  }, [roadmaps]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading roadmap...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Learning Roadmap</h1>
          <p className="text-sm text-gray-500">
            Track your learning path topic by topic
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Roadmaps"
            value={stats.totalRoadmaps}
            icon="ri-road-map-line"
            color="blue"
          />
          <StatsCard
            title="Total Topics"
            value={stats.totalTopics}
            icon="ri-list-check-2"
            color="purple"
          />
          <StatsCard
            title="Completed"
            value={stats.completedTopics}
            icon="ri-checkbox-circle-line"
            color="green"
          />
          <StatsCard
            title="Progress"
            value={`${stats.progress}%`}
            icon="ri-bar-chart-line"
            color="orange"
          />
        </div>
      </div>

      {/* Roadmap Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap.id}
              className="rounded-xl shadow-md overflow-hidden bg-white "
            >
              <div
                key={roadmap.id}
                className={`h-24 ${roadmap.gradient} shadow-md relative overflow-hidden`}
              >
                {/* Card Header */}
                <div className="p-5 text-white">
                  <div className="flex items-center gap-3">
                    {roadmap.logo && (
                      // <img
                      //   src={roadmap.logo}
                      //   alt={roadmap.title}
                      //   className="h-10 w-10 object-contain bg-white rounded p-1"
                      // />
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <i
                          className={`${roadmap.logo} text-2xl text-white`}
                        ></i>
                      </div>
                    )}
                    <div>
                      <h2 className="text-lg font-semibold">{roadmap.title}</h2>
                      <p className="text-xs opacity-90">
                        {roadmap.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="bg-white p-5 ">
                <ul className="space-y-3">
                  {roadmap.topics.map((topic) => (
                    <li
                      key={topic.id}
                      onClick={() =>
                        dispatch(toggleTopicCompletionAsync(topic.id))
                      }
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={topic.completed}
                        readOnly
                        className="h-4 w-4"
                        style={{ accentColor: roadmap.color }}
                        
                      />
                      <span
                        className={`text-sm ${
                          topic.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700 font-medium"
                        } group-hover:text-gray-900 border-b border-transparent group-hover:border-gray-200 pb-1`}
                      >
                        {topic.name}
                      </span>
                      {/* {topic.subtopics?.length > 0 && (
                        <div className="ml-7 mt-1 space-y-1">
                          {topic.subtopics.map(sub => (
                             <div key={sub.id} className="text-xs text-gray-500 flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                               {sub.name}
                             </div>
                          ))}
                        </div>
                      )} */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {roadmaps.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No roadmap data available
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400">
        CodePractice • Personalized Learning Roadmaps
      </footer>
    </div>
  );
};

export default Roadmap;
