import {View, Text, Platform} from 'react-native';
import React from 'react';
import {CardComponent, LineComponent} from '../../components';
import Theme from '../../common/Theme';
import ActionChoose from './ActionChoose';
import {InCompleteIssuesType} from '../../types/issuesType';
import {t} from 'i18next';
import Colors from '../../common/Colors';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  item: InCompleteIssuesType;
  onRefeshIssues?: () => void;
  navigation?: NavigationProp<any, any>;
};
const DeviceIssues = (props: Props) => {
  const {item, onRefeshIssues, navigation} = props;

  const [showChoose, setShowChoose] = React.useState({
    show: false,
    tinhTrang: -1,
  });

  return (
    <>
      <Animated.View
        entering={FadeInLeft.duration(500)}
        exiting={FadeOutRight.duration(300)}
        needsOffscreenAlphaCompositing={Platform.OS === 'android'}>
        <CardComponent
          color={item.COLOR_TT}
          onPress={() => {
            setShowChoose({show: true, tinhTrang: 1});
          }}>
          <View className="flex-row justify-between">
            <View className="flex-row gap-1">
              <Text style={Theme.font}>{t('ms-may') + ':'}</Text>
              <Text style={[Theme.fontBold, {color: Colors.primarySecond}]}>
                {item.MS_MAY}
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Text style={Theme.font}>{t('ten-may') + ':'}</Text>
              <Text style={[Theme.fontBold, {color: Colors.primarySecond}]}>
                {item.TEN_MAY}
              </Text>
            </View>
          </View>
          <LineComponent style={{marginVertical: 10}} />
          <View className="flex-row justify-between mb-2">
            <View className="flex-row gap-1">
              <Text style={Theme.font}>{t('bth') + ':'}</Text>
              <Text style={Theme.font}>{item.SN_BTH}</Text>
            </View>
            <View className="flex-row gap-1">
              <Text style={Theme.font}>{t('tg-bat-dau') + ':'}</Text>
              <Text style={Theme.font}>{item.TG_BAT_DAU}</Text>
            </View>
          </View>

          <View className="flex-row gap-1">
            <Text style={[Theme.font]}>{t('tinh-trang') + ':'}</Text>
            <Text style={[Theme.font, {color: item.COLOR_TT}]}>
              {item.TEN_TINH_TRANG}
            </Text>
          </View>
        </CardComponent>
      </Animated.View>

      {showChoose.show && (
        <ActionChoose
          data={item}
          onClose={() => {
            setShowChoose({show: false, tinhTrang: -1});
          }}
          onRefeshIssues={onRefeshIssues}
          navigation={navigation}
        />
      )}
    </>
  );
};
export default DeviceIssues;
