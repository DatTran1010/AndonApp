import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {ReportChartDetailsMainModel} from '../../../types/issuesType';
import Theme from '../../../common/Theme';
import Colors from '../../../common/Colors';

type Props = {
  data: ReportChartDetailsMainModel[];
};
const ItemReportDetail = (props: Props) => {
  const {data} = props;

  const [expand, setExpand] = React.useState('');

  const handleExpand = (value: string) => {
    setExpand(expand === value ? '' : value);
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.PARENT_LABEL}
      renderItem={({item}) => {
        return (
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                handleExpand(item.PARENT_LABEL);
              }}
              className="mt-2 bg-orange-100"
              style={{paddingVertical: 10}}>
              <Text style={[Theme.fontBold, {color: Colors.primary}]}>
                {'+ ' + item.PARENT_LABEL}
              </Text>
            </TouchableOpacity>
            {expand === item.PARENT_LABEL &&
              item.ListDetail?.map((itemDetail, index) => (
                <View key={index} className="flex-row justify-between p-2">
                  <View className="flex-shrink">
                    <Text style={[Theme.font]}>{`${
                      itemDetail.TG_BAT_DAU === null
                        ? ''
                        : itemDetail.TG_BAT_DAU
                    }  ${
                      itemDetail.SN_BTH === null ? '' : itemDetail.SN_BTH
                    }  ${
                      itemDetail.MS_MAY === null ? '' : itemDetail.MS_MAY
                    }  ${
                      itemDetail.MO_TA_LOI === null ? '' : itemDetail.MO_TA_LOI
                    }  ${
                      itemDetail.TEN_NNNM === null ? '' : itemDetail.TEN_NNNM
                    }`}</Text>
                  </View>
                  <View>
                    <Text style={[Theme.fontBold, {color: Colors.primary}]}>
                      {itemDetail.THOI_GIAN_XL}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        );
      }}
    />
  );
};

export default ItemReportDetail;
