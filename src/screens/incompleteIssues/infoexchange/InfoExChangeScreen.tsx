import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import ChooseReceiver from './ChooseReceiver';
import {useAppSelector} from '../../../redux/Store';
import ListMessage from './ListMessage';
import Colors from '../../../common/Colors';
import Theme from '../../../common/Theme';
type Props = {
  navigation?: NavigationProp<any, any>;
  route?: {
    params: {
      idsc: number;
      idmay: number;
      msbth: string;
      msmay: string;
    };
  };
};

const InfoExChangeScreen = (props: Props) => {
  const {route} = props;
  const {userName, language} = useAppSelector(state => state.app);
  const listMessageRef = React.useRef<{
    setValueReceiver: (idreceiver: number) => void;
  }>();

  const handleSelectReceiver = (value: number) => {
    listMessageRef.current?.setValueReceiver(value);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={86}
      className="flex-1"
      style={{backgroundColor: Colors.primary}}>
      {/* {dataComboCurrentReceiver.data.ResponseData.map(receiver => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={receiver.id}
              className="flex-row items-center gap-2">
              <View>
                <Image
                  style={{width: 65, height: 65}}
                  source={require('../../../../assets/avartar.jpeg')}
                />
              </View>
              <View style={{flexShrink: 1}}>
                <Text
                  className="mb-1"
                  style={[Theme.fontBold, {fontFamily: 'Montserrat-Bold'}]}>
                  {receiver.label}
                </Text>

                <Text
                  style={[Theme.font, {fontSize: 15}]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  How are you ?
                </Text>
              </View>
            </TouchableOpacity>
          );
        })} */}
      <View className="items-center">
        <Text style={[Theme.fontBold, {color: Colors.primarySecond}]}>
          {route?.params.msbth + '-' + route?.params.msmay}
        </Text>
      </View>
      <View className="p-3">
        <ChooseReceiver
          idmay={route?.params.idmay as number}
          idsc={route?.params.idsc as number}
          onPressSelection={handleSelectReceiver}
        />
      </View>
      <View className="flex-1">
        <ListMessage
          ref={listMessageRef}
          username={userName}
          language={language}
          idsc={route?.params.idsc as number}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default InfoExChangeScreen;
