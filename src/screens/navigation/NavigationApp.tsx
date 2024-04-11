import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import NavigationService from './NavigationService';
import {LoginScreen} from '../auth';
import HomeScreen from '../home/HomeScreen';
import CheckInScreen from '../checkin/CheckInScreen';
import HeaderApp from '../Container/HeaderApp';
import IncompleteIssues from '../incompleteIssues/IncompleteIssuesScreen';
import {onDisplayNotification} from '../../../services';
import SplashScreen from '../auth/SplashScreen';
import notifee, {EventType} from '@notifee/react-native';
import {DataNotificationType} from '../../types/CommonType';
import issuesService, {
  PropsSaveActionChooseType,
} from '../../apis/issuesService';
import InfoExChangeScreen from '../incompleteIssues/infoexchange/InfoExChangeScreen';

const NavigationApp = () => {
  const Stack = createStackNavigator();
  React.useEffect(() => {
    notifee.onForegroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;

      if (type === EventType.ACTION_PRESS && pressAction?.id === 'receive') {
        const dataNotification = notification?.data as DataNotificationType;
        if (dataNotification) {
          const props: PropsSaveActionChooseType = {
            description: '',
            id_dd: dataNotification.iddd as number,
            id_may: dataNotification.idmay as number,
            id_sk: Number('5'),
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

        await notifee.cancelNotification(notification?.id as string);
      } else if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id === 'cancel'
      ) {
        console.log('Đã huỷ');
        await notifee.cancelNotification(notification?.id as string);
      }
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.data) {
        onDisplayNotification({
          title: remoteMessage.data.title as string,
          body: remoteMessage.data.body as string,
          caterory: remoteMessage.data.category as string,
          data: remoteMessage.data,
        });
      }
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer
      ref={(navigatorRef: NavigationContainerRef<any>) =>
        NavigationService.setTopLevelNavigator(navigatorRef)
      }>
      <Stack.Navigator
        screenOptions={{
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 500}}, // Cấu hình animation
            close: {animation: 'timing', config: {duration: 500}}, // Cấu hình animation
          },
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
            title: 'SplashScreen',
          }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            title: 'LoginScreen',
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            header: () => <HeaderApp isGoBack={false} />,
          }}
        />
        <Stack.Screen
          name="CheckInScreen"
          component={CheckInScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            header: () => <HeaderApp isGoBack={true} />,
          }}
        />

        <Stack.Screen
          name="IncompleteIssues"
          component={IncompleteIssues}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            header: () => <HeaderApp isGoBack={true} />,
          }}
        />

        <Stack.Screen
          name="InfoExChangeScreen"
          component={InfoExChangeScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            header: () => <HeaderApp isGoBack={true} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationApp;
