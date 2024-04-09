import {StyleSheet, View} from 'react-native';
import React from 'react';
import {t} from 'i18next';

import TextInputComponent from './TextInputComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../common/Colors';
import {HEIGHT_TEXT_INPUT, ICON_SIZE} from '../common/Dimentions';

interface SearchComponentProps {
  onChangText?: (value: string) => void;
}
const SearchComponent = (props: SearchComponentProps) => {
  const {onChangText} = props;
  return (
    <View>
      <TextInputComponent
        placeholder={t('search')}
        onChangeText={onChangText}
      />
      <View style={styles.searchIcon}>
        <Ionicons name="search" color={Colors.primary} size={ICON_SIZE} />
      </View>
    </View>
  );
};

export default React.memo(SearchComponent);

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    top: HEIGHT_TEXT_INPUT / 4,
    right: 10,
  },
});
