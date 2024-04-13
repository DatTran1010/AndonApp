import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import {ApiResponse} from '../types/CommonType';
import {showSnackbarStore} from '../redux/Store';

// Định nghĩa interface cho các loại lỗi
interface CustomError extends ApiResponse<null> {
  message: string;
  code: number | undefined;
}

class Http {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://192.168.2.15:7174', //http://192.168.100.19:7174/ NEXT_PUBLIC_API_URL
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

    console.log('error.response', error.response);
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
      }

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
  public get<T>(
    url: string,
    options?: AxiosRequestConfig<any> | undefined,
  ): Promise<ApiResponse<T>> {
    return this.instance
      .get<ApiResponse<T>>(url, options)
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
  public post<T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig<any> | undefined,
  ): Promise<ApiResponse<T>> {
    return this.instance
      .post<ApiResponse<T>>(url, data, options)
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
  public delete<T>(
    url: string,
    options?: AxiosRequestConfig<any> | undefined,
  ): Promise<ApiResponse<T>> {
    return this.instance
      .delete<ApiResponse<T>>(url, options)
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
