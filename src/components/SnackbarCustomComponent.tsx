import {Text} from 'react-native';
import React from 'react';
import {Snackbar} from 'react-native-paper';
import Colors from '../common/Colors';
import Theme from '../common/Theme';

type Props = {
  visible: boolean;
  setVisible: () => void;
  textAction?: string;
  text: string;
  textColor: string;
  onPressAction?: () => void;
};

const SnackbarCustomComponent = (props: Props) => {
  const {
    setVisible,
    visible,
    textAction = '',
    textColor,
    text,
    onPressAction,
  } = props;
  return (
    <Snackbar
      className="items-center"
      visible={visible}
      onDismiss={setVisible}
      action={{
        label: textAction,
        onPress: () => {
          onPressAction && onPressAction();
        },
        textColor: Colors.white,
      }}>
      <Text style={[Theme.font, {color: textColor}]}>{text}</Text>
    </Snackbar>
  );
};

export default SnackbarCustomComponent;
