import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  InfoLogin,
  ModalWorkDetailsProps,
  ThongTinChungType,
  UserProfileType,
} from '../types/CommonType';
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
  toastModalContainer: {
    showToast: boolean;
    type: 'error' | 'warning' | 'info' | 'success';
    title: string;
    body: string;
  };
  showCamera: boolean;
  showResultCamera: boolean;
  resultScanned: string;
  userInfo: UserProfileType;
  notiferWarning: {
    showNotifer: boolean;
    label: string;
    label2: string;
  };
  showListNotification: boolean;
  notiferApp: [];
  heightHeaderNav: number;
  showQRcode: boolean;
  resultQRCode: string;
  showModalImage: {
    show: boolean;
    imageURL: string;
    data: any;
  };
  userName: string;
  THONG_TIN_CHUNG: ThongTinChungType;
  language: number;
  showModalViewDocument: ModalWorkDetailsProps;
  keyworkSearchModal: string;
  refeshingPBT: boolean;
  refeshingMyEcomaint: boolean; // 0 lần đầu tiên đăng nhập, 1 sau khi back lại, 2 không load,
  tokenDevice: string;
  loginInfo: InfoLogin;

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
  baseURL: '',
  overlay: false,
  toastContainer: {
    showToast: false,
    type: 'info',
    title: 'Thông báo',
    body: '',
  },
  toastModalContainer: {
    showToast: false,
    type: 'info',
    title: 'Thông báo',
    body: '',
  },
  showCamera: false,
  showResultCamera: false,
  resultScanned: '',
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
  heightHeaderNav: 0,
  showQRcode: false,
  resultQRCode: '',
  showModalImage: {
    show: false,
    imageURL: '',
    data: {},
  },
  userName: '',
  THONG_TIN_CHUNG: {
    TEN_CTY: '',
    TEN_NGAN: '',
    DIA_CHI: '',
    PHONE: '',
    USER_NAME: '',
    FAX: '',
    TEN_TO: '',
    TEN_DV: '',
    HO_TEN: '',
    DUONG_DAN_TL: '',
    USER_FTP: null,
    PASS_FTP: null,
    PORT_FTP: null,
    HOST_FTP: null,
    SHOW_NN: false,
  },
  language: 0,
  showModalViewDocument: {
    motaCV: '',
    SHOW_MODAL: false,
    TEN_BO_PHAN: '',
    thaotac: '',
    tieuchuanKT: '',
    yeucauDC: '',
    yeucauNS: '',
  },
  keyworkSearchModal: '',
  refeshingPBT: false,
  refeshingMyEcomaint: true,
  tokenDevice: '',
  loginInfo: {
    check: false,
    username: '',
    password: '',
  },
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
    setShowToastModal: (
      state,
      action: PayloadAction<
        PayLoadActionType<
          Partial<InitalState['toastModalContainer']>
        >['payload']
      >,
    ) => {
      state.toastModalContainer = {
        ...state.toastModalContainer,
        ...action.payload,
      };
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setShowCamera: (state, action) => {
      state.showCamera = action.payload;
    },
    setShowModalCamera: (state, action) => {
      state.showResultCamera = action.payload;
    },
    setResultScanned: (state, action) => {
      state.resultScanned = action.payload;
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
    setHeightHeaderNavigation: (state, action) => {
      state.heightHeaderNav = action.payload;
    },
    setShowQRCode: (state, action) => {
      state.showQRcode = action.payload;
    },
    setResultQRCode: (state, action) => {
      state.resultQRCode = action.payload;
    },
    setShowModalImage: (state, action) => {
      state.showModalImage = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setThongTinChung: (state, action) => {
      state.THONG_TIN_CHUNG = action.payload;
    },
    setLanguaApp: (state, action) => {
      state.language = action.payload;
    },
    setShowModalViewDocument: (state, action) => {
      state.showModalViewDocument = action.payload;
    },
    setKeyWorkSearchModal: (state, action) => {
      state.keyworkSearchModal = action.payload;
    },
    setRefeshingPBT: state => {
      state.refeshingPBT = !state.refeshingPBT;
    },
    setRefeshingMyEcomaint: (state, action) => {
      state.refeshingMyEcomaint = action.payload;
    },

    setTokenDevice: (state, action) => {
      state.tokenDevice = action.payload;
    },
    setLoginInfo: (
      state,
      action: PayloadAction<
        PayLoadActionType<Partial<InitalState['loginInfo']>>['payload']
      >,
    ) => {
      state.loginInfo = {
        ...state.loginInfo,
        ...action.payload,
      };
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
  setShowToastModal,
  setUserInfo,
  setShowCamera,
  setShowModalCamera,
  setResultScanned,
  setBaseURL,
  setNotiferWarning,
  setShowListNotification,
  setNotiferApp,
  setHeightHeaderNavigation,
  setShowQRCode,
  setResultQRCode,
  setShowModalImage,
  setUserName,
  setThongTinChung,
  setLanguaApp,
  setShowModalViewDocument,
  setKeyWorkSearchModal,
  setRefeshingPBT,
  setRefeshingMyEcomaint,
  setTokenDevice,
  setLoginInfo,
  setCheckDataMayCheckin,
  setShowSnackbar,
  setCheckinStatus,
} = appSlice.actions;

export default appSlice.reducer;
