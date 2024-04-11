import {Alert, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  AcctionSheetComponent,
  ButtonComponent,
  IconTypeComponent,
  SelectionComponent,
  SnackbarComponent,
  TextInputComponent,
} from '../../components';
import {t} from 'i18next';
import Theme from '../../common/Theme';
import {InCompleteIssuesType} from '../../types/issuesType';
import {HEIGHT_ANDROID_5_INCH, HEIGHT_TEXT_AREA} from '../../common/Dimentions';
import {useQuery} from '@tanstack/react-query';
import issuesService, {
  PropsSaveActionChooseType,
} from '../../apis/issuesService';
import {showSnackbarStore, useAppSelector} from '../../redux/Store';
import useApiMutation from '../../../services/useApiMutation';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  onClose?: () => void;
  data: InCompleteIssuesType;
  onRefeshIssues?: () => void;
  navigation?: NavigationProp<any, any>;
};
const ActionChoose = (props: Props) => {
  const {onClose, data, onRefeshIssues, navigation} = props;
  const [hideKeyBoard, setHideKeyBoard] = React.useState(false);
  const {userName, language} = useAppSelector(state => state.app);

  const formRef = React.useRef<{idnn: number; description: string}>({
    idnn: -1,
    description: '',
  });

  //#region  mutation , query
  const dataCboDownTime = useQuery({
    queryKey: ['data-cbo-down-time'],
    queryFn: () =>
      issuesService.getComboDownTime(userName, language, 'DOWN_TIME'),
    staleTime: 1000 * 100,
  });

  const saveActionChooseMuation = useApiMutation({
    mutationFn: issuesService.saveActionChoose,
  });
  //#endregion

  const dataPendingProcessing = [
    {
      value: 1,
      label: 'Tiếp nhận',
      iconname: 'checkmark-done-circle-sharp',
      iconcolor: 'green',
      border: true,
    },
    {
      value: 2,
      label: 'Trao đổi thông tin',
      iconname: 'chatbox-ellipses-outline',
      iconcolor: '#2684ff',
      border: false,
    },
  ];

  const bottomSheetRef = React.useRef<{
    handleCloseAcctionSheet: () => void;
  }>(null);

  const fetchSaveActionChoose = async (loai: number, idsk: '5' | '8') => {
    //5 tiếp nhận yêu cầu , 8 xác định nguyên nhân sự cố

    const propsSave: PropsSaveActionChooseType = {
      idnn: formRef.current.idnn,
      idsc: data.ID_SC,
      loai: loai,
      nngu: language,
      username: userName,
      description: formRef.current.description,
      id_dd: data.ID_DD,
      id_may: data.ID_MAY,
      id_sk: Number(idsk),
      sn_bth: data.SN_BTH,
    };

    saveActionChooseMuation.mutateAsync(propsSave, {
      onSuccess(resultData) {
        showSnackbarStore(
          resultData.ResponseData.ResponseMessage as string,
          resultData.ResponseData.ResponseCode === 1 ? 'success' : 'error',
        );
        if (resultData.IsSuccessStatusCode) {
          onRefeshIssues && onRefeshIssues();
        }
      },
    });
  };

  // handle
  const handleHideKeyBoard = () => {
    setHideKeyBoard(prev => !prev);
  };

  const handleSubmitFormDownTime = () => {
    if (formRef.current.idnn === -1) {
      showSnackbarStore(t('chua-nhap-nnnm'), 'error');
      return;
    }

    Alert.alert(t('thong-bao'), t('ban-co-muon-luu-nguyen-nhan-dung-may'), [
      {
        text: t('huy'),
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
      {
        text: t('dong-y'),
        onPress: () => {
          fetchSaveActionChoose(2, '8');
        },
      },
    ]);
  };

  const handleReceive = (loai: number) => {
    if (loai === 1) {
      // tiếp nhận
      Alert.alert(t('thong-bao'), t('ban-co-muon-tiep-nhan-khong'), [
        {
          text: t('huy'),
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: t('dong-y'),
          onPress: () => {
            fetchSaveActionChoose(1, '5');
          },
        },
      ]);
    } else {
      bottomSheetRef.current?.handleCloseAcctionSheet();
      navigation?.navigate('InfoExChangeScreen', {
        idmay: data.ID_MAY,
        idsc: data.ID_SC,
      });
    }
  };

  return (
    <AcctionSheetComponent
      ref={bottomSheetRef}
      heightPercent={
        data.TINH_TRANG === 3
          ? hideKeyBoard
            ? 65
            : HEIGHT_ANDROID_5_INCH // nếu những màng hình bé hơn 700px (màng hình bé hơn 5 inch)
            ? 45
            : 40
          : data.TINH_TRANG === 1
          ? HEIGHT_ANDROID_5_INCH
            ? 25
            : 20
          : 18
      }
      onClose={onClose}
      title={data.SN_BTH + ' - ' + data.MS_MAY + ' - ' + data.TEN_MAY}>
      <View className="flex-1">
        {(data.TINH_TRANG === 1 || data.TINH_TRANG === 2) &&
          dataPendingProcessing
            .filter(fil =>
              data.TINH_TRANG === 1
                ? true
                : data.TINH_TRANG === 2
                ? fil.value === 2
                : false,
            )
            .map(item => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={item.value}
                  className={`flex-row items-center mb-3 p-2 ${
                    item.border && 'border-b border-gray-400'
                  }`}
                  onPress={() => handleReceive(item.value)}>
                  <IconTypeComponent
                    iconname={item.iconname}
                    iconcolor={item.iconcolor}
                  />
                  <Text className="ml-3" style={Theme.font}>
                    {t(item.label)}
                  </Text>
                </TouchableOpacity>
              );
            })}
        {data.TINH_TRANG === 3 && (
          <View className="flex-1 mt-2">
            <View className="gap-5">
              <View>
                <SelectionComponent
                  data={
                    (dataCboDownTime.data &&
                      (dataCboDownTime.data.ResponseData as [])) ||
                    []
                  }
                  labelField="label"
                  valueField="value"
                  pagination
                  placeholder={t('nguyen-nhan-dung-may')}
                  onPressSelection={value => {
                    formRef.current = {...formRef.current, idnn: value};
                  }}
                />
              </View>

              <View>
                <TextInputComponent
                  height={HEIGHT_TEXT_AREA}
                  multiline
                  placeholder={t('mo-ta-loi')}
                  onFocus={handleHideKeyBoard}
                  onBlur={handleHideKeyBoard}
                  onChangeText={value => {
                    formRef.current = {...formRef.current, description: value};
                  }}
                />
              </View>
            </View>
            <View className="mt-10">
              <ButtonComponent
                buttonTitle={t('save')}
                onPress={handleSubmitFormDownTime}
              />
            </View>
          </View>
        )}
      </View>
      {/* {dataDevices.length > 0 && (
        <View className="items-center justify-center mb-5">
          <ButtonComponent
            buttonTitle={t('check-in-ngay')}
            colorButton={Colors.primarySecond}
            disabled={
              dataDevices.findIndex(device => device.CHON === true) === -1
            }
            onPress={handleSaveCheckin}
          />
        </View>
      )} */}

      <SnackbarComponent />
    </AcctionSheetComponent>
  );
};

export default ActionChoose;
