import {Text, View} from 'react-native';
import React from 'react';
import {localStorage, localStorageKey} from '../../utils';
import {
  AcctionSheetComponent,
  ButtonComponent,
  IconTypeComponent,
  TextInputComponent,
} from '../../components';
import {t} from 'i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../../common/Colors';
import Theme from '../../common/Theme';
import {HEIGHT_IPHONE_PROMAX} from '../../common/Dimentions';

const SetingConfig = () => {
  const [showOption, setShowOption] = React.useState(false);
  const [baseURL, setBaseURL] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const {top} = useSafeAreaInsets();
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const bottomSheetRef = React.useRef<{
    handleCloseAcctionSheet: () => void;
  }>(null);
  const handleShowOption = () => {
    setShowOption(!showOption);
  };

  React.useEffect(() => {
    const getBaseURL = async () => {
      const resultURL = await localStorage.getItem(localStorageKey.BASE_URL);

      if (!resultURL || resultURL === '') {
        setShowOption(true);
      } else {
        setBaseURL(resultURL);
      }
    };
    getBaseURL();
  }, []);

  const handleChangeBaseURL = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setBaseURL(value);
    }, 500);
  };

  const handleSaveBaseURL = async () => {
    await localStorage.setItem(localStorageKey.BASE_URL, baseURL);
    setFocus(false);
    bottomSheetRef.current?.handleCloseAcctionSheet();
  };

  return (
    <View
      style={{
        paddingTop: top,
      }}>
      <IconTypeComponent
        onPress={handleShowOption}
        iconname="setting"
        type="AntDesign"
      />
      {showOption && (
        <AcctionSheetComponent
          ref={bottomSheetRef}
          heightPercent={focus ? 60 : HEIGHT_IPHONE_PROMAX ? 25 : 35}
          onClose={() => {
            handleShowOption();
          }}>
          <View className="mb-4">
            <Text style={[Theme.font, {fontSize: 16, color: Colors.primary}]}>
              {t('nhap-url-title')}
            </Text>
          </View>
          <View className="flex-1 gap-3">
            <View>
              <TextInputComponent
                placeholder="URL"
                value={baseURL}
                onChangeText={handleChangeBaseURL}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
              />
            </View>
            <View style={{borderColor: Colors.primarySecond}}>
              <ButtonComponent
                disabled={baseURL === ''}
                buttonTitle={t('next')}
                onPress={handleSaveBaseURL}
              />
            </View>
          </View>
        </AcctionSheetComponent>
      )}
    </View>
  );
};

export default SetingConfig;
