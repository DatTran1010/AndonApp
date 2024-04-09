import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import Svg, {Circle} from 'react-native-svg';
import Colors from '../../common/Colors';
import Theme from '../../common/Theme';
import Animated, {FadeIn} from 'react-native-reanimated';
import {IPHONE_PRO_MAX, HEIGHT_ANDROID_5_INCH} from '../../common/Dimentions';
interface BackGroundLoginScreenProps {
  children: ReactNode;
}
const BackGroundLoginScreen = (props: BackGroundLoginScreenProps) => {
  const {children} = props;

  return (
    <Animated.View
      entering={Platform.OS === 'ios' ? FadeIn.duration(500) : undefined}
      style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
        style={styles.keyboarddismiss}>
        <Svg height="100%" width="100%" style={styles.svg}>
          <Circle cy="30%" r="40%" fill={Colors.primarySecond} />
          <Circle cx="80%" cy="85%" r="20%" fill={Colors.primarySecond} />
        </Svg>
        <View style={[styles.viewContent, Theme.shadow]}>{children}</View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BackGroundLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  svg: {position: 'absolute', top: 0, left: 0},
  viewContent: {
    marginTop: '35%',
    width: '85%',
    height: IPHONE_PRO_MAX ? '50%' : HEIGHT_ANDROID_5_INCH ? '60%' : '50%',
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  keyboarddismiss: {width: '100%', height: '100%', alignItems: 'center'},
});
