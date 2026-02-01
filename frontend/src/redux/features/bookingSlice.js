import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api.js";

/* CARESEEKER */
export const createBooking = createAsyncThunk(
  "bookings/create",
  async (payload) => {
    const { data } = await api.post("/bookings", payload);
    return data;
  },
);

export const payBooking = createAsyncThunk(
  "bookings/pay",
  async (bookingId) => {
    const { data } = await api.patch(`/bookings/${bookingId}/pay`);
    return data;
  },
);

export const fetchMyBookings = createAsyncThunk("bookings/my", async () => {
  const { data } = await api.get("/bookings/my");
  return data;
});

/* CARER */
export const fetchOpenBookings = createAsyncThunk("bookings/open", async () => {
  const { data } = await api.get("/bookings/open");
  return data;
});

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    openBookings: [],
    current: null,
    loading: false,
  },
  reducers: {
    setCurrentBooking(state, action) {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createBooking.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = true;
        state.list.push(action.payload);
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchOpenBookings.fulfilled, (state, action) => {
        state.openBookings = action.payload;
      });
  },
});

export const { setCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
