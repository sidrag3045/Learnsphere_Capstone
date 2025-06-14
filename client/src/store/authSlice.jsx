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
  const user = await getCurrentUser();
  return user;
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null; // Mark user as not authenticated
        state.error = action.error.message;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      });
  }
});


export default authSlice.reducer;
