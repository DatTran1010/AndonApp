/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import Colors from '../../common/Colors';
import {IconTypeComponent} from '../../components';

interface Props {
  item: any;
  propsTab: BottomTabBarButtonProps;
}
const TabBarButton = (props: Props) => {
  const {item, propsTab} = props;
  const focused = propsTab.accessibilityState?.selected;
  const viewRef = React.useRef(null);

  // useEffect(() => {
  //   if (focused) {
  //     viewRef.current.animate({
  //       0: {scale: 0.5, rotate: '0deg'},
  //       1: {scale: 1.5, rotate: '360deg'},
  //     });
  //   } else {
  //     viewRef.current.animate({
  //       0: {scale: 1.5, rotate: '360deg'},
  //       1: {scale: 1, rotate: '0deg'},
  //     });
  //   }
  // }, [focused]);

  return (
    <TouchableOpacity
      onPress={propsTab.onPress}
      activeOpacity={1}
      style={[styles.container, {top: 0}]}>
      <View
        ref={viewRef}
        className="items-center"
        style={{
          padding: 5,
          borderRadius: 25,
        }}>
        <IconTypeComponent
          type={item.type}
          iconname={focused ? item.activeIcon : item.inActiveIcon}
          iconcolor={Colors.primary}
        />
        {/* <Text
          style={[
            Theme.font,
            {
              color: focused ? Colors.primary : Colors.gray,
              fontFamily: Theme.fontFamilyRegular,
            },
          ]}>
          {item.label}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default TabBarButton;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
});
