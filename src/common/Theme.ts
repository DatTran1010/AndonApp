import {TextProps, TextStyle, ViewStyle} from 'react-native';
import Colors from './Colors';
import {WIDTH_SCREEN} from './Dimentions';

interface ThemeProps extends TextProps {
  fontFamily: string;
  font: TextStyle;
  fontBold: TextStyle;
  fontTitle: TextStyle; // Bỏ qua thuộc tính 'color' trong fontTitle
  shadow: ViewStyle;
  fontSize: number;
  flexDirectionRowBeetWeen: ViewStyle;
  flexDirection: ViewStyle;
  fontFamilyBold: string;
  fontFamilyRegular: string;
}

const Theme: ThemeProps = {
  fontFamily: 'Montserrat-Italic',
  fontFamilyBold: 'Montserrat-Bold',
  fontFamilyRegular: 'Montserrat-Regular',

  font: {
    fontWeight: '400',
    fontSize: WIDTH_SCREEN / 28,
    color: Colors.black,
    flexShrink: 1,
    fontFamily: 'Montserrat-Italic',
  },
  fontBold: {
    fontWeight: '800',
    fontSize: WIDTH_SCREEN / 28,
    color: Colors.black,
    flexShrink: 1,
    fontFamily: 'Montserrat-BoldItalic',
  },
  fontTitle: {
    fontWeight: 'bold',
    fontSize: WIDTH_SCREEN / 25,
    color: Colors.white,
  },
  shadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  fontSize: WIDTH_SCREEN / 28,
  flexDirectionRowBeetWeen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexDirection: {
    flexDirection: 'row',
  },
};
export default Theme;
