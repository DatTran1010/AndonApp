/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';

import {IconTypeComponent, LoadingComponent} from '../../../components';
import {useQuery} from '@tanstack/react-query';
import issuesService from '../../../apis/issuesService';
import ItemMessage from './ItemMessage';
import useApiMutation from '../../../../services/useApiMutation';
import {showSnackbarStore} from '../../../redux/Store';
import ChooseImage from './ChooseImage';
import {ImageType} from '../../../types/CommonType';

type Props = {
  username: string;
  language: number;
  idsc: number;
};
const ListMessage = React.forwardRef((props: Props, ref) => {
  const {idsc, language, username} = props;
  const scrollViewRef = React.useRef<FlatList>(null);

  const idReceiverRef = React.useRef(-1);
  const messageRef = React.useRef('');
  const textInputRef = React.useRef<TextInput>(null);

  const hubConnectionRef = React.useRef<HubConnection>();
  // const [hubConnection, setHubConnection] = React.useState<HubConnection>();

  //#region  api
  const listInfoExchange = useQuery({
    queryKey: ['list-info-exchange'],
    queryFn: () => issuesService.getListInfoExchange(username, language, idsc),
  });

  const saveInfoExchangeMuation = useApiMutation({
    mutationFn: issuesService.saveInfoExchange,
  });

  //#endregion

  const updateScrollView = () => {
    setTimeout(() => {
      if (
        scrollViewRef.current &&
        listInfoExchange.data?.ResponseData &&
        listInfoExchange.data.ResponseData.length > 0
      ) {
        scrollViewRef.current.scrollToIndex({index: 0, animated: true});
      }
    }, 100);
  };

  //connect hub
  const createHubConnection = async () => {
    const url = 'http://192.168.2.15:7174';
    const hubConnectionContext = new HubConnectionBuilder()
      // .withUrl('http://192.168.2.21:7174/databieudo', {
      //   skipNegotiation: true,
      //   transport: HttpTransportType.WebSockets,
      // })

      .withUrl(`${url + '/ReceiveMessage'}`)
      .withAutomaticReconnect()
      .build();
    try {
      hubConnectionContext.onclose(error => {
        if (error) {
          Alert.alert(`Connection closed due to an error: ${error}`);
        } else {
          console.log('Connection closed normally.');
          // Hiển thị thông báo khi kết nối bị đóng
          // Alert.alert('Connection to the server has been closed.');
          // setHubConnection(hubConnection);
        }
      });

      await hubConnectionContext
        .start()
        .then(() => {
          console.log('kết nối thàh công');
        })
        .catch((error: any) => {
          console.log('Mất kết nối đến server');
          console.error('Error connecting to SignalR Hub:', error);
        });
    } catch {}

    hubConnectionRef.current = hubConnectionContext;
  };

  React.useEffect(() => {
    createHubConnection();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      listenDatasHub();
    }, 1000);

    const KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      updateScrollView,
    );
    return () => {
      KeyboardDidShowListener.remove();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useImperativeHandle(ref, () => ({
    setValueReceiver,
  }));

  //handle

  // set value khi người dùng chọn combo ngừơi nhận
  const setValueReceiver = (idreceiver: number) => {
    idReceiverRef.current = idreceiver;
  };

  const getListInfoExchange = async (sendSuccess: boolean) => {
    await hubConnectionRef.current?.invoke('ReceiveMessage', idsc, sendSuccess);
  };

  const listenDatasHub = () => {
    if (hubConnectionRef.current) {
      try {
        // nhận dữ liệu mới khi có sự thay đổi
        hubConnectionRef.current.on(
          'ReceiveMessage',
          async (hubIdsc: number) => {
            if (hubIdsc === idsc) {
              // nếu người gửi trong cùng sự cố với nhau thì mới set lại value, còn không thì không set value
              await listInfoExchange.refetch();
            }
          },
        );
      } catch {}
    }
  };

  const handleContentSizeChange = () => {
    updateScrollView();
  };

  const handleChangeMessage = (value: string) => {
    messageRef.current = value;
  };

  const handleSendMessage = async (dataIamges?: ImageType[]) => {
    if (
      (messageRef.current === '' || messageRef.current === undefined) &&
      dataIamges === undefined
    ) {
      textInputRef.current?.focus();
      return;
    }

    const dataFiles = new FormData();
    if (dataIamges) {
      dataIamges.map(image => {
        dataFiles.append('images', image);
      });
    }

    await saveInfoExchangeMuation.mutateAsync(
      {
        idns: idReceiverRef.current,
        idsc: idsc,
        message: messageRef.current,
        nngu: language,
        username: username,
        images: dataIamges ? dataFiles : undefined,
      },
      {
        async onSuccess(data) {
          textInputRef.current?.clear();
          if (
            data.IsSuccessStatusCode &&
            data.ResponseData.ResponseCode === 1
          ) {
            // nếu tin nhắn được lưu thành công, thì gọi lại dữ liệu,
            getListInfoExchange(true);
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
      {/* {listInfoExchange.isFetching ? (
        <LoadingComponent />
      ) : (
        <FlatList
          ref={scrollViewRef}
          data={
            (listInfoExchange.data &&
              listInfoExchange.data.IsSuccessStatusCode &&
              listInfoExchange.data.ResponseData) ||
            []
          }
          onContentSizeChange={handleContentSizeChange}
          inverted={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.ID_TTT.toString()}
          renderItem={({item}) => {
            return <ItemMessage item={item} />;
          }}
        />
      )} */}

      <FlatList
        ref={scrollViewRef}
        data={
          (listInfoExchange.data &&
            listInfoExchange.data.IsSuccessStatusCode &&
            listInfoExchange.data.ResponseData) ||
          []
        }
        onContentSizeChange={handleContentSizeChange}
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
        <View className="mr-2">
          <ChooseImage
            onSelectDataImage={dataImages => {
              handleSendMessage(dataImages);
            }}
          />
        </View>
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
            onPress={() => {
              handleSendMessage();
            }}>
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
