// import { jwtDecode } from 'jwt-decode';

import localStorage from './localStorage';

export const getAccessToken = async () => {
  try {
    const accessToken = (await localStorage.getItem('AccessToken')) as string;

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
    // const decodedToken = jwtDecode(token);
    // const currentTime = Date.now() / 1000; // Chia 1000 để chuyển đổi sang giây
    // return (decodedToken.exp as number) > currentTime;
    return true;
  } catch (error) {
    console.log('errorToken', error);
    return false;
  }
};
