import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useRef} from 'react';
import {t} from 'i18next';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../common/Colors';
import Theme from '../common/Theme';
import IconComponent from './IconComponent';
import LineComponent from './LineComponent';
import TextInputComponent from './TextInputComponent';
import {HEIGHT_TEXT_INPUT, ICON_SIZE} from '../common/Dimentions';
import {setKeyWorkSearchModal} from '../redux/AppSlice';
import OverlayComponent from './OverlayComponent';
import ToastModalComponent from './ToastModalComponent';

interface ModalComponentProps {
  children?: any;
  onClose?: () => void;
  title: string;
  height: string;
  search?: boolean;
  onChangeTextSearch?: (value: string) => void;
}
const ModalComponent = (props: ModalComponentProps) => {
  const {
    children,
    onClose,
    title,
    height = '50%',
    search = false,
    onChangeTextSearch,
  } = props;
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleBlur = (event: any) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    } else {
      Keyboard.dismiss();
    }
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleChangTextSearch = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(setKeyWorkSearchModal(value));
      onChangeTextSearch && onChangeTextSearch(value);
    }, 1000);
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      style={styles.container}
      statusBarTranslucent={true}
      animationType="fade">
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleBlur}>
        <View
          style={[
            styles.modalContent,
            {
              height,
            } as ViewStyle,
          ]}>
          <View style={styles.content}>
            <View style={styles.headerContent}>
              <View>
                <Text style={(Theme.fontTitle, styles.title)}>{title}</Text>
              </View>

              <IconComponent
                nameicon="close"
                size={30}
                onPress={handleCloseModal}
              />
            </View>
            <LineComponent />
            {search && (
              <View style={styles.search}>
                <TextInputComponent
                  placeholder={t('search')}
                  onChangeText={handleChangTextSearch}
                />
                <View style={styles.searchIcon}>
                  <Ionicons
                    name="search"
                    color={Colors.primary}
                    size={ICON_SIZE}
                  />
                </View>
              </View>
            )}
            <View style={styles.bodyContent}>{children}</View>
          </View>
        </View>
      </TouchableOpacity>
      <ToastModalComponent />
      <OverlayComponent />
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
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
  },
  modalContent: {
    backgroundColor: Colors.backgroundColor,
    width: '95%',
    borderRadius: 4,
  },
  content: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  bodyContent: {
    padding: 10,
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontSize: Theme.fontSize,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  search: {
    flex: 0.1,
    margin: 10,
  },
  textSearch: {
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    top: HEIGHT_TEXT_INPUT / 4,
    right: 10,
  },
});
