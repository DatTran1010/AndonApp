import {StyleSheet, ScrollView, View, Platform} from 'react-native';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {HEIGHT_SCREEN, WIDTH_SCREEN} from '../common/Dimentions';

const ContentLoaderComponent = () => {
  const BACKGROUNDCOLOR = '#b1b1b1';
  const FOREGROUNDCOLOR = '#ecebeb';

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <ContentLoader
          // viewBox="0 0 380 90"
          height={
            Platform.OS === 'android' ? HEIGHT_SCREEN / 1 : HEIGHT_SCREEN / 4
          }
          width={WIDTH_SCREEN}
          backgroundColor={BACKGROUNDCOLOR}
          foregroundColor={FOREGROUNDCOLOR}>
          {/* Only SVG shapes */}
          <Rect
            x="10"
            y="10"
            rx="10"
            ry="10"
            width={WIDTH_SCREEN - 20}
            height={
              Platform.OS === 'android' ? HEIGHT_SCREEN / 1 : HEIGHT_SCREEN / 4
            }
          />
        </ContentLoader>
        <ContentLoader
          // viewBox="0 0 380 90"
          backgroundColor={BACKGROUNDCOLOR}
          foregroundColor={FOREGROUNDCOLOR}>
          {/* Only SVG shapes */}
          <Rect
            x="10"
            y="10"
            rx="10"
            ry="10"
            width={WIDTH_SCREEN - 20}
            height={HEIGHT_SCREEN / 4}
          />
        </ContentLoader>
        <ContentLoader
          // viewBox="0 0 380 90"
          backgroundColor={BACKGROUNDCOLOR}
          foregroundColor={FOREGROUNDCOLOR}>
          {/* Only SVG shapes */}
          <Rect
            x="10"
            y="10"
            rx="10"
            ry="10"
            width={WIDTH_SCREEN - 20}
            height={HEIGHT_SCREEN / 4}
          />
        </ContentLoader>
        <ContentLoader
          // viewBox="0 0 380 90"
          backgroundColor={BACKGROUNDCOLOR}
          foregroundColor={FOREGROUNDCOLOR}>
          {/* Only SVG shapes */}
          <Rect
            x="10"
            y="10"
            rx="10"
            ry="10"
            width={WIDTH_SCREEN - 20}
            height={HEIGHT_SCREEN / 4}
          />
        </ContentLoader>
      </ScrollView>
    </View>
  );
};

export default ContentLoaderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH_SCREEN,
    height: HEIGHT_SCREEN,
  },
});
