/* eslint-disable react-native/no-inline-styles */
import {Modal, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {HEIGHT_SCREEN, HEIGHT_TEXT_INPUT} from '../common/Dimentions';
import Colors from '../common/Colors';
import Theme from '../common/Theme';
import LineComponent from './LineComponent';
import {t} from 'i18next';
import {TouchableOpacity} from 'react-native';

interface AcctionSheetChooseImageComponentProps extends BottomSheetProps {
  index?: number;
  heightPercent?: number;
  onSelectLib?: () => void;
  onSelectCamera?: () => void;
  onCloseCamera?: () => void;
}
const AcctionSheetChooseImageComponent: React.FC<
  AcctionSheetChooseImageComponentProps
> = ({
  index = 2,
  heightPercent = HEIGHT_SCREEN <= 700 ? 70 : 50,
  onSelectLib,
  onSelectCamera,
  onCloseCamera,
  ...props
}) => {
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
        // setShowBottomSheet(false);
      }, 100);
    }
  };

  const renderBackdrop = useCallback(
    () => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={'close'}
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
      <Modal visible={true} transparent>
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
                onClose={onCloseCamera}
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
                      <View style={[styles.listItems]}>
                        <TouchableOpacity
                          style={styles.itemsChoose}
                          onPress={onSelectLib}>
                          <Ionicons
                            name="images-outline"
                            size={20}
                            color={Colors.black}
                          />
                          <Text style={[Theme.font, styles.marginLeft]}>
                            {t('thu-vien-anh')}
                          </Text>
                        </TouchableOpacity>
                        <LineComponent />
                        <TouchableOpacity
                          style={styles.itemsChoose}
                          onPress={onSelectCamera}>
                          <Ionicons
                            name="camera-outline"
                            size={25}
                            color={Colors.black}
                          />
                          <Text style={[Theme.font, styles.marginLeft]}>
                            {t('chup-anh')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </BottomSheet>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </View>
      </Modal>
    </>
  );
};

export default AcctionSheetChooseImageComponent;

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
