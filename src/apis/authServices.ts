import callApi from '../../services/api';
import {
  ApiResponse,
  CallApiResponse,
  UserProfileType,
} from '../types/CommonType';
import http from '../utils/https';
import ApiUrl from './ApiUrl';

type PropsLogin = {
  username: string;
  password: string;
  tokenDevies: string;
  platform: number; // 1 android 2 ios
};
export const loginAsyn = async (props: PropsLogin) => {
  try {
    const endpoint = '/api/account/login';
    const method = 'POST';
    const data = {
      Username: props.username,
      Password: props.password,
      Token: props.tokenDevies,
      Platform: props.platform,
    };
    const params = null;
    const contenttype = 'application/json';

    // Gọi API và xử lý kết quả
    const response = await callApi<ApiResponse<UserProfileType>>(
      endpoint,
      method,
      data,
      params,
      contenttype,
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    const typedError = error as CallApiResponse<any>;
    return {
      StatusCode: 500,
      Message: typedError.error?.message,
      ResponseData: {},
      ResponseHeader: '', // Bạn có thể sửa lại kiểu dữ liệu của ResponseHeader nếu biết chính xác
      IsSuccessStatusCode: false,
      ResourceKey: '',
      TimeExecute: 0,
      TrackingMessage: '',
    } as ApiResponse<UserProfileType>;
  }
};

const authServicesHttp = {
  checkinStatus: (username: string) =>
    http.get<boolean>(ApiUrl.auth.CheckinStatus, {
      params: {
        username,
      },
    }),

  logOut: (username: string) =>
    http.post<boolean>(ApiUrl.auth.Logout, null, {
      params: {
        Username: username,
      },
    }),
};

export default authServicesHttp;
