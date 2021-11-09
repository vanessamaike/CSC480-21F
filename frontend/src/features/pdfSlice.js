import { createSlice } from "@reduxjs/toolkit";

export const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    viewpdf: [],

  },
  reducers: {
    setPdf: (state, action) => {
      state.viewpdf = action.payload;
    },
  },
});

export const { setPdf } = pdfSlice.actions;
export const selectPdf = (state) => {
    console.log(state)
    return state.pdfReducer};
const pdfReducer = pdfSlice.reducer;
export default pdfReducer;