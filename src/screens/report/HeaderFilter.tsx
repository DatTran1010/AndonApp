/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {IconTypeComponent} from '../../components';
import Colors from '../../common/Colors';
import Theme from '../../common/Theme';
import moment from 'moment';
import {getWeekDates} from '../../utils';
import {t} from 'i18next';

type Props = {
  selectedDate: (fromDate: Date, toDate: Date) => void;
};
const HeaderFilter = (props: Props) => {
  const {selectedDate} = props;
  const [currentDate, setCurrentDate] = React.useState(moment());
  const [arrDate, setArrDate] = React.useState<Date[]>([]);

  React.useEffect(() => {
    const result = getWeekDates(currentDate);
    selectedDate(result[0], result[result.length - 1]);
    setArrDate(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  //handle
  const handleNextWeek = (type: 'back' | 'forward') => {
    setCurrentDate(currentDate.clone().add(type === 'back' ? -7 : 7, 'd'));
  };

  return (
    <View style={{marginVertical: 8}}>
      <View className="flex-row justify-between mb-3">
        <IconTypeComponent
          iconname="arrow-back"
          onPress={() => handleNextWeek('back')}
        />
        <Text style={[Theme.fontBold, {fontSize: 20, color: Colors.primary}]}>
          {t('week') + ' ' + currentDate.week()}
        </Text>
        <IconTypeComponent
          iconname="arrow-forward"
          iconcolor={
            currentDate.week() === moment().week()
              ? Colors.gray
              : Colors.primarySecond
          }
          disabled={currentDate.week() === moment().week()}
          onPress={() => handleNextWeek('forward')}
        />
      </View>
      <View className="items-center">
        {/* {arrDate.map((day, index) => (
          <Animated.View
            entering={FadeInLeft.duration(200).delay(index * 50)}
            key={day.toString()}
            className="p-1"
            style={[styles.date, Theme.shadow, {backgroundColor: '#81c2ff'}]}>
            <TouchableOpacity
              //   disabled={selectedCa === item.ID_CA}
              //   onPress={() => {
              //     onPressItem && onPressItem(item.ID_CA);
              //     setSelectedCa(item.ID_CA);
              //   }}
              activeOpacity={0.7}>
              <Text className="text-center" style={[Theme.font]}>
                {moment(day).locale('vn').format('ddd DD')}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))} */}
        {arrDate && arrDate.length > 0 && (
          <Text style={[Theme.font, {color: Colors.primary}]}>
            {`${moment(arrDate[0]).format('DD/MM')}  - ${moment(
              arrDate[arrDate.length - 1],
            ).format('DD/MM')}`}
          </Text>
        )}
      </View>
    </View>
  );
};

export default HeaderFilter;
