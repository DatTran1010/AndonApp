import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Keyboard,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';

import Colors from '../common/Colors';
import TextInputComponent from './TextInputComponent';
import Theme from '../common/Theme';
import {
  setBaseURL,
  setResultScanned,
  setShowModalCamera,
  setShowToast,
} from '../redux/AppSlice';

const ModalCameraComponent = ({content = '', valueScan = ''}) => {
  const dispatch = useDispatch();
  const isShowModalCamera = useSelector(state => state.app.showResultCamera);
  const resultScanned = useSelector(state => state.app.resultScanned);
  const baseURL = useSelector(state => state.app.baseURL);

  //Handle

  const closeModal = () => {
    dispatch(setShowModalCamera(false));
    dispatch(setResultScanned(''));
  };

  const handleBlur = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    } else {
      Keyboard.dismiss();
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('URL', value);
      dispatch(
        setShowToast({
          showToast: true,
          title: 'Thông báo',
          body: 'Thiết lập URL thành công',
          type: 'success',
        }),
      );
    } catch (e) {
      // saving error
      dispatch(
        setShowToast({
          showToast: true,
          title: 'Thông báo',
          body: 'Nhập URL thất bại',
          type: 'error',
        }),
      );
    }
  };
  const handleConfirmURL = values => {
    storeData(values.valueURL.trim());
    dispatch(setBaseURL(values.valueURL.trim()));
    closeModal();
  };

  //render
  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderModal = () => {
    return (
      <Modal
        visible={true}
        transparent={true}
        style={styles.container}
        animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={handleBlur}>
          <View style={[styles.modalContent]}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                valueURL: resultScanned,
              }}
              validationSchema={yup.object().shape({
                valueURL: yup.string().required('Không được trống'),
              })}
              onSubmit={values => handleConfirmURL(values)}>
              {({handleChange, handleSubmit, values, errors}) => (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.title}>Đường dẫn URL</Text>
                    <View style={styles.divider}></View>
                  </View>
                  <View style={styles.modalBody}>
                    <TextInputComponent
                      value={values.valueURL}
                      placeholder="URL"
                      onChangeText={handleChange('valueURL')}
                    />
                    {errors.valueURL && (
                      <Text
                        style={{
                          color: 'red',
                          fontWeight: '600',
                        }}>
                        {errors.valueURL}
                      </Text>
                    )}
                  </View>
                  <View style={styles.modalFooter}>
                    <View style={styles.divider}></View>
                    <View style={{flexDirection: 'row-reverse', margin: 10}}>
                      <TouchableOpacity
                        style={{
                          ...styles.actions,
                          backgroundColor: '#db2828',
                        }}
                        onPress={handleCloseModal}>
                        <Text style={styles.actionText}>No</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          ...styles.actions,
                          backgroundColor: '#21ba45',
                        }}
                        onPress={handleSubmit}>
                        <Text style={styles.actionText}>Yes</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  return isShowModalCamera && <RenderModal />;
};

export default ModalCameraComponent;

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
    paddingHorizontal: 10,
  },
  modalContent: {
    backgroundColor: Colors.backgroundColor,
    width: '95%',
    borderRadius: 4,
  },
  modalHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
    color: Colors.black,
    fontFamily: Theme.fontFamily,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
  },
  modalBody: {
    backgroundColor: Colors.backgroundColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalFooter: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: Colors.white,
  },
});
