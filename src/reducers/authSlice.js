import { createSlice } from '@reduxjs/toolkit';

// Define initial state for auth slice
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { username, password } = action.payload; // Assuming credentials are passed in the action payload
      state.loading = true; // Set loading state to indicate ongoing login

      fetch('https://localhost:7198/api/Student_API/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Login failed');
          }
          return response.json();
        })
        .then((data) => {
          state.loading = false;
          state.user = data; // Update user state with received data
          alert('Login successful!'); // Display success alert
        })
        .catch((error) => {
          state.loading = false;
          state.error = error.message || 'Login failed';
          alert('Login failed: ' + error.message); // Display error alert with details
        });
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
