import {ComboModelType, JsonRespoionseModelType} from '../types/CommonType';
import {InCompleteIssuesType} from '../types/issuesType';
import http from '../utils/https';
import ApiUrl from './ApiUrl';

export type PropsSaveActionChooseType = {
  nngu: number;
  username: string;
  idsc: number;
  idnn: number;
  description: string;
  loai: number;
  id_sk: number;
  id_may: number;
  sn_bth: string;
  id_dd: number;
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
};

export default issuesService;
