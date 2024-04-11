import {StyleSheet, Image} from 'react-native';
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
import {localStorage, localStorageKey} from '../../utils';

const SplashScreen = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    requestUserPermission();
    getTokenDevices();
    setCategories();

    setTimeout(() => {
      NavigationService.navigate('LoginScreen');
    }, 1000);
  }, []);

  React.useEffect(() => {
    // khi app đang chạy chế độ nền (Đa nhiệm) thì sẽ chạy vào hàm. này
    messaging().onNotificationOpenedApp(remoteMessage => {
      //   console.log(
      //     'Notification caused app to open from background state:',
      //     remoteMessage.notification,
      //   );

      if (remoteMessage.data) {
        // const unknownData: unknown = remoteMessage.data;
        // if (typeof unknownData === 'object' && unknownData !== null) {
        //   const dataNotification: DataNotificationType =
        //     unknownData as DataNotificationType;
        //   if (dataNotification.type === 'WO') {
        //     NavigationService.navigate('WorkOrder', {
        //       MS_PBT: dataNotification.mspbt,
        //       MS_MAY: dataNotification.msmay,
        //       TEN_MAY: dataNotification.tenmay,
        //       flag: dataNotification.flag,
        //     });
        //   }
        // }
      }
    });

    // khi người dùng bấm vào notification app đang ở trạng thái bị thoát hoàn toàn (kill)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // kiểm tra xem remoteMessage có tồn tại không
          //   console.log(
          //     'Notification caused app to open from quit state - InitialNotification:',
          //     remoteMessage.notification,
          //   );
          // const nextScreen = async () => {
          //   //  lấy dữ liệu user có lưu lại mật khẩu không
          //   const resultUserInfo = (await asyncStorageItem.getItem(
          //     'SAVE_USER',
          //   )) as string;
          //   // nếu có lưu mật khẩu
          //   if (resultUserInfo && resultUserInfo !== '') {
          //     const result = JSON.parse(resultUserInfo) as InfoLogin;
          //     if (result.check) {
          //       //Login lại để  lấy thông tin user
          //       const resultLogin = await LoginEnter(
          //         {
          //           password: result.password,
          //           username: result.username,
          //         },
          //         dispatch,
          //       );
          //       // nếu login thành công
          //       if (resultLogin) {
          //         if (remoteMessage.data) {
          //           // kiểm tra xem notification có data không
          //           const unknownData: unknown = remoteMessage.data;
          //           if (
          //             typeof unknownData === 'object' &&
          //             unknownData !== null
          //           ) {
          //             const dataNotification: DataNotificationType =
          //               unknownData as DataNotificationType;
          //             // nếu data của notification là phiếu bảo trì thì sẽ chuyển thẳng đến màng hình phiếu bảo trì
          //             if (dataNotification.type === 'WO') {
          //               NavigationService.navigate('WorkOrder', {
          //                 MS_PBT: dataNotification.mspbt,
          //                 MS_MAY: dataNotification.msmay,
          //                 TEN_MAY: dataNotification.tenmay,
          //                 flag: dataNotification.flag,
          //               });
          //             }
          //           }
          //         }
          //       }
          //     }
          //   }
          // };
          // nextScreen();
        }
      });
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
