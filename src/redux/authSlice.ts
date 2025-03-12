import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToLocalStorage, clearLocalStorage, decryptData, encryptData } from '../utils/encryptionUtils';
import { loginUserThunk } from './authThunk';

interface AuthState {
  isAuthDone: boolean;
  user: Record<string, any> | null;
  loading: boolean;
}
const initialState: AuthState = {
  isAuthDone: !!decryptData('param2'),
  user: decryptData('param2') ? decryptData('param2') : {},
  loading: false
};

export const loginApiCall = createAsyncThunk('/auth/login', loginUserThunk);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      clearLocalStorage();
      return { ...initialState, isAuthDone: false };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApiCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginApiCall.fulfilled, (state, { payload }) => {
        console.log('payload', payload);

        state.loading = false;
        state.user = payload;
        state.isAuthDone = true;
        const encUser = encryptData(payload);
        if (encUser) addToLocalStorage('param2', encUser, false);
      })
      .addCase(loginApiCall.rejected, (state, { payload }) => {
        console.error('Login rejected with payload:', payload);
        state.loading = false;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
