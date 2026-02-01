import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* CARER */
export const applyToBooking = createAsyncThunk(
  "carerRequests/apply",
  async (payload) => {
    const { data } = await api.post("/carer-requests", payload);
    return data;
  },
);

export const fetchMyApplications = createAsyncThunk(
  "carerRequests/my",
  async () => {
    const { data } = await api.get("/carer-requests/my");
    return data;
  },
);

/* CARESEEKER */
export const fetchCarerRequestsForBooking = createAsyncThunk(
  "carerRequests/byBooking",
  async (bookingId) => {
    const { data } = await api.get(`/carer-requests/booking/${bookingId}`);
    return data;
  },
);

export const acceptCarer = createAsyncThunk(
  "carerRequests/accept",
  async (requestId) => {
    const { data } = await api.patch(`/carer-requests/${requestId}/accept`);
    return data;
  },
);

const carerRequestSlice = createSlice({
  name: "carerRequests",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(applyToBooking.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(applyToBooking.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCarerRequestsForBooking.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default carerRequestSlice.reducer;
