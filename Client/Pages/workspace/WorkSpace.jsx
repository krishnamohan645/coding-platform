import React, { useEffect, useState } from "react";
import Split from "react-split";
import { Editor } from "@monaco-editor/react";
import "./WorkSpace.css";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const LanguageList = {
  63: "javascript",
  62: "java",
  71: "python",
};

export default function WorkSpace() {
  const [output, setOutput] = useState("Output will be displayed here...");
  const [Language, setLanguage] = useState(63);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [code, setCode] = useState("");
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  function handleEditorChange(value, event) {
    console.log("Current model value:", value);
    setCode(value);
  }

  const rapidApiUrl = "https://judge029.p.rapidapi.com/submissions";
  const rapidApiHost = "judge029.p.rapidapi.com";
  const rapidApiKey = "c9f5daa650mshbee706d9da7d332p1d5784jsna7a03865519c";

  const handleCompile = async () => {
    setProcessing(true);
    const formData = {
      language_id: Language,
      // encode source code in base64
      source_code: btoa(code),
      // stdin: btoa(customInput),
    };

    const options = {
      method: "POST",
      url: rapidApiUrl,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": rapidApiHost,
        "X-RapidAPI-Key": rapidApiKey,
      },
      data: formData,
    };

    await axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          // showErrorToast(
          //   `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
          //   10000
          // );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: rapidApiUrl + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": rapidApiHost,
        "X-RapidAPI-Key": rapidApiKey,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails();
        setOutput(atob(response?.data?.stdout));
        // showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      // showErrorToast();
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    // Register Python and Java languages
    monaco.languages.register({ id: "python" });
    monaco.languages.register({ id: "java" });
  };

  return (
    <Split
      className="split horizontal"
      direction="horizontal"
      sizes={[40, 60]}
      minSize={250}
    >
      <div className="split-child question-section">
        <h2>Problem Statement</h2>
        <p>Describe the coding challenge here...</p>
      </div>

      <div className="split-child code-section">
        <Split
          className="split vertical"
          direction="vertical"
          sizes={[70, 30]}
          minSize={100}
        >
          <div className="editor-container">
            <div className="editor-top">
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "white", fontSize: "18px" }}
                >
                  Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Language}
                  label="Language"
                  onChange={handleChange}
                  sx={{
                    height: 45,
                    backgroundColor: "#444",
                    borderRadius: "8px",
                  }}
                >
                  <MenuItem value={63}>JavaScript</MenuItem>
                  <MenuItem value={71}>Python</MenuItem>
                  <MenuItem value={62}>Java</MenuItem>
                </Select>
              </FormControl>
              <Button
                sx={{
                  textTransform: "capitalize",
                  background: "green",
                  color: "white",
                }}
                onClick={handleCompile}
              >
                {processing ? <span className="loader"></span> : "Run Code"}
              </Button>
            </div>
            <Editor
              height="100%"
              defaultLanguage={LanguageList[Language]}
              defaultValue="// Write your code here"
              onChange={handleEditorChange}
              className="code-editor"
              theme="vs-dark"
              onMount={handleEditorDidMount} // Fix: Register languages properly
            />
          </div>

          <div className="output-container">
            <h3>Output:</h3>
            <pre>{output}</pre>
          </div>
        </Split>
      </div>
    </Split>
  );
}
