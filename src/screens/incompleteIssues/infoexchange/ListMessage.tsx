/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import Theme from '../../../common/Theme';
import {IconTypeComponent, LoadingComponent} from '../../../components';
import Colors from '../../../common/Colors';
import {useQuery} from '@tanstack/react-query';
import issuesService from '../../../apis/issuesService';
import {ListInfoExchangeType} from '../../../types/issuesType';
import ItemMessage from './ItemMessage';
import useApiMutation from '../../../../services/useApiMutation';
import {showSnackbarStore} from '../../../redux/Store';
import {t} from 'i18next';

type Props = {
  username: string;
  language: number;
  idsc: number;
};
const ListMessage = React.forwardRef((props: Props, ref) => {
  const {idsc, language, username} = props;
  const scrollViewRef = React.useRef<FlatList>(null);
  const [dataInfoExchange, setDataInfoExChange] =
    React.useState<ListInfoExchangeType[]>();
  const idReceiverRef = React.useRef(-1);
  const messageRef = React.useRef('');
  const textInputRef = React.useRef<TextInput>(null);

  //#region  api
  const listInfoExchange = useQuery({
    queryKey: ['list-info-exchange'],
    queryFn: () => issuesService.getListInfoExchange(username, language, idsc),
  });

  const saveInfoExchangeMuation = useApiMutation({
    mutationFn: issuesService.saveInfoExchange,
  });

  //#endregion

  //   React.useEffect(() => {
  //     const KeyboardDidShowListener = Keyboard.addListener(
  //       'keyboardDidShow',
  //       updateScrollView,
  //     );
  //     return () => {
  //       KeyboardDidShowListener.remove();
  //     };
  //   }, []);

  //   const updateScrollView = () => {
  //     setTimeout(() => {
  //       if (scrollViewRef.current) {
  //         scrollViewRef.current.scrollToEnd({animated: true});
  //       }
  //     }, 100);
  //   };

  React.useImperativeHandle(ref, () => ({
    setValueReceiver,
  }));

  //handle

  // set value khi người dùng chọn combo ngừơi nhận
  const setValueReceiver = (idreceiver: number) => {
    idReceiverRef.current = idreceiver;
  };

  const handleChangeMessage = (value: string) => {
    messageRef.current = value;
  };

  const handleSendMessage = async () => {
    await saveInfoExchangeMuation.mutateAsync(
      {
        idns: idReceiverRef.current,
        idsc: idsc,
        message: messageRef.current,
        nngu: language,
        username: username,
      },
      {
        async onSuccess(data) {
          textInputRef.current?.clear();
          if (data.IsSuccessStatusCode) {
            await listInfoExchange.refetch();
          } else {
            Keyboard.dismiss();
            showSnackbarStore(t('gui-tin-nhan-khong-thanh-cong'), 'error');
          }
        },
      },
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollViewRef}
        data={
          (listInfoExchange.data && listInfoExchange.data.ResponseData) || []
        }
        inverted={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.ID_TTT.toString()}
        renderItem={({item}) => {
          return <ItemMessage item={item} />;
        }}
      />

      {/* <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={handleContentSizeChange}
        showsVerticalScrollIndicator={false}>
        {listInfoExchange.data &&
          listInfoExchange.data.ResponseData.map(message => {
            return <ItemMessage key={message.ID_TTT} item={message} />;
          })}
      </ScrollView> */}

      <View
        style={{
          marginTop: 10,
          padding: 10,
          marginBottom: 25,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <IconTypeComponent
          style={{marginRight: 5}}
          iconname="camera"
          iconsize={24}
        />
        <View
          style={{
            borderWidth: 1,
            height: 40,
            borderColor: '#dddddd',
            borderRadius: 20,
            paddingHorizontal: 10,
            flex: 1,
            justifyContent: 'center',
          }}>
          <TextInput
            ref={textInputRef}
            style={{height: '100%'}}
            placeholder="Type a message..."
            onChangeText={handleChangeMessage}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              position: 'absolute',
              right: 5,
              backgroundColor: '#fdebcb',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 20,
            }}
            onPress={handleSendMessage}>
            {!saveInfoExchangeMuation.isPending ? (
              <IconTypeComponent iconname="send" iconsize={24} type="Feather" />
            ) : (
              <LoadingComponent />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export default ListMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  avatar: {width: 30, height: 30, borderRadius: 15},
});
