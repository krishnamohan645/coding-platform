import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ProgressBar from "../../components/ui/ProgressBar";
import { getTopics, addId } from "./language.slice";

const TopicSidebar = () => {
  const { id: languageId, topicId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.Langauges);
  console.log(topics, "topicsssssssssss");
  const location = useLocation();
  useEffect(() => {
    const topicList = topics?.topics?.Topics;
    const currentPath = location.pathname;

    if (
      topicList &&
      topicList.length > 0 &&
      currentPath === `/language-overview/${languageId}` &&
      selectedTopic === null
    ) {
      const firstTopicId = topicList[0].id;
      navigate(`/language-overview/${languageId}/subtopics/${firstTopicId}`);
      // setSelectedTopic(0); // set as selected
    }
  }, [topics, languageId, location.pathname]);

  useEffect(() => {
    if (languageId) {
      dispatch(getTopics(languageId));
    }
  }, [dispatch, languageId]);

  useEffect(() => {
    const topicList = topics?.topics?.Topics;
    if (!topicList || !topicId) return;
    const topicIndex = topicList.findIndex(
      (t) => String(t.id) === String(topicId)
    );
    if (topicIndex !== -1) {
      setSelectedTopic(topicIndex);
    }
  }, [topicId, topics]);

  const handleTopicClick = (topic, index) => {
    console.log("Navigating to topic:", topic.id);
    setSelectedTopic(index);
    // Navigate to subtopics route for this topic
    navigate(`/language-overview/${languageId}/subtopics/${topic.id}`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-[60px] px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 mt-6">
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <i className="ri-arrow-right-s-line" />
            <Link to="/languages" className="hover:text-blue-600">
              Languages
            </Link>
            <i className="ri-arrow-right-s-line" />
            <Link
              to={`/language-overview/${languageId}/subtopics/${topicId}`}
              className="hover:text-blue-600"
            >
              {topics?.topics?.name}
            </Link>
            {/* {selectedTopic !== null && (
              <>
                <i className="ri-arrow-right-s-line" />
                <span className="text-gray-900 font-medium">
                  {}
                </span>
              </>
            )} */}
          </nav>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside
              className={`lg:w-1/4 ${
                sidebarOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 max-h-[400px] md:max-h-[700px] overflow-y-scroll learning_path_topics">
                <div className="mb-10">
                  {/* <div className=" h-[700px] overflow-y-scroll"> */}
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Learning Path
                  </h3>
                  <div className="space-y-3">
                    {topics.topics?.Topics?.length === 0 ? (
                      <div className="text-gray-500 text-sm">
                        No topics found.
                      </div>
                    ) : (
                      topics.topics?.Topics?.map((topic, index) => (
                        <div
                          // to={`/languages/${language}`}
                          key={topic.id}
                          onClick={() => handleTopicClick(topic, index)}
                          className={`block p-3 rounded-lg transition-all ${
                            selectedTopic === index
                              ? "bg-blue-50 border-2 border-blue-200"
                              : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                          } ${
                            topic.status === "locked"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {topic.name}
                            </h4>
                            <div className="flex items-center">
                              {topic.status === "completed" && (
                                <i className="ri-check-line text-emerald-600"></i>
                              )}
                              {topic.status === "current" && (
                                <i className="ri-play-circle-line text-blue-600"></i>
                              )}
                              {topic.status === "locked" && (
                                <i className="ri-lock-line text-gray-400"></i>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-2">
                            {topic.solved}/{topic.problems} problems
                          </div>
                          <ProgressBar
                            progress={
                              topic.status === "locked"
                                ? 0
                                : (topic.solved / topic.problems) * 100
                            }
                            showPercentage={false}
                            color={
                              topic.status === "completed" ? "green" : "blue"
                            }
                          />
                        </div>
                      ))
                    )}
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {/* <div
                    className={`w-16 h-16 bg-gradient-to-r ${currentLang.color} rounded-xl flex items-center justify-center`}
                  >
                    <i className={`${currentLang.logo} text-2xl text-white`} />
                  </div> */}
                  <div>
                    {/* <h1 className="text-3xl font-bold text-gray-900">
                      {currentLang.name}
                    </h1>
                    <p className="text-gray-600">
                      {currentLang.difficulty} • {currentLang.estimatedTime}
                    </p> */}
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden bg-white border border-gray-200 rounded-lg px-4 py-2 cursor-pointer"
                >
                  <i className="ri-menu-line mr-2" />
                  Topics
                </button>
              </div>

              <Outlet context={{ selectedTopic }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TopicSidebar;
