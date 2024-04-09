import {StyleSheet, View} from 'react-native';
import React from 'react';
import ContainerApp from '../Container/ContainerApp';
import {NavigationProp} from '@react-navigation/native';
import ItemsHome from './ItemsHome';

interface Props {
  navigation?: NavigationProp<any, any>;
}
const HomeScreen = (props: Props) => {
  const {navigation} = props;
  return (
    <ContainerApp navigation={navigation}>
      <View style={styles.items}>
        <ItemsHome navigation={navigation} />
      </View>
    </ContainerApp>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  items: {
    flex: 1,
    marginBottom: 60,
  },
});
