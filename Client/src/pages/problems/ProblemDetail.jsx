// src/pages/ProblemDetail.jsx
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import CodeEditor from "../../components/InteractiveCodeEditor";
import { useDispatch, useSelector } from "react-redux";
import { getPracticeProblems } from "../practiceProblems/practiceProblems.slice";
import { getProblemDetail, initUserActivity } from "./problemDetail.slice";
import { getLanguages } from "../topicSidebar/language.slice";
import axios from "axios";
import AIChatWidget from "../../components/AIChatWidget";

export default function ProblemDetail() {
  const { id: problemId, conceptId } = useParams();
  const { state } = useLocation();
  const isFromPractice = state?.from === "practice";
  const practiceLanguageId = state?.languageId;
  console.log(practiceLanguageId, "practiceLanguageId");

  // const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  console.log(selectedLanguageId, "selectedLanguageId");
  const [showHints, setShowHints] = useState(false);
  const [showAIHint, setShowAIHint] = useState(false);
  const [aiHint, setAIHint] = useState("");
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch();

  const PracticeProblem = useSelector(
    (state) => state.practiceProblems?.practiceProblems?.PracticeProblems?.[0]
  );

  console.log(PracticeProblem, "PracticeProblem in problem detail");

  const problemFromList = useSelector((state) => state?.problem?.problemDetail);
  console.log(problemFromList, "problemDetail in problem detail");

  const editorRef = useRef(null);

  useEffect(() => {
    if (conceptId) {
      // Practice problems flow
      dispatch(getPracticeProblems(conceptId));
    } else {
      // Problems list flow
      dispatch(getProblemDetail(problemId));
    }
  }, [dispatch, conceptId, problemId]);

  // const problem = conceptId
  //   ? PracticeProblem?.find((p) => p.id === Number(problemId))
  //   : problemFromList;

  // Determine which problem data to use
  let problem = null;

  if (isFromPractice) {
    problem = PracticeProblem;
  } else {
    problem = problemFromList;
  }

  console.log(problem, "final problem data to display");

  const getAIHint = async () => {
    setShowAIHint(true);
    if (aiHint && !aiHint.includes("wait")) return;
    setIsLoadingHint(true);
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/ai/hint",
        "https://coding-platform-production-5910.up.railway.app/api/ai/hint",
        {
          problemTitle: problem.title,
          description: problem.description?.text || problem.description,
          difficulty: problem.difficulty,
          examples: problem.examples,
        },
        { withCredentials: true }
      );
      setAIHint(res.data.hint);
    } catch (error) {
      setAIHint(error.response?.data?.error || "Sorry, I couldn't generate a hint. Please try again.");
    } finally {
      setIsLoadingHint(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-600 bg-emerald-50";
      case "Medium":
        return "text-orange-600 bg-orange-50";
      case "Hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const languages = useSelector((state) => state?.Langauges?.languages);
  // const languages = languageNames?.map((lang) => lang.name);
  console.log(languages, "languageNames");

  const user = useSelector((state) => state?.Users);
  const userId = user?.user?.id;
  console.log(userId, "userId in problem detail");

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (!userId || !selectedLanguageId) return;

    dispatch(
      initUserActivity({
        problem_type: isFromPractice ? "practice" : "problem",
        problem_id: !isFromPractice ? Number(problemId) : null,
        practice_problem_id: isFromPractice ? Number(problem?.id) : null,
        language_id: selectedLanguageId,
      })
    );
  }, [
    dispatch,
    userId,
    selectedLanguageId,
    isFromPractice,
    problemId,
    problem,
  ]);

  const editorTemplate = isFromPractice
    ? problem?.template
    : problemFromList?.template;

  const selectedLanguage = languages?.find((l) => l.id === selectedLanguageId);

  useEffect(() => {
    if (isFromPractice && practiceLanguageId) {
      setSelectedLanguageId(Number(practiceLanguageId));
    }
  }, [isFromPractice, practiceLanguageId]);

  if (!problem || Object.keys(problem).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading problem...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-[60px] h-screen overflow-hidden">
        <div className="h-full flex">
          {/* LEFT PANEL */}
          <div className="w-2/5 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <Link to="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
                <i className="ri-arrow-right-s-line"></i>

                {isFromPractice ? (
                  <>
                    <Link
                      to={`/language-overview/${problem.languageId}/concept/${conceptId}`}
                      className="hover:text-blue-600"
                    >
                      Practice
                    </Link>
                  </>
                ) : (
                  <Link to="/problems" className="hover:text-blue-600">
                    Problems
                  </Link>
                )}

                <i className="ri-arrow-right-s-line"></i>
                <span className="text-gray-900 font-medium">
                  {problem.title}
                </span>
              </nav>

              {/* Title */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {problem.title}
                </h1>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${getDifficultyColor(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>
              </div>

              {/* Stats */}
              {!isFromPractice && (
                <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
                  <span>Acceptance: {problem.acceptance}%</span>
                  <span>•</span>
                  <span>
                    Submissions: {problem.submissions?.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="prose max-w-none mb-6">
                <div className="whitespace-pre-line text-gray-700">
                  {problem.description?.text || (Array.isArray(problem.description)
                    ? problem.description.join("\n\n")
                    : problem.description)}
                </div>
              </div>

              {/* Examples */}
              {problem.examples?.[0] && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Examples
                  </h3>
                  {problem.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="font-semibold mb-2">
                        Example {index + 1}
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          <strong>Input:</strong> {example.input}
                        </div>
                        <div>
                          <strong>Output:</strong> {example.output}
                        </div>
                        {example.explanation && (
                          <div>
                            <strong>Explanation:</strong> {example.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Constraints */}
              {!isFromPractice && (problem.constraints?.text || problem.constraints?.length > 0) && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Constraints</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    {problem.constraints?.text || (
                      <ul className="list-disc pl-5">
                        {problem.constraints.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* Hints */}
              {!isFromPractice && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="text-lg font-bold">Hints</h3>
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="text-blue-600 text-sm"
                    >
                      {showHints ? "Hide" : "Show"}
                    </button>
                  </div>

                  {showHints && problem.hints?.length > 0 &&
                    problem.hints.map((hint, i) => (
                      <div
                        key={i}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2"
                      >
                        {hint}
                      </div>
                    ))}
                </div>
              )}

              {/* AI Hint Button */}
              <div className="mb-6">
                <button
                  onClick={getAIHint}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Get AI Hint
                </button>
              </div>

              {/* AI Hint Modal */}
              {showAIHint && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">AI Hint</h3>
                        <p className="text-xs text-gray-500">Powered by Gemini</p>
                      </div>
                      <button
                        onClick={() => setShowAIHint(false)}
                        className="ml-auto text-gray-400 hover:text-gray-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-4">
                      {isLoadingHint ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 whitespace-pre-wrap">{aiHint}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setShowAIHint(false)}
                      className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Tags */}
              {!isFromPractice && problem.tags?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex-1 flex flex-col">
            <div className=" bg-white border-b border-gray-200 p-4">
              {!isFromPractice && (
                <select
                  value={selectedLanguageId || ""}
                  onChange={(e) =>
                    setSelectedLanguageId(Number(e.target.value))
                  }
                  className="px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="" disabled>
                    Select Language
                  </option>

                  {languages?.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                className="cursor-pointer px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-md rounded flex items-center space-x-1 ml-210"
                onClick={() => editorRef.current?.submitCodeFromParent()}
              >
                Submit
              </button>
            </div>

            <div className="flex-1">
              <CodeEditor
                language={
                  isFromPractice
                    ? undefined
                    : selectedLanguage?.name?.toLowerCase()
                }
                languageId={
                  isFromPractice ? practiceLanguageId : selectedLanguageId
                }
                template={editorTemplate}
                isFromPractice={isFromPractice}
                problemId={problemId}
                practiceProblemId={isFromPractice ? problem?.id : null}
                ref={editorRef}
              />
            </div>
          </div>
        </div>
      </main>
      <AIChatWidget
        context={{
          problemTitle: problem?.title,
          difficulty: problem?.difficulty,
          description: problem?.description?.text || problem?.description,
        }}
      />
    </div>
  );
}
