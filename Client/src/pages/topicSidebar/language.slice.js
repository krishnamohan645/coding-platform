import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../components/middleware/AxiosInstance";

export const getLanguages = createAsyncThunk(
  "Langauges/getLanguages",
  async () => {
    const languages = await axiosInstance.get("/languages/get-languages");
    console.log(languages.data, "languages in language slice")
    return languages.data;
  }
);
export const getTopics = createAsyncThunk("Langauges/getTopics", async (id) => {
  console.log(id, "iddddddd");
  const topics = await axiosInstance.get(`/languages/get-languages/${id}`);
  console.log(topics, "topicssssss in slice");
  return topics.data;
});

const LanguagesSlice = createSlice({
  name: "Langauges",
  initialState: {
    languages: [],
    topics: [],
    topicId: null,
    status: null,
  },

  //get languages
  reducers: {
    addId: (state, action) => {
      state.topicId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Get All Languages
    builder
      .addCase(getLanguages.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getLanguages.fulfilled, (state, { payload }) => {
        state.languages = payload;
        state.status = "Success";
      })
      .addCase(getLanguages.rejected, (state) => {
        state.status = "Failed";
      });

    //Get  Topics by langauageId
    builder
      .addCase(getTopics.pending, (state) => {
        state.status = "Loading";
        state.topics = {};
      })
      .addCase(getTopics.fulfilled, (state, { payload }) => {
        state.topics = payload;
        state.status = "Success";
      })
      .addCase(getTopics.rejected, (state) => {
        state.status = "Failed";
      });
  },
});

export const { addId } = LanguagesSlice.actions;
export default LanguagesSlice.reducer;
