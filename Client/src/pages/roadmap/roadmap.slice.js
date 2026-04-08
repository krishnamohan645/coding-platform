import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/middleware/AxiosInstance";

/**
 * Fetch roadmap with user progress
 */
export const fetchRoadmaps = createAsyncThunk(
  "roadmap/fetchRoadmaps",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/languages/roadmap");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch roadmap"
      );
    }
  }
);

/**
 * Toggle topic completion (DB)
 */
export const toggleTopicCompletionAsync = createAsyncThunk(
  "roadmap/toggleTopic",
  async (topicId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/languages/roadmap/topic/toggle",
        { topicId }
      );
      return res.data; // { topicId, completed }
    } catch (err) {
      return rejectWithValue("Failed to update topic");
    }
  }
);

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---------- FETCH ----------
      .addCase(fetchRoadmaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoadmaps.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload.map((language) => ({
          id: language.id,
          title: language.name,
          description: language.description,
          color: language.color,
          logo: language.logo,
          gradient: language.gradient,
          topics: language.Topics.map((topic) => ({
            id: topic.id,
            name: topic.name,
            completed: topic.progress?.completed || false,
            subtopics: topic.Subtopics || [],
          })),
        }));
      })
      .addCase(fetchRoadmaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- TOGGLE ----------
      .addCase(toggleTopicCompletionAsync.fulfilled, (state, action) => {
        const { topicId, completed } = action.payload;

        state.data.forEach((roadmap) => {
          const topic = roadmap.topics.find(
            (t) => t.id === topicId
          );
          if (topic) {
            topic.completed = completed;
          }
        });
      });
  },
});

export default roadmapSlice.reducer;
