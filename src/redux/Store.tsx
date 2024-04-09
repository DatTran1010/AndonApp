import {combineReducers, configureStore} from '@reduxjs/toolkit';

import appReducer, {
  setOverlay,
  setShowSnackbar,
  setShowToast,
} from './AppSlice';
import ApiSlice from './ApiSlice';
import {t} from 'i18next';
import Colors from '../common/Colors';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import authReducer from './feature/auth-slice';
// import tokenMiddleware from './tokenMiddleware';

const rootReducer = combineReducers({
  app: appReducer,
  api: ApiSlice,
  auth: authReducer,
  // Thêm các reducers khác nếu cần
});

const store = configureStore({
  reducer: rootReducer,
});

export const showOverLayStore = (value: boolean) => {
  store.dispatch(setOverlay(value));
};

export const showToastStore = (
  message: any,
  type: 'success' | 'error' | 'warning' | 'info',
  title?: string,
) => {
  store.dispatch(
    setShowToast({
      body: message as string,
      showToast: true,
      title: !title ? t('thong-bao') : title,
      type: type,
    }),
  );
};

export const showSnackbarStore = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info',
  textActionColor?: string,
  textColor?: string,
) => {
  store.dispatch(
    setShowSnackbar({
      show: true,
      bgColor:
        type === 'success'
          ? Colors.success
          : type === 'error'
          ? Colors.error
          : type === 'warning'
          ? Colors.warning
          : Colors.info,
      text: message,
      textActionColor: !textActionColor ? Colors.white : textActionColor,
      textColor: !textColor ? Colors.white : textColor,
    }),
  );
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
