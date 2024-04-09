/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

import Colors from '../common/Colors';
import Theme from '../common/Theme';

interface ButtonComponentProps extends TouchableOpacityProps {
  buttonTitle?: string;
  colorButton?: string;
  disabled?: boolean;
  colorText?: string;
  borderColor?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  buttonTitle,
  colorButton = Colors.primarySecond,
  disabled = false,
  colorText = Colors.white,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        Theme.shadow,
        {
          borderRadius: 5,
          backgroundColor: disabled ? Colors.gray : colorButton,
        },
        styles.buttonContainer,
      ]}
      disabled={disabled}
      {...props}>
      <Text style={[Theme.font, styles.buttonText, {color: colorText}]}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: Theme.fontSize * 1.2,
    fontWeight: '700',
    fontFamily: Theme.fontFamilyRegular,
  },
});
