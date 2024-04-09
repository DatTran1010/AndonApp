import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../common/Colors';

interface PaginationComponentProps {
  dataLength: number;
  onPressPage?: (value: any) => void;
}
const PaginationComponent: React.FC<PaginationComponentProps> = ({
  dataLength = 1,
  onPressPage,
}) => {
  // số lượng items xuất hiện trên 1 trang
  const NUMBER_LOAD_ITEMS = 15;

  // so page hien thi 1 lan la 5
  const INIT_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dataLength / NUMBER_LOAD_ITEMS);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (onPressPage) {
        onPressPage(page);
      }
    }
  };

  const renderPagination = () => {
    // const startPage = Math.max(1, currentPage - Math.floor(INIT_PAGE / 2));
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(INIT_PAGE / 2),
        totalPages - INIT_PAGE + 1,
      ),
    );
    const pages = [];
    for (let i = startPage; i < startPage + INIT_PAGE && i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          onPress={() => goToPage(i)}
          disabled={i === currentPage}
          style={[
            styles.iconPagination,
            {
              backgroundColor:
                i === currentPage ? Colors.primarySecond : Colors.white,
            },
          ]}>
          <Text
            style={{
              color: i === currentPage ? Colors.white : Colors.black,
            }}>{`${i}`}</Text>
        </TouchableOpacity>,
      );
    }
    return pages;
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        width: '90%',
        height: '100%',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={[
          styles.iconPagination,
          {
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          },
        ]}
        disabled={currentPage === 1 ? true : false}
        onPress={() => {
          goToPage(1);
        }}>
        <MaterialCommunityIcons name="chevron-double-left" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconPagination}
        onPress={() => {
          goToPage(Math.max(1, currentPage - 1));
        }}
        disabled={currentPage === 1 ? true : false}>
        <MaterialCommunityIcons name="chevron-left" size={20} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {renderPagination()}
      </View>
      <TouchableOpacity
        style={styles.iconPagination}
        onPress={() => {
          goToPage(Math.min(currentPage + 1, totalPages));
        }}
        disabled={currentPage === totalPages ? true : false}>
        <MaterialCommunityIcons name="chevron-right" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconPagination,
          {
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          },
        ]}
        onPress={() => {
          goToPage(totalPages);
        }}
        disabled={currentPage === totalPages ? true : false}>
        <MaterialCommunityIcons name="chevron-double-right" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default PaginationComponent;

const styles = StyleSheet.create({
  iconPagination: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
