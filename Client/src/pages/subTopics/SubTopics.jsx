import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { getSubTopicsById } from "./topic.slice";

export default function SubTopics() {
  const { id: languageId, topicId } = useParams();
  console.log(topicId, "topic idd");
  const dispatch = useDispatch();

  const subtopicsState = useSelector((state) => state.Topics);
  const subtopics = subtopicsState.subtopics || [];
  console.log(subtopics, "gettttttopics");
  const [selectedConcept, setSelectedConcept] = useState(null);
  console.log(selectedConcept, "selectedConcept");
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  useEffect(() => {
    if (topicId) {
      dispatch(getSubTopicsById(topicId));
    }
  }, [dispatch, topicId]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div
          className={`h-32 bg-gradient-to-r from-blue-400 to-blue-600 relative overflow-hidden rounded-t-xl`}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 p-6 flex items-center">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">{subtopics?.name}</h2>
              <p className="text-white/90">{subtopics?.description}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Key Concepts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subtopics?.Subtopics?.length === 0 ? (
                <div>
                  <p>Please select any topic to view the sub topics</p>
                </div>
              ) : (
                subtopics?.Subtopics?.map((concept, index) => (
                  <div
                    key={concept.id}
                    onClick={() => {
                      setSelectedConcept(concept.id);
                    }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedConcept === concept.id
                        ? "border-blue-300 bg-blue-50 shadow-md transform scale-105"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {concept.name}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(
                          concept.difficulty
                        )}`}
                      >
                        {concept.difficulty}
                      </span>
                    </div>
                    {selectedConcept === concept.id && (
                      <div className="text-sm text-gray-600 animate-fadeIn">
                        {concept.definition}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/language-overview/${languageId}/concept/${selectedConcept}`}
              className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-200 whitespace-nowrap text-center ${
                selectedConcept
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transform hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <i className="ri-book-open-line mr-2"></i>
              Review Topic
            </Link>
            <Link
              // to={`/languages/${language}/problems/${selectedConcept}`}
              to={`/problems`}
              className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-200 whitespace-nowrap text-center ${
                selectedConcept
                  ? "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 cursor-pointer transform hover:scale-105"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="ri-code-box-line mr-2"></i>
              Practice Problems
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <i className="ri-book-open-line text-xl text-blue-600"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Interactive Lessons
          </h3>
          <p className="text-gray-600 text-sm">
            Learn concepts with hands-on coding examples and instant feedback.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
            <i className="ri-code-box-line text-xl text-emerald-600"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Practice Problems
          </h3>
          <p className="text-gray-600 text-sm">
            Solve curated problems designed to reinforce your understanding.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
            <i className="ri-trophy-line text-xl text-purple-600"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Track Progress
          </h3>
          <p className="text-gray-600 text-sm">
            Monitor your learning journey with detailed analytics and
            achievements.
          </p>
        </div>
      </div>
    </>
  );
}
