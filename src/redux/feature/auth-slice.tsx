import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiResponse} from '../../types/CommonType';
import authServicesHttp from '../../apis/authServices';

interface AuthStateType {
  checkinStatus: ApiResponse<boolean> | undefined;
  isLoading: boolean;
  isError: boolean;
  username: string;
}

export type propsFetchListGeneral = {
  username: string;
  nngu: number;
};

export const fetchCheckInStatus = createAsyncThunk(
  'auth/check-in-status',
  async (username: string) => {
    const response = await authServicesHttp.checkinStatus(username);
    return response;
  },
);

const initialState: AuthStateType = {
  checkinStatus: undefined,
  // listEmployee: undefined,
  isError: false,
  isLoading: false,
  username: '',
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCheckInStatus.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCheckInStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkinStatus = action.payload;
        state.isError = false;
      })
      .addCase(fetchCheckInStatus.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default auth.reducer;
