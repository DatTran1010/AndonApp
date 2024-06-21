import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {DevicesModelType} from '../../../types/checkinType';
import Theme from '../../../common/Theme';
import {IconTypeComponent} from '../../../components';
import Colors from '../../../common/Colors';

type Props = TouchableOpacityProps & {
  device: DevicesModelType;
  onPressCheckDevice?: (idDevice: number) => void;
  // onLongPressCheckDevice?: () => void;
};
const ItemDevice = (props: Props) => {
  const {device, onPressCheckDevice, ...rest} = props;
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between p-5 border-b"
      activeOpacity={0.8}
      style={{
        borderColor: Colors.primarySecond,
      }}
      onPress={() => onPressCheckDevice && onPressCheckDevice(device.ID_MAY)}
      {...rest}>
      <View className="flex-row flex-shrink w-10/12">
        <Text style={Theme.font}>{device.MA_MAY + ' - '}</Text>
        <Text style={Theme.font}>{device.TEN_MAY}</Text>
      </View>
      <IconTypeComponent
        iconname={device.CHON ? 'checkbox-active' : 'checkbox-passive'}
        type="Fontisto"
      />
    </TouchableOpacity>
  );
};

export default ItemDevice;
