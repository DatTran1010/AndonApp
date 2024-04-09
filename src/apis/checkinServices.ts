import callApi from '../../services/api';
import {
  ApiResponse,
  CallApiResponse,
  JsonRespoionseModelType,
} from '../types/CommonType';
import {
  CaModelType,
  DevicesModelType,
  MayCheckinViewModelType,
} from '../types/checkinType';
import http from '../utils/https';
import ApiUrl from './ApiUrl';

export const getListCa = async (nngu: number, ngay: Date, username: string) => {
  try {
    const endpoint = ApiUrl.CheckinURL.GetListCa;
    const method = 'GET';
    const data = null;
    const params = {
      nngu,
      username,
      ngay,
    };
    // Gọi API và xử lý kết quả
    const response = await callApi<ApiResponse<CaModelType[]>>(
      endpoint,
      method,
      data,
      params,
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    const typedError = error as CallApiResponse<any>;
    return {
      StatusCode: 500,
      Message: typedError.error?.message,
      ResponseData: [],
      ResponseHeader: '', // Bạn có thể sửa lại kiểu dữ liệu của ResponseHeader nếu biết chính xác
      IsSuccessStatusCode: false,
      ResourceKey: '',
      TimeExecute: 0,
      TrackingMessage: '',
    } as ApiResponse<CaModelType[]>;
  }
};

type PropsListMayCheckinByCa = {
  nngu: number;
  ngay: Date;
  username: string;
  idca: number;
};
export const getListMayCheckinByCa = async (props: PropsListMayCheckinByCa) => {
  try {
    const endpoint = ApiUrl.CheckinURL.GetListMayCheckinByCa;
    const method = 'GET';
    const data = null;
    const params = props;
    // Gọi API và xử lý kết quả
    const response = await callApi<ApiResponse<MayCheckinViewModelType[]>>(
      endpoint,
      method,
      data,
      params,
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    const typedError = error as CallApiResponse<any>;
    return {
      StatusCode: 500,
      Message: typedError.error?.message,
      ResponseData: [],
      ResponseHeader: '', // Bạn có thể sửa lại kiểu dữ liệu của ResponseHeader nếu biết chính xác
      IsSuccessStatusCode: false,
      ResourceKey: '',
      TimeExecute: 0,
      TrackingMessage: '',
    } as ApiResponse<MayCheckinViewModelType[]>;
  }
};

interface PropsListDevicesNotHaveChecked extends PropsListMayCheckinByCa {}
export const getListDevicesNotHaveChecked = async (
  props: PropsListDevicesNotHaveChecked,
) => {
  try {
    const endpoint = ApiUrl.CheckinURL.GetListDevicesNotHaveChecked;
    const method = 'GET';
    const data = null;
    const params = props;

    // Gọi API và xử lý kết quả
    const response = await callApi<ApiResponse<DevicesModelType[]>>(
      endpoint,
      method,
      data,
      params,
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    const typedError = error as CallApiResponse<any>;
    return {
      StatusCode: 500,
      Message: typedError.error?.message,
      ResponseData: [],
      ResponseHeader: '', // Bạn có thể sửa lại kiểu dữ liệu của ResponseHeader nếu biết chính xác
      IsSuccessStatusCode: false,
      ResourceKey: '',
      TimeExecute: 0,
      TrackingMessage: '',
    } as ApiResponse<DevicesModelType[]>;
  }
};

interface PropsSaveCheckin extends PropsListMayCheckinByCa {
  jsondata: string;
}

export const saveCheckin = async (props: PropsSaveCheckin) => {
  try {
    const endpoint = ApiUrl.CheckinURL.SaveCheckin;
    const method = 'POST';
    const data = null;
    const params = props;
    const contenttype = 'application/json';

    // Gọi API và xử lý kết quả
    const response = await callApi<JsonRespoionseModelType>(
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
      Data: null,
      ResponseCode: -1,
      ResponseMessage: typedError.error?.message,
    } as JsonRespoionseModelType;
  }
};

type PropsDeleteCheckinDevice = {
  nngu: number;
  idciom: number;
  checkout: boolean;
  username: string;
  idcio: number;
};
export const deleteCheckinDevice = async (props: PropsDeleteCheckinDevice) => {
  try {
    const endpoint = ApiUrl.CheckinURL.DeleteCheckinDevice;
    const method = 'DELETE';
    const data = null;
    const params = props;

    // Gọi API và xử lý kết quả
    const response = await callApi<JsonRespoionseModelType>(
      endpoint,
      method,
      data,
      params,
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    const typedError = error as CallApiResponse<any>;
    return {
      Data: null,
      ResponseCode: -1,
      ResponseMessage: typedError.error?.message,
    } as JsonRespoionseModelType;
  }
};
export const getUser = async () => {
  try {
    const result = await http.post<{username: string; password: string}>(
      'login',
      {},
    );
    // Xử lý dữ liệu nếu cần
    return result;
  } catch (error) {
    // Xử lý lỗi ở đây
    console.error('Error fetching user:', error);
    throw error; // Ném lỗi để cho phép bên gọi xử lý tiếp
  }
};

type CheckOutProps = {
  username: string;
  nngu: number;
};
const checkinServicesHttp = {
  checkout: (props: CheckOutProps) =>
    http.post<JsonRespoionseModelType>(ApiUrl.CheckinURL.CheckOut, null, {
      params: props,
    }),
};

export default checkinServicesHttp;
