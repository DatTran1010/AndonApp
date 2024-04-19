import React from 'react';
import store from './src/redux/Store';
import {Provider} from 'react-redux';
import NavigationApp from './src/screens/navigation/NavigationApp';
import {I18nextProvider} from 'react-i18next';
import i18next from './services/i18next';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  OverlayComponent,
  SnackbarComponent,
  ToastComponent,
} from './src/components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import {onDisplayNotification} from './services';
import notifee, {EventType} from '@notifee/react-native';
import {DataNotificationType} from './src/types/CommonType';
import issuesService, {
  PropsSaveActionChooseType,
} from './src/apis/issuesService';

const App = () => {
  const queryClient = new QueryClient();

  // nếu IOS. muốn chạy vào hàm này thì phải đặt biến contentAvailable = true trên api send, và không được đính kèm notification chỉ gửi data
  // và trên thiết bị di động phải mở chế độ làm mới ứng dụng nền lên , trong cài đặt chung -> làm mới ứng dụng nền
  // lưu ý làm mới ứng dụng nền có thể được người dùng tắt hoặc nếu mở chế độ tiết kiệm pin thì cũng sẽ tự động tắt
  // vậy ở api sẽ chia ra 2 loại gửi 1 là gửi cho android và 2 là gửi cho IOS,
  //nếu ở IOS thì gửi như bình thường, ở android thì chỉ gửi dữ liệu sau đó lên hàm setBackgroundMessageHandler gửi noti thông qua notifee để không bị gửi 2 lần
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('remoteMessageBackground', remoteMessage);
    const dataNotification = remoteMessage.data as DataNotificationType;

    if (dataNotification) {
      if (dataNotification.dataOnly === true) {
        // ở chế độ background, nếu data only = true có nghĩa là nếu thông báo chỉ có data không thì
        //sẽ gửi bằng notifee còn ngược lại thì sẽ gửi bằng mặc định của notification
        onDisplayNotification({
          title: dataNotification.title as string,
          body: dataNotification.body as string,
          caterory: dataNotification.category as string,
          data: dataNotification,
        });
      }
    }
  });

  // khi người dùng bấm vào 2 nút trên notification
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    // nếu ngừoi dùng bấm vào tiếp nhận
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'receive') {
      const dataNotification = notification?.data as DataNotificationType;
      if (dataNotification) {
        const props: PropsSaveActionChooseType = {
          description: '',
          id_dd: dataNotification.iddd as number,
          id_may: dataNotification.idmay as number,
          id_sk: 5,
          loai: 1,
          nngu: dataNotification.language as number,
          sn_bth: dataNotification.snbth as string,
          username: dataNotification.username as string,
          idsc: dataNotification.idsc as number,
        };

        const fetchResult = await issuesService.saveActionChoose(props);
        if (fetchResult.IsSuccessStatusCode) {
          onDisplayNotification({
            title: dataNotification.title as string,
            body: fetchResult.ResponseData.ResponseMessage as string,
            caterory: '',
          });
        }
      }

      // Remove the notification
      await notifee.cancelNotification(notification?.id as string);
    } else if (
      // nếu người dùng bấm vào cancel
      type === EventType.ACTION_PRESS &&
      pressAction?.id === 'cancel'
    ) {
      console.log('Đã cancel');
      await notifee.cancelNotification(notification?.id as string);
    }
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <NavigationApp />
              <OverlayComponent />
              <ToastComponent />
              <SnackbarComponent />
            </GestureHandlerRootView>
          </PaperProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
