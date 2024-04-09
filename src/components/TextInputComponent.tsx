import React, {ForwardedRef, forwardRef, memo, useState} from 'react';
import {View, StyleSheet, TextInput, Text, TextInputProps} from 'react-native';

import Colors from '../common/Colors';
import {HEIGHT_TEXT_INPUT, HEIGHT_TEXT_MEDIUM} from '../common/Dimentions';
import Theme from '../common/Theme';
import {formatMoney} from '../utils';

interface TextInputComponentProps extends TextInputProps {
  placeholder?: string;
  height?: number;
  isBarCode?: boolean;
  value?: string;
  border?: string;
  onChangeText?: (text: string) => void;
  number?: boolean;
  maxNumber?: number;
  minNumber?: number;
  disabled?: boolean;
  isValue?: boolean;
  showPlaceholder?: boolean;
  formattype?: 'money' | 'none';
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextInputComponent: React.FC<TextInputComponentProps> = forwardRef(
  (
    {
      placeholder = '',
      height = HEIGHT_TEXT_INPUT,
      onChangeText,
      value = '',
      border = '',
      number = false,
      maxNumber = 999999,
      minNumber = 0,
      disabled = false,
      isValue = false,
      showPlaceholder = true,
      formattype = 'none',
      onFocus,
      onBlur,
      ...props
    },
    ref: ForwardedRef<TextInput>,
  ) => {
    const [focus, setFocus] = useState(0);
    // const [showQRCode, setShowQRCode] = useState(false);
    const [keywork, setKeyWork] = useState(value || '');
    // const handleShowQRCode = useCallback(() => {
    //   setShowQRCode(!showQRCode);
    // }, [showQRCode]);
    // const handleReaderQRCode = useCallback(
    //   (valueReaderQR: string) => {
    //     handleShowQRCode();
    //     setKeyWork(valueReaderQR);
    //     if (onChangeText) {
    //       onChangeText(valueReaderQR);
    //     }
    //   },
    //   [handleShowQRCode, onChangeText],
    // );

    const handleCheckLimit = (valueText: number) => {
      if (valueText > maxNumber && valueText.toString() !== '') {
        setKeyWork(maxNumber.toString());
        if (onChangeText) {
          onChangeText(maxNumber.toString());
        }
      } else if (valueText < minNumber && valueText.toString() !== '') {
        setKeyWork(minNumber.toString());
        if (onChangeText) {
          onChangeText(minNumber.toString());
        }
      } else {
        setKeyWork(valueText.toString());
        if (onChangeText) {
          onChangeText(valueText.toString());
        }
      }
    };

    const handleChangeText = (valueText: any) => {
      if (!number) {
        if (onChangeText) {
          setKeyWork(valueText);
          onChangeText(valueText);
        }
      } else {
        handleCheckLimit(valueText);
      }
    };

    return (
      <View
        style={[
          styles.container,
          {
            borderColor:
              border === '' ? (focus ? Colors.primary : Colors.border) : border,
            height: height,
            backgroundColor: disabled ? Colors.gray100 : Colors.white,
          },
        ]}>
        {showPlaceholder &&
        ((keywork !== '' && keywork !== null && !isValue) ||
          (value !== '' && value !== null && isValue)) &&
        placeholder !== '' ? (
          <Text
            style={[
              styles.label,
              {
                color: !disabled
                  ? Colors.gray
                  : focus
                  ? Colors.primary
                  : Colors.black,
                backgroundColor: disabled ? Colors.gray100 : Colors.white,
              },
            ]}>
            {placeholder}
          </Text>
        ) : (
          <></>
        )}

        <TextInput
          ref={ref}
          placeholder={placeholder}
          style={styles.text}
          placeholderTextColor="gray"
          autoCapitalize="none"
          onFocus={() => {
            setFocus(1);
            onFocus && onFocus();
          }}
          onBlur={() => {
            setFocus(0);
            onBlur && onBlur();
          }}
          value={
            isValue
              ? value
              : formattype === 'money'
              ? formatMoney(keywork)
              : keywork
          }
          editable={!disabled}
          onChangeText={handleChangeText}
          {...props}
        />
        {/* {isBarCode && (
          <>
            <TouchableOpacity
              style={styles.barCodeView}
              onPress={handleShowQRCode}>
              <Image
                source={require('..//../assets/barcode.png')}
                style={styles.barCodeIcon}
              />
            </TouchableOpacity>
            {showQRCode && (
              <QRCodeComponent
                onQRreader={handleReaderQRCode}
                onHideQRCode={handleShowQRCode}
              />
            )}
          </>
        )} */}
      </View>
    );
  },
);

export default memo(TextInputComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    borderColor: Colors.primary,
    borderWidth: 1,
  },

  text: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    padding: 5,
    fontFamily: Theme.fontFamily,
    fontSize: Theme.fontSize,
  },
  label: {
    position: 'absolute',
    left: 10,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: Theme.fontSize,
    fontFamily: Theme.fontFamily,
  },
  barCodeView: {
    position: 'absolute',
    top: 3,
    right: 10,
  },
  barCodeIcon: {
    width: HEIGHT_TEXT_MEDIUM / 2,
    height: HEIGHT_TEXT_MEDIUM / 2,
  },
});
