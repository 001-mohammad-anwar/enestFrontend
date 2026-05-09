import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  loadingProject : false
};

const projectSlice = createSlice({
  name: "project",
  initialState,

  reducers: {

    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    addProject: (state, action) => {
      state.projects.unshift(action.payload);
    },

    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
    },

  },
});

export const {
  setProjects,
  addProject,
  removeProject,
} = projectSlice.actions;

export default projectSlice.reducer;