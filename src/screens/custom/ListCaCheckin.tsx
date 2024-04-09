import {
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Colors from '../../common/Colors';
import {CaModelType} from '../../types/checkinType';
import Theme from '../../common/Theme';

interface Props {
  dataCa: CaModelType[];
  onPressItem?: (id: number) => void;
  dateSelected: Date;
}
const ListCaCheckin = (props: Props) => {
  const {onPressItem, dataCa, dateSelected} = props;

  const [selectedCa, setSelectedCa] = React.useState(-1);

  React.useEffect(() => {
    setSelectedCa(-1);
  }, [dateSelected]);
  if (dataCa && dataCa.length > 0) {
    return (
      <FlatList
        data={dataCa}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled={Platform.OS === 'ios'}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScrollToIndexFailed={({}) => {}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              disabled={selectedCa === item.ID_CA}
              onPress={() => {
                onPressItem && onPressItem(item.ID_CA);
                setSelectedCa(item.ID_CA);
              }}
              activeOpacity={0.7}
              style={[
                styles.date,
                item.LOAI_CA === 1 && {
                  backgroundColor: Colors.gray100,
                },
                // eslint-disable-next-line react-native/no-inline-styles
                selectedCa === item.ID_CA && {
                  backgroundColor: '#81c2ff',
                },
              ]}>
              <Text style={Theme.font}>{item.TEN_CA}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
};

export default ListCaCheckin;

const styles = StyleSheet.create({
  date: {
    backgroundColor: Colors.white,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: 56,
    marginRight: 8,
  },
});
