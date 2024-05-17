import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {useAppSelector} from '../../redux/Store';
import {useQuery} from '@tanstack/react-query';
import authServicesHttp from '../../apis/authServices';
import {CardComponent, LoadingComponent} from '../../components';
import Theme from '../../common/Theme';
import Colors from '../../common/Colors';
import NoneDataComponent from '../../components/NoneDataComponent';

const NotificationHistory = () => {
  const {userName, language} = useAppSelector(state => state.app);

  const data = useQuery({
    queryKey: ['notifications-history'],
    queryFn: () => authServicesHttp.notificationHistory(userName, language),
    staleTime: 5000,
  });

  if (data.isFetching) {
    return <LoadingComponent />;
  }

  if (
    data.data &&
    data.data.IsSuccessStatusCode &&
    data.data.ResponseData.length > 0
  ) {
    return (
      <View style={globalStyles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.data.ResponseData}
          keyExtractor={item => item.ID_LSNTF.toString()}
          renderItem={({item}) => {
            return (
              <CardComponent>
                <View className="flex-row items-center">
                  <View className="w-10/12">
                    <Text style={Theme.font}>{item.NOI_DUNG}</Text>
                  </View>
                  <View className="flex-1 mr-1">
                    <Text className="text-right" style={Theme.font}>
                      {item.TG_GUI}
                    </Text>
                  </View>
                </View>
              </CardComponent>
            );
          }}
        />
      </View>
    );
  } else {
    return <NoneDataComponent />;
  }
};

export default NotificationHistory;
