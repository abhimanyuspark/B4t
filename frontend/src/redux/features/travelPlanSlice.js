import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ------------------ THUNKS ------------------ */

// Create travel plan
export const createTravelPlan = createAsyncThunk(
  "travelPlan/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/travel-plans", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Mark plan as paid
export const payTravelPlan = createAsyncThunk(
  "travelPlan/pay",
  async (planId, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/travel-plans/${planId}/pay`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

/* ------------------ SLICE ------------------ */

const travelPlanSlice = createSlice({
  name: "travelPlan",
  initialState: {
    currentPlan: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTravelPlan(state) {
      state.currentPlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTravelPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTravelPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlan = action.payload;
      })
      .addCase(createTravelPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(payTravelPlan.fulfilled, (state, action) => {
        state.currentPlan = action.payload;
      });
  },
});

export const { clearTravelPlan } = travelPlanSlice.actions;
export default travelPlanSlice.reducer;
