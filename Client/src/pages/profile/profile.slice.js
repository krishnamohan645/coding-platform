import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/middleware/AxiosInstance";

export const fetchUserStats = createAsyncThunk(
  "profile/fetchUserStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/userActivity/stats");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch stats");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    stats: {
      problemsSolved: 0,
      streak: 0,
      globalRank: 0,
      recentActivity: [],
      overallProgress: {
        easy: { count: 0, percent: 0 },
        medium: { count: 0, percent: 0 },
        hard: { count: 0, percent: 0 }
      }
    },
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default profileSlice.reducer;
