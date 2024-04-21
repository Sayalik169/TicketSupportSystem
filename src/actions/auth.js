import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming you're using Axios for API calls

// Define initial state for auth slice
const initialState = {
  user: {
    "id": 1,
    "name": "admin",    
    "password": "123"
  },
  loading: false,
  error: null,
};


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://localhost:7198/api/Student_API/login', credentials);
      // Replace with your actual API endpoint and handle response structure accordingly
      console.log(response.data);
      return response.data; // Assuming the API returns user data on successful login
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle API errors properly
    }
  }
);

// Create the auth slice with reducers for login, logout, and handling loading/error states
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
