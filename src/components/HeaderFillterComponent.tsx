import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Colors from '../common/Colors';
import IconTypeComponent from './IconTypeComponent';

interface HeaderFillterComponentProps {
  childrent: any;
  visible?: boolean;
  valueFlex?: number;
}
const HeaderFilterComponent = (props: HeaderFillterComponentProps) => {
  const {childrent, visible = false, valueFlex = 1} = props;
  const isVisible = useSharedValue(visible);

  //handle
  const handleShowFillControl = () => {
    isVisible.value = !isVisible.value;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      flex: withTiming(isVisible.value ? valueFlex : 0, {duration: 500}),
      opacity: withTiming(isVisible.value ? 1 : 0, {duration: 500}),
    };
  });

  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        withSpring(
          {
            rotate: isVisible.value ? '180deg' : '0deg',
          },
          {duration: 2000},
        ),
      ],
    };
  });

  return (
    <>
      <Animated.View style={[styles.iconArrow, arrowAnimatedStyle]}>
        <IconTypeComponent
          iconname="chevron-down-outline"
          iconcolor={Colors.black}
          iconsize={30}
          onPress={handleShowFillControl}
          // style={styles.iconDropDown}
        />
      </Animated.View>
      <Animated.View
        style={[animatedStyle]}
        needsOffscreenAlphaCompositing={Platform.OS === 'android'}>
        {childrent}
      </Animated.View>
    </>
  );
};

export default HeaderFilterComponent;

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flex: 1,
  },
  iconArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});
