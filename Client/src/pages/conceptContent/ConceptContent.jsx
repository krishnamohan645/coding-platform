// import { useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// // import { getContentById } from "";
// import { useEffect, useState } from "react";
// import InteractiveCodeEditor from "../../components/InteractiveCodeEditor";
// import { getContentById } from "../subTopics/topic.slice";
// import axios from "axios";

// const judge0LanguageMap = {
//   javascript: 63,
//   python: 71,
//   java: 62,
//   cpp: 54,
//   c: 50,
//   typescript: 74,
//   ruby: 72,
//   php: 68,
// };

// export default function ConceptContent() {
//   const { subtopicId, conceptId, id: languageId } = useParams();
//   console.log("subtopicIdddddd:", subtopicId);

//   const dispatch = useDispatch();
//   const content = useSelector((state) => state.Topics.content);
//   console.log(content, "contenntttt");

//   const [code, setCode] = useState(content.interactiveCode || "");
//   const [outputMessage, setOutputMessage] = useState("");

//   useEffect(() => {
//     if (conceptId) {
//       dispatch(getContentById(conceptId));
//     }
//   }, [dispatch, conceptId]);

//   useEffect(() => {
//     if (!content) return;
//     // find the specific content block (match by id if available)
//     const found =
//       content.Contents?.find((c) => String(c.id) === String(conceptId)) ||
//       content.Contents?.[0] ||
//       null;

//     // prefer interactiveCode from the focused content block, otherwise fallback to content.interactiveCode
//     const initialCode = found?.interactiveCode ?? content.interactiveCode ?? "";

//     setCode(initialCode);
//   }, [content, conceptId]);

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "beginner":
//         return "bg-emerald-100 text-emerald-800 border-emerald-200";
//       case "intermediate":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "advanced":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   if (!content) {
//     return <div>Loading...</div>;
//   }
//   // pick the right Contents entry to show its title/explanation/examples
//   const currentContent =
//     content.Contents?.find((c) => String(c.id) === String(conceptId)) ||
//     content.Contents?.[0] ||
//     null;

//      // safe guards
//   const title = currentContent?.title ?? content.name ?? "Untitled";
//   const explanation = currentContent?.explanation ?? content.definition ?? "";
//   const examples = currentContent?.examples ?? [];

//     const handleCopy = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setOutputMessage("Copied to clipboard!");
//       setTimeout(() => setOutputMessage(""), 1500);
//     } catch (err) {
//       setOutputMessage("Copy failed");
//       setTimeout(() => setOutputMessage(""), 1500);
//     }
//   };

//   const handleLoadExample = (exampleCode) => {
//     setCode(exampleCode || "");
//   };

//   const subtopicContent = content?.Contents;
//   console.log(subtopicContent, "subtopicContent");

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
//       <div className="p-6 border-b border-gray-200">
//         <Link
//           to={`/language-overview/${languageId}`}
//           className="flex items-center text-blue-600 hover:text-blue-700 mb-4 cursor-pointer transition-colors"
//         >
//           <i className="ri-arrow-left-line mr-2"></i>
//           Back to Overview
//         </Link>
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-900">{content.name}</h2>
//           <span
//             className={`text-sm px-3 py-1 rounded-full border ${getDifficultyColor(
//               content.difficulty
//             )}`}
//           >
//             {content.difficulty}
//           </span>
//         </div>
//       </div>

//       <div className="p-6 space-y-6">
//         <div>
//           <h3 className="text-lg font-bold text-gray-900 mb-3">Definition</h3>
//           <p className="text-gray-700 leading-relaxed">{content?.definition}</p>
//         </div>

//         <div>
//           {subtopicContent?.map((expl, index) => {
//             // const parts = expl.split(/(\*\*(.*?)\*\*)/g); // Split by **bold**
//             return (
//               <div key={index}>
//                 <h2 className="text-lg font-bold mb-4">Explanation:</h2>
//                 <p>{expl.explanation}</p>
//               </div>
//             );
//           })}
//         </div>

//         <div>
//           {subtopicContent?.map((expl, index) => {
//             return (
//               <div key={index}>
//                 {/* <h3 className="text-lg font-bold text-gray-900 mb-3">
//                   {expl.title}
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed">
//                   {expl.explanation}
//                 </p> */}
//                 <h3 className="text-lg font-bold text-gray-900 mb-3">
//                   {expl.examples.map((example, exIndex) => (
//                     <div key={exIndex} className="mb-4">
//                       <h4 className="font-semibold mb-2">
//                         Example {exIndex + 1}:
//                       </h4>
//                       <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
//                         <code>{example.description}</code>
//                       </pre>
//                     </div>
//                   ))}
//                 </h3>
//               </div>
//             );
//           })}
//         </div>

//         {content?.Content?.interactiveCode && (
//           <div>
//             <h3 className="text-lg font-bold text-gray-900 mb-3">
//               Try It Yourself
//             </h3>
//             <div className="border border-gray-200 rounded-lg overflow-hidden">
//               <div className="h-85">
//                 <InteractiveCodeEditor
//                   // language={subtopicId}
//                   language="javascript"
//                   value={code}
//                   onChange={(newCode) => setCode(newCode)}
//                 />
//               </div>
//               {/* <div className="bg-gray-50 p-3 border-t border-gray-200 flex flex-col gap-2">
//                 <button
//                   onClick={handleRunCode}
//                   className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap w-fit"
//                 >
//                   <i className="ri-play-line mr-2"></i>
//                   Run Code
//                 </button>

