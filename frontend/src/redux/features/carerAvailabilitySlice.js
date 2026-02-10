import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

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
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/carer-availabilities/match/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Get Carer Availabilities
export const getMyAvailabilities = createAsyncThunk(
  "carerAvailability/my",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/carer-availabilities/my");
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
    setList(state, action) {
      state.list = state.list.filter((l) => l._id !== action.payload._id);
    },
    setCarerAvailabilityStatus(state, action) {
      const item = state.list.find((l) => l._id === action.payload.id);

      if (item) {
        item.status = action.payload.status;
      }
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
        state.list = [];
      })
      .addCase(getMatchingCarers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getMatchingCarers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getMyAvailabilities.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getMyAvailabilities.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export const { clearMatchingCarers, setList, setCarerAvailabilityStatus } =
  carerAvailabilitySlice.actions;
export default carerAvailabilitySlice.reducer;
