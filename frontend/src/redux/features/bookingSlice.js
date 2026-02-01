import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ------------------ THUNKS ------------------ */

// Create booking (careseeker selects carer)
export const createBooking = createAsyncThunk(
  "booking/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/bookings", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Carer accepts booking
export const acceptBooking = createAsyncThunk(
  "booking/accept",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/accept`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Complete booking
export const completeBooking = createAsyncThunk(
  "booking/complete",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/complete`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

/* ------------------ SLICE ------------------ */

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBooking(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(acceptBooking.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
