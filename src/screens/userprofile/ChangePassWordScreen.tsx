import {View, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  ButtonComponent,
  KeyboardViewComponent,
  TextInputComponent,
} from '../../components';
import {t} from 'i18next';
import {Formik} from 'formik';
import authServicesHttp from '../../apis/authServices';
import {showSnackbarStore, useAppSelector} from '../../redux/Store';
import {NavigationService} from '../navigation';

type InitialValues = {
  newPassword: string;
  confirmPassword: string;
};
const ChangePassWordScreen = () => {
  const username = useAppSelector(state => state.app.userName);

  const handleChangePassWord = async (values: InitialValues) => {
    const result = await authServicesHttp.changePassword(
      username,
      values.confirmPassword,
    );

    if (result.IsSuccessStatusCode) {
      showSnackbarStore(
        t('doi-mat-khau-thanh-cong-vui-long-dang-nhap-lai'),
        'success',
      );
      NavigationService.navigate('LoginScreen');
    } else {
      showSnackbarStore(t('doi-mat-khau-khong-thanh-cong'), 'error');
    }
  };

  return (
    <KeyboardViewComponent styleParent={globalStyles.container}>
      <View style={{width: '100%', height: '20%'}} />

      <Formik
        enableReinitialize={true}
        initialValues={
          {
            newPassword: '',
            confirmPassword: '',
          } as InitialValues
        }
        onSubmit={values => handleChangePassWord(values)}>
        {({handleChange, handleSubmit, values}) => (
          <View style={{width: '100%', height: '80%'}}>
            <View className="mb-6">
              <TextInputComponent
                placeholder={t('new-password')}
                secureTextEntry
                onChangeText={handleChange('newPassword')}
              />
            </View>
            <View className="mb-6">
              <TextInputComponent
                placeholder={t('confirm-password')}
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
              />
            </View>
            <View>
              <ButtonComponent
                onPress={() => handleSubmit()}
                buttonTitle={t('doi-mat-khau')}
                disabled={
                  !values.newPassword ||
                  !values.confirmPassword ||
                  values.newPassword !== values.confirmPassword
                    ? true
                    : false
                }
              />
            </View>
          </View>
        )}
      </Formik>
    </KeyboardViewComponent>
  );
};

export default ChangePassWordScreen;
