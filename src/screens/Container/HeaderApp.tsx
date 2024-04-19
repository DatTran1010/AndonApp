import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Colors from '../../common/Colors';
import Theme from '../../common/Theme';
import {IconTypeComponent} from '../../components';
import {ICON_SIZE} from '../../common/Dimentions';
import {NavigationService} from '../navigation';
import {useAppSelector} from '../../redux/Store';

interface Props {
  isGoBack?: boolean;
  title?: string;
  screenGoBack?: 'LoginScreen' | 'HomeScreen' | 'IncompleteIssuesScreen';
}

const ios = Platform.OS === 'ios';

const HeaderApp = (props: Props) => {
  const {isGoBack = true, title = ''} = props;
  const {top} = useSafeAreaInsets();
  const userInfo = useAppSelector(state => state.app.userInfo);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: ios ? top : top + 20,
        },
      ]}>
      <View style={styles.content}>
        {isGoBack && (
          <View style={styles.goBack} className="flex-1">
            <IconTypeComponent
              iconname="arrow-back-outline"
              iconsize={30}
              iconcolor={Colors.white}
              onPress={() => {
                NavigationService.goBack();
              }}
            />
          </View>
        )}

        {title && title !== '' && (
          <View className="flex-auto items-center">
            <Text style={[Theme.fontBold, styles.username]}>{title}</Text>
          </View>
        )}
        <View className={`flex-1 ${isGoBack ? 'items-end' : 'items-start'}`}>
          <Text style={[Theme.font, styles.username]}>{userInfo.HO_TEN}</Text>
        </View>

        {!isGoBack && (
          <View className="flex-1 items-end">
            <IconTypeComponent
              iconname="notifications-sharp"
              iconcolor="white"
              iconsize={ICON_SIZE}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default React.memo(HeaderApp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  username: {color: Colors.white},
  goBack: {
    marginVertical: 5,
    flex: 1,
  },
});
