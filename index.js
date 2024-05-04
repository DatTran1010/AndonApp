import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import issuesService from './src/apis/issuesService';
import {onDisplayNotification} from './services';
import notifee, {EventType} from '@notifee/react-native';

// nếu IOS. muốn chạy vào hàm này thì phải đặt biến contentAvailable = true trên api send, và không được đính kèm notification chỉ gửi data
// và trên thiết bị di động phải mở chế độ làm mới ứng dụng nền lên , trong cài đặt chung -> làm mới ứng dụng nền
// lưu ý làm mới ứng dụng nền có thể được người dùng tắt hoặc nếu mở chế độ tiết kiệm pin thì cũng sẽ tự động tắt
// vậy ở api sẽ chia ra 2 loại gửi 1 là gửi cho android và 2 là gửi cho IOS,
//nếu ở IOS thì gửi như bình thường, ở android thì chỉ gửi dữ liệu sau đó lên hàm setBackgroundMessageHandler gửi noti thông qua notifee để không bị gửi 2 lần
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('remoteMessageBackground', remoteMessage);
  const dataNotification = remoteMessage.data;

  if (dataNotification) {
    const result = JSON.parse(JSON.stringify(dataNotification));

    if (Boolean(result.dataOnly) === true) {
      // ở chế độ background, nếu data only = true có nghĩa là nếu thông báo chỉ có data không thì
      //sẽ gửi bằng notifee còn ngược lại thì sẽ gửi bằng mặc định của notification
      onDisplayNotification({
        title: result.title,
        body: result.body,
        caterory: result.category,
        data: result,
      });
    }
  }
});

// khi người dùng bấm vào 2 nút trên notification
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // nếu ngừoi dùng bấm vào tiếp nhận
  if (type === EventType.ACTION_PRESS && pressAction?.id === 'receive') {
    const dataNotification = notification?.data;
    if (dataNotification) {
      const props = {
        description: '',
        id_dd: dataNotification.iddd,
        id_may: dataNotification.idmay,
        id_sk: 5,
        loai: 1,
        nngu: dataNotification.language,
        sn_bth: dataNotification.snbth,
        username: dataNotification.username,
        idsc: dataNotification.idsc,
      };

      const fetchResult = await issuesService.saveActionChoose(props);
      if (fetchResult.IsSuccessStatusCode) {
        onDisplayNotification({
          title: dataNotification.title,
          body: fetchResult.ResponseData.ResponseMessage,
          caterory: '',
        });
      }
    }

    // Remove the notification
    await notifee.cancelNotification(notification?.id);
  } else if (
    // nếu người dùng bấm vào cancel
    type === EventType.ACTION_PRESS &&
    pressAction?.id === 'cancel'
  ) {
    console.log('Đã cancel');
    await notifee.cancelNotification(notification?.id);
  }
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
