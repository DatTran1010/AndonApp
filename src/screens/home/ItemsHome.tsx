import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconTypeComponent} from '../../components';
import {ICON_SIZE} from '../../common/Dimentions';
import {t} from 'i18next';
import Colors from '../../common/Colors';
import Theme from '../../common/Theme';
import {NavigationProp} from '@react-navigation/native';
import {
  AppDispatch,
  showSnackbarStore,
  useAppSelector,
} from '../../redux/Store';
import checkinServicesHttp from '../../apis/checkinServices';
import {useDispatch} from 'react-redux';
import {fetchCheckInStatus} from '../../redux/feature/auth-slice';

type ButtonType = {
  name: 'check-in' | 'problem' | 'check-out' | 'report';
  label: string;
  type:
    | 'ionicons'
    | 'fontAwesome5'
    | 'MaterialCommunityIcons'
    | 'octicons'
    | 'FontAwesome'
    | 'MaterialIcons';
  iconname: string;
};

interface Props {
  navigation?: NavigationProp<any, any>;
}

const ItemsHome = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch<AppDispatch>();
  const {userName, language} = useAppSelector(state => state.app);
  const {checkinStatus} = useAppSelector(state => state.auth);

  const ButtonArr: ButtonType[] = [
    {
      name: 'check-in',
      label: t('check-in'),
      iconname: 'location',
      type: 'ionicons',
    },
    {
      name: 'problem',
      label: t('su-co-chua-hoan-tat'),
      type: 'ionicons',
      iconname: 'warning',
    },
    {
      name: 'check-out',
      label: t('check-out'),
      type: 'MaterialIcons',
      iconname: 'location-off',
    },
    {
      name: 'report',
      label: t('bao-cao'),
      type: 'MaterialIcons',
      iconname: 'report-gmailerrorred',
    },
  ];

  //hancle
  const handleCheckButton = (
    namebtn: 'check-in' | 'problem' | 'check-out' | 'report',
  ) => {
    switch (namebtn) {
      case 'check-in': {
        navigation?.navigate('CheckInScreen');
        break;
      }
      case 'check-out': {
        Alert.alert(t('thong-bao'), t('question-ban-co-muon-check-out-khong'), [
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
              handleCheckOut();
            },
          },
        ]);

        break;
      }

      case 'problem': {
        navigation?.navigate('IncompleteIssues');
        break;
      }

      case 'report': {
        navigation?.navigate('ReportScreen');
      }
    }
  };

  const handleCheckOut = async () => {
    const result = await checkinServicesHttp.checkout({
      username: userName,
      nngu: language,
    });

    // console.log('result', result);

    if (result.IsSuccessStatusCode) {
      showSnackbarStore(
        result.ResponseData.ResponseMessage as string,
        result.ResponseData.ResponseCode === 1 ? 'success' : 'error',
      );

      dispatch(fetchCheckInStatus(userName));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        {ButtonArr.map((btn, index) => {
          const isChecinStatus =
            btn.name === 'check-out' && !checkinStatus?.ResponseData;

          return (
            <TouchableOpacity
              disabled={isChecinStatus}
              activeOpacity={0.7}
              key={index}
              style={[
                Theme.shadow,
                styles.item,
                {
                  backgroundColor: isChecinStatus
                    ? Colors.gray100
                    : Colors.backgroundAction,
                },
              ]}
              onPress={() => handleCheckButton(btn.name)}>
              <IconTypeComponent
                iconname={btn.iconname}
                type={btn.type}
                iconsize={ICON_SIZE * 1.5}
                iconcolor={isChecinStatus ? Colors.gray : Colors.primarySecond}
              />
              <View style={{marginVertical: 10}}>
                <Text
                  className="text-center"
                  style={[
                    Theme.font,
                    {
                      color: Colors.primary,
                    },
                  ]}>
                  {btn.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ItemsHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 160,
    height: 160,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.primary,
    marginVertical: 20,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});
