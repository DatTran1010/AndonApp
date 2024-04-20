import {AxiosError} from 'axios';

export interface UserProfileType {
  TOKEN: string | null;
  USER_NAME: string | null;
  MS_NS: string | null;
  HO_TEN: string | null;
  ID_TC: number | null;
  ID_VT: number | null;
  GHI_CHU: string | null;
  EMAIL: string | null;
  STATUS_CHECK_IN: boolean | null;
  TEN_VAI_TRO: string | null;
  Res: number | null;
  PASSWORD: string | null;
  RefreshToken?: string;
  ExpiresRefreshToken?: Date;
}

export interface ApiResponse<T> {
  StatusCode: number;
  Message: string;
  ResponseData: T;
  ResponseHeader?: any; // Bạn có thể sửa lại kiểu dữ liệu của ResponseHeader nếu biết chính xác
  IsSuccessStatusCode: boolean;
  ResourceKey: string;
  TimeExecute?: number;
  TrackingMessage?: string;
}

export interface ThongTinChungType {
  TEN_CTY: string;
  TEN_NGAN: string;
  DIA_CHI: string;
  PHONE: string;
  USER_NAME: string;
  FAX: string;
  TEN_TO: string;
  TEN_DV: string;
  HO_TEN: string;
  DUONG_DAN_TL: string;
  // LUU_FILE: number; // Nếu bỏ comment, sửa lại kiểu dữ liệu nếu cần thiết
  USER_FTP: string | null;
  PASS_FTP: string | null;
  PORT_FTP: number | null;
  HOST_FTP: string | null;
  SHOW_NN: boolean | null;
}

export interface JsonRespoionseModelType<T = any> {
  ResponseMessage: string | null;
  ResponseCode: number;
  Data: T;
}

export interface ModalWorkDetailsProps {
  thaotac: string;
  tieuchuanKT: string;
  yeucauNS: string;
  yeucauDC: string;
  motaCV: string;
  TEN_BO_PHAN: string;
  SHOW_MODAL: boolean;
}

export interface DataImageType {
  id: number;
  uri: string | undefined;
  typeimg?: string;
  fileName?: string;
}

export interface CboBoPhanType {
  id: number;
  MA_BP: string;
  TEN_BP: string;
}

export interface CboCongViecType {
  id: number;
  MS_CV: number;
  MO_TA_CV: string;
}

export interface CboDanhSachKhoType {
  id: number;
  MS_KHO: number;
  TEN_KHO: string;
}

export interface ImageFormData {
  uri: string;
  type: string;
  name: string;
}

export interface ImageModel {
  Path: string;
  Path64: string;
  DUONG_DAN: string;
}

export type RootStateType<T> = {
  app: T;
};

export type CallApiResponse<T> = {
  data: T;
  error?: AxiosError; // Add this property to store the AxiosError
};

export interface CboMachineType {
  id: number;
  TEN_MAY: string;
  MS_MAY: string;
  MS_MAY_1: string;
}

export interface CboPhuTungType {
  id: number;
  TEN_PT: string;
  MS_PT: string;
}

export interface CboNguoiYeuCau {
  id: number;
  TEN_NYC: string;
  ID_NYC: string;
}

export interface CboNhanVienBaoTriType {
  id: number;
  MS_CONG_NHAN: string;
  HO_TEN: string;
}

// export interface RootState {
//   app: ReturnType<typeof appReducer>;
//   api: any;
//   // Thêm các reducers khác nếu cần
// }

export interface CboDangNhapType {
  // dạng nhập
  id: number;
  TEN_DANG_NHAP: string;
  MS_DANG_NHAP: number;
}

export interface CboDangXuatType {
  // dạng xuat
  id: number;
  DANG_XUAT: string;
  MS_DANG_XUAT: number;
}

export interface CboNguoiNhapType {
  // dạng nhập
  id: number;
  TEN_NGUOI_NHAP: string;
  MS_NGUOI_NHAP: string;
  KHACH_HANG: number;
  VTRO: number;
}

export interface PropsCboNguoiNhapType {
  username: string;
  nngu: number;
  all: number;
  khachhang: number;
  vaitro: number;
}

export interface CboDonDatHangType {
  // dạng nhập
  id: number;
  MS_DON_DAT_HANG: string;
  TEN_DON_DAT_HANG: string;
  DON_HANG: number;
}

export interface PropsCboDonDatHangType {
  username: string;
  nngu: number;
  all: number;
  dexuat: number;
}

export interface CboCurrencyType {
  // ngoại tệ
  NGOAI_TE: string;
  TEN_NGOAI_TE: string;
}

export interface DataRadioButtonType {
  id: number;
  labelRadio: string;
}
export interface CboDiaDiemModelType {
  id: number;
  TEN_N_XUONG: string;
  MS_N_XUONG: string;
}

export interface CboPhieuBaoTriType {
  id: number;
  TEN_PBT: string;
  MS_PBT: string;
}

export interface CboBoPhanChiuPhiType {
  id: number;
  TEN_BP_CHIU_PHI: string;
  MS_BP_CHIU_PHI: number;
}

export interface CboListPhuTungType {
  id: number;
  MS_PT: string;
  TEN_PT: string;
}

export interface DataNotificationType {
  body?: string;
  title?: string;
  platform?: number;
  language?: number;
  idmay?: number;
  category?: string;
  snbth?: string;
  username?: string;
  iddd?: number;
  idsc?: number;
  dataOnly?: boolean;
  screen?: string;
  msmay?: string;
  tenmay?: string;
}

export interface InfoLogin {
  check: boolean;
  username: string;
  password: string;
}

export interface ComboModelType {
  id: number;
  value: string;
  label: string;
}

export interface ImageType {
  uri: string | undefined;
  type?: string;
  name?: string;
}

export interface RefreshTokenType {
  refreshToken?: string;
  expires?: Date;
}
