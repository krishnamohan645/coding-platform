import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../middleware/AxiosInstance";

export const loginUserWithEmail = createAsyncThunk(
  "Login/loginUserWithEmail",
  async ({ email, name }) => {
    console.log(email,name, "email in slice");
    try {
      const login = await axiosInstance.post(`/auth/send-otp`, { email, name });
      console.log(login, "login");
      return login.data;
    } catch (err) {
      console.log(err);
      throw err.response?.data || err.message;
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "Login/verifyOtp",
  async ({ email, otp }) => {
    console.log(email, otp, "email and otp in slice");
    try {
      const res = await axiosInstance.post(`/auth/verify-otp`, {
        email,
        otp,
      });
      console.log(res, "verify");
      return res.data;
    } catch (err) {
      console.log(err);
      throw err.response?.data || err.message;
    }
  }
);

const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },

  reducers: {
    loginUser: (state, action) => {
      state.user = null;
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    // Send OTP to email
    builder.addCase(loginUserWithEmail.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(loginUserWithEmail.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "Success";
    });
    builder.addCase(loginUserWithEmail.rejected, (state) => {
      state.status = "Failed";
    });

    // Verify Otp
    builder.addCase(verifyOtpThunk.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(verifyOtpThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "Success";
    });
    builder.addCase(verifyOtpThunk.rejected, (state) => {
      state.status = "Failed";
    });
  },
});

export const { loginUser } = LoginSlice.actions;
export default LoginSlice.reducer;
