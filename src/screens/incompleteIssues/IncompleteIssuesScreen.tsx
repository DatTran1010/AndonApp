import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {globalStyles} from '../../styles/globalStyles';
import DeviceIssues from './DeviceIssues';
import {IconTypeComponent, KeyboardViewComponent} from '../../components';
import {useQuery} from '@tanstack/react-query';
import issuesService from '../../apis/issuesService';
import {useAppSelector} from '../../redux/Store';
import NoneDataComponent from '../../components/NoneDataComponent';
import Colors from '../../common/Colors';

interface Props {
  navigation?: NavigationProp<any, any>;
}
const IncompleteIssues = (props: Props) => {
  const {navigation} = props;
  const {userName, language} = useAppSelector(state => state.app);
  const dataIssues = useQuery({
    queryKey: ['data-issues-by-user'],
    queryFn: () => issuesService.getListIssuesByUser(userName, language),
  });

  const handleRefeshIssues = async () => {
    await dataIssues.refetch();
  };
  return (
    <View style={globalStyles.container}>
      {dataIssues.data &&
      dataIssues.data.IsSuccessStatusCode &&
      dataIssues.data.ResponseData &&
      dataIssues.data.ResponseData.length > 0 ? (
        <KeyboardViewComponent
          refreshing={dataIssues.isFetching}
          onRefresh={async () => {
            await dataIssues.refetch();
          }}>
          {dataIssues.data.ResponseData.map(item => {
            return (
              <DeviceIssues
                key={item.ID_SC}
                item={item}
                onRefeshIssues={handleRefeshIssues}
                navigation={navigation}
              />
            );
          })}
        </KeyboardViewComponent>
      ) : (
        <NoneDataComponent />
      )}

      <View className="absolute left-0 right-0 bottom-5 items-center">
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.plus}
          className="w-16 h-16 items-center justify-center"
          onPress={async () => {
            await dataIssues.refetch();
          }}>
          <IconTypeComponent
            iconname="refresh"
            type="SimpleLineIcons"
            iconcolor={Colors.white}
            iconsize={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IncompleteIssues;

const styles = StyleSheet.create({
  plus: {
    backgroundColor: Colors.primary,
    borderRadius: 32,
    shadowColor: Colors.primary,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
});
