/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Theme from '../../common/Theme';
import OptionRadio from './OptionRadio';
import {t} from 'i18next';
import Colors from '../../common/Colors';
import issuesService from '../../apis/issuesService';
import {useQuery} from '@tanstack/react-query';
import {LoadingComponent} from '../../components';
import NoneDataComponent from '../../components/NoneDataComponent';
import DownTimeCauseChart from './chart/DownTimeCauseChart';

type Props = {
  tungay: Date;
  denngay: Date;
  username: string;
  language: number;
};
const DownTimeCause = (props: Props) => {
  const {denngay, tungay, username, language} = props;

  const [option, setOption] = React.useState<number>(0);

  const dataDowntime = useQuery({
    queryKey: ['down-time-cause', tungay, denngay, option],
    queryFn: () =>
      issuesService.getReportChart({
        denngay,
        loai: 2,
        nngu: language,
        option: Boolean(option),
        tungay,
        username,
      }),

    enabled: denngay !== undefined,
  });

  const handleSelectOption = (id: number) => {
    setOption(id);
  };

  return (
    <View style={Theme.shadow} className="rounded-md mb-5 p-2 mb- max-h-64">
      <View className="flex-row justify-between ">
        <Text style={[Theme.fontBold, {color: Colors.success}]}>
          {t('nguyen-nhan-ngung-may-chinh')}
        </Text>
        <Text style={[Theme.font, {textDecorationLine: 'underline'}]}>
          {t('chi-tiet')}
        </Text>
      </View>
      <View className="ml-4 mr-4 ">
        <OptionRadio onSelectOption={handleSelectOption} />
      </View>
      {dataDowntime.data &&
      dataDowntime.data.IsSuccessStatusCode &&
      dataDowntime.data.ResponseData.length > 0 ? (
        <DownTimeCauseChart data={dataDowntime.data.ResponseData} />
      ) : (
        <NoneDataComponent />
      )}
    </View>
  );
};

export default DownTimeCause;
