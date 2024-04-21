import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import the combined reducer

const initialState = {
  auth: {
    user: null,
    loading: false,
    error: null,
  },
  // Other state slices if applicable
};

export default configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
