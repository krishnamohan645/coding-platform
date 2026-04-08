import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/middleware/AxiosInstance";

export const getPracticeProblems = createAsyncThunk(
  "content/getPracticeProblems",
  async (contentId) => {
    console.log(contentId, "id in getPracticeProblems");
    try {
      const problems = await axiosInstance.get(`/contents/${contentId}`);
      console.log(problems.data, "problems in getPracticeProblems");
      return problems.data;
    } catch (err) {
      if (err.response?.status === 404) {
        return [];
      }
      console.log(err, "error in getPracticeProblems");
    }
  }
);

const PracticeProblemsSlice = createSlice({
  name: "PracticeProblems",
  initialState: {
    practiceProblems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addContentId: (state) => {
      state.practiceProblems = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    // Get Practice Problems from content Id
    builder.addCase(getPracticeProblems.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(getPracticeProblems.fulfilled, (state, { payload }) => {
      state.practiceProblems = payload;
      state.status = "Success";
    });

    builder.addCase(getPracticeProblems.rejected, (state, action) => {
      state.status = "Failed";
      state.error = action.payload;
      state.practiceProblems = [];
    });
  },
});

export const { addContentId } = PracticeProblemsSlice.actions;
export default PracticeProblemsSlice.reducer;
