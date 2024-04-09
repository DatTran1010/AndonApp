import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import Colors from '../common/Colors';
import Theme from '../common/Theme';
import {HEIGHT_TEXT_INPUT} from '../common/Dimentions';

type Props = TouchableOpacityProps & {
  placeholder?: string;
  value: string;
};
const TouchableButtonComponent: React.FC<Props> = ({
  placeholder,
  value = '',
  ...props
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.value} {...props}>
      {value !== '' ? <Text style={styles.label}>{placeholder}</Text> : <></>}
      <Text
        style={[
          Theme.font,
          {
            color: value === '' ? Colors.gray : Colors.black,
          },
        ]}>
        {value === '' ? placeholder : value}
      </Text>
    </TouchableOpacity>
  );
};

export default TouchableButtonComponent;

const styles = StyleSheet.create({
  value: {
    width: '100%',
    height: HEIGHT_TEXT_INPUT,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    borderColor: Colors.border,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: Colors.white,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.white,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: Theme.fontSize,
    fontFamily: Theme.fontFamily,
  },
});
