import {Dimensions} from 'react-native';
export const WIDTH_SCREEN = Dimensions.get('window').width;
export const HEIGHT_SCREEN = Dimensions.get('window').height;
export const HEIGHT_IPHONE_PROMAX = Dimensions.get('window').height > 900;
export const IPHONE_PRO_MAX = Dimensions.get('window').height > 900;

export const HEIGHT_ANDROID_5_INCH = Dimensions.get('window').height <= 700;

export const HEIGHT_TEXT_INPUT = Dimensions.get('window').height / 18;
export const HEIGHT_TEXT_AREA = Dimensions.get('window').height / 8;
export const HEIGHT_TEXT_MEDIUM = Dimensions.get('window').height / 11;
export const ICON_SIZE = Dimensions.get('window').height / 30;
