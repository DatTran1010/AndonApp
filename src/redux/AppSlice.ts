import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserProfileType} from '../types/CommonType';
import {MayCheckinViewModelType} from '../types/checkinType';
import Colors from '../common/Colors';

interface InitalState {
  baseURL: string;
  overlay: boolean;
  toastContainer: {
    showToast: boolean;
    type: 'error' | 'warning' | 'info' | 'success';
    title: string;
    body: string;
  };
  userInfo: UserProfileType;
  notiferWarning: {
    showNotifer: boolean;
    label: string;
    label2: string;
  };
  showListNotification: boolean;
  notiferApp: [];
  userName: string;
  language: number;
  keyworkSearchModal: string;
  tokenDevice: string;

  showSnackbar: {
    textActionColor?: string;
    text: string | null | undefined;
    bgColor?: string;
    textColor?: string;
    show: boolean;
  };

  //#checkin store
  // props getListDataMay
  checkinStatus: boolean | null;
  listDataMayCheckin: MayCheckinViewModelType[];
}

interface PayLoadActionType<T> {
  type: string;
  payload: T;
}

const initialState: InitalState = {
  userName: '',
  baseURL: '',
  overlay: false,
  toastContainer: {
    showToast: false,
    type: 'info',
    title: 'Thông báo',
    body: '',
  },

  userInfo: {
    TOKEN: '',
    USER_NAME: '',
    MS_NS: '',
    HO_TEN: '',
    ID_TC: null,
    ID_VT: null,
    GHI_CHU: null,
    EMAIL: null,
    STATUS_CHECK_IN: null,
    TEN_VAI_TRO: null,
    Res: null,
    PASS_WORK: null,
  },
  notiferWarning: {
    showNotifer: false,
    label: '',
    label2: '',
  },
  showListNotification: false,
  notiferApp: [],

  language: 0,

  keyworkSearchModal: '',
  tokenDevice: '',
  checkinStatus: false,
  listDataMayCheckin: [],
  showSnackbar: {
    textActionColor: Colors.white,
    text: '',
    textColor: Colors.white,
    show: false,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOverlay: (state, action) => {
      state.overlay = action.payload;
    },
    setShowToast: (
      state,
      action: PayloadAction<
        PayLoadActionType<Partial<InitalState['toastContainer']>>['payload']
      >,
    ) => {
      state.toastContainer = {
        ...state.toastContainer,
        ...action.payload,
      };
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    setBaseURL: (state, action) => {
      state.baseURL = action.payload;
    },
    setNotiferWarning: (state, action) => {
      state.notiferWarning = action.payload;
    },
    setShowListNotification: (state, action) => {
      state.showListNotification = action.payload;
    },
    setNotiferApp: (state, action) => {
      state.notiferApp = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setLanguaApp: (state, action) => {
      state.language = action.payload;
    },
    setKeyWorkSearchModal: (state, action) => {
      state.keyworkSearchModal = action.payload;
    },
    setTokenDevice: (state, action) => {
      state.tokenDevice = action.payload;
    },

    setCheckDataMayCheckin: (state, action) => {
      state.listDataMayCheckin = action.payload;
    },

    setShowSnackbar: (
      state,
      action: PayloadAction<
        PayLoadActionType<Partial<InitalState['showSnackbar']>>['payload']
      >,
    ) => {
      state.showSnackbar = {
        ...state.showSnackbar,
        ...action.payload,
      };
    },

    setCheckinStatus: (state, action) => {
      state.checkinStatus = action.payload;
    },
  },
});

export const {
  setOverlay,
  setShowToast,
  setUserInfo,
  setBaseURL,
  setNotiferWarning,
  setShowListNotification,
  setNotiferApp,
  setUserName,
  setLanguaApp,
  setKeyWorkSearchModal,
  setTokenDevice,
  setCheckDataMayCheckin,
  setShowSnackbar,
  setCheckinStatus,
} = appSlice.actions;

export default appSlice.reducer;
