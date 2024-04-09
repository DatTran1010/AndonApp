import {View} from 'react-native';
import React from 'react';
import {
  AcctionSheetComponent,
  ButtonComponent,
  KeyboardViewComponent,
  SearchComponent,
  SnackbarComponent,
} from '../../../components';
import Colors from '../../../common/Colors';
import {DevicesModelType} from '../../../types/checkinType';
import {useQuery} from '@tanstack/react-query';
import {
  getListDevicesNotHaveChecked,
  saveCheckin,
} from '../../../apis/checkinServices';
import NoneDataComponent from '../../../components/NoneDataComponent';
import ItemDevice from './ItemDevice';
import {t} from 'i18next';
import useApiMutation from '../../../../services/useApiMutation';
import {useDispatch} from 'react-redux';
import {setShowSnackbar} from '../../../redux/AppSlice';
import {fetchCheckInStatus} from '../../../redux/feature/auth-slice';
import {AppDispatch} from '../../../redux/Store';

interface Props {
  username: string;
  language: number;
  idca: number;
  ngay: Date;
  onAddSuccess?: () => void;
}
const AddCheckin = React.forwardRef((props: Props, ref) => {
  const {language, username, idca, ngay, onAddSuccess} = props;
  const dispatch = useDispatch<AppDispatch>();
  const [isShowAcction, setIsShowAction] = React.useState(false);
  const [dataDevices, setDataDevices] = React.useState<DevicesModelType[]>([]);
  const dataDevicesRef = React.useRef<DevicesModelType[]>([]);
  const bottomSheetRef = React.useRef<{
    handleCloseAcctionSheet: () => void;
  }>(null);

  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const handleShowAcction = () => {
    setIsShowAction(!isShowAcction);
  };

  const fetchDataDevices = useQuery({
    queryKey: ['get-list-devices'],
    queryFn: () =>
      getListDevicesNotHaveChecked({
        idca: idca,
        ngay: ngay,
        nngu: language,
        username,
      }),
    enabled: false,
  });

  //#region  mutaion,

  const saveCheckinMutaion = useApiMutation({
    mutationFn: saveCheckin,
  });

  //#endregion

  React.useEffect(() => {
    const fetchingData = async () => {
      const result = await fetchDataDevices.refetch();
      if (result.data?.IsSuccessStatusCode) {
        setDataDevices(result.data.ResponseData);
        dataDevicesRef.current = result.data.ResponseData;
      } else {
        dispatch(
          setShowSnackbar({
            text: result.data?.Message,
            show: true,
            bgColor: result.data?.IsSuccessStatusCode
              ? Colors.success
              : Colors.error,
          }),
        );
      }
    };

    isShowAcction && fetchingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowAcction]);

  React.useImperativeHandle(ref, () => ({
    handleShowAcction,
  }));

  const handleSelectDevice = (deviceid: number) => {
    const updateData = dataDevicesRef.current.map(item => {
      if (item.ID_MAY === deviceid) {
        return {...item, CHON: !item.CHON};
      } else {
        return {...item};
      }
    });
    dataDevicesRef.current = updateData;
    setDataDevices(prev =>
      prev.map(device =>
        device.ID_MAY === deviceid ? {...device, CHON: !device.CHON} : device,
      ),
    );
  };

  const handleSaveCheckin = async () => {
    await saveCheckinMutaion.mutateAsync(
      {
        idca: idca,
        ngay: ngay,
        nngu: language,
        username: username,
        jsondata: JSON.stringify(dataDevicesRef.current),
      },
      {
        onSuccess(data) {
          if (data.ResponseCode === 1) {
            bottomSheetRef.current?.handleCloseAcctionSheet();
            dispatch(fetchCheckInStatus(username));
            onAddSuccess && onAddSuccess();
          }

          dispatch(
            setShowSnackbar({
              text: data.ResponseMessage,
              show: true,
              bgColor: data.ResponseCode === 1 ? Colors.success : Colors.error,
            }),
          );
        },
      },
    );
  };

  const handleSearchDevices = (keysearch: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const filterData = dataDevicesRef.current.filter(item =>
        keysearch === '' || keysearch === undefined || keysearch === null
          ? true
          : item.MA_MAY.toLowerCase().includes(keysearch.toLowerCase()) ||
            item.TEN_MAY.toLowerCase().includes(keysearch.toLowerCase()),
      );
      setDataDevices(filterData);
    }, 1000);
  };

  if (isShowAcction) {
    return (
      <AcctionSheetComponent
        ref={bottomSheetRef}
        heightPercent={dataDevices.length === 0 ? 30 : 90}
        onClose={handleShowAcction}
        title={t('chon-may-check-in')}>
        <SearchComponent onChangText={handleSearchDevices} />
        <KeyboardViewComponent
          styleParent={{
            marginVertical: 20,
          }}>
          <View className="flex-1">
            {dataDevices.length > 0 ? (
              dataDevices.map(device => {
                return (
                  <View key={device.ID_MAY} className="flex-1">
                    <ItemDevice
                      device={device}
                      onPressCheckDevice={handleSelectDevice}
                    />
                  </View>
                );
              })
            ) : (
              <View className="flex-1 ">
                <NoneDataComponent />
              </View>
            )}
          </View>
        </KeyboardViewComponent>
        {dataDevices.length > 0 && (
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
        )}

        <SnackbarComponent />
      </AcctionSheetComponent>
    );
  }
});

export default AddCheckin;
