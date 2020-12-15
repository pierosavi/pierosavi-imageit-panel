import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../store/metricsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
