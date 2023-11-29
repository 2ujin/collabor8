import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDetails } from '../../apiService/userServicesApi';
import { TUserState } from '../../types/types';

const fetchUserDetails = createAsyncThunk('getUserDetails', async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return;
  }
  const response = await getUserDetails(userId);
  return response;
})

const initialState: TUserState = {
  isLogged: false,
  userId: null,
  user: {},
  status: 'idle',
  error: null
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = localStorage.getItem('userId');
        if (state.userId) {
          state.isLogged = true;
        } else {
          state.isLogged = false;
        }
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export { fetchUserDetails };

export default userSlice.reducer;