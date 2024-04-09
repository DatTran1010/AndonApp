import {TouchableOpacity, TouchableOpacityProps, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

interface Props extends TouchableOpacityProps {
  children: ReactNode;
  style?: ViewStyle;
}
const TouchableOpacityComponent: React.FC<Props> = ({
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity style={style} activeOpacity={0.7} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableOpacityComponent;
