import {RefreshControl, ScrollView, StyleSheet, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {
  children: ReactNode;
  styleChildren?: ViewStyle;
  styleParent?: ViewStyle;
  onRefresh?: () => void;
  refreshing?: boolean;
};

const KeyboardViewComponent = (props: Props) => {
  const {
    children,
    styleChildren,
    styleParent,
    refreshing = false,
    onRefresh,
  } = props;
  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={[styles.container, styleParent]}
      extraScrollHeight={35}
      showsVerticalScrollIndicator={false}>
      <ScrollView
        bounces={true}
        contentContainerStyle={[styles.scrollView, styleChildren]}>
        {children}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});
