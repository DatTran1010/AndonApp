import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../common/Colors';
import Theme from '../common/Theme';
import ButtonComponent from './ButtonComponent';
import {setNotiferWarning} from '../redux/AppSlice';
const ModalWarningComponent = ({content = 'Thông báo'}) => {
  const dispatch = useDispatch();
  const showModalWarning = useSelector(state => state.app.notiferWarning);

  // handle
  const handleConfirmModal = () => {
    dispatch(setNotiferWarning({showNotifer: false, label: ''}));
  };
  return (
    <Modal
      visible={showModalWarning.showNotifer}
      transparent={true}
      style={styles.container}
      animationType="fade">
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
        <View style={[styles.modalContent]}>
          <View style={styles.iconWarning}>
            <View style={styles.iconWarningView}>
              <Text style={styles.textIconWarning}>!</Text>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.textContent}>{content}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.label1}>{showModalWarning.label}</Text>
            <Text style={styles.label2}>{showModalWarning.label2}</Text>
          </View>
          <View style={styles.button}>
            <View style={styles.viewBtn}>
              <ButtonComponent
                buttonTitle={'Đồng ý'}
                style={styles.buttonConfirm}
                activeOpacity={0.6}
                onPress={handleConfirmModal}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(ModalWarningComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: '#00000099',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: Colors.backgroundColor,
    width: '85%',
    borderRadius: 10,
  },
  iconWarning: {
    alignItems: 'center',
    paddingVertical: 25,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  buttonConfirm: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 6,
  },
  iconWarningView: {
    width: 25,
    height: 25,
    backgroundColor: '#ffca03',
    borderRadius: 25 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIconWarning: {
    fontFamily: Theme.fontFamily,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  textContent: {
    fontFamily: Theme.fontFamily,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  label1: {
    fontFamily: Theme.fontFamily,
    color: '#736d81',
    fontSize: 14,
    marginBottom: 20,
  },
  label2: {
    fontFamily: Theme.fontFamily,
    color: '#736d81',
    fontSize: 14,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: {width: '80%'},
});
