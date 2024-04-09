import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import Theme from '../../common/Theme';
import TabBarButton from './TabBarButton';
import {NavigationProp} from '@react-navigation/native';

const Dashboard = () => {
  return <View />;
};

const TabArr = [
  {
    route: 'HomeScreen',
    label: 'Home',
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: Dashboard,
    type: 'ionicons',
  },
  {
    route: 'Chat',
    label: 'Chat',
    activeIcon: 'chatbubble-ellipses',
    inActiveIcon: 'chatbubble-ellipses-outline',
    component: Dashboard,
    type: 'ionicons',
  },
  {
    route: 'Task',
    label: 'Task',
    activeIcon: 'list-circle',
    inActiveIcon: 'list-circle-outline',
    component: Dashboard,
    type: 'ionicons',
  },
  {
    route: 'User',
    label: 'User',
    activeIcon: 'user-circle-o',
    inActiveIcon: 'user-circle',
    component: Dashboard,
    type: 'FontAwesome',
  },
];

const Tab = createBottomTabNavigator();

type Props = {
  navigation?: NavigationProp<any, any>;
};
export default function TabBottom(props: Props) {
  const {navigation} = props;
  return (
    <View>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
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
