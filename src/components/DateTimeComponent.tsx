import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../common/Colors';
import {HEIGHT_SCREEN} from '../common/Dimentions';
import Theme from '../common/Theme';
import {t} from 'i18next';

type DateTimeFormat = 'DD/MM/YYYY' | 'DD/MM/YYYY HH:mm:ss';
type DateTimeMode = 'date' | 'datetime' | 'time';

interface DateTimeComponentProps {
  mode?: DateTimeMode;
  format?: DateTimeFormat;
  date?: string;
  placeholder?: string;
  onPressDate?: (date: Date) => void;
  disable?: boolean;
  hideIcon?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
}
const DateTimeComponent: React.FC<DateTimeComponentProps> = ({
  mode = 'date',
  format = 'DD/MM/YYYY',
  onPressDate,
  placeholder,
  date,
  disable = false,
  hideIcon = false,
  minimumDate,
  maximumDate,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [dateSelected, setDateSelected] = useState<Date>(
    new Date(`${date}`) || new Date(),
  );

  const handleConfirmDate = (dateConfirm: Date) => {
    if (onPressDate) {
      onPressDate(dateConfirm);
    }
    setDateSelected(dateConfirm);
    setFocus(false);
  };

  useEffect(() => {
    setDateSelected(new Date(`${date}`) || new Date());
  }, [date]);

  return (
    <>
      <TouchableOpacity
        disabled={disable}
        style={[
          styles.container,
          {
            borderColor: focus ? Colors.primary : Colors.border,
            backgroundColor: disable ? Colors.gray100 : Colors.white,
          },
        ]}
        onPress={() => {
          setFocus(true);
        }}>
        {(dateSelected.toString() !== '' || focus) && (
          <Text
            style={[
              styles.label,
              focus && {color: Colors.primary},
              {
                backgroundColor: disable ? Colors.gray100 : Colors.white,
              },
            ]}>
            {placeholder}
          </Text>
        )}
        <Text style={Theme.font} {...props}>
          {moment(dateSelected).format(
            format === undefined ? 'DD/MM/YYYY' : format,
          )}
        </Text>
        {!hideIcon && (
          <View style={styles.iconCalendar}>
            <Ionicons
              name="calendar-outline"
              size={25}
              color={Colors.primarySecond}
            />
          </View>
        )}
      </TouchableOpacity>

      {focus && (
        <View style={styles.dateView}>
          <DateTimePickerModal
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            isVisible={focus}
            mode={mode}
            onConfirm={(Date: Date) => {
              setFocus(false);
              handleConfirmDate(Date);
            }}
            onCancel={() => {
              setFocus(false);
            }}
            is24Hour={true}
            date={dateSelected}
            confirmTextIOS={t('dong-y')}
            cancelTextIOS={t('huy')}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            accentColor={Colors.primarySecond}
            buttonTextColorIOS={Colors.primary}
          />
        </View>
      )}
    </>
  );
};

export default memo(DateTimeComponent);
const styles = StyleSheet.create({
  container: {
    height: HEIGHT_SCREEN / 18,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.backgroundColor,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dateView: {
    flex: 1,
  },
  iconCalendar: {
    position: 'absolute',
    right: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.backgroundColor,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: Theme.fontSize,
    fontFamily: Theme.fontFamily,
    color: Colors.black,
  },
});
