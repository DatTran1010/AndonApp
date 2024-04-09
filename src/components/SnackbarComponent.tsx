import {Text} from 'react-native';
import React from 'react';
import {Snackbar} from 'react-native-paper';
import Theme from '../common/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../types/CommonType';
import {setShowSnackbar} from '../redux/AppSlice';
import {t} from 'i18next';
import Colors from '../common/Colors';

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const onDismissSnackBar = () => {
    dispatch(
      setShowSnackbar({
        show: false,
        bgColor: undefined,
        text: '',
        textActionColor: Colors.white,
        textColor: Colors.white,
      }),
    );
  };

  const snackBar = useSelector((state: RootState) => state.app.showSnackbar);
  return (
    <Snackbar
      className="items-center"
      visible={snackBar.show}
      onDismiss={onDismissSnackBar}
      style={[
        snackBar.bgColor ? {backgroundColor: snackBar.bgColor} : undefined,
      ]}
      action={{
        label: t('dong'),
        onPress: () => {},
        labelStyle: {fontSize: Theme.fontSize, fontFamily: Theme.fontFamily},
        textColor: snackBar.textActionColor,
      }}
      duration={2500}>
      <Text style={[Theme.font, {color: snackBar.textColor}]}>
        {snackBar.text}
      </Text>
    </Snackbar>
  );
};

export default SnackbarComponent;
