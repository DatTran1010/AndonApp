import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import ListCheckIn from './ListCheckIn';
import HeaderFilterCheckin from './HeaderFilterCheckin';
import {IconTypeComponent} from '../../components';
import Colors from '../../common/Colors';
import {useDispatch} from 'react-redux';
import AddCheckin from './modal/AddCheckin';
import useApiMutation from '../../../services/useApiMutation';
import {getListMayCheckinByCa} from '../../apis/checkinServices';
import {setCheckDataMayCheckin} from '../../redux/AppSlice';
import {useAppSelector} from '../../redux/Store';

const CheckInScreen = () => {
  const dispatch = useDispatch();
  const language = useAppSelector(state => state.app.language);
  const username = useAppSelector(state => state.app.userName);
  const checkinStatus = useAppSelector(state => state.auth.checkinStatus);

  const [propsFilter, setPropsFilter] = React.useState({
    idca: -1,
    ngay: new Date(),
  });

  const refAddCheckin = React.useRef<{
    handleShowAcction: () => void;
    handleSaveCheckin: () => void;
  }>(null);

  //#region  mutaion

  const listDataMayMuation = useApiMutation({
    mutationFn: getListMayCheckinByCa,
  });

  const fetchingDataMayCheckin = async (idca: number, day: Date) => {
    await listDataMayMuation.mutateAsync(
      {
        idca: idca,
        ngay: day,
        nngu: language,
        username: username,
      },
      {
        onSuccess(data) {
          if (data.IsSuccessStatusCode) {
            dispatch(setCheckDataMayCheckin(data.ResponseData));
          }
          // console.log('data', data);
        },
      },
    );
  };

  //#endregion

  //handle

  const handleFilterData = async (idca: number, day: Date) => {
    setPropsFilter({idca: idca, ngay: day});
    await fetchingDataMayCheckin(idca, day);
  };

  const handleAddSuccessDevices = async () => {
    await fetchingDataMayCheckin(propsFilter.idca, propsFilter.ngay);
  };

  const handleCheckinButton = () => {
    if (checkinStatus?.ResponseData) {
      refAddCheckin.current?.handleShowAcction();
    } else {
      refAddCheckin.current?.handleSaveCheckin();
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.headrContent}>
        <HeaderFilterCheckin
          language={language}
          username={username}
          onFilterData={handleFilterData}
        />
      </View>

      <View style={styles.bodyContent} className="mb-3">
        <ListCheckIn onPressDeleteSuccess={handleAddSuccessDevices} />
      </View>

      <View className="absolute bottom-5 items-center w-full">
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.plus}
          className="w-16 h-16 items-center justify-center"
          onPress={handleCheckinButton}>
          <IconTypeComponent
            iconname={checkinStatus?.ResponseData ? 'plus' : 'checkmark'}
            type={checkinStatus?.ResponseData ? 'Feather' : 'ionicons'}
            iconcolor={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <AddCheckin
        ref={refAddCheckin}
        language={language}
        username={username}
        idca={propsFilter.idca}
        ngay={propsFilter.ngay}
        onAddSuccess={handleAddSuccessDevices}
      />

      {/* <SnackbarComponent text="12" /> */}
    </View>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  headrContent: {
    flex: 1,
    marginBottom: 8,
  },
  bodyContent: {
    flex: 3,
  },

  infoCheckin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plus: {
    backgroundColor: Colors.primary,
    borderRadius: 32,
    shadowColor: Colors.primary,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
});
