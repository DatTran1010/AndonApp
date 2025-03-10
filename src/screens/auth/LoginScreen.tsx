/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as yup from 'yup';

import {HEIGHT_SCREEN, WIDTH_SCREEN} from '../../common/Dimentions';
import Colors from '../../common/Colors';
import Theme from '../../common/Theme';
import {
  ButtonComponent,
  CheckboxComponent,
  KeyboardViewComponent,
  LoadingComponent,
  TextInputComponent,
} from '../../components';
import LanguesComponent from '../../components/LanguesComponent';
import useApiMutation from '../../../services/useApiMutation';
import {loginAsyn} from '../../apis/authServices';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/Store';
import {loginPress} from '../../utils/authUtils';
import SetingConfig from './SetingConfig';
import {localStorage, localStorageKey} from '../../utils';

interface LoginProps {
  navigation: any;
}

interface initialValuesLogin {
  username: string;
  password: string;
  rememberme: boolean;
}

const LoginScreen: React.FC<LoginProps> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const keyResetFormik = React.useRef(Date.now());

  //#region  mutation

  const loginMuation = useApiMutation({
    mutationFn: loginAsyn,
  });

  React.useEffect(() => {
    const deleteStorage = async () => {
      await localStorage.deleteItem(localStorageKey.REFRESH_TOKEN);
      await localStorage.deleteItem(localStorageKey.TOKEN_LOGIN);
      await localStorage.deleteItem(localStorageKey.USER_INFO);
      await localStorage.deleteItem(localStorageKey.USER_NAME);
    };
    deleteStorage();
  }, []);

  //#endregion
  const handleLogin = async (value: initialValuesLogin) => {
    const resultLogin = await loginPress(
      dispatch,
      value.password,
      value.username,
      value.rememberme,
    );

    if (resultLogin) {
      navigation.navigate('MainScreen');
    }
  };

  return (
    <KeyboardViewComponent styleParent={styles.container}>
      <View className="flex-1">
        <View className="items-end pr-1 pt-1">
          <SetingConfig />
        </View>
        <View style={styles.headerScreen}>
          <View style={styles.viewImage}>
            <Image
              source={require('../../../assets/Logo.jpg')}
              style={[styles.imageLogo]}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.bodyScreen}>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginHorizontal: 10,
              paddingBottom: 20,
            }}>
            <LanguesComponent />
          </View>
          <Formik
            key={keyResetFormik.current}
            enableReinitialize={true}
            initialValues={{
              username: '',
              password: '',
              rememberme: false,
            }}
            validationSchema={yup.object().shape({
              username: yup.string().required(t('khong-duoc-trong')),
              password: yup.string().required(t('khong-duoc-trong')),
            })}
            onSubmit={values => handleLogin(values)}>
            {({handleChange, handleSubmit, values, setFieldValue}) => (
              <View>
                <View>
                  <TextInputComponent
                    placeholder={t('user-name')}
                    onChangeText={handleChange('username')}
                  />
                </View>
                <View style={styles.password}>
                  <TextInputComponent
                    placeholder={t('password')}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                  />
                </View>

                <View className="items-end">
                  <CheckboxComponent
                    label={t('luu-dang-nhap')}
                    value={values.rememberme}
                    onPress={() => {
                      setFieldValue('rememberme', !values.rememberme);
                    }}
                  />
                </View>

                <View style={styles.loginView}>
                  <View style={styles.button}>
                    {!loginMuation.isSuccess ? (
                      <ButtonComponent
                        onPress={() => handleSubmit()}
                        buttonTitle={t('login')}
                        disabled={
                          !values.password || !values.username ? true : false
                        }
                      />
                    ) : (
                      <LoadingComponent />
                    )}
                  </View>
                  <View style={[styles.sigup]}>
                    <Text style={Theme.font}>{t('ban-chua-co-tai-khoan')}</Text>
                    <TouchableOpacity>
                      <Text
                        style={[Theme.font, {color: Colors.colorButtonText}]}>
                        {t('dang-ky')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity>
                    <Text style={[Theme.font, {color: Colors.colorButtonText}]}>
                      {t('quen-mat-khau')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardViewComponent>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  headerScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    fontSize: Theme.fontSize * 1.2,
  },
  bodyScreen: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  viewImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageLogo: {
    width: WIDTH_SCREEN / 1.3,
    height: HEIGHT_SCREEN / 5,
  },
  password: {
    marginVertical: 15,
  },
  rememberUSer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
  sigup: {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
  },
  scanIcon: {
    alignItems: 'flex-end',
    margin: 10,
  },
  loginView: {alignItems: 'center'},
  errorLogin: {
    color: 'red',
    fontWeight: '600',
  },
});
