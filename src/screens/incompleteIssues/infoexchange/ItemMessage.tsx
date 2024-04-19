/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ListInfoExchangeType} from '../../../types/issuesType';
import Theme from '../../../common/Theme';
import ImageMessage from './ImageMessage';
import {AcctionSheetComponent, IconTypeComponent} from '../../../components';
import Colors from '../../../common/Colors';
import {t} from 'i18next';
import useApiMutation from '../../../../services/useApiMutation';
import issuesService from '../../../apis/issuesService';
import {showSnackbarStore} from '../../../redux/Store';

type Props = {
  item: ListInfoExchangeType;
  username: string;
  language: number;
  deleteOnSuccess?: () => void;
};
const ItemMessage = (props: Props) => {
  const {item, language, username, deleteOnSuccess} = props;
  const [showOption, setOption] = React.useState(false);

  const handleShowOption = () => {
    if (username === item.USERNAME_NGUOI_GUI) {
      setOption(!showOption);
    }
  };

  const deleteItemMuation = useApiMutation({
    mutationFn: issuesService.deleteInfoExchange,
  });

  const handleDeleteItem = async () => {
    await deleteItemMuation.mutateAsync(
      {
        idttt: item.ID_TTT,
        isimage: item.IS_IMAGE,
        message: item.MESSAGE,
        nngu: language,
        username: username,
      },
      {
        onSuccess(data) {
          showSnackbarStore(
            data.ResponseData.ResponseMessage as string,
            data.ResponseData.ResponseCode === 1 ? 'success' : 'error',
          );
          if (data.IsSuccessStatusCode) {
            deleteOnSuccess && deleteOnSuccess();
          }
        },
      },
    );
  };

  return (
    <>
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
          <TouchableOpacity
            activeOpacity={1}
            onLongPress={() => {
              handleShowOption();
            }}
            className="pt-3 pl-3 pr-3 pb-1"
            style={{
              borderRadius: 15,
              backgroundColor: item.TYPE_MESSAGE === 2 ? '#dddddd' : '#005df5',
              maxWidth: '75%',
            }}>
            <Text // tin nhhắn
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
            <Text // thời gian nhắn
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
          </TouchableOpacity>
        ) : (
          <View
            className="pt-2 pb-1"
            style={{
              maxWidth: '80%',
            }}>
            <ImageMessage
              onLongPress={handleShowOption}
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
      {showOption && (
        <AcctionSheetComponent heightPercent={15} onClose={handleShowOption}>
          <View>
            <TouchableOpacity
              className="flex-row justify-between items-center p-2"
              // style={{
              //   borderBottomWidth: 1,
              //   borderColor: '#dddddd',
              // }}

              onPress={handleDeleteItem}>
              <Text style={Theme.fontBold}>{t('xoa-go-bo')}</Text>
              <IconTypeComponent
                iconname="delete"
                type="MaterialCommunityIcons"
                iconcolor={Colors.error}
              />
            </TouchableOpacity>
          </View>
        </AcctionSheetComponent>
      )}
    </>
  );
};

export default ItemMessage;

const styles = StyleSheet.create({
  avatar: {width: 30, height: 30, borderRadius: 15},
});
