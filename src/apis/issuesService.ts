import {ComboModelType, JsonRespoionseModelType} from '../types/CommonType';
import {
  InCompleteIssuesType,
  ListInfoExchangeType,
  ReportChartModelType,
} from '../types/issuesType';
import http from '../utils/https';
import ApiUrl from './ApiUrl';

export type PropsSaveActionChooseType = {
  nngu: number;
  username: string;
  idsc: number;
  idnn?: number;
  description?: string;
  loai: number;
  id_sk: number;
  id_may: number;
  sn_bth: string;
  id_dd: number;
  tgnm?: number;
};

export type PropsSaveInfoExchangeType = {
  images?: any;
  nngu: number;
  username: string;
  idsc: number;
  idns: number; // id nhan su
  message: string;
};

export type PropsGetReportChart = {
  nngu: number;
  username: string;
  loai: number;
  tungay: Date;
  denngay: Date;
  option: boolean;
};

const issuesService = {
  getListIssuesByUser: (username: string, nngu: number) =>
    http.get<InCompleteIssuesType[]>(ApiUrl.issues.GetListIssuesByUser, {
      params: {
        username,
        nngu,
      },
    }),

  getComboDownTime: (username: string, nngu: number, type: string) =>
    http.get<ComboModelType[]>(ApiUrl.combo.GetCboModel, {
      params: {
        username,
        nngu,
        type,
      },
    }),
  saveActionChoose: (props: PropsSaveActionChooseType) =>
    http.post<JsonRespoionseModelType>(
      ApiUrl.issues.SaveActionChoose,
      JSON.stringify(props),
    ),

  getComboCurrentReceiver: (
    username: string,
    nngu: number,
    idmay: number,
    idsc: number,
  ) =>
    http.get<ComboModelType[]>(ApiUrl.combo.GetCboCurrentReceiver, {
      params: {
        username,
        nngu,
        idmay,
        idsc,
      },
    }),

  getListInfoExchange: (username: string, nngu: number, idsc: number) =>
    http.get<ListInfoExchangeType[]>(ApiUrl.issues.GetListInfoExchange, {
      params: {
        username,
        nngu,
        idsc,
      },
    }),

  saveInfoExchange: (props: PropsSaveInfoExchangeType) =>
    http.post<JsonRespoionseModelType>(
      ApiUrl.issues.SaveInfoExchange,
      props.images,
      {
        params: {
          idns: props.idns,
          idsc: props.idsc,
          message: props.message,
          nngu: props.nngu,
          username: props.username,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    ),

  deleteInfoExchange: (
    props: Pick<PropsSaveInfoExchangeType, 'message' | 'nngu' | 'username'> & {
      isimage: boolean;
      idttt: number;
    },
  ) =>
    http.delete<JsonRespoionseModelType>(ApiUrl.issues.DeleteInfoExchange, {
      params: {
        idttt: props.idttt,
        linkimage: props.message,
        nngu: props.nngu,
        username: props.username,
        isimage: props.isimage,
      },
    }),

  getReportChart: (props: PropsGetReportChart) =>
    http.get<ReportChartModelType[]>(ApiUrl.issues.GetReportChart, {
      params: props,
    }),
};

export default issuesService;
