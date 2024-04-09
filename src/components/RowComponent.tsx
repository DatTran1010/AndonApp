import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}
const RowComponent: React.FC<Props> = ({children, style}) => {
  const childrenArray = React.Children.toArray(children);

  // Kiểm tra xem có đủ ít nhất 2 children hay không
  if (childrenArray.length < 2) {
    return <View style={[styles.container, style]}>{children}</View>;
  }

  // Tạo mảng children mới với thuộc tính style được áp dụng cho child đầu tiên
  const newChildren = [
    React.cloneElement(childrenArray[0] as React.ReactElement, {
      style: [
        styles.firstChild,
        (childrenArray[0] as React.ReactElement).props.style,
      ],
    }),
    ...childrenArray.slice(1), // Giữ nguyên các children còn lại
  ];

  return <View style={[styles.container, style]}>{newChildren}</View>;
};

export default RowComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  firstChild: {
    marginRight: 10,
  },
});
