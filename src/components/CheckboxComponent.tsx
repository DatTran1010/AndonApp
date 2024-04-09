import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Theme from '../common/Theme';
import Colors from '../common/Colors';

interface CheckboxComponentProps extends TouchableOpacityProps {
  value?: boolean;
  size?: number;
  label?: string;
  onPress?: (value: boolean) => void;
}
const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  value = false,
  size = 20,
  label = '',
  onPress,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkContent}
        activeOpacity={0.7}
        onPress={() => {
          if (onPress) {
            onPress(!value);
          }
        }}
        {...props}>
        <View
          style={[
            styles.checkboxStyle,
            {
              width: size,
              height: size,
            },
          ]}>
          {value && (
            <Ionicons
              name="checkmark-outline"
              size={size - 5}
              color={Colors.primarySecond}
            />
          )}
        </View>
        {label !== '' && (
          <View style={styles.textView}>
            <Text style={Theme.font}>{label}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default CheckboxComponent;
const styles = StyleSheet.create({
  container: {},
  checkboxStyle: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkContent: {
    flexDirection: 'row',
  },
  textView: {
    marginLeft: 10,
    flexShrink: 1,
  },
});
