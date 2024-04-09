import {ActivityIndicator} from 'react-native';
import React from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const LoadingComponent = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={'small'} />
    </Animated.View>
  );
};

export default LoadingComponent;
