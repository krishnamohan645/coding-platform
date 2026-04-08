// import { useParams, Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PracticeProblems() {
//   const { language, conceptId } = useParams();
//   const content = useSelector((state) =>
//     state.Topics.content.find(c => c.id === conceptId)
//   );

//   if (!content?.problems || content.problems.length === 0) {
//     return (
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
//         <div className="p-6 border-b border-gray-200">
//           <Link
//             to={`/languages/${language}`}
//             className="flex items-center text-blue-600 hover:text-blue-700 mb-4 cursor-pointer transition-colors"
//           >
//             <i className="ri-arrow-left-line mr-2"></i>
//             Back to Overview
//           </Link>
//           <h2 className="text-2xl font-bold text-gray-900">
//             {content?.name} - Practice Problems
//           </h2>
//         </div>

//         <div className="p-6">
//           <div className="text-center py-12">
//             <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//               <i className="ri-code-box-line text-2xl text-gray-400"></i>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Problems Coming Soon
//             </h3>
//             <p className="text-gray-600">
//               Practice problems for {content?.name} are being prepared.
//             </p>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <Link
//               to={`/languages/${language}/concept/${conceptId}`}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer whitespace-nowrap block text-center"
//             >
//               Review {content?.name} Content Again
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
//       <div className="p-6 border-b border-gray-200">
//         <Link
//           to={`/languages/${language}`}
//           className="flex items-center text-blue-600 hover:text-blue-700 mb-4 cursor-pointer transition-colors"
//         >
//           <i className="ri-arrow-left-line mr-2"></i>
//           Back to Overview
//         </Link>
//         <h2 className="text-2xl font-bold text-gray-900">
//           {content.name} - Practice Problems
//         </h2>
//       </div>

//       <div className="p-6">
//         <div className="space-y-4">
//           {content.problems.map((problem) => (
//             <div
//               key={problem.id}
//               className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     {problem.title}
//                   </h3>
//                   <p className="text-gray-700 leading-relaxed mb-4">
//                     {problem.description}
//                   </p>
//                 </div>
//                 <span
//                   className={`text-xs px-3 py-1 rounded-full ml-4 ${
//                     problem.difficulty === "Easy"
//                       ? "bg-emerald-100 text-emerald-800"
//                       : problem.difficulty === "Medium"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {problem.difficulty}
//                 </span>
//               </div>

//               {problem.examples?.length > 0 && (
//                 <div className="mb-4">
//                   <h4 className="font-semibold text-gray-900 mb-2">
//                     Examples:
//                   </h4>
//                   {problem.examples.map((example, exIndex) => (
//                     <div
//                       key={exIndex}
//                       className="bg-gray-50 rounded-lg p-3 mb-2"
//                     >
//                       <div className="text-sm space-y-1">
//                         <div>
//                           <strong>Input:</strong> {example.input}
//                         </div>
//                         <div>
//                           <strong>Output:</strong> {example.output}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="flex items-center space-x-3">
//                 <Link
//                   to={`/problems/${problem.id}`}
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
//                 >
//                   <i className="ri-code-line mr-2"></i>
//                   Solve Problem
//                 </Link>
//                 <button className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap">
//                   <i className="ri-bookmark-line mr-2"></i>
//                   Save for Later
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 pt-6 border-t border-gray-200">
//           <Link
//             to={`/languages/${language}/concept/${conceptId}`}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer whitespace-nowrap block text-center"
//           >
//             Review {content.name} Content Again
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPracticeProblems } from "./practiceProblems.slice";

export default function PracticeProblems() {
  const { conceptId, id: languageId } = useParams();

  const dispatch = useDispatch();
  const PracticeProblems = useSelector((state) => state.practiceProblems);

  console.log(PracticeProblems, "PracticeProblems in PracticeProblems.js");

  useEffect(() => {
    if (conceptId) {
      dispatch(getPracticeProblems(conceptId));
    }
  }, [dispatch, conceptId]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Link
          to={`/language-overview/${languageId}/concept/${conceptId}`}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          ← Back to Overview
        </Link>
        {PracticeProblems?.practiceProblems?.title ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900">
              {PracticeProblems?.practiceProblems?.title} – Practice Problems
            </h2>
          </>
        ) : null}
      </div>

      {PracticeProblems?.status === "Success" &&
        PracticeProblems?.practiceProblems?.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No problems found
          </div>
        )}

      {/* Problems List */}
      <div className="p-6 space-y-4">
        {PracticeProblems?.practiceProblems?.PracticeProblems?.map(
          (problem) => (
            <div
              key={problem.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {problem.title}
                </h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    problem.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{problem.description?.text || problem.description}</p>

              {/* Examples */}
              {problem.examples?.[0] && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <strong>Example:</strong>
                  <div className="text-sm mt-1">
                    <div>
                      <b>Input:</b> {problem.examples[0].input}
                    </div>
                    <div>
                      <b>Output:</b> {problem.examples[0].output}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link
                  to={`/problems/${problem.id}`}
                  state={{ from: "practice", languageId: Number(languageId) }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                >
                  Solve Problem
                </Link>

                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Save for Later
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
