import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import bookingReducer from "./features/bookingSlice";
import carerRequestReducer from "./features/carerRequestSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    carerRequests: carerRequestReducer,
  },
});

export default store;
