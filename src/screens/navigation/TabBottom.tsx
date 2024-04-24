import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import Theme from '../../common/Theme';
import TabBarButton from './TabBarButton';
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
    headerTitle: '',
  },
  {
    route: 'User',
    label: 'User',
    activeIcon: 'user-circle-o',
    inActiveIcon: 'user-circle',
    component: UserProfileScreen,
    type: 'FontAwesome',
    headerTitle: 'Profile',
  },
];

const Tab = createBottomTabNavigator();

export default function TabBottom() {
  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarStyle: [{}, Theme.shadow],
        }}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                header: () => (
                  <HeaderApp isGoBack={false} title={item.headerTitle} />
                ),
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
