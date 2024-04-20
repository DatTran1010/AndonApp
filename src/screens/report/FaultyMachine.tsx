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
import FaultyMachineChart from './chart/FaultyMachineChart';

type Props = {
  tungay: Date;
  denngay: Date;
  username: string;
  language: number;
};
const FaultyMachine = (props: Props) => {
  const {denngay, tungay, username, language} = props;

  const [option, setOption] = React.useState<number>(0);

  const dataFaultyMachine = useQuery({
    queryKey: ['faulty-machine', tungay, denngay, option],
    queryFn: () =>
      issuesService.getReportChart({
        denngay,
        loai: 3,
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
          {t('cong-viec-da-thuc-hien')}
        </Text>
        <Text style={[Theme.font, {textDecorationLine: 'underline'}]}>
          {t('chi-tiet')}
        </Text>
      </View>
      <View className="ml-4 mr-4 ">
        <OptionRadio onSelectOption={handleSelectOption} />
      </View>
      {dataFaultyMachine.data && dataFaultyMachine.data.IsSuccessStatusCode ? (
        <FaultyMachineChart data={dataFaultyMachine.data.ResponseData} />
      ) : (
        <NoneDataComponent />
      )}
    </View>
  );
};

export default FaultyMachine;
