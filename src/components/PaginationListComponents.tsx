import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, Children, cloneElement} from 'react';
import Colors from '../common/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NoneDataComponent from './NoneDataComponent';

interface PaginationListComponentsProps {
  dataLength: number;
  onPressPage?: (value: any) => void;
  children: any;
  // số lượng items xuất hiện trên 1 trang
  NUMBER_LOAD_ITEMS?: number;
  data: any;
  page?: number;
}
const PaginationListComponents = (props: PaginationListComponentsProps) => {
  const {
    dataLength,
    onPressPage,
    children,
    NUMBER_LOAD_ITEMS = 15,
    data,
    page = 1,
  } = props;

  // so page hien thi 1 lan la 5
  const INIT_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState(data.slice(0, NUMBER_LOAD_ITEMS));

  const totalPages = Math.ceil(dataLength / NUMBER_LOAD_ITEMS);
  React.useEffect(() => {
    setDataList(data.slice(0, NUMBER_LOAD_ITEMS));
    goToPage(page as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const goToPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * NUMBER_LOAD_ITEMS;
    const endIndex = startIndex + NUMBER_LOAD_ITEMS;
    setDataList(data?.slice(startIndex, endIndex));

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      if (onPressPage) {
        onPressPage(pageNumber);
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
    <View style={styles.container}>
      {data && dataLength > 0 ? (
        <View style={styles.children}>
          {Children.map(children, child => cloneElement(child, {dataList}))}
        </View>
      ) : (
        <View style={styles.noneData}>
          <NoneDataComponent />
        </View>
      )}
      {dataLength > 0 && (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.iconPagination, styles.leftChevron]}
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
          <View style={styles.renderPagination}>{renderPagination()}</View>
          <TouchableOpacity
            style={styles.iconPagination}
            onPress={() => {
              goToPage(Math.min(currentPage + 1, totalPages));
            }}
            disabled={currentPage === totalPages ? true : false}>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconPagination, styles.rightChevron]}
            onPress={() => {
              goToPage(totalPages);
            }}
            disabled={currentPage === totalPages ? true : false}>
            <MaterialCommunityIcons name="chevron-double-right" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PaginationListComponents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  children: {
    flex: 0.9,
  },
  iconPagination: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noneData: {
    flex: 1,
    justifyContent: 'center',
  },
  rightChevron: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  leftChevron: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
