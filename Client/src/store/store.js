import { configureStore } from "@reduxjs/toolkit";
import LanguageReducer from "../pages/topicSidebar/language.slice";
import TopicsReducer from "../pages/subTopics/topic.slice";
import UserReducer from "../components/header/Header.slice";
import LoginReducer from "../components/login/login.slice";
import practiceProblemsReducer from "../pages/practiceProblems/practiceProblems.slice";
import problemDetailReducer from "../pages/problems/problemDetail.slice";
import RoadmapReducer from "../pages/roadmap/roadmap.slice";

import profileReducer from "../pages/profile/profile.slice";

export const store = configureStore({
  reducer: {
    Langauges: LanguageReducer,
    Topics: TopicsReducer,
    Users: UserReducer,
    login: LoginReducer,
    practiceProblems: practiceProblemsReducer,
    problem: problemDetailReducer,
    roadmap: RoadmapReducer,
    profile: profileReducer,
  },
});
