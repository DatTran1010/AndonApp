import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AcctionSheetComponent from './AcctionSheetComponent';
import {HEIGHT_TEXT_INPUT} from '../common/Dimentions';
import Colors from '../common/Colors';
import {t} from 'i18next';
import IconTypeComponent from './IconTypeComponent';
import Theme from '../common/Theme';
import LineComponent from './LineComponent';

type Props = {
  onClose?: () => void;
  onSelectItem?: (type: 'libary' | 'camera') => void;
};
const ChooseImageComponent = React.forwardRef((props: Props, ref) => {
  const {onClose, onSelectItem} = props;

  return (
    <AcctionSheetComponent
      ref={ref}
      heightPercent={25}
      onClose={onClose}
      title={'Chọn ảnh'}>
      <View className="flex-1">
        <View style={styles.contentBody}>
          <View style={[styles.listItems]}>
            <TouchableOpacity
              style={styles.itemsChoose}
              onPress={() => {
                onSelectItem && onSelectItem('libary');
              }}>
              <IconTypeComponent
                iconname="images-outline"
                iconsize={20}
                iconcolor={Colors.primary}
              />
              <Text style={[Theme.font, styles.marginLeft]}>
                {t('thu-vien-anh')}
              </Text>
            </TouchableOpacity>
            <LineComponent />
            <TouchableOpacity
              style={styles.itemsChoose}
              onPress={() => {
                onSelectItem && onSelectItem('camera');
              }}>
              <IconTypeComponent
                iconname="camera-outline"
                iconsize={25}
                iconcolor={Colors.primary}
              />
              <Text style={[Theme.font, styles.marginLeft]}>
                {t('chup-anh')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AcctionSheetComponent>
  );
});

export default ChooseImageComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  value: {
    width: '100%',
    height: HEIGHT_TEXT_INPUT,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    borderColor: Colors.border,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: Colors.backgroundColor,
  },

  bottomSheetContainer: {
    margin: 10,
  },
  bottomSheetBG: {},

  contentBody: {
    flex: 1,
  },

  itemsChoose: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  listItems: {
    borderRadius: 5,
    padding: 10,
    zIndex: 999,
    flex: 1,
  },
  marginLeft: {
    marginLeft: 10,
  },
});
