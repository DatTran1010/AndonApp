import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  TouchableOpacityProps,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../common/Colors';
import Theme from '../common/Theme';

interface IconIconComponentProps extends TouchableOpacityProps {
  label?: string;
  nameicon: string;
  size?: number;
  colorIcon?: string;
  type?: string;
  disabled?: boolean;
  border?: boolean;
}
const IconComponent: React.FC<IconIconComponentProps> = ({
  label,
  nameicon,
  size = 20,
  colorIcon = Colors.primarySecond,
  type = 'Ionicons',
  disabled = false,
  border = false,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const IconComponent =
    type === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;
  const handleLongPressIcon = () => {
    setShowTooltip(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handlePressOut = () => {
    setShowTooltip(false);
  };
  return (
    <>
      <TouchableOpacity
        onPressOut={handlePressOut}
        onLongPress={handleLongPressIcon}
        style={[
          styles.iconStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          border && {
            borderWidth: 1,
            borderColor: disabled ? Colors.gray : colorIcon,
          },
        ]}
        disabled={disabled}
        {...props}>
        <IconComponent
          name={nameicon}
          size={size}
          color={disabled ? Colors.gray : colorIcon}
        />
      </TouchableOpacity>
      {showTooltip && (
        <Animated.View style={styles.toltipContainer}>
          <Text style={Theme.font}>{label}</Text>
        </Animated.View>
      )}
    </>
  );
};

export default IconComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  toltipContainer: {
    position: 'absolute',
    backgroundColor: Colors.primarySecond,
    padding: 8,
    borderRadius: 4,
    top: -50, // Change this value based on your design
    right: -20,
  },
  iconStyle: {
    borderRadius: 5,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
});
