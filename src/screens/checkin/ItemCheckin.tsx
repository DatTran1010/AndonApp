import {View, Text, StyleSheet, Platform, Alert} from 'react-native';
import React from 'react';
import {CardComponent, IconTypeComponent} from '../../components';
import Colors from '../../common/Colors';
import Theme from '../../common/Theme';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import {MayCheckinViewModelType} from '../../types/checkinType';
import useApiMutation from '../../../services/useApiMutation';
import {deleteCheckinDevice} from '../../apis/checkinServices';
import {useDispatch} from 'react-redux';
import {setShowSnackbar} from '../../redux/AppSlice';
import {t} from 'i18next';
import {AppDispatch, useAppSelector} from '../../redux/Store';
import {fetchCheckInStatus} from '../../redux/feature/auth-slice';

interface Props {
  itemCheckin: MayCheckinViewModelType;
  onPressDeleteSuccess?: () => void;
  datalenght: number;
}
const ItemCheckin = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const {itemCheckin, onPressDeleteSuccess, datalenght} = props;
  const language = useAppSelector(state => state.app.language);
  const username = useAppSelector(state => state.app.userName);

  const checkinStatus = useAppSelector(state => state.auth.checkinStatus);

  //#region  mutaion
  const deleteCheckinDeviceMuation = useApiMutation({
    mutationFn: deleteCheckinDevice,
  });

  const handleDeleteCheckinDevice = async (idciom: number, idcio: number) => {
    let checkOut = false;

    const deleteItem = async (checkout: boolean) => {
      await deleteCheckinDeviceMuation.mutateAsync(
        {idciom: idciom, nngu: language, checkout, username, idcio},
        {
          onSuccess(data) {
            dispatch(
              setShowSnackbar({
                show: true,
                text: data.ResponseMessage,
                bgColor:
                  data.ResponseCode === 1 ? Colors.success : Colors.error,
              }),
            );
            if (data.ResponseCode === 1) {
              dispatch(fetchCheckInStatus(username));
              onPressDeleteSuccess && onPressDeleteSuccess();
            }
          },
        },
      );
    };
    if (datalenght === 1) {
      Alert.alert(t('thong-bao'), t('question-ban-co-muon-check-out-khong'), [
        {
          text: t('huy'),
          onPress: () => {
            deleteItem(checkOut);
          },
          style: 'cancel',
        },
        {
          text: t('dong-y'),
          onPress: () => {
            checkOut = true;
            deleteItem(checkOut);
          },
        },
      ]);
    } else {
      deleteItem(checkOut);
    }
  };

  //#endregion
  return (
    <Animated.View
      entering={FadeInLeft.duration(500)}
      exiting={FadeOutRight.duration(300)}
      needsOffscreenAlphaCompositing={Platform.OS === 'android'}>
      <CardComponent>
        <View style={styles.msmay}>
          <Text style={[Theme.font, {fontSize: Theme.fontSize}]}>
            {itemCheckin.MA_MAY + ' - ' + itemCheckin.TEN_MAY}
          </Text>
          {checkinStatus?.ResponseData && (
            <IconTypeComponent
              iconname="delete"
              iconcolor={Colors.primarySecond}
              iconsize={30}
              type="MaterialCommunityIcons"
              onPress={() => {
                Alert.alert(
                  t('thong-bao'),
                  t('question-delete-check-in-device'),
                  [
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
                        handleDeleteCheckinDevice(
                          itemCheckin.ID_CIOM,
                          itemCheckin.ID_CIO,
                        );
                      },
                    },
                  ],
                );
              }}
            />
          )}
        </View>
      </CardComponent>
    </Animated.View>
  );
};

export default ItemCheckin;
const styles = StyleSheet.create({
  msmay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tenmay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