//                 {output && (
//                   <div className="bg-black text-white p-4 mt-2 rounded-lg whitespace-pre-wrap text-sm">
//                     {output}
//                   </div>
//                 )}
//               </div> */}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
//           <Link
//             to={`/languages/${subtopicId}/problems/${conceptId}`}
//             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-center"
//           >
//             Practice Problems
//           </Link>
//           <Link
//             // to={`/languages/${subtopicId}`}
//             to={`/language-overview/${languageId}`}
//             className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-center"
//           >
//             Choose Different Concept
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useParams, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import InteractiveCodeEditor from "../../components/InteractiveCodeEditor";
import { getContentById } from "../subTopics/topic.slice";

export default function ConceptContent() {
  const { conceptId, id: languageId } = useParams();

  const { state } = useLocation();
  const subtopicId = state?.topicId;
  console.log("subtopicId:", subtopicId);

  const dispatch = useDispatch();
  const content = useSelector((state) => state.Topics.content);

  console.log(content, "contenntttt");
  // editor code state (parent-controlled so we can load examples into it)
  const [code, setCode] = useState("");
  const [outputMessage, setOutputMessage] = useState("");

  const languages = useSelector((state) => state.Langauges.languages);
  const currentLanguage = languages?.find(
    (l) => String(l.id) === String(languageId)
  );
  useEffect(() => {
    if (conceptId) {
      dispatch(getContentById(conceptId));
    }
  }, [dispatch, conceptId]);

  // whenever content loads/changes, initialize editor with interactiveCode if present
  useEffect(() => {
    if (!content) return;
    // find the specific content block (match by id if available)
    const found =
      content.Contents?.find((c) => String(c.id) === String(conceptId)) ||
      content.Contents?.[0] ||
      null;

    // prefer interactiveCode from the focused content block, otherwise fallback to content.interactiveCode
    const initialCode = found?.interactiveCode ?? content.interactiveCode ?? "";

    setCode(initialCode);
  }, [content, conceptId]);

  if (!content) {
    return <div className="p-6">Loading...</div>;
  }

  // pick the right Contents entry to show its title/explanation/examples
  const currentContent =
    content.Contents?.find((c) => String(c.id) === String(conceptId)) ||
    content.Contents?.[0] ||
    null;

  // safe guards
  const title = currentContent?.title ?? content.name ?? "Untitled";
  const explanation = currentContent?.explanation ?? content.definition ?? "";
  const examples = currentContent?.examples ?? [];

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setOutputMessage("Copied to clipboard!");
      setTimeout(() => setOutputMessage(""), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
      setOutputMessage("Copy failed");
      setTimeout(() => setOutputMessage(""), 1500);
    }
  };

  const handleLoadExample = (exampleCode) => {
    setCode(exampleCode || "");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="p-6 border-b border-gray-200">
        <Link
          to={`/language-overview/${languageId}`}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4 cursor-pointer transition-colors"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Back to Overview
        </Link>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <span
            className={`text-sm px-3 py-1 rounded-full border bg-gray-100 text-gray-800`}
          >
            {content.difficulty ?? "Unknown"}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Definition / Explanation */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Definition</h3>
          <p className="text-gray-700 leading-relaxed">{explanation}</p>
        </div>

        {/* Examples */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Examples</h3>
          {examples.length === 0 ? (
            <div className="text-gray-500">No examples available.</div>
          ) : (
            <div className="space-y-4">
              {examples.map((example, idx) => (
                <div
                  key={idx}
                  className="border border-gray-100 p-4 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {example.description ?? `Example ${idx + 1}`}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLoadExample(example.code || "")}
                        className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
                        title="Load example into editor"
                      >
                        Load into editor
                      </button>

                      <button
                        onClick={() => handleCopy(example.code || "")}
                        className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                        title="Copy code"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <pre className="bg-gray-100 p-3 rounded mt-3 overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Code Editor */}
        {currentContent?.interactiveCode && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Try it yourself
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden h-[460px]">
              {/* <InteractiveCodeEditor
                language="javascript"
                value={code}
                onChange={(newCode) => setCode(newCode)}
              /> */}
              <InteractiveCodeEditor
                mode="concept" 
                language={currentLanguage?.name?.toLowerCase()}
                languageId={Number(languageId)}
                value={code}
                onChange={(newCode) => setCode(newCode)}
              />
            </div>
            {outputMessage && (
              <div className="text-sm text-emerald-600 mt-2">
                {outputMessage}
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
          <Link
            to={`/language-overview/${languageId}/problems/${conceptId}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-center"
          >
            Practice Problems
          </Link>
          <Link
            to={`/language-overview/${languageId}`}
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-center"
          >
            Choose Different Concept
          </Link>
        </div>
      </div>
    </div>
  );
}
