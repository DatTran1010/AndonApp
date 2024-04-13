/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {ListInfoExchangeType} from '../../../types/issuesType';
import Theme from '../../../common/Theme';
import ImageMessage from './ImageMessage';

type Props = {
  item: ListInfoExchangeType;
};
const ItemMessage = (props: Props) => {
  const {item} = props;
  return (
    <View
      className="gap-2 mb-3"
      style={{
        width: '100%',
        alignItems: item.TYPE_MESSAGE === 1 ? 'flex-end' : 'flex-start',
      }}>
      {item.TYPE_MESSAGE === 2 && (
        <View className="flex-row items-center">
          <Image
            style={styles.avatar}
            source={require('../../../../assets/avartar.jpeg')}
          />

          {item.TYPE_MESSAGE === 2 && (
            <Text style={Theme.fontBold}>{item.HO_TEN_NGUOI_GUI}</Text>
          )}
        </View>
      )}
      {!item.IS_IMAGE ? ( // nếu không phải là hình
        <View
          className="pt-3 pl-3 pr-3 pb-1"
          style={{
            borderRadius: 15,
            backgroundColor: item.TYPE_MESSAGE === 2 ? '#dddddd' : '#005df5',
            maxWidth: '75%',
          }}>
          <Text
            style={[
              Theme.font,
              {
                fontSize: 15,
                color: item.TYPE_MESSAGE === 2 ? 'black' : 'white',
                marginBottom: 5,
              },
            ]}>
            {item.MESSAGE}
          </Text>
          <Text
            style={[
              Theme.font,
              {
                fontSize: 13,
                textAlign: 'right',
                color: item.TYPE_MESSAGE === 2 ? 'black' : 'white',
              },
            ]}>
            {item.TG_GUI}
          </Text>
        </View>
      ) : (
        <View
          className="pt-2 pb-1"
          style={{
            maxWidth: '80%',
          }}>
          <ImageMessage
            imageURL={
              item.MESSAGE !== '' && item.MESSAGE !== null
                ? JSON.parse(item.MESSAGE)
                : [] || []
            }
          />
          <Text
            style={[
              Theme.font,
              {
                fontSize: 13,
                textAlign: 'right',
              },
            ]}>
            {item.TG_GUI}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ItemMessage;

const styles = StyleSheet.create({
  avatar: {width: 30, height: 30, borderRadius: 15},
});
