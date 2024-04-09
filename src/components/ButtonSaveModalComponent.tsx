import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../common/Colors';
import {t} from 'i18next';
import ButtonComponent from './ButtonComponent';

interface Props {
  onClose?: () => void;
  textClose?: string;
  textSave?: string;
  onSave?: () => void;
  disabled?: boolean;
}
const ButtonModalComponent = (props: Props) => {
  const {
    onClose,
    textClose = t('dong'),
    textSave = t('luu'),
    onSave,
    disabled = false,
  } = props;
  return (
    <View>
      <View style={styles.button}>
        <View style={styles.btnClose}>
          <ButtonComponent
            buttonTitle={textClose}
            colorButton={Colors.COLOR_GRADIENT.WHITE}
            colorText={'red'}
            borderColor="red"
            onPress={() => {
              if (onClose) {
                onClose();
              }
            }}
          />
        </View>
        <View style={[styles.btnSave]}>
          <ButtonComponent
            disabled={disabled}
            buttonTitle={textSave}
            colorButton={Colors.COLOR_GRADIENT.PRIMARY_SECOND}
            colorText={Colors.white}
            onPress={() => {
              if (onSave) {
                onSave();
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ButtonModalComponent;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  btnSave: {
    width: '45%',
  },
  btnClose: {
    width: '45%',
    marginRight: 10,
  },

  save: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  close: {
    color: Colors.error,
    fontWeight: 'bold',
  },
});
