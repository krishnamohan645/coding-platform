import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../middleware/AxiosInstance";

export const getUserDetails = createAsyncThunk(
  "User/getUserDetails",
  async () => {
    try {
      const users = await axiosInstance.get(`/user/me`);
      console.log(users, "user details");
      return users.data.user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logOutUser = createAsyncThunk("User/logOutUser", async () => {
  try {
    const users = await axiosInstance.post(`/auth/logout`);
    console.log(users, "user details");
  } catch (err) {
    console.log(err);
  }
});

const UserSlice = createSlice({
  name: "Users",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },

  reducers: {
    addUserId: (state) => {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    //Get User Details by userId
    builder.addCase(getUserDetails.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "Success";
    });
    builder.addCase(getUserDetails.rejected, (state) => {
      state.status = "Failed";
    });

    // Logout User
    builder.addCase(logOutUser.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.user = null;
      state.status = "Success";
    });
    builder.addCase(logOutUser.rejected, (state) => {
      state.status = "Failed";
    });
  },
});

export const { addUserId } = UserSlice.actions;
export default UserSlice.reducer;
