import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/middleware/AxiosInstance";

// export const getTopics = createAsyncThunk("Topics/getTopics", async (id) => {
//   const topics = await axiosInstance.get(`/languages/get-languages/${id}`);
//   return topics.data;
// });

export const getSubTopicsById = createAsyncThunk(
  "Topics/getSubTopicsById",
  async (topicId) => {
    console.log(topicId, "id in topic slice");
    const subtopics = await axiosInstance.get(`/topics/get-topics/${topicId}`);
    console.log(subtopics, "sub topics in topic slice");
    return subtopics.data;
  }
);

export const getContentById = createAsyncThunk(
  "Topics/getContentById",
  async (id) => {
    console.log(id, "id in topic slice of content");
    const content = await axiosInstance.get(`/subtopics/get-subtopics/${id}`);
    console.log(content, "content in topic slice")
    return content.data;
  }
);

// export const

const TopicsSlice = createSlice({
  name: "Topics",
  initialState: {
    topics: [],
    subtopics: [],
    content: [],
    status: null,
  },

  reducer: {},
  // Get all topics
  extraReducers: (builder) => {
    // builder
    //   .addCase(getTopics.pending, (state) => {
    //     state.status = "Loading";
    //   })
    //   .addCase(getTopics.fulfilled, (state, { payload }) => {
    //     state.topics = payload;
    //     state.status = "Success";
    //   })
    //   .addCase(getTopics.rejected, (state) => {
    //     state.status = "Failed";
    //   });

    // Get all sub topics to topic
    builder
      .addCase(getSubTopicsById.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getSubTopicsById.fulfilled, (state, { payload }) => {
        state.subtopics = payload;
        state.status = "Success";
      })
      .addCase(getSubTopicsById.rejected, (state) => {
        state.status = "Failed";
      });

    // Get Content by sub topics id
    builder
      .addCase(getContentById.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getContentById.fulfilled, (state, { payload }) => {
        state.content = payload;
        state.status = "Success";
      })
      .addCase(getContentById.rejected, (state) => {
        state.status = "Failed";
      });
  },
});

export default TopicsSlice.reducer;
