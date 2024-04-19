import {View} from 'react-native';
import React from 'react';
import TabBottom from '../navigation/TabBottom';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation?: NavigationProp<any, any>;
}
const MainScreen = (props: Props) => {
  const {navigation} = props;

  return (
    <View className="flex-1">
      <TabBottom navigation={navigation} />
    </View>
  );
};

export default MainScreen;
