/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import {HEIGHT_SCREEN, HEIGHT_TEXT_INPUT} from '../common/Dimentions';
import Colors from '../common/Colors';
import Theme from '../common/Theme';
import LineComponent from './LineComponent';
import {t} from 'i18next';

interface AcctionSheetCustomComponentProps extends BottomSheetProps {
  placeholder?: string;
  index?: number;
  heightPercent?: number;
  value?: any;
  disable?: boolean;
  dataChildren: [];
  valueField: string;
  labelField: string;
  height?: number;
  onSelectionValue?: (value: any) => void;
  istouchableopacity?: boolean;
}
const AcctionSheetCustomComponent: React.FC<
  AcctionSheetCustomComponentProps
> = ({
  placeholder = '',
  index = 2,
  heightPercent = HEIGHT_SCREEN <= 700 ? 70 : 50,
  value = '',
  disable = false,
  dataChildren,
  valueField,
  labelField,
  height = HEIGHT_TEXT_INPUT,
  istouchableopacity = true,
  onSelectionValue,
  ...props
}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const bottomSheetRef = useRef(BottomSheet);
  const snapPoints = useMemo(
    () => ['5%', '25%', heightPercent + '%'],
    [heightPercent],
  );

  const HeaderBottomSheet = useCallback(() => {
    return <View />;
  }, []);

  //handle

  // callbacks
  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        setShowBottomSheet(false);
      }, 100);
    }
  };

  const renderBackdrop = useCallback(
    () => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={'none'}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <>
      {istouchableopacity && (
        <TouchableOpacity
          disabled={disable}
          style={[
            styles.value,
            {
              height: height,
              backgroundColor: disable ? Colors.gray100 : Colors.white,
            },
          ]}
          onPress={() => {
            if (dataChildren && dataChildren.length > 0) {
              setShowBottomSheet(true);
            } else {
              Alert.alert(t('khong-co-du-lieu'));
            }
          }}>
          {value !== '' && placeholder !== '' ? (
            <Text
              style={[
                styles.label,
                disable && {backgroundColor: Colors.gray100},
              ]}>
              {placeholder}
            </Text>
          ) : (
            <></>
          )}
          <Text
            style={[
              Theme.font,
              {
                color: value === '' ? Colors.gray : Colors.black,
              },
            ]}>
            {value === ''
              ? placeholder
              : dataChildren.filter(item => {
                  return item[valueField] === value;
                }).length &&
                dataChildren.filter(item => {
                  return item[valueField] === value;
                })[0][labelField]}
          </Text>
        </TouchableOpacity>
      )}
      {dataChildren && (
        <Modal
          visible={istouchableopacity ? showBottomSheet : true}
          transparent>
          <View style={{flex: 1}}>
            <GestureHandlerRootView style={{flex: 1}}>
              <BottomSheetModalProvider>
                <BottomSheet
                  style={styles.bottomSheetContainer}
                  backgroundStyle={styles.bottomSheetBG}
                  ref={bottomSheetRef}
                  index={index}
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}
                  backdropComponent={renderBackdrop}
                  handleComponent={HeaderBottomSheet}
                  enablePanDownToClose={true}
                  onClose={() => {
                    // bottomSheetRef.current.snapToIndex(-1);
                  }}
                  enableContentPanningGesture={
                    Platform.OS === 'android' ? false : true
                  }
                  {...props}>
                  <View style={styles.container}>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <View style={styles.contentBody}>
                        {dataChildren.map((item: any, index: number) => {
                          return (
                            <View key={item[valueField]}>
                              <TouchableOpacity
                                onPress={() => {
                                  if (onSelectionValue) {
                                    onSelectionValue(item[valueField]);
                                  }
                                  if (handleSheetChanges) {
                                    handleSheetChanges(-1);
                                  }
                                }}
                                style={styles.option}>
                                <Text style={Theme.font}>
                                  {item[labelField]}
                                </Text>
                              </TouchableOpacity>
                              {index !== dataChildren.length && (
                                <LineComponent />
                              )}
                            </View>
                          );
                        })}
                      </View>

                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.option}
                        onPress={() => {
                          if (handleSheetChanges) {
                            handleSheetChanges(-1);
                          }
                        }}>
                        <Text style={[Theme.font, styles.cancelbtn]}>
                          {t('huy')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </BottomSheet>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </View>
        </Modal>
      )}
    </>
  );
};

export default AcctionSheetCustomComponent;

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
    backgroundColor: Colors.white,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.white,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: Theme.fontSize,
    fontFamily: Theme.fontFamily,
  },
  bottomSheetContainer: {
    margin: 10,
  },
  bottomSheetBG: {
    backgroundColor: 'transparent',
  },

  contentBody: {
    backgroundColor: Colors.backgroundColor,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  option: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: HEIGHT_TEXT_INPUT,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelbtn: {color: 'red'},
});
