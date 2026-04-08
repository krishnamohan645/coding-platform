import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  resetActivity,
  runCode,
  submitCode,
} from "../pages/problems/problemDetail.slice";

const JUDGE0_URL = "http://3.110.143.167:2358/submissions";

const InteractiveCodeEditor = forwardRef(
  (
    {
      mode = "problem",
      language, // string for monaco (ex: "javascript")
      languageId,
      template = {}, // { javascript: "...", python: "..." }
      problemId,
      practiceProblemId,
      isFromPractice,
      onChange,
      readOnly = false,
      value,
    },
    ref
  ) => {
    const dispatch = useDispatch();

    const [code, setCode] = useState("");
    const [initialTemplate, setInitialTemplate] = useState("");
    const [output, setOutput] = useState("");
    const [processing, setProcessing] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [hasEdited, setHasEdited] = useState(false);

    useEffect(() => {
      if (mode === "concept") {
        setCode(value || "");
        setInitialTemplate(value || "");
        setHasEdited(false);
      }
    }, [value, mode]);

    /* -------------------- LANGUAGE MAP -------------------- */

    const languages = useSelector((state) => state?.Langauges?.languages || []);

    const languageByKey = useMemo(() => {
      return languages.reduce((acc, lang) => {
        acc[lang.name.toLowerCase()] = lang;
        return acc;
      }, {});
    }, [languages]);

    const currentLanguageObj = useMemo(() => {
      // 1️⃣ If language string is present (problem flow)
      if (language && languageByKey[language]) {
        return languageByKey[language];
      }

      // 2️⃣ If languageId is present (practice flow)
      if (languageId) {
        return languages.find((l) => l.id === languageId);
      }

      return null;
    }, [language, languageId, languageByKey, languages]);
    const language_id = currentLanguageObj?.id;
    const judge0_language_id = currentLanguageObj?.judge0_id;

    /* -------------------- TEMPLATE LOAD -------------------- */
    const editorLanguage = currentLanguageObj?.name?.toLowerCase();

    useEffect(() => {
      if (template?.[editorLanguage]) {
        setCode(template[editorLanguage]);
        setInitialTemplate(template[editorLanguage]);
        setHasEdited(false);
      }
    }, [template, language]);

    /* -------------------- EDITOR CHANGE -------------------- */

    const handleEditorChange = (value) => {
      setHasEdited(true);
      setCode(value || "");
      onChange?.(value || "");
    };

    /* -------------------- RUN CODE -------------------- */

const handleRunCode = async () => {
  // ⚠️ Always mark attempted (even if editor fails)
  if (mode !== "concept" && language_id) {
    dispatch(
      runCode({
        problem_type: isFromPractice ? "practice" : "problem",
        problem_id: !isFromPractice ? Number(problemId) : null,
        practice_problem_id: isFromPractice
          ? Number(practiceProblemId)
          : null,
        language_id,
        submitted_code: code?.trim() ? code : null,
        submitted_output: null,
        execution_time_ms: null,
      })
    );
  }

  // ❌ If no code, stop AFTER activity update
  if (!code || !code.trim()) {
    setOutput("⚠️ Editor not ready or code empty");
    setShowOutput(true);
    return;
  }

  // ❌ Template-only → still stop execution
  if (mode !== "concept" && code.trim() === initialTemplate.trim()) {
    setOutput("⚠️ Please write your solution before running");
    setShowOutput(true);
    return;
  }

  // ❌ Language not resolved → stop execution
  if (!judge0_language_id || !language_id) {
    setOutput(
      isFromPractice
        ? "❌ Practice language not resolved"
        : "❌ Please select a language"
    );
    setShowOutput(true);
    return;
  }

  // ✅ Only Judge0 execution below
  setProcessing(true);
  setShowOutput(true);
  setOutput("⏳ Compiling...");

  try {
    const res = await axios.post(
      JUDGE0_URL,
      {
        language_id: judge0_language_id,
        source_code: btoa(code),
        stdin: btoa(""),
      },
      { params: { base64_encoded: "true", fields: "*" } }
    );

    pollRunResult(res.data.token);
  } catch (err) {
    setProcessing(false);
    setOutput("❌ Failed to run code");
  }
};


    const pollRunResult = async (token) => {
      const res = await axios.get(`${JUDGE0_URL}/${token}`, {
        params: { base64_encoded: "true", fields: "*" },
      });

      const statusId = res.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => pollRunResult(token, mode), 1500);
        return;
      }

      let finalOutput = "";
      let status = "attempted";

      if (statusId === 3) {
        finalOutput = atob(res.data.stdout || "");
      } else if (statusId === 6) {
        finalOutput = atob(res.data.compile_output || "");
      } else {
        finalOutput = atob(res.data.stderr || "");
      }

      setOutput(finalOutput);
      setProcessing(false);
      if (mode === "concept") return;
      dispatch(
        runCode({
          problem_type: isFromPractice ? "practice" : "problem",
          problem_id: !isFromPractice ? Number(problemId) : null,
          practice_problem_id: isFromPractice
            ? Number(practiceProblemId)
            : null,
          language_id,
          submitted_code: code,
          submitted_output: finalOutput,
          execution_time_ms: null,
        })
      );
    };

    /* -------------------- SUBMIT CODE -------------------- */

    const handleSubmitCode = async () => {
      if (mode === "concept") return;
      if (!code.trim()) {
        setOutput("❌ Code editor is empty");
        setShowOutput(true);
        return;
      }

      if (code.trim() === initialTemplate.trim()) {
        setOutput("❌ Please write your solution before submitting");
        setShowOutput(true);
        return;
      }

      setProcessing(true);
      setShowOutput(true);
      setOutput("⏳ Submitting...");

      try {
        const res = await axios.post(
          JUDGE0_URL,
          {
            language_id: judge0_language_id,
            source_code: btoa(code),
            stdin: btoa(""),
          },
          { params: { base64_encoded: "true", fields: "*" } }
        );

        pollSubmitResult(res.data.token);
      } catch {
        setProcessing(false);
        setOutput("❌ Submission failed");
      }
    };

    const pollSubmitResult = async (token) => {
      const res = await axios.get(`${JUDGE0_URL}/${token}`, {
        params: { base64_encoded: "true", fields: "*" },
      });

      const statusId = res.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => pollSubmitResult(token), 1500);
        return;
      }

      let finalOutput = "";
      let isSolved = false;

      if (statusId === 3) {
        finalOutput = atob(res.data.stdout || "");
        isSolved = true;
      } else {
        finalOutput =
          atob(res.data.stderr || res.data.compile_output || "") ||
          "Wrong Answer";
      }

      setOutput(finalOutput);
      setProcessing(false);

      dispatch(
        submitCode({
          problem_type: isFromPractice ? "practice" : "problem",
          problem_id: !isFromPractice ? Number(problemId) : null,
          practice_problem_id: isFromPractice
            ? Number(practiceProblemId)
            : null,
          language_id,
          submitted_code: code,
          submitted_output: finalOutput,
          execution_time_ms: null,
          isSolved,
        })
      );
    };

    /* -------------------- RESET -------------------- */

    const handleResetCode = () => {
      const resetCode =
        mode === "concept" ? value || "" : template?.[editorLanguage] || "";

      setCode(resetCode);
      setInitialTemplate(resetCode);
      setHasEdited(false);
      setOutput("");
      setShowOutput(false);
      if (mode !== "concept") {
        dispatch(
          resetActivity({
            problem_type: isFromPractice ? "practice" : "problem",
            problem_id: !isFromPractice ? Number(problemId) : null,
            practice_problem_id: isFromPractice
              ? Number(practiceProblemId)
              : null,
            language_id,
          })
        );
      }
      onChange?.(resetCode);
    };

    /* -------------------- EXPOSE TO PARENT -------------------- */
    useImperativeHandle(ref, () => {
      // Concept practice → NO submit
      if (mode === "concept") {
        return {
          getCurrentCode: () => code,
        };
      }

      // Problem / Practice → allow submit
      return {
        submitCodeFromParent: handleSubmitCode,
        getCurrentCode: () => code,
      };
    });

    /* -------------------- UI -------------------- */

    const isRunDisabled =
      processing ||
      !code.trim() ||
      (mode !== "concept" && code.trim() === initialTemplate.trim());

    return (
      <div className="h-full bg-gray-900 text-white flex flex-col">
        {!readOnly && (
          <div className="flex justify-end gap-2 p-2 bg-gray-800">
            <button
              onClick={handleRunCode}
              disabled={isRunDisabled}
              className="px-3 py-1 bg-green-600 rounded"
            >
              Run
            </button>

            <button
              onClick={handleResetCode}
              className="px-3 py-1 bg-gray-600 rounded"
            >
              Reset
            </button>
          </div>
        )}

        <div className="flex-1">
          <Editor
            height="100%"
            language={editorLanguage}
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{ readOnly }}
          />
        </div>

        <div className="bg-gray-800 p-2 h-32 overflow-auto">
          <strong>Output:</strong>
          <pre className="text-green-400 whitespace-pre-wrap">
            {processing ? "⏳ Running..." : output}
          </pre>
        </div>
      </div>
    );
  }
);

InteractiveCodeEditor.displayName = "InteractiveCodeEditor";

export default InteractiveCodeEditor;
