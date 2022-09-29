import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      access: "",
      username: "",
      isAuth: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.access = action.payload.access;

      state.username = action.payload.name;
      state.id = action.payload.id;

      state.email = action.payload.email;
      state.housename = action.payload.housename;
      state.mobile = action.payload.mobile;

      state.isAuth = action.payload.isAuth;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logoutSuccess: (state, action) => {
      state.access = null;

      state.username = null;

      state.isAuth = false;
      localStorage.removeItem("user");
    },
    profileUpdate: (state, action) => {
      console.log("ppppppppppp", action.payload);
      state.username = action.payload.user.name;

      state.email = action.payload.user.email;
      state.housename = action.payload.user.housename;
      state.mobile = action.payload.user.mobile;
    },
  },
});

export const { loginSuccess, logoutSuccess, profileUpdate } = userSlice.actions;

export default userSlice.reducer;
