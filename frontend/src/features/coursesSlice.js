import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCoursesByUserId = createAsyncThunk(
  "courses/coursesFetched",
  async () => {
    const response = await axios.get(`http://localhost:3000/courses`);
    return response.data;
  }
);
export const getStudentsByCourseId = createAsyncThunk(
  "students/studentsFetched",
  async () => {
    const response = await axios.get(`http://localhost:3000/students`);
    return response.data;
  }
);
export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    loading: true,
    error: false,
    courses: [],
  },
  reducers: {},
  extraReducers: {
    [getCoursesByUserId.pending]: (state, action) => {
      console.log("Fetching courses from backend");
      state.loading = true;
      state.error = false;
    },
    [getCoursesByUserId.fulfilled]: (state, action) => {
      console.log("Done");
      state.loading = false;
      state.error = false;
      state.courses = action.payload;
    },
    [getCoursesByUserId.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.courses = action.payload;
      console.log("Failed to get courses");
    },
  },
});

export const selectCourses = (state) => state.coursesReducer;
const coursesReducer = coursesSlice.reducer;
export default coursesReducer;
