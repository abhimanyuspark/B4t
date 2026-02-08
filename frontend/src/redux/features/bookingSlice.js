import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* ------------------ THUNKS ------------------ */

// Create booking (careseeker selects carer)
export const createBooking = createAsyncThunk(
  "booking/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/bookings", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
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
      return rejectWithValue(err.response?.data?.message || err.message);
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
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const getMyBookings = createAsyncThunk(
  "booking/my",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/bookings/my");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

/* ------------------ SLICE ------------------ */

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    list: [],
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
        state.error = action.payload;
      })

      .addCase(acceptBooking.fulfilled, (state, action) => {
        const item = state.list.find((l) => l._id === action.payload._id);

        if (item) {
          item.status = action.payload.status;
        }
      })

      .addCase(getMyBookings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
