import {View} from 'react-native';
import React, {ReactNode, memo} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {NavigationProp} from '@react-navigation/native';

interface ContainerAppProps {
  navigation?: NavigationProp<any, any>;
  children: ReactNode;
}
const ContainerApp: React.FC<ContainerAppProps> = ({children}) => {
  return (
    <View style={globalStyles.container}>
      <View className="flex-1">{children}</View>
    </View>
  );
};

export default memo(ContainerApp);
