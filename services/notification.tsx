import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';
import {Platform, PermissionsAndroid} from 'react-native';
export async function requestUserPermission() {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Đã cho phép thông báo:', authStatus);
  }
}

export const notificationListenr = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  // khi app đang chạy chế độ nền (Đa nhiệm) thì sẽ chạy vào hàm. này
  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log(
  //     'Notification caused app to open from background state:',
  //     remoteMessage.notification,
  //   );
  //   if (remoteMessage.data) {
  //     const unknownData: unknown = remoteMessage.data;
  //     if (typeof unknownData === 'object' && unknownData !== null) {
  //       const dataNotification: DataNotificationType =
  //         unknownData as DataNotificationType;
  //       if (dataNotification.type === 'WO') {
  //         NavigationService.navigate('WorkOrder', {
  //           MS_PBT: dataNotification.mspbt,
  //           MS_MAY: dataNotification.msmay,
  //           TEN_MAY: dataNotification.tenmay,
  //           flag: dataNotification.flag,
  //         });
  //       }
  //     }
  //   }
  // });
  // // khi app bị kill
  // messaging()
  //   .getInitialNotification()
  //   .then(remoteMessage => {
  //     if (remoteMessage) {
  //       // console.log(
  //       //   'Notification caused app to open from quit state - InitialNotification:',
  //       //   remoteMessage.notification,
  //       // );
  //       const username = 'admin';
  //       if (username || username === '') {
  //         // nếu người dùng chưa đăng nhập vào app thì chuyển về trang login
  //         NavigationService.navigate('Login');
  //       } else {
  //         if (remoteMessage.data) {
  //           const unknownData: unknown = remoteMessage.data;
  //           if (typeof unknownData === 'object' && unknownData !== null) {
  //             const dataNotification: DataNotificationType =
  //               unknownData as DataNotificationType;
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
  //   });
};

export const getToken = async () => {
  //   await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('TOKEN ==== ', token);
  return token;
};

export type DisplayNotificationType = {
  title?: string;
  body?: string;
  caterory?: string;
  data?: any;
};

export async function onDisplayNotification(
  propsNotification: DisplayNotificationType,
) {
  // Request permissions (required for iOS)
  const {body, caterory, data, title} = propsNotification;
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId: channelId,
      importance: AndroidImportance.HIGH,
      // smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      category: AndroidCategory.MESSAGE,
      style: {type: AndroidStyle.BIGTEXT, text: body as string},
      actions:
        caterory === 'btnreceive'
          ? [
              {
                title: 'Tiếp nhận',
                pressAction: {
                  id: 'receive',
                },
              },
              {
                title: 'Bỏ qua',
                pressAction: {
                  id: 'cancel',
                },
              },
            ]
          : [],
    },
    ios: {
      categoryId: caterory === null ? '' : caterory,
      sound: 'default',
      attachments: [
        {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvcpGBVVzF9fKNWYFt4UrpqOaDz1vAwUafUgOSGM6Dg&s',
        },
      ],
    },
  });
}

export async function setCategories() {
  await notifee.setNotificationCategories([
    {
      id: 'btnreceive',
      actions: [
        {
          id: 'receive',
          title: 'Tiếp nhận',
          // foreground: true,
        },
        {
          id: 'cancel',
          title: 'Bỏ qua',
        },
      ],
    },
  ]);
}
