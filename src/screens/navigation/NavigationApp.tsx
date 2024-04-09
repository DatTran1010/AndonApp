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

const NavigationApp = () => {
  const Stack = createStackNavigator();
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        onDisplayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationApp;
