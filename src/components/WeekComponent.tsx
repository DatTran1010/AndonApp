import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  addDays,
  eachDayOfInterval,
  format,
  startOfDay,
  subDays,
} from 'date-fns';
import Colors from '../common/Colors';
import Theme from '../common/Theme';

// subday trừ  ngày
// const dates = eachWeekOfInterval(
//   {
//     start: subDays(new Date(), 1),
//     end: addDays(new Date(), 1),
//   },
//   {
//     weekStartsOn: 1,
//   },
// ).reduce((acc: Date[][], cur) => {
//   const allDays = eachDayOfInterval({
//     start: cur,
//     end: addDays(cur, 6),
//   }).map(date => {
//     // Đặt giờ, phút, giây và milligiây thành 0
//     date.setUTCHours(0, 0, 0, 0);
//     return date;
//   });

//   acc.push(allDays);
//   return acc;
// }, []);

const currentDate = new Date();
const startDate = subDays(currentDate, 4);
const endDate = addDays(currentDate, 2);
const dates = eachDayOfInterval({
  start: startDate,
  end: endDate,
}).map(date => {
  date.setUTCHours(0, 0, 0, 0);
  startOfDay(date);
  return date;
});

interface Props {
  date: Date;
  onPressDate?: (date: Date) => void;
}

const WeekCalendarComponent = (props: Props) => {
  const {date, onPressDate} = props;

  const flatListRef = React.useRef<FlatList>(null);

  // React.useEffect(() => {
  //   const newDate = new Date(date.setUTCHours(0, 0, 0, 0));
  //   const newDate1 = new Date(newDate.setUTCHours(17));
  //   const index = dates.findIndex(subArray =>
  //     subArray.some(
  //       dateString => new Date(dateString).getTime() === newDate1.getTime(),
  //     ),
  //   );

  //   // setTimeout(() => {
  //   //   flatListRef.current?.scrollToIndex({
  //   //     index: index,
  //   //     animated: false,
  //   //   });
  //   // }, 100);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <FlatList
      ref={flatListRef}
      className="flex-1"
      data={dates}
      horizontal
      keyExtractor={(_, index) => index.toString()}
      pagingEnabled={Platform.OS === 'ios'}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      onScrollToIndexFailed={({}) => {}}
      renderItem={({item}) => {
        const txt = format(item, 'EEE');
        const dateValueFormat = format(date, 'dd/MM/yyyy');
        const dayFormat = format(item, 'dd/MM/yyyy');
        return (
          <View className="flex-row flex-1">
            <TouchableOpacity
              disabled={dateValueFormat === dayFormat}
              onPress={() => {
                onPressDate && onPressDate(item);
              }}
              activeOpacity={0.7}
              className="flex-1 items-center rounded-lg justify-center bg-white w-14 mr-2"
              style={[
                styles.date,
                item.toLocaleDateString() < new Date().toLocaleDateString() && {
                  backgroundColor: Colors.gray100,
                },

                // eslint-disable-next-line react-native/no-inline-styles
                dateValueFormat === dayFormat && {
                  backgroundColor: '#81c2ff',
                },
              ]}>
              <Text style={Theme.font}>{txt}</Text>
              <Text style={Theme.font}>{item.getUTCDate()}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default WeekCalendarComponent;

const styles = StyleSheet.create({
  date: {
    backgroundColor: Colors.white,
    height: '100%',
    shadowColor: Colors.primary,
    shadowOffset: {width: 5, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 3.85,
    elevation: 3,
  },
});
