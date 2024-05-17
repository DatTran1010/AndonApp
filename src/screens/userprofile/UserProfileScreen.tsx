import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';

import {globalStyles} from '../../styles/globalStyles';
import {useAppSelector} from '../../redux/Store';
import Theme from '../../common/Theme';
import {
  ButtonComponent,
  IconTypeComponent,
  LoadingComponent,
} from '../../components';
import Colors from '../../common/Colors';
import LanguesComponent from '../../components/LanguesComponent';
import {useTranslation} from 'react-i18next';
import authServicesHttp from '../../apis/authServices';
import useApiMutation from '../../../services/useApiMutation';
import {localStorage, localStorageKey} from '../../utils';

type Props = {
  navigation?: NavigationProp<any, any>;
};
const UserProfileScreen = (props: Props) => {
  const {navigation} = props;

  const userinfo = useAppSelector(state => state.app.userInfo);
  const {t} = useTranslation();

  //#region  mutation
  const logoutMutation = useApiMutation({
    mutationFn: authServicesHttp.logOut,
  });
  //#endregion

  const handleLogout = async () => {
    await logoutMutation.mutateAsync(userinfo.USER_NAME as string, {
      async onSuccess(data) {
        if (data.IsSuccessStatusCode) {
          await localStorage.deleteItem(localStorageKey.USER_INFO);
          await localStorage.deleteItem(localStorageKey.USER_NAME);
          navigation?.navigate('LoginScreen');
        }
      },
    });
  };

  const handleEditProfile = () => {
    navigation?.navigate('EditProfileScreen');
  };

  const handleChangePassWord = () => {
    navigation?.navigate('ChangePassWordScreen');
  };
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/avartar.jpeg')}
          style={styles.avatar}
        />
        <View>
          <Text style={Theme.fontBold}>{userinfo.HO_TEN}</Text>
          <Text style={Theme.font}>{userinfo.TEN_VAI_TRO}</Text>
        </View>
      </View>
      <View className="mt-3 mb-3">
        <ButtonComponent
          buttonTitle={t('edit-profile')}
          colorButton={Colors.info}
          onPress={handleEditProfile}
        />
      </View>
      <View className="flex-1 gap-5">
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate('NotificationHistoryScreen');
          }}
          activeOpacity={0.8}
          className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="bg-orange-100 rounded-md items-center justify-center h-10 w-10">
              <IconTypeComponent iconname="bell" type="Fontisto" />
            </View>
            <Text style={Theme.font}>{t('thong-bao')}</Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="bg-orange-100 rounded-md items-center justify-center h-10 w-10">
              <IconTypeComponent iconname="language" />
            </View>
            <Text style={Theme.font}>{t('language')}</Text>
          </View>
          <LanguesComponent />
        </View>

        <TouchableOpacity
          onPress={handleChangePassWord}
          activeOpacity={0.8}
          className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="bg-orange-100 rounded-md items-center justify-center h-10 w-10">
              <IconTypeComponent iconname="locked" type="Fontisto" />
            </View>
            <Text style={Theme.font}>{t('doi-mat-khau')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="bg-orange-100 rounded-md items-center justify-center h-10 w-10">
              {logoutMutation.isPending ? (
                <LoadingComponent />
              ) : (
                <IconTypeComponent iconname="exit-outline" />
              )}
            </View>

            <Text style={Theme.font}>{t('logout')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
