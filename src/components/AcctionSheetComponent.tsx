/* eslint-disable react-native/no-inline-styles */
import {Modal, Platform, StyleSheet, Text, View} from 'react-native';
import React, {ReactNode, useCallback, useMemo, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import {HEIGHT_SCREEN} from '../common/Dimentions';
import IconTypeComponent from './IconTypeComponent';
import Colors from '../common/Colors';
import Theme from '../common/Theme';

interface AcctionSheetComponentProps extends BottomSheetProps {
  children: ReactNode;
  index?: number;
  heightPercent?: number;
  onClose?: () => void;
  iconname?: string;
  icontype?:
    | 'ionicons'
    | 'fontAwesome5'
    | 'MaterialCommunityIcons'
    | 'octicons'
    | 'FontAwesome';
  iconcolor?: string;
  iconsize?: number;
  title?: string;
}

const AcctionSheetComponent = React.forwardRef(
  (props: AcctionSheetComponentProps, ref) => {
    const {
      index = 2,
      heightPercent = HEIGHT_SCREEN <= 700 ? 70 : 50,
      onClose,
      children,
      title,
      ...propss
    } = props;
    const bottomSheetRef = useRef(BottomSheet);
    const snapPoints = useMemo(
      () => ['5%', '25%', heightPercent + '%'],
      [heightPercent],
    );

    const HeaderBottomSheet = useCallback(() => {
      return (
        <View
          className="items-center flex-row justify-between h-10"
          style={{
            backgroundColor: Colors.colorHeaderBottomSheet,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingHorizontal: 10,
          }}>
          <View>
            <Text
              style={[
                Theme.font,
                {color: Colors.white, fontSize: Theme.fontSize * 1.2},
              ]}>
              {title}
            </Text>
          </View>
          <View>
            <IconTypeComponent
              iconname="close-outline"
              iconcolor={Colors.primarySecond}
              iconsize={25}
              onPress={() => {
                bottomSheetRef.current.close();
              }}
            />
          </View>
        </View>
      );
    }, []);

    //handle

    // callbacks
    const handleSheetChanges = (index: number) => {
      if (index === -1) {
        bottomSheetRef.current.close();

        setTimeout(() => {
          onClose && onClose();
        }, 100);
      }
    };

    const handleCloseAcctionSheet = () => {
      bottomSheetRef.current.close();
    };

    React.useImperativeHandle(ref, () => ({
      handleCloseAcctionSheet,
    }));

    const renderBackdrop = useCallback(
      props => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior={'close'}
          appearsOnIndex={1}
          animatedIndex={{
            value: 1,
          }}
        />
      ),
      [],
    );

    const handleSelectSheet = () => {
      if (handleSheetChanges) {
        handleSheetChanges(-1);
      }

      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 100);
    };

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
                  onClose={handleSelectSheet}
                  enableContentPanningGesture={
                    Platform.OS === 'android' ? false : true
                  }
                  {...propss}>
                  <View style={styles.container}>{children}</View>
                </BottomSheet>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </View>
        </Modal>
      </>
    );
  },
);

export default AcctionSheetComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bottomSheetContainer: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomSheetBG: {},
});
