import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import {ApiResponse} from '../types/CommonType';
import {showSnackbarStore} from '../redux/Store';
import {getBaseURLFromLocalStorage} from './baseUrlUtils';
import {fetchRefreshToken, getAccessToken, isTokenExpired} from './accesstoken';
import localStorage from './localStorage';
import {localStorageKey} from './localStorageKey';
import {NavigationService} from '../screens/navigation';

// Định nghĩa interface cho các loại lỗi
interface CustomError extends ApiResponse<null> {
  message: string;
  code: number | undefined;
}

class Http {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: '', //http://103.48.193.219:1006 NEXT_PUBLIC_API_URL
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Thêm interceptor để xử lý lỗi trước khi chúng được xử lý bởi then hoặc catch
    this.instance.interceptors.response.use(
      this.handleSuccess,
      this.handleError,
    );
  }

  // Phương thức xử lý dữ liệu thành công
  private handleSuccess(response: AxiosResponse<any>): AxiosResponse<any> {
    return response;
  }

  // Phương thức xử lý lỗi
  private handleError(error: AxiosError<CustomError>): Promise<never> {
    console.log(
      'URL_ERROR',
      'Method :' +
        error.config?.method +
        ' ' +
        error.config?.baseURL +
        error.config?.url +
        '/' +
        // get prams
        (error.config?.params ? JSON.stringify(error.config?.params) : '') +
        // get data
        (error.config?.data ? JSON.stringify(error.config?.data) : ''),
    );

    // Có phản hồi từ máy chủ, nhưng nó không thành công (vd: mã lỗi HTTP không phải 2xx)

    if (error.response) {
      let responseCode = error.response.data.StatusCode;
      let responseMessage = error.response.data.Message;

      // nếu lỗi 404 thì trả về sai đường dẫn API
      if (error.response.status === 404) {
        responseCode = error.response.status;
        responseMessage = error.message;
        showSnackbarStore('Wrong URL address' + error.response.status, 'error');
      } else if (error.response.status === 500) {
        showSnackbarStore(
          'Server Error ' + error.response.status.toString(),
          'error',
        );
      } else if (error.response.status === 401) {
        // lỗi token
        showSnackbarStore(
          'Token expired ' + error.response.status.toString(),
          'error',
        );
        NavigationService.navigate('LoginScreen');
      }

      console.log('error.response.status', error.response.status);

      return Promise.reject({
        code: responseCode,
        message: responseMessage || 'Unknown error occurred',
      });
    } else if (error.request) {
      // Yêu cầu được gửi, nhưng không nhận được phản hồi (vd: không có kết nối mạng)
      showSnackbarStore((error.message + ' ' + error.code) as string, 'error');

      return Promise.reject({
        code: error.code,
        message: error.message,
      });
    } else {
      showSnackbarStore((error.message + ' ' + error.code) as string, 'error');
      // Có lỗi xảy ra khi thiết lập yêu cầu hoặc xử lý phản hồi
      return Promise.reject({
        code: -2,
        message: 'Error setting up request or processing response',
      });
    }
  }

  // Phương thức gửi yêu cầu GET
  public async get<T>(
    url: string,
    options?: AxiosRequestConfig<any> | undefined,
  ): Promise<ApiResponse<T>> {
    const baseURL = await getBaseURLFromLocalStorage();
    let accessToken = await getAccessToken();
    const isTokenExpires = isTokenExpired(accessToken);

    // nếu token hết hạn
    if (!isTokenExpires) {
      // thì gọi lại api refresh token
      const resultToken = await fetchRefreshToken(baseURL);

      // kiểm tra nếu nhận được token
      if (!resultToken.IsUnauthorized) {
        //set lại token cho request đang thực hiện
        accessToken = resultToken.NewToken;
        await localStorage.setItem(
          localStorageKey.TOKEN_LOGIN,
          resultToken.NewToken,
        );
      }
    }

    return this.instance
      .get<ApiResponse<T>>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ...options,
        baseURL,
      })
      .then(response => response.data)
      .catch((error: AxiosError<CustomError>) => {
        const errorResponse: ApiResponse<T> = {
          IsSuccessStatusCode: false,
          Message: error.message,
          ResponseData: undefined as T,
          StatusCode: error.status as number,
          ResourceKey: error.code as string,
        };
        return errorResponse;
      });
  }

  // Phương thức gửi yêu cầu POST
  public async post<T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig<any> | undefined,
  ): Promise<ApiResponse<T>> {
    const baseURL = await getBaseURLFromLocalStorage();
    let accessToken = await getAccessToken();
    const isTokenExpires = isTokenExpired(accessToken);

    // nếu token hết hạn
    if (!isTokenExpires) {
      // thì gọi lại api refresh token
      const resultToken = await fetchRefreshToken(baseURL);

      // kiểm tra nếu nhận được token
      if (!resultToken.IsUnauthorized) {
        //set lại token cho request đang thực hiện
        accessToken = resultToken.NewToken;
        await localStorage.setItem(
          localStorageKey.TOKEN_LOGIN,
          resultToken.NewToken,
        );
      }
    }

    return this.instance
      .post<ApiResponse<T>>(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ...options,
        baseURL,
      })
      .then(response => response.data)
      .catch((error: AxiosError<CustomError>) => {
        const errorResponse: ApiResponse<T> = {
          IsSuccessStatusCode: false,
          Message: error.message,
          ResponseData: undefined as T,
          StatusCode: error.status as number,
          ResourceKey: error.code as string,
        };
        return errorResponse;
      });
  }

  // Phương thức gửi yêu cầu DELETE
  public async delete<T>(
    url: string,
    options?: AxiosRequestConfig<any> | undefined,
  ): Promise<ApiResponse<T>> {
    const baseURL = await getBaseURLFromLocalStorage();
    let accessToken = await getAccessToken();
    const isTokenExpires = isTokenExpired(accessToken);

    // nếu token hết hạn
    if (!isTokenExpires) {
      // thì gọi lại api refresh token
      const resultToken = await fetchRefreshToken(baseURL);

      // kiểm tra nếu nhận được token
      if (!resultToken.IsUnauthorized) {
        //set lại token cho request đang thực hiện
        accessToken = resultToken.NewToken;
        await localStorage.setItem(
          localStorageKey.TOKEN_LOGIN,
          resultToken.NewToken,
        );
      }
    }

    return this.instance
      .delete<ApiResponse<T>>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ...options,
        baseURL,
      })
      .then(response => response.data)
      .catch((error: AxiosError<CustomError>) => {
        const errorResponse: ApiResponse<T> = {
          IsSuccessStatusCode: false,
          Message: error.message,
          ResponseData: undefined as T,
          StatusCode: error.status as number,
          ResourceKey: error.code as string,
        };
        return errorResponse;
      });
  }

  // Các phương thức khác như put, delete, patch, vv. có thể được thêm vào tùy ý
}

// Sử dụng Http wrapper
const http = new Http();

export default http;
