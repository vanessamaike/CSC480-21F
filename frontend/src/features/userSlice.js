import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authLoading : true,
    isAuthenticated : false,
    user: [],

  },
  reducers: {
    setUser: (state, action) => {
      state.authLoading = false
      state.isAuthenticated = true
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.userReducer;
const userReducer = userSlice.reducer;
export default userReducer;