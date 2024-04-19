import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderFilter from './HeaderFilter';
import WorkHasFinished from './WorkHasFinished';
import {globalStyles} from '../../styles/globalStyles';
import {useAppSelector} from '../../redux/Store';
import DownTimeCause from './DownTimeCause';

const ReportScreen = () => {
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
            />
            <DownTimeCause
              denngay={fromToDate.toDate}
              tungay={fromToDate.fromDate}
              language={language}
              username={userName}
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

const styles = StyleSheet.create({});
