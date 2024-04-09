import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import Colors from '../common/Colors';
import Theme from '../common/Theme';
import {HEIGHT_SCREEN, HEIGHT_TEXT_INPUT} from '../common/Dimentions';
import {t} from 'i18next';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface CalendarComponentProps {
  onClickDone?: (dateFromTo: {startDate: string; endDate: string}) => void;
  startDate: string;
  endDate: string;
  placeholder?: string;
}
const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onClickDone,
  startDate,
  endDate,
  placeholder = '',
}) => {
  const [markedDates, setMarkedDates] = useState({});

  const [showCalendar, setShowcalendar] = useState(false);

  const [dateFromTo, setDateFromTo] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  const bottomSheetRef = useRef(BottomSheet);
  const snapPoints = useMemo(
    () => ['5%', '25%', HEIGHT_SCREEN <= 700 ? '70%' : '50%'],
    [],
  );

  useEffect(() => {
    const updatedMarkedDates: any = {};

    const start = new Date(dateFromTo.startDate);
    const end = new Date(dateFromTo.endDate);

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toISOString().split('T')[0];
      if (dateString === dateFromTo.startDate) {
        updatedMarkedDates[dateString] = {
          color: Colors.primarySecond,
        };
      } else if (dateString === dateFromTo.endDate) {
        updatedMarkedDates[dateString] = {
          color: Colors.primarySecond,
        };
      } else {
        updatedMarkedDates[dateString] = {color: '#fdd5d3'};
      }
    }

    setMarkedDates(updatedMarkedDates);
  }, [dateFromTo.startDate, dateFromTo.endDate]);

  //event handle
  const handleDayCalendar = (day: {dateString: string}) => {
    if (dateFromTo.endDate === day.dateString) {
      setDateFromTo({
        ...dateFromTo,
        startDate: day.dateString,
      });
    } else if (dateFromTo.startDate === day.dateString) {
      setDateFromTo({
        ...dateFromTo,
        endDate: day.dateString,
      });
    } else if (new Date(dateFromTo.startDate) < new Date(day.dateString)) {
      setDateFromTo({
        ...dateFromTo,
        endDate: day.dateString,
      });
    } else if (new Date(dateFromTo.startDate) > new Date(day.dateString)) {
      setDateFromTo({
        ...dateFromTo,
        startDate: day.dateString,
      });
    }
  };

  const handleShowCalendar = () => {
    setDateFromTo({
      startDate: startDate,
      endDate: endDate,
    });
    setShowcalendar(!showCalendar);
  };

  // callbacks
  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setShowcalendar(false);
    }
  };

  // const handleBlur = (event: {target: any; currentTarget: any}) => {
  //   if (event.target === event.currentTarget) {
  //     bottomSheetRef.current.close();
  //   }
  // };

  const CustomHandleComponent = useCallback(() => {
    return (
      <View>
        <View colors={Colors.white} style={styles.bodyContent}>
          <View style={styles.btnHoanThanh}>
            <TouchableOpacity
              onPress={() => {
                if (
                  dateFromTo.startDate !== startDate ||
                  dateFromTo.endDate !== endDate
                ) {
                  if (onClickDone) {
                    onClickDone(dateFromTo);
                  }
                }
                bottomSheetRef.current.close();
              }}>
              <Text style={[Theme.font, {color: Colors.primary}]}>
                {t('hoan-thanh')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, [dateFromTo, startDate, endDate]);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.placeholder,
          {
            color: showCalendar ? Colors.primary : Colors.black,
          },
        ]}>
        {placeholder}
      </Text>

      <View style={styles.valueDate}>
        <TouchableOpacity
          style={styles.viewContent}
          onPress={handleShowCalendar}>
          <Text style={[Theme.font, {fontSize: 12}]}>
            {moment(startDate).format('DD/MM/YYYY')} -{' '}
            {moment(endDate).format('DD/MM/YYYY')}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showCalendar} transparent>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <BottomSheet
              ref={bottomSheetRef}
              index={2}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backdropComponent={BottomSheetBackdrop}
              handleComponent={CustomHandleComponent}
              enablePanDownToClose={true}
              onClose={() => {
                // bottomSheetRef.current.snapToIndex(0);
              }}
              enableContentPanningGesture={
                Platform.OS === 'android' ? false : true
              }>
              <View
                style={{
                  flex: 1,
                }}>
                <CalendarList
                  // style={styles.calendar}
                  current={dateFromTo.startDate}
                  markedDates={markedDates}
                  markingType={'period'}
                  onDayPress={handleDayCalendar}
                  onDayLongPress={handleDayCalendar}
                  horizontal
                  showScrollIndicator={true}
                  pagingEnabled={true}
                />
              </View>
            </BottomSheet>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
};

export default CalendarComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
  },
  bodyContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  placeholder: {
    zIndex: 999,
    position: 'absolute',
    backgroundColor: Colors.backgroundColor,
    left: 10,
    top: -8,
    paddingHorizontal: 8,
    fontSize: Theme.fontSize,
    fontFamily: Theme.fontFamily,
  },
  valueDate: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: HEIGHT_TEXT_INPUT,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    backgroundColor: Colors.backgroundColor,
  },
  viewContent: {
    height: '100%',
    justifyContent: 'center',
  },
  calendarContent: {
    position: 'absolute',
    top: HEIGHT_SCREEN / 18,
  },
  calendar: {},
  submitButton: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnCancel: {
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    width: 50,
    height: 30,
  },
  textCancel: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Theme.fontFamily,
    fontWeight: '700',
  },
  btnDone: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginLeft: 10,
    width: 50,
    height: 30,
  },
  textDone: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Theme.fontFamily,
    fontWeight: '700',
  },
  btnHoanThanh: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
