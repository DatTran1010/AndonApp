import {View, FlatList} from 'react-native';
import React from 'react';
import ItemCheckin from './ItemCheckin';
import NoneDataComponent from '../../components/NoneDataComponent';
import {useAppSelector} from '../../redux/Store';

type Props = {
  onPressDeleteSuccess?: () => void;
};
const ListCheckIn = (props: Props) => {
  const {onPressDeleteSuccess} = props;
  const dataMayCheckin = useAppSelector(state => state.app.listDataMayCheckin);

  if (dataMayCheckin && dataMayCheckin.length > 0) {
    return (
      <View className="flex-1">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataMayCheckin}
          keyExtractor={item => item.ID_CIOM.toString()}
          renderItem={({item}) => {
            return (
              <ItemCheckin
                itemCheckin={item}
                onPressDeleteSuccess={onPressDeleteSuccess}
                datalenght={dataMayCheckin.length}
              />
            );
          }}
        />
      </View>
    );
  } else {
    return <NoneDataComponent />;
  }
};

export default React.memo(ListCheckIn);
