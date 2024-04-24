/* eslint-disable react-native/no-inline-styles */
import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  KeyboardViewComponent,
  TextInputComponent,
} from '../../components';
import Colors from '../../common/Colors';
import {t} from 'i18next';

const EditProfileScreen = () => {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.primary,
          height: '100%',
          width: '100%',
        },
      ]}>
      <View
        className="items-center justify-center"
        style={{width: 'auto', height: '25%'}}>
        <Image
          source={require('../../../assets/avartar.jpeg')}
          style={styles.avatar}
        />
      </View>
      <KeyboardViewComponent
        styleChildren={{
          backgroundColor: 'white',
          height: '75%',
          width: '100%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 10,
        }}>
        <View className="pt-2 gap-2 flex-1">
          <View>
            <TextInputComponent placeholder={t('firt-name')} />
          </View>
          <View>
            <TextInputComponent placeholder={t('last-name')} />
          </View>
          <View>
            <TextInputComponent placeholder={t('Email')} />
          </View>
          <View>
            <TextInputComponent placeholder={t('dien-thoai')} />
          </View>
        </View>
        <View className="mt-2 mb-5">
          <ButtonComponent buttonTitle={t('save')} />
        </View>
      </KeyboardViewComponent>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
