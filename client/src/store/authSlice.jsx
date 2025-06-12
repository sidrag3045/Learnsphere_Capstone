import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, getCurrentUser, logoutUser } from '../services/auth';

export const registerThunk = createAsyncThunk('auth/register', async (payload) => {
  const data = await registerUser(payload);
  return data.user;
});

export const loginThunk = createAsyncThunk('auth/login', async (payload) => {
  const data = await loginUser(payload);
  return data.user;
});

export const fetchUserThunk = createAsyncThunk('auth/me', async () => {
  const data = await getCurrentUser();
  return data.user;
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default authSlice.reducer;
