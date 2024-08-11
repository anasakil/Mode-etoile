import { configureStore } from '@reduxjs/toolkit';
import imageReducer from '../slices/imageSlice';
import authSlice from '../slices/authSlice';
import darkModeReducer from '../slices/darkModeSlice';


export default configureStore({
  reducer: {
    image: imageReducer,
    auth: authSlice,
    darkMode: darkModeReducer,


  },
});
