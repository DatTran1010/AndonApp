import axios, {AxiosResponse, AxiosError, HttpStatusCode} from 'axios';
import {CallApiResponse} from '../src/types/CommonType';
// import * as asyncStorageItem from '../services/asyncStorageItem';
// import {getAccessToken, isTokenExpired} from '../src/utils';
// import {NavigationService} from '../src/UI/Navigation';
// import {showToastStore} from '../src/Redux';
// import {showOverLayStore} from '../src/Redux/Store';

const callApi = async <T>(
  endpoint: string,
  method: string,
  data: any = null,
  params: any = null,
  contenttype: string = 'charset=utf-8',
): Promise<CallApiResponse<T>> => {
  const controller = new AbortController();
  try {
    // const baseURL = await asyncStorageItem.baseURL();
    // const accessToken = await getAccessToken();
    const accessToken = '';

    // if (checkToken) {
    //   try {
    //     const isCheckToken = isTokenExpired(accessToken);
    //     if (!isCheckToken) {
    //       // nếu đang ở 1 trang nào đó bất kỳ, thì sẽ chuyển về trang Login
    //       NavigationService.navigate('Login');
    //       throw new Error('Token Expired');
    //     }
    //   } catch (error) {
    //     throw new Error('Token Expired');
    //   }
    // }

    // const baseURL = 'http://103.48.193.219:1010';
    const baseURL = 'http://192.168.2.15:7174';
    // console.log('URL', baseURL);
    const response: AxiosResponse = await axios.request({
      baseURL: baseURL,
      timeout: 9000,
      url: endpoint,
      method: method,
      data: data,
      params: params,
      headers: {
        Accept: 'application/json',
        'Content-Type': contenttype,
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
      // signal: AbortSignal.timeout(5000),
    });
    setTimeout(() => {
      controller.abort();
    }, 9000);
    if (response.status === 200) {
      return {data: response.data, error: undefined};
    } else {
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      throw {error, data: undefined};
    } else {
      const stringerror = JSON.stringify(error);
      const resultError = JSON.parse(stringerror) as AxiosError;
      console.log('Lỗi', error);

      // showOverLayStore(false);
      if (resultError.status === HttpStatusCode.Unauthorized) {
        // await asyncStorageItem.deleteItem('AccessToken');
        // NavigationService.navigate('Login');
        // showToastStore('Token Expired', 'error');
        throw {error, data: undefined};
      } else {
        // showToastStore(resultError.message, 'error');
        throw {error, data: undefined};
      }
    }
  }
};
export default callApi;
