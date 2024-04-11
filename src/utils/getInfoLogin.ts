import {InfoLogin} from '../types/CommonType';
import localStorage from './localStorage';
export const getInfoLogin = async () => {
  try {
    const infoLogin = (await localStorage.getItem('SAVE_USER')) as string;
    if (infoLogin && infoLogin !== '') {
      const result = JSON.parse(infoLogin) as InfoLogin;
      return result;
    }
  } catch (error) {
    const resultError: InfoLogin = {
      check: false,
      password: '',
      username: '',
    };
    return resultError;
  }
};
