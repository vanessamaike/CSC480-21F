import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authLoading : true,
    isAuthenticated : false,
    user: [],
    userName: ""
  },
  reducers: {
    setUser: (state, action) => {
      state.authLoading = false
      state.isAuthenticated = true
      state.user = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setUser,setUserName  } = userSlice.actions;
export const selectUser = (state) => state.userReducer;
export const selectUserName = (state) => state.userReducer.userName;
const userReducer = userSlice.reducer;
export default userReducer;