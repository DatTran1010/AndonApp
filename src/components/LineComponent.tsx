import {View, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import Colors from '../common/Colors';

interface LineComponentProps extends ViewProps {
  style?: ViewStyle;
}

const LineComponent: React.FC<LineComponentProps> = (
  props: LineComponentProps,
) => {
  const {style} = props;
  return <View style={[styles.container, style]} />;
};

export default LineComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
});
