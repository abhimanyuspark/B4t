import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ------------------ THUNKS ------------------ */

// Create availability
export const createAvailability = createAsyncThunk(
  "carerAvailability/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/carer-availabilities", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Get matching carers for a travel plan
export const getMatchingCarers = createAsyncThunk(
  "carerAvailability/match",
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.get("/carer-availabilities/match", {
        params: query,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

/* ------------------ SLICE ------------------ */

const carerAvailabilitySlice = createSlice({
  name: "carerAvailability",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMatchingCarers(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAvailability.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getMatchingCarers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMatchingCarers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getMatchingCarers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { clearMatchingCarers } = carerAvailabilitySlice.actions;
export default carerAvailabilitySlice.reducer;
