import { createSlice } from "@reduxjs/toolkit";

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    userInfo: '', //userInfoFromStorage,
    loading: false,
    error: "",
  },
  reducers: {
    userRegisterRequest(state) {
      state.loading = true;
    },

    userRegisterSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },

    userRegisterFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    userLogout(state, action) {
      state.userInfo = null;
    },
  },
});



export const userRegisterActions = userRegisterSlice.actions;
export const userRegisterReducer = userRegisterSlice.reducer;
export default userRegisterSlice;

