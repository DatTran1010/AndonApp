import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import Theme from '../../common/Theme';
import TabBarButton from './TabBarButton';
import {NavigationProp} from '@react-navigation/native';
import UserProfileScreen from '../userprofile/UserProfileScreen';
import HomeScreen from '../home/HomeScreen';
import HeaderApp from '../Container/HeaderApp';

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: HomeScreen,
    type: 'ionicons',
  },
  {
    route: 'Chat',
    label: 'Chat',
    activeIcon: 'chatbubble-ellipses',
    inActiveIcon: 'chatbubble-ellipses-outline',
    component: HomeScreen,
    type: 'ionicons',
  },
  {
    route: 'Task',
    label: 'Task',
    activeIcon: 'list-circle',
    inActiveIcon: 'list-circle-outline',
    component: HomeScreen,
    type: 'ionicons',
  },
  {
    route: 'User',
    label: 'User',
    activeIcon: 'user-circle-o',
    inActiveIcon: 'user-circle',
    component: UserProfileScreen,
    type: 'FontAwesome',
  },
];

const Tab = createBottomTabNavigator();

type Props = {
  navigation?: NavigationProp<any, any>;
};
export default function TabBottom(propsTab: Props) {
  const {navigation} = propsTab;
  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarStyle: [
            {
              height: 60,
              position: 'absolute',
              margin: 16,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
            },
            Theme.shadow,
          ],
          // eslint-disable-next-line react/no-unstable-nested-components
          header: () => <HeaderApp isGoBack={false} />,
        }}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarButton: props => (
                  <TabBarButton propsTab={props} item={item} />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
}
