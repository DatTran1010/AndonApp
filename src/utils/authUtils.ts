import {Platform} from 'react-native';
import {loginAsyn} from '../apis/authServices';
import {UserProfileType} from '../types/CommonType';
import localStorage from './localStorage';
import {localStorageKey} from './localStorageKey';
import {HttpStatusCode} from 'axios';
import {setCheckinStatus, setUserInfo, setUserName} from '../redux/AppSlice';
import {fetchCheckInStatus} from '../redux/feature/auth-slice';
import {showSnackbarStore} from '../redux/Store';

export const checkLogin = async () => {
  try {
    const userInfo = await localStorage.getItem(localStorageKey.USER_INFO);
    if (userInfo && userInfo !== '') {
      const result = JSON.parse(userInfo) as UserProfileType;
      return result;
    }
  } catch {
    return undefined;
  }
};

export const loginPress = async (
  dispatch: any,
  password: string | null,
  username: string | null,
  rememberme: boolean,
) => {
  try {
    const tokenDevice = await localStorage.getItem(
      localStorageKey.TOKEN_DEVICE,
    );

    const resultLogin = await loginAsyn({
      password: password as string,
      username: username as string,
      platform: Platform.OS === 'android' ? 1 : 2,
      tokenDevies: tokenDevice,
    });

    if (resultLogin.StatusCode === HttpStatusCode.Ok) {
      dispatch(setUserName(username));
      dispatch(setUserInfo(resultLogin.ResponseData));
      dispatch(setCheckinStatus(resultLogin.ResponseData.STATUS_CHECK_IN));
      dispatch(fetchCheckInStatus(username as string));

      if (rememberme) {
        //lưu thông tin info user
        await localStorage.setItem(
          localStorageKey.USER_INFO,
          JSON.stringify(resultLogin.ResponseData),
        );

        // lưu username
        await localStorage.setItem(
          localStorageKey.USER_NAME,
          JSON.stringify(username),
        );
      }

      return true;
    } else {
      showSnackbarStore(resultLogin.Message, 'error');
    }
    return false;
  } catch {
    return false;
  }
};
