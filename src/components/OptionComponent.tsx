import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  cloneElement,
  useCallback,
  useMemo,
  useRef,
  Children,
  useState,
} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import {HEIGHT_SCREEN, HEIGHT_TEXT_INPUT} from '../common/Dimentions';
import Colors from '../common/Colors';
import Theme from '../common/Theme';

interface OptionComponentProps extends BottomSheetProps {
  placeholder: string;
  children: any;
  index?: number;
  heightPercent?: number;
  value?: any;
  disable?: boolean;
}
const OptionComponent: React.FC<OptionComponentProps> = ({
  placeholder,
  children,
  index = 2,
  heightPercent = HEIGHT_SCREEN <= 700 ? 70 : 50,
  value = '',
  disable = false,
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
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={'none'}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    [],
  );

  return (
    <>
      <TouchableOpacity
        disabled={disable}
        style={styles.value}
        onPress={() => {
          setShowBottomSheet(true);
        }}>
        {value !== '' ? <Text style={styles.label}>{placeholder}</Text> : <></>}
        <Text
          style={[
            Theme.font,
            {
              color: value === '' ? Colors.gray : Colors.black,
            },
          ]}>
          {value === '' ? placeholder : value}
        </Text>
      </TouchableOpacity>
      <Modal visible={showBottomSheet} transparent>
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
                  {Children.map(children, child =>
                    cloneElement(child, {handleSheetChanges}),
                  )}
                </View>
              </BottomSheet>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </View>
      </Modal>
    </>
  );
};

export default OptionComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  label: {
    position: 'absolute',
    backgroundColor: Colors.backgroundColor,
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
});
