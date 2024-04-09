import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {onDisplayNotification} from './services';
import notifee, {EventType} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('remoteMessage', remoteMessage);
  if (remoteMessage.notification) {
    // console.log('remoteMessage.notification', remoteMessage.notification);
    onDisplayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
  }
  if (remoteMessage.data) {
    onDisplayNotification({
      title: remoteMessage.data.title,
      body: remoteMessage.data.body,
    });
  }
  console.log('Message handled in the background!', remoteMessage);
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  console.log('type', type);
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
    // Update external API

    // Remove the notification
    await notifee.cancelNotification(notification?.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
