
import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, getCurrentUser, logoutUser } from '../../services/auth';

const registerThunk = createAsyncThunk('auth/register', async (payload) => {
  const data = await registerUser(payload);
  return data.user;
});

const loginThunk = createAsyncThunk('auth/login', async (payload) => {
  const data = await loginUser(payload);
  return data.user;
});

const fetchUserThunk = createAsyncThunk('auth/me', async () => {
  const user = await getCurrentUser();
  return user;
});

const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
  return null;
});


export { registerThunk, loginThunk, fetchUserThunk, logoutThunk };