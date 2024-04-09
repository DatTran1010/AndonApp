import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DataRadioButtonType} from '../types/CommonType';
import Colors from '../common/Colors';

interface Props {
  horizontal?: boolean;
  dataRadio: DataRadioButtonType[];
  selected: number;
  onSelectRadioButton?: (id: number, label: string) => void;
}
const RadioButtonComponent = (props: Props) => {
  const {dataRadio, selected, horizontal = false, onSelectRadioButton} = props;

  return (
    <View
      style={
        // eslint-disable-next-line react-native/no-inline-styles
        horizontal && {
          flexDirection: 'row',
          justifyContent: 'space-between',
        }
      }>
      {dataRadio.map(item => {
        return (
          <TouchableOpacity
            disabled={selected === item.id}
            key={item.id}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styles.flexRow, {marginVertical: 6}]}
            onPress={() => {
              onSelectRadioButton &&
                onSelectRadioButton(item.id, item.labelRadio);
            }}>
            <View
              style={[
                styles.chosseOption,
                selected === item.id && {backgroundColor: Colors.primary},
              ]}>
              <View style={styles.inlineChosse} />
            </View>
            <Text>{item.labelRadio}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioButtonComponent;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chosseOption: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineChosse: {
    backgroundColor: Colors.white,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
