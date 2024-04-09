import {View, Text} from 'react-native';
import React from 'react';
import {
  AcctionSheetCustomComponent,
  DateTimeComponent,
  IconTypeComponent,
} from '../../components';
import Theme from '../../common/Theme';
import {t} from 'i18next';
import {useQuery} from '@tanstack/react-query';
import {getListCa} from '../../apis/checkinServices';
import Colors from '../../common/Colors';
import {getDateAdd} from '../../utils';
import {useAppSelector} from '../../redux/Store';

interface Props {
  language: number;
  onFilterData?: (idca: number, day: Date) => void;
  username: string;
}
const HeaderFilterCheckin = (props: Props) => {
  const {language, onFilterData, username} = props;

  const [dateValue, setDateValue] = React.useState(new Date());
  const checkinStatus = useAppSelector(state => state.auth.checkinStatus);

  const [idCa, setIdCa] = React.useState(-1);

  //#region  mutaion , query
  const dataCa = useQuery({
    queryKey: ['list-ca', dateValue],
    queryFn: () => getListCa(language, dateValue, username as string),
    enabled: false,
  });

  React.useEffect(() => {
    const fetChingDataCa = async () => {
      const resultCa = await dataCa.refetch();

      if (resultCa.data && resultCa.data.IsSuccessStatusCode) {
        const caHienTai = resultCa.data.ResponseData.find(ca => ca.CA_HIEN_TAI);

        if (caHienTai) {
          setIdCa(caHienTai.ID_CA);
          handleFilterData(dateValue, caHienTai.ID_CA);
        }
      }
    };

    fetChingDataCa();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#endregion

  //handle
  const handleFilterData = async (day: Date, idca: number) => {
    setDateValue(day);
    setIdCa(idca);
    onFilterData && onFilterData(idca, day);
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center">
        <IconTypeComponent
          iconname="location"
          iconcolor={checkinStatus?.ResponseData ? 'green' : '#737373'}
          iconsize={30}
        />
        <Text
          style={[
            Theme.fontBold,
            {
              fontFamily: Theme.fontFamilyBold,
              fontSize: Theme.fontSize * 1.1,
            },
          ]}>
          {checkinStatus?.ResponseData ? t('da-check-in') : t('chua-check-in')}
        </Text>
      </View>
      <View className="flex-1 mt-2">
        {/* <View className="flex-1 flex-row justify-between items-center">
          <Text style={Theme.font}>{format(dateValue, 'EEEE, d MMMM yy')}</Text>
          <IconTypeComponent iconname="calendar" />
        </View>
        <View className="mb-2" style={{flex: 1.2}}>
          <WeekCalendarComponent
            date={dateValue}
            onPressDate={day => handleFilterData(day, -1)}
          />
        </View> */}
        <View className="mb-4">
          <DateTimeComponent
            disable={checkinStatus?.ResponseData as boolean}
            date={dateValue.toString()}
            placeholder={t('ngay-check-in')}
            format="DD/MM/YYYY"
            mode="date"
            onPressDate={day => handleFilterData(day, -1)}
            minimumDate={getDateAdd('day', -1, new Date())}
            maximumDate={new Date()}
          />
        </View>

        <View className="mb-4">
          {/* <ListCaCheckin
            dataCa={dataCa.data?.ResponseData || []}
            dateSelected={dateValue}
            onPressItem={idca => handleFilterData(dateValue, idca)}
          /> */}

          <AcctionSheetCustomComponent
            disable={checkinStatus?.ResponseData as boolean}
            value={idCa}
            placeholder={t('ca')}
            dataChildren={
              (dataCa.data && (dataCa.data.ResponseData as [])) || []
            }
            valueField="ID_CA"
            labelField="TEN_CA"
            heightPercent={23}
            onSelectionValue={(value: number) =>
              handleFilterData(dateValue, value)
            }
            children={undefined}
          />
        </View>
        <View>
          <Text
            style={[
              Theme.font,
              {fontSize: Theme.fontSize * 1.1, color: Colors.primary},
            ]}>
            {checkinStatus?.ResponseData
              ? t('may-da-check-in')
              : t('may-check-in-lan-truoc')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderFilterCheckin;
