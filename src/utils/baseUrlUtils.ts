import localStorage from './localStorage';
import {localStorageKey} from './localStorageKey';

export const getBaseURLFromLocalStorage = async () => {
  const baseURL = await localStorage.getItem(localStorageKey.BASE_URL);
  return baseURL;
};
