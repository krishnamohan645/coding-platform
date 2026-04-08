import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Layout from "./components/Layout";
import ProblemsList from "./pages/problems/ProblemsList";
import Languages from "./pages/languages/Languages";
import ConceptContent from "./pages/conceptContent/ConceptContent";
import PracticeProblems from "./pages/practiceProblems/PracticeProblems";
import TopicSidebar from "./pages/topicSidebar/TopicSidebar";
import SubTopics from "./pages/subTopics/SubTopics";
import ProblemDetail from "./pages/problems/ProblemDetail";
import AuthPage from "./components/login/Login";
import Roadmap from "./pages/roadmap/Roadmap";
import Profile from "./pages/profile/Profile";
import ThemeBundle from "./components/ThemeBundle";

function App() {
  return (
    <>
      <ThemeBundle />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/problems" />} />
            <Route path="/problems" element={<ProblemsList />} />
            <Route path="/language-overview/:id" element={<TopicSidebar />}>
              <Route index element={<SubTopics />} />
              <Route path="subtopics/:topicId" element={<SubTopics />} />
              <Route path="concept/:conceptId" element={<ConceptContent />} />
              <Route
                path="problems/:conceptId"
                element={<PracticeProblems />}
              />
            </Route>
            <Route path="/languages" element={<Languages />} />
            {/* <Route path="concept/:conceptId" element={<ConceptContent />} />
        <Route path="problems/:conceptId" element={<PracticeProblems />} /> */}
            <Route path="/problems/:id" element={<ProblemDetail />} />
            {/* <Route path="/languages" element={<Languages />} />
          <Route path="/languages/:language" element={<LanguageDetail />} /> */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
