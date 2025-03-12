// For simple redux store setup we only need to do this

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './redux/authSlice';
import productSlice from './redux/productSlice';

// import hardwarePermissionsReducer from "./features/extraFeatures/hardwarePermissionsSlice";
// import authSliceReducer from "./features/extraFeatures/authSlice";

export const store = configureStore({
  reducer: {
    // latLong: hardwarePermissionsReducer,
    auth: authSlice,
    product: productSlice
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
