import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import bookingReducer from "./features/bookingSlice";
import travelPlanReducer from "./features/travelPlanSlice";
import carerAvailabilityReducer from "./features/carerAvailabilitySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    travelPlan: travelPlanReducer,
    carerAvailability: carerAvailabilityReducer,
  },
});

export default store;
