import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../helper/constant";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get(`${BaseUrl}/projects`);
    return response.data;
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (newProject) => {
    const response = await axios.post(`${BaseUrl}/projects`, newProject);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (project) => {
    const response = await axios.put(
      `${BaseUrl}/projects/${project.id}`,
      project
    );
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id) => {
    await axios.delete(`${BaseUrl}/projects/${id}`);
    return id;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = "succeeded";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );

        state.projects[index] = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      });
  },
});

export default projectsSlice.reducer;
