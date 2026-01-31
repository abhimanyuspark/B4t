import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api"; // axios instance with interceptors
import { getUserLocation } from "../../utils/getUserLocation";

/* -------------------------------------------------------------------------- */
/*                                   THUNKS                                   */
/* -------------------------------------------------------------------------- */

// User registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// User login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/login`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// Google login user
export const googleLoginUser = createAsyncThunk(
  "auth/googleLoginUser",
  async ({ idToken, location }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/auth/google`,
        { idToken, location },
        { withCredentials: true },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await api.post(`/auth/logout`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Refresh auth
export const refreshAuth = createAsyncThunk(
  "auth/refreshAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/refresh`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Update Profile picture
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/profile`, profileData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// Get Geo Location
export const getGeoLocation = createAsyncThunk(
  "auth/getGeoLocation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserLocation();
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateUserLocation = createAsyncThunk(
  "auth/updateUserLocation",
  async (_, { rejectWithValue }) => {
    try {
      const location = await getUserLocation();
      const response = await api.post(`/auth/update-location`, {
        location: location,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// Switch Mode
export const switchMode = createAsyncThunk(
  "auth/switchMode",
  async (mode, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/auth/switch-mode`, { mode: mode });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const initialState = {
  user: null,
  loading: true,
  error: null,
  location: null,
  geoLoading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ------------------------------ Register ------------------------------ */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ------------------------------ Login ------------------------------ */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ------------------------------ Google Login ------------------------------ */
      .addCase(googleLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ------------------------------ Refresh Auth ------------------------------ */
      .addCase(refreshAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(refreshAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      /* ------------------------------ Update Profile ------------------------------ */
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })

      /* ------------------------------ Logout ------------------------------ */
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
        state.isAuthenticated = false;
      })

      /* ------------------------------ Get Geo Location ------------------------------ */
      .addCase(getGeoLocation.pending, (state) => {
        state.geoLoading = true;
      })
      .addCase(getGeoLocation.fulfilled, (state, action) => {
        state.geoLoading = false;
        state.location = action.payload;
      })
      .addCase(getGeoLocation.rejected, (state) => {
        state.geoLoading = false;
      })

      /* ------------------------------ Update user Location ------------------------------ */
      .addCase(updateUserLocation.pending, (state) => {
        state.geoLoading = true;
      })
      .addCase(updateUserLocation.fulfilled, (state, action) => {
        state.geoLoading = false;
        state.user = { ...state.user, ...action.payload };
        state.location = action.payload;
      })
      .addCase(updateUserLocation.rejected, (state) => {
        state.geoLoading = false;
      })

      /* ------------------------------ Switch Mode ------------------------------ */
      .addCase(switchMode.pending, (state) => {
        state.loading = true;
      })
      .addCase(switchMode.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(switchMode.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
