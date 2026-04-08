import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/middleware/AxiosInstance";

export const getProblemDetail = createAsyncThunk(
  "detail/getProblemDetail",
  async (problemId) => {
    console.log(problemId, "problemId in problem detail slice ");
    try {
      console.log("entering into try");
      const res = await axiosInstance.get(`/problem/${problemId}`);
      console.log(res.data, "res in problem detail slice");
      return res.data;
    } catch (err) {
      console.log(err, "error in problem detail slice");
    }
  }
);

export const getAllProblems = createAsyncThunk(
  "problems/getAllProblems",
  async () => {
    try {
      const res = await axiosInstance.get(`/problem/getProblems`);
      console.log(res.data, "res in getAllProblems");
      return res.data;
    } catch (err) {
      console.log(err, "Error in getAllProblems");
    }
  }
);

export const initUserActivity = createAsyncThunk(
  "activity/createActivity",
  async (payload) => {
    console.log(payload, "payload in createActivity");
    try {
      const res = await axiosInstance.post(
        `/userActivity/activity/init`,
        payload
      );
      console.log(res.data, "res in createActivity");
      return res.data;
    } catch (err) {
      console.log(err, "Error in createActivity");
    }
  }
);

export const runCode = createAsyncThunk("activity/runCode", async (payload) => {
  try {
    const res = await axiosInstance.post(`/userActivity/activity/run`, payload);
    console.log(res.data, "res in runCode");
    return res.data;
  } catch (err) {
    console.log(err, "Error in runCode");
  }
});

export const submitCode = createAsyncThunk(
  "  activity/submitCode",
  async (payload) => {
    try {
      const res = await axiosInstance.post(
        `/userActivity/activity/submit`,
        payload
      );
      console.log(res.data, "res in submitCode");
      return res.data;
    } catch (err) {
      console.log(err, "Error in submitCode");
    }
  }
);

export const resetActivity = createAsyncThunk(
  "activity/resetActivity",
  async (payload) => {
    try {
      const res = await axiosInstance.post(
        `/userActivity/activity/reset`,
        payload
      );
      console.log(res.data, "res in resetActivity");
      return res.data;
    } catch (err) {
      console.log(err, "Error in resetActivity");
    }
  }
);

const ProblemDetailSlice = createSlice({
  name: "ProblemDetail",
  initialState: {
    problemDetail: {},
    problems: [],
    userActivity: null,
    run: null,
    submit: null,
    reset: null,

    problemStatus: "idle",
    activityStatus: "idle",
    runStatus: "idle",
    submitStatus: "idle",
    resetStatus: "idle",
    error: null,
  },
  reducers: {
    setProblemDetail: (state, action) => {
      state.problemDetail = action.payload;
      state.problemStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    // Problem Deatil from problem id
    builder
      .addCase(getProblemDetail.pending, (state) => {
        state.problemStatus = "loading";
      })
      .addCase(getProblemDetail.fulfilled, (state, action) => {
        state.problemStatus = "success";
        state.problemDetail = action.payload;
      })
      .addCase(getProblemDetail.rejected, (state, action) => {
        state.problemStatus = "failed";
        state.error = action.error.message;
      });

    // Get All Problems
    builder.addCase(getAllProblems.pending, (state) => {
      state.problemStatus = "loading";
    });
    builder.addCase(getAllProblems.fulfilled, (state, action) => {
      state.problemStatus = "Success";
      state.problems = action.payload;
    });
    builder.addCase(getAllProblems.rejected, (state, action) => {
      state.problemStatus = "failed";
      state.error = action.error.message;
    });

    // Create User Activity
    builder
      .addCase(initUserActivity.pending, (state) => {
        state.activityStatus = "loading";
      })
      .addCase(initUserActivity.fulfilled, (state, action) => {
        state.activityStatus = "success";
        state.userActivity = action.payload;
      })
      .addCase(initUserActivity.rejected, (state, action) => {
        state.activityStatus = "failed";
        state.error = action.error.message;
      });

    // Run Code
    builder
      .addCase(runCode.pending, (state) => {
        state.runStatus = "loading";
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.runStatus = "success";
        state.run = action.payload;
      })
      .addCase(runCode.rejected, (state, action) => {
        state.runStatus = "failed";
        state.error = action.error.message;
      });

    // Submit Code
    builder
      .addCase(submitCode.pending, (state) => {
        state.submitStatus = "loading";
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.submitStatus = "success";
        state.submit = action.payload;
      })
      .addCase(submitCode.rejected, (state, action) => {
        state.submitStatus = "failed";
        state.error = action.error.message;
      });

    // Rest Code
    builder
      .addCase(resetActivity.pending, (state) => {
        state.resetStatus = "loading";
      })
      .addCase(resetActivity.fulfilled, (state, action) => {
        state.resetStatus = "success";
        state.reset = action.payload;
      })
      .addCase(resetActivity.rejected, (state, action) => {
        state.resetStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setProblemDetail } = ProblemDetailSlice.actions;
export default ProblemDetailSlice.reducer;
