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
}

const ios = Platform.OS === 'ios';

const HeaderApp = (props: Props) => {
  const {isGoBack = true} = props;
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
          <View style={styles.goBack}>
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
        {/* <View className="bg-blue-500 flex-1">
          <Text style={[Theme.fontBold, styles.username]}>DANH SÁCH SỰ CỐ</Text>
        </View> */}
        <View>
          <Text style={[Theme.font, styles.username]}>{userInfo.HO_TEN}</Text>
        </View>
      </View>
      {!isGoBack && (
        <View>
          <IconTypeComponent
            iconname="notifications-sharp"
            iconcolor="white"
            iconsize={ICON_SIZE}
          />
        </View>
      )}
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
