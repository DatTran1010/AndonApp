import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import Theme from '../common/Theme';
import Colors from '../common/Colors';
import Animated, {FadeIn} from 'react-native-reanimated';

interface NoneDataComponentProps {
  text?: string;
}
const NoneDataComponent = (props: NoneDataComponentProps) => {
  const {text = t('khong-co-du-lieu')} = props;
  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(800)}>
      <Text style={Theme.font}>{text}</Text>
    </Animated.View>
  );
};

export default NoneDataComponent;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.gray300,
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
