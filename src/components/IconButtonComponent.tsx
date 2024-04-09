import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  TouchableOpacityProps,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from '../common/Colors';
import Theme from '../common/Theme';

interface IconButtonComponentProps extends TouchableOpacityProps {
  label?: string;
  nameicon: string;
  size?: number;
  colorIcon?: string;
  type?:
    | 'ionicons'
    | 'fontAwesome5'
    | 'MaterialCommunityIcons'
    | 'octicons'
    | 'FontAwesome';
  disabled?: boolean;
}
const IconButtonComponent: React.FC<IconButtonComponentProps> = ({
  label = '',
  nameicon,
  size = 20,
  colorIcon = Colors.primarySecond,
  type = 'ionicons',
  disabled = false,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLongPressIcon = () => {
    setShowTooltip(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handlePressOut = () => {
    setShowTooltip(false);
  };

  const IconComponent =
    type === 'octicons'
      ? Octicons
      : type === 'fontAwesome5'
      ? FontAwesome5
      : type === 'MaterialCommunityIcons'
      ? MaterialCommunityIcons
      : type === 'FontAwesome'
      ? FontAwesome
      : Ionicons;
  return (
    <View style={styles.container}>
      {showTooltip && label !== '' && (
        <Animated.View
          style={[
            styles.toltipContainer,
            {
              top: -size * 1.5,
              width: Math.max(100, label.length * 10),
            },
          ]}>
          <Text style={[Theme.font, styles.labelTooltip]}>{label}</Text>
        </Animated.View>
      )}
      <TouchableOpacity
        activeOpacity={0.6}
        onPressOut={handlePressOut}
        onLongPress={handleLongPressIcon}
        style={[
          styles.iconStyle,
          {
            borderColor: !disabled ? colorIcon : Colors.gray,
            width: size * 2,
            height: size * 2,
          },
        ]}
        disabled={disabled}
        {...props}>
        <IconComponent
          name={nameicon}
          size={size}
          color={!disabled ? colorIcon : Colors.gray}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IconButtonComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toltipContainer: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 4,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    borderRadius: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    margin: 4,
  },
  placeholder: {
    marginLeft: 10,
  },
  labelTooltip: {
    color: Colors.white,
  },
});
