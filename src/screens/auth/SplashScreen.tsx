import {StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {
  getToken,
  requestUserPermission,
  setCategories,
} from '../../../services';
import {LoadingComponent} from '../../components';
import {NavigationService} from '../navigation';
import {checkLogin, localStorage, localStorageKey} from '../../utils';
import {DataNotificationType} from '../../types/CommonType';
import {NavigationProp} from '@react-navigation/native';
import {loginPress} from '../../utils/authUtils';

interface Props {
  navigation?: NavigationProp<any, any>;
}
const SplashScreen = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  React.useEffect(() => {
    requestUserPermission();
    getTokenDevices();
    setCategories();

    const timeout = setTimeout(async () => {
      const resultUserInfo = await checkLogin(); // nếu tồn tại tức đã lưu đăng nhập
      if (resultUserInfo) {
        const resultLogin = await loginPress(
          dispatch,
          resultUserInfo.PASSWORD,
          resultUserInfo.USER_NAME,
          true,
        );

        if (resultLogin) {
          NavigationService.navigate('MainScreen');
        } else {
          NavigationService.navigate('LoginScreen');
        }
        return;
      }
      NavigationService.navigate('LoginScreen');
    }, 1000);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // khi app đang chạy chế độ nền (Đa nhiệm) thì sẽ chạy vào hàm. này
    messaging().onNotificationOpenedApp(remoteMessage => {
      //   console.log(
      //     'Notification caused app to open from background state:',
      //     remoteMessage.notification,
      //   );

      if (remoteMessage.data) {
        const dataNotification: DataNotificationType = remoteMessage.data;
        if (dataNotification.screen === 'InfoExChangeScreen') {
          NavigationService.navigate(dataNotification.screen, {
            idsc: dataNotification.idsc,
            idmay: dataNotification.idmay,
            msbth: dataNotification.snbth,
            msmay: dataNotification.msmay + '-' + dataNotification.tenmay,
          });
        }
      }
    });

    // khi người dùng bấm vào notification app đang ở trạng thái bị thoát hoàn toàn (kill)
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          if (remoteMessage.data) {
            const dataNotification: DataNotificationType = remoteMessage.data;
            if (dataNotification.screen === 'InfoExChangeScreen') {
              const resultUserInfo = await checkLogin(); // nếu tồn tại tức đã lưu đăng nhập
              if (resultUserInfo) {
                const resultLogin = await loginPress(
                  dispatch,
                  resultUserInfo.PASSWORD,
                  resultUserInfo.USER_NAME,
                  true,
                );
                if (resultLogin) {
                  NavigationService.navigate(dataNotification.screen, {
                    idsc: dataNotification.idsc,
                    idmay: dataNotification.idmay,
                    msbth: dataNotification.snbth,
                    msmay:
                      dataNotification.msmay + '-' + dataNotification.tenmay,
                  });
                } else {
                  NavigationService.navigate('LoginScreen');
                }
              } else {
                NavigationService.navigate('LoginScreen');
              }
            }
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTokenDevices = async () => {
    const newTokenDevies = await getToken();
    await localStorage.setItem(localStorageKey.TOKEN_DEVICE, newTokenDevies);
    return newTokenDevies;
  };
  return (
    <Animated.View
      style={styles.container}
      exiting={FadeOut.duration(500)}
      entering={FadeIn.duration(500)}>
      {/* <Image
      width={100}
      height={100}
      source={require('../../assets/EcomaintGif2S.gif')}
      style={[styles.imageLogo]}
      resizeMode="contain"
    /> */}
      <LoadingComponent />
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageLogo: {
    width: '90%',
    height: '90%',
  },
});
