import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../locales/en.json';
import vn from '../locales/vn.json';
import {localStorage, localStorageKey} from '../src/utils';
export const languageResources = {
  en: {translation: en},
  vn: {translation: vn},
};

async function initI18Next() {
  const language =
    (await localStorage.getItem(localStorageKey.LANGUAGE)) || 'vn';

  await i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: language,
    fallbackLng: 'vn',
    resources: languageResources,
  });
}

initI18Next();

export default i18next;

// i18next.use(initReactI18next).init({
//   compatibilityJSON: 'v3',
//   lng: await localStorage.getItem(''),
//   fallbackLng: 'vn',
//   resources: languageResources,
// });

// export default i18next;
