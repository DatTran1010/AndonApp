/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

import Theme from '../common/Theme';
import Colors from '../common/Colors';
import {setLanguaApp} from '../redux/AppSlice';
import TouchableOpacityComponent from './TouchableOpacityComponent';
import IconTypeComponent from './IconTypeComponent';
import AcctionSheetComponent from './AcctionSheetComponent';
import {useAppSelector} from '../redux/Store';
import {localStorage, localStorageKey} from '../utils';

interface LanguesComponentProps {
  onSelectionLanguae?: (value: any) => void;
}
const LanguesComponent: React.FC<LanguesComponentProps> = ({
  onSelectionLanguae,
}) => {
  const {t} = useTranslation();

  const languege = useAppSelector(state => state.app.language);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const acctionSheetRef = React.useRef<{
    handleCloseAcctionSheet: () => void;
  } | null>(null);

  //sk handle

  React.useEffect(() => {
    const getLanguage = async () => {
      const languageStorage = await localStorage.getItem(
        localStorageKey.LANGUAGE || 'vn',
      );
      dispatch(setLanguaApp(languageStorage === 'vn' ? 0 : 1));
    };

    getLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectionLanguage = () => {
    setIsVisible(!isVisible);
  };

  const saveLanguageStorage = async (value: string) => {
    await localStorage.setItem(localStorageKey.LANGUAGE, value);
  };

  const handleSelectedLanguage = (value: string) => {
    if (onSelectionLanguae) {
      onSelectionLanguae(value);
    }

    i18next.changeLanguage(value);
    saveLanguageStorage(value);
    dispatch(setLanguaApp(value === 'vn' ? 0 : 1));
    // setIsVisible(false);
    acctionSheetRef.current?.handleCloseAcctionSheet();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacityComponent
          onPress={handleSelectionLanguage}
          style={styles.chosseLanguaes}>
          <Text style={[Theme.font, styles.chosseLanguaed]}>
            {languege === 0 ? t('vietnamese') : t('english')}
          </Text>
          <IconTypeComponent
            iconname="chevron-down"
            type="octicons"
            iconsize={20}
          />
        </TouchableOpacityComponent>
      </View>
      {isVisible && (
        <AcctionSheetComponent
          ref={acctionSheetRef}
          heightPercent={25}
          onClose={() => setIsVisible(false)}
          title={t('chosse-language')}>
          <View style={{flex: 1}}>
            <View style={styles.body}>
              <TouchableOpacity
                style={[
                  styles.viewLanguage,
                  {
                    backgroundColor:
                      languege === 0 ? Colors.border : Colors.white,
                  },
                ]}
                onPress={() => {
                  handleSelectedLanguage('vn');
                }}>
                <Text style={Theme.font}>{t('vietnamese')}</Text>
                <Image source={require('../../assets/logoTV.jpg')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.viewLanguage,
                  {
                    backgroundColor:
                      languege === 1 ? Colors.border : Colors.white,
                  },
                ]}
                onPress={() => {
                  handleSelectedLanguage('en');
                }}>
                <Text style={Theme.font}>{t('english')}</Text>
                <Image source={require('../../assets/logoTA.jpg')} />
              </TouchableOpacity>
            </View>
          </View>
        </AcctionSheetComponent>
      )}
    </View>
  );
};

export default LanguesComponent;

const styles = StyleSheet.create({
  container: {},
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewLanguage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
  },
  content: {
    justifyContent: 'space-between',
  },
  chosseLanguaes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chosseLanguaed: {
    marginRight: 5,
  },
  marginLeft: {marginLeft: 10},
  body: {
    flex: 1,
  },
});
