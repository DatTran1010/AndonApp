import {View} from 'react-native';
import React, {ReactNode, memo} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import TabBottom from '../navigation/TabBottom';
import {NavigationProp} from '@react-navigation/native';

interface ContainerAppProps {
  navigation?: NavigationProp<any, any>;
  children: ReactNode;
}
const ContainerApp: React.FC<ContainerAppProps> = ({navigation, children}) => {
  return (
    <View style={globalStyles.container}>
      <View style={{flex: 1}}>{children}</View>
      <TabBottom navigation={navigation} />
    </View>
  );
};

export default memo(ContainerApp);
