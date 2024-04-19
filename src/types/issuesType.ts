export interface InCompleteIssuesType {
  ID_SC: number;
  CODE: string;
  SN_BTH: string;
  ID_MAY: number;
  TG_BAT_DAU: string;
  TG_TIEP_NHAN: Date;
  TG_DEN_HT: Date;
  TG_GOI_BT: Date;
  TG_KET_THUC: Date;
  TINH_TRANG: number;
  ID_NNDM: number;
  MO_TA_LOI: string;
  ID_NS_XL: number;
  ID_NS_TT: number;
  ID_DD: number;
  ID_VT: number;
  TEN_MAY: string;
  COLOR_TT: string;
  MS_MAY: string;
  TEN_TINH_TRANG: string;
  TG_NM: number;
  TEN_NTN: string;
}

export interface ListInfoExchangeType {
  ID_TTT: number;
  ID_SC: number;
  MESSAGE: string;
  ID_NGUOI_GUI: number;
  ID_NGUOI_NHAN: number;
  MS_NGUOI_GUI: string;
  HO_TEN_NGUOI_GUI: string;
  TG_GUI: string;
  USERNAME_NGUOI_GUI: string;
  TYPE_MESSAGE: number; // 1: MÌNH GỬI, 2: NGƯỜI KHÁC GỬI
  IS_IMAGE: boolean; // 1: MÌNH GỬI, 2: NGƯỜI KHÁC GỬI
}

export interface ResultSaveInfoExchange {
  RES: number;
  TOKEN: string;
  MESSAGE: string;
  TITLE: string;
  PLATFORM: number;
  LANGUAGE: number;
  CATEGORY: string;
  ID_MAY: number;
  SN_BTH: string;
  ID_SK: string;
  USERNAME: string;
  ID_DD: string;
  ID_SC: string;
}

export interface ReportChartModelType {
  CHART_LABEL: string;
  CHART_VALUE: number;
}
