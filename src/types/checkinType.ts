export interface CaModelType {
  id: number;
  ID_CA: number;
  TEN_CA: string;
  TU_GIO: Date;
  DEN_GIO: Date;
  NEXT_ID_CA: number;
  LOAI_CA: number;
  CA_HIEN_TAI: boolean;
}

export interface MayCheckinViewModelType {
  ID_CIOM: number;
  ID_CIO: number;
  ID_MAY: number;
  TG_CHECK_IN_MAY: Date;
  TG_CHECK_OUT_MAY: Date;
  ID_TT: number;
  GHI_CHU: string;
  TEN_MAY: string;
  MA_MAY: string;
  ID_CA: number;
  TEN_CA: string;
  LOAI_CA: number;
}

export interface DevicesModelType {
  CHON: boolean;
  ID_MAY: number;
  MA_MAY: string;
  TEN_MAY: string;
  ID_DD: number;
  TEN_DD: string;
}
