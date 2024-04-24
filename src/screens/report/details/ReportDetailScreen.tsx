import {View, Text} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../redux/Store';
import {globalStyles} from '../../../styles/globalStyles';
import Theme from '../../../common/Theme';
import Colors from '../../../common/Colors';
import {useQuery} from '@tanstack/react-query';
import issuesService from '../../../apis/issuesService';
import ItemReportDetail from './ItemReportDetail';

type Props = {
  route?: {
    params: {
      reportName: string;
      loai: number;
      tungay: Date;
      denngay: Date;
    };
  };
};
const ReportDetailScreen = (props: Props) => {
  const {route} = props;
  const {userName, language} = useAppSelector(state => state.app);

  const dataDetails = useQuery({
    queryKey: ['data-details'],
    queryFn: () =>
      issuesService.getReportChartDetails({
        denngay: route?.params.denngay as Date,
        username: userName,
        nngu: language,
        loai: route?.params.loai as number,
        tungay: route?.params.tungay as Date,
      }),
  });

  if (
    dataDetails.data?.IsSuccessStatusCode &&
    dataDetails.data?.ResponseData?.length > 0
  ) {
    return (
      <View style={globalStyles.container}>
        <Text
          style={[
            Theme.fontBold,
            {
              color: Colors.success,
            },
          ]}>
          {route?.params.reportName}
        </Text>
        <View className="flex-1">
          <ItemReportDetail data={dataDetails.data.ResponseData} />
        </View>
      </View>
    );
  }
};

export default ReportDetailScreen;
