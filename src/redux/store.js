import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectSlice";
import authReducer from "./slices/authSlice";
import estimatesReducer from "./slices/estimateSlice";

const store = configureStore({
  reducer: {
    estimates: estimatesReducer,
    projects: projectsReducer,
    auth: authReducer,
  },
});

export default store;
