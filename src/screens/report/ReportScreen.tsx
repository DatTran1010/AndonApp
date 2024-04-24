import {ScrollView, View} from 'react-native';
import React from 'react';
import HeaderFilter from './HeaderFilter';
import WorkHasFinished from './WorkHasFinished';
import {globalStyles} from '../../styles/globalStyles';
import {useAppSelector} from '../../redux/Store';
import DownTimeCause from './DownTimeCause';
import FaultyMachine from './FaultyMachine';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  navigation?: NavigationProp<any, any>;
};
const ReportScreen = (props: Props) => {
  const {navigation} = props;
  const {userName, language} = useAppSelector(state => state.app);

  const [fromToDate, setFromToDate] = React.useState<{
    fromDate: Date;
    toDate: Date;
  }>();

  const handleSelectDate = (fromDate: Date, toDate: Date) => {
    setFromToDate({fromDate, toDate});
  };
  return (
    <View style={globalStyles.container}>
      <HeaderFilter selectedDate={handleSelectDate} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {fromToDate && (
          <>
            <WorkHasFinished
              denngay={fromToDate.toDate}
              tungay={fromToDate.fromDate}
              language={language}
              username={userName}
              navigation={navigation}
            />
            <DownTimeCause
              denngay={fromToDate.toDate}
              tungay={fromToDate.fromDate}
              language={language}
              username={userName}
              navigation={navigation}
            />

            <FaultyMachine
              denngay={fromToDate.toDate}
              tungay={fromToDate.fromDate}
              language={language}
              username={userName}
              navigation={navigation}
            />
          </>
        )}

        {/* {fromToDate && (
          <WorkHasFinished
            denngay={fromToDate.toDate}
            tungay={fromToDate.fromDate}
            language={language}
            username={userName}
          />
        )}

        {fromToDate && (
          <WorkHasFinished
            denngay={fromToDate.toDate}
            tungay={fromToDate.fromDate}
            language={language}
            username={userName}
          />
        )} */}
      </ScrollView>
    </View>
  );
};

export default ReportScreen;
