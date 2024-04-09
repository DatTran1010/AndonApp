import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../common/Colors';
import Theme from '../common/Theme';

interface CardComponentProps {
  children?: any;
  height?: any;
  onPress?: () => void;
  color?: string;
}
const CardComponent = (props: CardComponentProps) => {
  const {children, onPress, color = Colors.primary} = props;
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      style={[Theme.shadow, styles.cardContainer, {borderLeftColor: color}]}>
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    width: '100%',
    marginVertical: 6,
    flex: 1,
    borderLeftWidth: 6,
    borderTopColor: Colors.border,
    borderBottomColor: Colors.border,
    borderRightColor: Colors.border,
  },
});
