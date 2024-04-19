import moment from 'moment';
import {appFormats} from '../constant/appFormats';
import {t} from 'i18next';

interface ValidDateTimeType {
  error: boolean;
  message: string;
}

// kiểm tra hợp lệ từ ngày đến ngày từ ngày phải bé hơn đến ngày
export function isValidDateTime(
  fromDate: Date | undefined,
  toDate: Date | undefined,
) {
  let result: ValidDateTimeType = {
    error: false,
    message: '',
  };
  if (fromDate !== undefined && toDate !== undefined) {
    const fromD = moment(
      moment(fromDate).format(appFormats.DATETIME),
      appFormats.DATETIME,
    ).toDate();
    const toD = moment(
      moment(toDate).format(appFormats.DATETIME),
      appFormats.DATETIME,
    ).toDate();

    const houseDiff = Math.floor((toD.getTime() - fromD.getTime()) / 60000);
    if (houseDiff < 0) {
      result.error = true;
      result.message = t('tu-ngay-khong-lon-hon-den-ngay');
      return result;
    } else {
      result.error = false;
      result.message = '';
      return result;
    }
  } else {
    result.error = true;
    result.message = t('ngay-khong-hop-le');
    return result;
  }
}

// kiểm tra ngày không được lớn hơn hoặc bé hơn ngày hiện tại
export function isValidDateWithNow(
  date: Date | undefined,
  type: 'less' | 'greater',
) {
  let result: ValidDateTimeType = {
    error: false,
    message: '',
  };
  if (date !== undefined) {
    const dateCheck = moment(
      moment(date).format(appFormats.DATETIME),
      appFormats.DATETIME,
    ).toDate();
    const dateNow = moment(
      moment(new Date()).format(appFormats.DATETIME),
      appFormats.DATETIME,
    ).toDate();

    let houseDiff: number;
    if (type === 'less') {
      houseDiff = Math.floor((dateNow.getTime() - dateCheck.getTime()) / 60000);
    } else {
      houseDiff = Math.floor((dateCheck.getTime() - dateNow.getTime()) / 60000);
    }
    if (houseDiff < 0) {
      result.error = true;
      result.message =
        type === 'less'
          ? t('thoi-gian-chon-phai-be-hon-ngay-hien-tai')
          : t('thoi-gian-chon-phai-lon-hon-ngay-hien-tai');
      return result;
    } else {
      result.error = false;
      result.message = '';
      return result;
    }
  } else {
    result.error = true;
    result.message = t('ngay-khong-hop-le');
    return result;
  }
}

export function getFirstAndLastDayOfMonth() {
  // Lấy ngày hiện tại
  const currentDate = new Date();

  // Lấy ngày đầu tháng
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  // Lấy ngày cuối tháng
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  return {
    firstDay: firstDayOfMonth,
    lastDay: lastDayOfMonth,
  };
}

export const getDateAdd = (
  datepart: 'day' | 'month' | 'year',
  number: number,
  date: Date,
) => {
  const currentDate = date;
  if (datepart === 'year') {
    currentDate.setFullYear(currentDate.getFullYear() + number);
    return currentDate;
  } else if (datepart === 'month') {
    currentDate.setMonth(currentDate.getMonth() + number);
    return currentDate;
  } else {
    currentDate.setDate(currentDate.getDate() + number);
    return currentDate;
  }
};

export const getDate = (date: Date) => {
  const datenew = new Date(date.setUTCHours(0, 0, 0, 0));
  return datenew;
};

export const getWeekDates = (currentDate: moment.Moment) => {
  // Định dạng ngày hiện tại với `moment`
  const currentMoment = moment(currentDate);

  // Xác định ngày đầu tuần và ngày cuối tuần dựa trên ngày hiện tại
  const startOfWeek = currentMoment.clone().startOf('isoWeeks');

  const endOfWeek = currentMoment.clone().endOf('isoWeeks');

  // Khởi tạo mảng để chứa các ngày trong tuần
  const weekDates = [];

  // Lặp qua các ngày từ ngày đầu tuần đến ngày cuối tuần và thêm vào mảng
  for (
    let day = startOfWeek;
    day.isSameOrBefore(endOfWeek);
    day.add(1, 'day')
  ) {
    // Sử dụng format để chỉ lấy định dạng ngày
    weekDates.push(new Date(day.format('YYYY-MM-DD')));
  }

  return weekDates;
};
