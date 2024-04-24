// import { jwtDecode } from 'jwt-decode';

import moment from 'moment';
import {RefreshTokenType, ResponseCheckTokenModel} from '../types/CommonType';
import localStorage from './localStorage';
import {localStorageKey} from './localStorageKey';
var base64 = require('base-64');

export const getAccessToken = async () => {
  try {
    const accessToken = await localStorage.getItem(localStorageKey.TOKEN_LOGIN);

    return accessToken;
  } catch (error) {
    return '';
  }
};

// Hàm để kiểm tra xem token đã hết hạn hay không
export const isTokenExpired = (token: string) => {
  try {
    if (!token || token === '') {
      return false;
    } // Nếu không có token, coi như token đã hết hạn

    const [, endcodePayLoad] = token?.split('.');

    const dataToken = JSON.parse(base64.decode(endcodePayLoad));

    const currentTime = Date.now() / 1000; // Chia 1000 để chuyển đổi sang giây
    return (dataToken.exp as number) > currentTime;
  } catch (error) {
    console.log('errorToken', error);
    return false;
  }
};

export const fetchRefreshToken = async (baseURL: string) => {
  try {
    const username = await localStorage.getItem(localStorageKey.USER_NAME);

    // get thông tin refreshToken trước đó
    const infoRefreshToken: RefreshTokenType = JSON.parse(
      await localStorage.getItem(localStorageKey.REFRESH_TOKEN),
    );

    const response = await fetch(
      baseURL +
        `/api/account/refresh-token?username=${JSON.parse(
          username,
        )}&userRefreshToken=${
          infoRefreshToken?.refreshToken
        }&userTokenExpires=${moment(infoRefreshToken?.expires).format(
          'MM/DD/YYYY HH:mm:ss',
        )}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const result = (await response.json()) as ResponseCheckTokenModel;

    return result as ResponseCheckTokenModel;
  } catch (error) {
    const resultError: ResponseCheckTokenModel = {
      IsUnauthorized: true,
      NewToken: JSON.stringify(error),
    };
    return resultError;
  }
};
