import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Colors from '../common/Colors';
import {TouchableOpacityProps} from 'react-native';

interface Props extends TouchableOpacityProps {
  iconname: string;
  iconsize?: number;
  iconcolor?: string;
  type?:
    | 'ionicons'
    | 'fontAwesome5'
    | 'MaterialCommunityIcons'
    | 'octicons'
    | 'FontAwesome'
    | 'MaterialIcons'
    | 'Feather'
    | 'Fontisto'
    | 'SimpleLineIcons'
    | 'AntDesign';
  disabled?: boolean;
}
const IconTypeComponent: React.FC<Props> = ({
  iconname,
  disabled,
  iconcolor = Colors.primarySecond,
  iconsize = 25,
  type = 'ionicons',
  ...props
}) => {
  const IconComponent =
    type === 'octicons'
      ? Octicons
      : type === 'fontAwesome5'
      ? FontAwesome5
      : type === 'MaterialCommunityIcons'
      ? MaterialCommunityIcons
      : type === 'FontAwesome'
      ? FontAwesome
      : type === 'MaterialIcons'
      ? MaterialIcons
      : type === 'Feather'
      ? Feather
      : type === 'Fontisto'
      ? Fontisto
      : type === 'SimpleLineIcons'
      ? SimpleLineIcons
      : type === 'AntDesign'
      ? AntDesign
      : Ionicons;

  return (
    <IconComponent
      disabled={disabled}
      name={iconname}
      color={iconcolor}
      size={iconsize}
      {...props}
    />
  );
};

export default IconTypeComponent;
