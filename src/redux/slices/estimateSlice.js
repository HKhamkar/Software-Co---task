import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../helper/constant";

export const fetchEstimates = createAsyncThunk(
  "estimates/fetchEstimates",
  async () => {
    const response = await axios.get(`${BaseUrl}/estimates`);
    return response.data;
  }
);

export const addEstimate = createAsyncThunk(
  "estimates/addEstimate",
  async (newEstimate) => {
    const response = await axios.post(`${BaseUrl}/estimates`, newEstimate);
    return response.data;
  }
);

export const updateEstimate = createAsyncThunk(
  "estimates/updateEstimate",
  async (estimate) => {
    const response = await axios.put(
      `${BaseUrl}/estimates/${estimate.id}`,
      estimate
    );
    return response.data;
  }
);

export const deleteEstimate = createAsyncThunk(
  "estimates/deleteEstimate",
  async (id) => {
    await axios.delete(`${BaseUrl}/estimates/${id}`);
    return id;
  }
);

const estimatesSlice = createSlice({
  name: "estimates",
  initialState: {
    estimates: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstimates.fulfilled, (state, action) => {
        state.estimates = action.payload;
        state.status = "succeeded";
      })
      .addCase(addEstimate.fulfilled, (state, action) => {
        state.estimates.push(action.payload);
      })
      .addCase(updateEstimate.fulfilled, (state, action) => {
        const index = state.estimates.findIndex(
          (estimate) => estimate.id === action.payload.id
        );

        state.estimates[index] = action.payload;
      })
      .addCase(deleteEstimate.fulfilled, (state, action) => {
        state.estimates = state.estimates.filter(
          (estimate) => estimate.id !== action.payload
        );
      });
  },
});

export default estimatesSlice.reducer;
