import * as asyncStorageItem from '../common/AsyncStorageItem';
import {InfoLogin} from '../types/CommonType';
export const getInfoLogin = async () => {
  try {
    const infoLogin = (await asyncStorageItem.getItem('SAVE_USER')) as string;
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
