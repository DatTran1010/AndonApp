import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {HEIGHT_SCREEN} from '../common/Dimentions';
import Colors from '../common/Colors';
import {useTranslation} from 'react-i18next';

interface HeaderGridComponentProps {
  onSortTable?: (sortColumnName: string) => void;
}
const HeaderGridComponent = (props: HeaderGridComponentProps) => {
  const {onSortTable} = props;
  const {t} = useTranslation();
  const dataHeader = [
    {id: 1, COLNAME: t('ma-thiet-bi'), width: '40%'},
    {id: 2, COLNAME: t('yeu-cau'), width: '20%'},
    {id: 3, COLNAME: t('bao-tri'), width: '20%'},
    {id: 4, COLNAME: t('giam-sat'), width: '20%'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        {dataHeader &&
          dataHeader.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                {
                  ...styles.columnHeader,
                  width: item.width,
                } as ViewStyle,
              ]}
              onPress={() => {
                if (onSortTable) {
                  onSortTable(
                    item.id === 2
                      ? 'lblYeuCau'
                      : item.id === 3
                      ? 'lblBaoTri'
                      : item.id === 4
                      ? 'lblGiamSat'
                      : '',
                  );
                }
              }}>
              <Text style={styles.columnHeaderTxt}>{item.COLNAME}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default React.memo(HeaderGridComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    height: HEIGHT_SCREEN / 20,
    backgroundColor: Colors.primarySecond,
    paddingHorizontal: 5,
  },
  columnHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  columnHeaderTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
