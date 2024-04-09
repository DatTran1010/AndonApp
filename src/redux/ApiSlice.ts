import {createSlice, createAsyncThunk, SerializedError} from '@reduxjs/toolkit';
import callApi from '../../services/api';
import {setOverlay, setShowToast} from './AppSlice';
import {t} from 'i18next';
import {CallApiResponse} from '../types/CommonType';

interface FetchApiDataParams {
  endpoint: string;
  method: string;
  data?: any;
  params?: any;
  contenttype?: string;
  checktoken?: boolean;
}

interface InitialStateType {
  data: unknown;
  isLoading: boolean;
  error: SerializedError | null;
}
// Tạo một action async để gọi API
export const fetchApiData = createAsyncThunk(
  'api/fetchData',
  async (
    {
      endpoint,
      method,
      data = null,
      params = null,
      contenttype = '',
    }: FetchApiDataParams,
    thunkAPI,
  ) => {
    try {
      thunkAPI.dispatch(setOverlay(true));
      const response = await callApi(
        endpoint,
        method,
        data,
        params,
        contenttype,
      );

      thunkAPI.dispatch(setOverlay(false));

      return response.data;
    } catch (error) {
      const typedError = error as CallApiResponse<any>;
      thunkAPI.dispatch(setOverlay(false));
      thunkAPI.dispatch(
        setShowToast({
          showToast: true,
          title: t('Thông báo'),
          body: typedError.error?.message,
          type: 'error',
        }),
      );
      // Xử lý lỗi ở đây và throw lại lỗi để Redux Toolkit có thể kích hoạt action rejected
      throw error;
    }
  },
);

// Tạo slice
const apiSlice = createSlice({
  name: 'api',
  initialState: {} as InitialStateType,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchApiData.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default apiSlice.reducer;
