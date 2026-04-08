import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProblems } from "./problemDetail.slice";

export default function ProblemsList() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // const problems = [
  //   {
  //     id: 1,
  //     title: "Two Sum",
  //     difficulty: "Easy",
  //     category: "Array",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of two numbers that add up to target.",
  //     acceptance: 49.2,
  //     frequency: "Very High",
  //     companies: ["Google", "Amazon", "Microsoft"],
  //     tags: ["Array", "Hash Table"],
  //     solved: true,
  //     attempted: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Add Two Numbers",
  //     difficulty: "Medium",
  //     category: "Linked List",
  //     description:
  //       "Add two numbers represented as linked lists and return the sum as a linked list.",
  //     acceptance: 38.4,
  //     frequency: "High",
  //     companies: ["Amazon", "Microsoft", "Apple"],
  //     tags: ["Linked List", "Math", "Recursion"],
  //     solved: false,
  //     attempted: true,
  //   },
  //   {
  //     id: 3,
  //     title: "Longest Substring Without Repeating Characters",
  //     difficulty: "Medium",
  //     category: "String",
  //     description:
  //       "Find the length of the longest substring without repeating characters.",
  //     acceptance: 33.8,
  //     frequency: "Very High",
  //     companies: ["Amazon", "Adobe", "Bloomberg"],
  //     tags: ["Hash Table", "String", "Sliding Window"],
  //     solved: true,
  //     attempted: true,
  //   },
  //   {
  //     id: 4,
  //     title: "Median of Two Sorted Arrays",
  //     difficulty: "Hard",
  //     category: "Array",
  //     description:
  //       "Find the median of two sorted arrays with O(log(m+n)) time complexity.",
  //     acceptance: 35.2,
  //     frequency: "Medium",
  //     companies: ["Google", "Apple", "Microsoft"],
  //     tags: ["Array", "Binary Search", "Divide and Conquer"],
  //     solved: false,
  //     attempted: false,
  //   },
  //   {
  //     id: 5,
  //     title: "Longest Palindromic Substring",
  //     difficulty: "Medium",
  //     category: "String",
  //     description: "Find the longest palindromic substring in a given string.",
  //     acceptance: 32.1,
  //     frequency: "High",
  //     companies: ["Amazon", "Microsoft", "Facebook"],
  //     tags: ["String", "Dynamic Programming"],
  //     solved: false,
  //     attempted: true,
  //   },
  //   {
  //     id: 6,
  //     title: "Valid Parentheses",
  //     difficulty: "Easy",
  //     category: "Stack",
  //     description: "Determine if the input string of parentheses is valid.",
  //     acceptance: 40.7,
  //     frequency: "Very High",
  //     companies: ["Google", "Amazon", "Facebook"],
  //     tags: ["String", "Stack"],
  //     solved: true,
  //     attempted: true,
  //   },
  // ];
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

  const dispatch = useDispatch();

  const problems = useSelector((state) => state?.problem?.problems);
  console.log(problems, "problems in list");

  useEffect(() => {
    dispatch(getAllProblems());
  }, [dispatch]);

  const getStatusDot = (status) => {
    switch (status) {
      case "solved":
        return "bg-emerald-500";
      case "attempted":
        return "bg-orange-500";
      default:
        return "bg-gray-300";
    }
  };

  const filteredProblems = problems?.filter((problem) => {
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      problem.difficulty.toLowerCase() === selectedDifficulty;
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDifficulty && matchesSearch;
  });

  const getUserActivity = (problem) => {
    return (
      problem.user_activities?.[0] || {
        status: "not_started",
        attempts_count: 0,
        last_submitted_at: null,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-[60px] px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 mt-6">
            <Link
              to="/dashboard"
              className="hover:text-blue-600 cursor-pointer"
            >
              Dashboard
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900 font-medium">Problems</span>
          </nav>

          {/* Title and Filter */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Coding Problems
              </h1>
              <p className="text-gray-600">
                {/* Practice with {problems?.length} carefully curated problems */}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <i className="ri-search-line text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-64"
                />
              </div>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white pr-8"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Problem
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Acceptance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Frequency
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Companies
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProblems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`w-3 h-3 rounded-full inline-block ${getStatusDot(
                            getUserActivity(problem).status
                          )}`}
                          title={getUserActivity(problem).status.replace(
                            "_",
                            " "
                          )}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/problems/${problem.id}`}
                          className="cursor-pointer"
                        >
                          <div className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            {problem.title}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {problem.description?.text || problem.description}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {problem.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {problem.acceptance}%
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {problem.frequency}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {problem.companies?.slice(0, 2).map((company, index) => (
                              <span
                                key={index}
                                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                              >
                                {company}
                              </span>
                            ))}
                          {problem.companies?.length > 2 && (
                            <span className="text-xs text-gray-600">
                              +{problem.companies.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-search-line text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No problems found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
