import {
  Platform,
  RefreshControl,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
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
      keyboardShouldPersistTaps={'handled'}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === 'ios' ? 35 : 0}
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.scrollView, styleChildren]}>{children}</View>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardViewComponent;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});
