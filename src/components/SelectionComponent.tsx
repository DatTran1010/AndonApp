/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {forwardRef, memo, useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {t} from 'i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TextInputComponent from './TextInputComponent';
import Colors from '../common/Colors';
import IconComponent from './IconComponent';
import Theme from '../common/Theme';
import {
  HEIGHT_TEXT_INPUT,
  HEIGHT_TEXT_MEDIUM,
  ICON_SIZE,
} from '../common/Dimentions';
// import QRCodeComponent from './QRCodeComponent';
import PaginationListComponents from './PaginationListComponents';
import NoneDataComponent from './NoneDataComponent';

interface DataProps {
  id: number;
  value: any;
  label: string;
}

interface SelectionComponentProps {
  placeholder: string;
  onPressSelection?: (value: any, moreValues?: any) => void;
  data: [];
  labelField: string;
  valueField: string;
  moreValueField?: string[];
  value?: any;
  disable?: boolean;
  isArrow?: boolean;
  isTextValue?: boolean;
  backgroundColor?: string;
  errorMessage?: string;
  pagination?: boolean;
  valueDisabled?: string[]; // những mã có trong này sẽ được disibled đi không cho người dùng chọn nữa
}

const SelectionComponent: React.FC<SelectionComponentProps> = forwardRef(
  (
    {
      placeholder,
      onPressSelection,
      data,
      labelField,
      valueField,
      moreValueField,
      value = -1,
      disable = false,
      isArrow = true,
      isTextValue = false,
      backgroundColor = Colors.white,
      errorMessage = '',
      pagination = false,
      valueDisabled = [],
      ...props
    },
    ref,
  ) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [dataTemp, setDataTemp] = useState([]);
    const [selectedValue, setSelectedValue] = useState<DataProps>({
      id: -1,
      label: '',
      value: '',
    });
    const [pagePagination, setPagePagination] = useState(1);
    const textSearchRef = React.useRef('');
    const timeoutRef = useRef<NodeJS.Timeout>();
    useEffect(() => {
      const setDefaultValue = async () => {
        // Sử dụng await để đợi data được tải xong
        // Thiết lập giá trị mặc định cho selectedValue dựa trên defaultData hoặc điều gì đó phù hợp

        if (data && data.length > 0) {
          const defaultValue = data.filter(item => item[valueField] === value); // Chọn phần tử đầu tiên hoặc điều gì đó phù hợp
          if (defaultValue.length) {
            setSelectedValue(prevState => {
              return {
                ...prevState,
                id: defaultValue[0].id,
                label: defaultValue[0][labelField],
                value: defaultValue[0][valueField],
              };
            });
          } else {
            setSelectedValue({
              id: -1,
              label: '',
              value: null,
            });
          }
        }
      };
      setDefaultValue();
      setDataTemp(data);
    }, [data, labelField, valueField, value]);

    const flatListRef = useRef<FlatList>(null);

    const handleSelection = () => {
      setIsShow(!isShow);
    };

    const handleValueSelection = (
      id: number,
      valueSelection: any,
      label: string,
    ) => {
      const newData = data.filter(item => item[valueField] === valueSelection);
      const newItem = {};
      if (moreValueField) {
        moreValueField.forEach(key => {
          newItem[key] = newData[0][key] as string;
        });
      }

      setSelectedValue({
        id: id,
        value: valueSelection,
        label: label,
      });
      setIsShow(false);
      if (onPressSelection) {
        onPressSelection(valueSelection, newItem);
      }
    };

    const handleChangText = (valueText: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        textSearchRef.current = valueText;

        const newData = [...data];
        const updateData = newData.filter(item =>
          valueText === ''
            ? true
            : (item[labelField] as string)
                .toLowerCase()
                .includes(valueText.toLowerCase()),
        );
        setPagePagination(1);
        setDataTemp(updateData);
      }, 1000);
    };

    useEffect(() => {
      if (pagination) {
        const page =
          selectedValue.id === -1 || textSearchRef.current !== ''
            ? 1
            : Math.ceil(selectedValue.id / 12);

        setPagePagination(page);
      } else {
        if (data || dataTemp) {
          if (dataTemp.length === 0) {
            return;
          }
          // setDataTemp(data);
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: selectedValue.id === -1 ? 0 : selectedValue.id - 1,
              animated: false,
            });
          }, 100);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShow, selectedValue.id]);

    //load giao diện khi sử dụng pagination
    // eslint-disable-next-line react/no-unstable-nested-components
    const ChildrenDataPagination = (dataChildren: any) => {
      const dataList = dataChildren.dataList;
      return (
        <View style={styles.valueControl}>
          {dataList && dataList.length > 0 ? (
            <FlatList
              {...props}
              ref={flatListRef}
              data={dataList}
              keyExtractor={item => item.id + ''}
              stickyHeaderHiddenOnScroll
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    disabled={valueDisabled.includes(item[valueField])}
                    activeOpacity={0.6}
                    onPress={() =>
                      handleValueSelection(
                        item.id,
                        item[valueField],
                        item[labelField],
                      )
                    }>
                    <View
                      key={item.id}
                      style={[
                        styles.list,
                        Theme.shadow,
                        {
                          backgroundColor: valueDisabled.includes(
                            item[valueField],
                          )
                            ? Colors.gray300
                            : selectedValue.id === item.id
                            ? Colors.primary
                            : Colors.backgroundColor,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: valueDisabled.includes(item[valueField])
                              ? Colors.black
                              : selectedValue.id === item.id
                              ? Colors.white
                              : Colors.black,
                          },
                        ]}>
                        {item[labelField]}
                      </Text>

                      {valueDisabled.includes(item[valueField]) && (
                        <MaterialCommunityIcons
                          name="cancel"
                          size={ICON_SIZE * 1.5}
                          color={'red'}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              // initialScrollIndex={selectedValue.id - 1}
              // getItemLayout={getItemLayout}
              onScrollToIndexFailed={({}) => {}}
            />
          ) : (
            <View style={styles.nodata}>
              {errorMessage === '' ? <NoneDataComponent /> : errorMessage}
            </View>
          )}
        </View>
      );
    };

    return (
      <View style={styles.container}>
        {/* hiển thị placeholder và dữ liệu */}
        <TouchableOpacity
          disabled={disable}
          activeOpacity={0.8}
          onPress={handleSelection}>
          {/* nếu isTextValue thì chỉ hiển thị lên 1 Text chứ không hiển thị dạng combo */}
          {isTextValue ? (
            <View
              style={{
                backgroundColor: disable ? Colors.gray100 : backgroundColor,
              }}>
              <Text style={{textAlign: 'center'}}>{selectedValue.label}</Text>
            </View>
          ) : (
            <View
              style={[
                styles.buttonSearch,
                Theme.shadow,
                {
                  height: HEIGHT_TEXT_INPUT,
                  backgroundColor: disable ? Colors.gray100 : Colors.white,
                },
              ]}>
              {selectedValue.label !== '' ? (
                <Text
                  ref={ref}
                  style={[
                    styles.label,
                    {
                      color: Colors.black,
                      backgroundColor: disable ? Colors.gray100 : Colors.white,
                    },
                  ]}>
                  {placeholder}
                </Text>
              ) : (
                <></>
              )}
              <Text
                style={[
                  Theme.font,
                  {
                    color:
                      selectedValue.label !== '' ? Colors.black : Colors.gray,
                  },
                ]}>
                {selectedValue.label === '' ? placeholder : selectedValue.label}
              </Text>
              {isArrow && (
                <View style={styles.iconDropDown}>
                  <Ionicons name="chevron-down-outline" size={20} />
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>

        {/* show data */}
        {isShow && (
          <Modal
            transparent={false}
            style={styles.safeView}
            animationType="slide">
            <SafeAreaView style={[styles.selectionContainer]}>
              <View style={styles.searchControl}>
                <View style={styles.iconBack}>
                  <IconComponent
                    nameicon="chevron-back"
                    size={25}
                    colorIcon={Colors.black}
                    label="Back"
                    onPress={handleSelection}
                  />
                </View>
                <View style={styles.textSearch}>
                  <TextInputComponent
                    placeholder={placeholder}
                    onChangeText={handleChangText}
                    value={textSearchRef.current}
                  />
                </View>
              </View>
              {pagination ? (
                dataTemp && dataTemp.length > 0 ? (
                  <PaginationListComponents
                    data={dataTemp}
                    dataLength={dataTemp.length}
                    NUMBER_LOAD_ITEMS={12}
                    children={<ChildrenDataPagination />}
                    page={pagePagination}
                  />
                ) : (
                  <View>
                    {errorMessage === '' ? <NoneDataComponent /> : errorMessage}
                  </View>
                )
              ) : (
                <View style={styles.valueControl}>
                  {dataTemp && dataTemp.length > 0 ? (
                    <FlatList
                      {...props}
                      ref={flatListRef}
                      data={dataTemp}
                      keyExtractor={item => item.id + ''}
                      stickyHeaderHiddenOnScroll
                      initialNumToRender={dataTemp.length}
                      maxToRenderPerBatch={dataTemp.length}
                      renderItem={({item}) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() =>
                              handleValueSelection(
                                item.id,
                                item[valueField],
                                item[labelField],
                              )
                            }>
                            <View
                              key={item.id}
                              style={[
                                styles.list,
                                Theme.shadow,
                                {
                                  backgroundColor:
                                    selectedValue.id === item.id
                                      ? Colors.primary
                                      : Colors.white,
                                },
                              ]}>
                              <Text
                                style={[
                                  {
                                    color:
                                      selectedValue.id === item.id
                                        ? Colors.white
                                        : Colors.black,
                                  },
                                ]}>
                                {item[labelField]}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                      // initialScrollIndex={selectedValue.id - 1}
                      // getItemLayout={getItemLayout}
                      onScrollToIndexFailed={({}) => {}}
                    />
                  ) : (
                    <View style={styles.nodata}>
                      {errorMessage === '' ? (
                        <NoneDataComponent />
                      ) : (
                        errorMessage
                      )}
                    </View>
                  )}
                </View>
              )}
            </SafeAreaView>
          </Modal>
        )}
      </View>
    );
  },
);
export default memo(SelectionComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
  iconDropDown: {
    position: 'absolute',
    right: 10,
  },
  barCodeView: {
    position: 'absolute',
    right: 10,
  },
  barCodeIcon: {
    width: HEIGHT_TEXT_MEDIUM / 2,
    height: HEIGHT_TEXT_MEDIUM / 2,
  },
  selectionContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    margin: 10,
    marginTop: Platform.OS === 'android' ? 25 : 0,
  },
  buttonSearch: {
    borderWidth: 1,
    borderColor: Colors.border,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  labelPlaceholder: {
    color: Colors.gray,
  },
  safeView: {
    flex: 1,
  },
  searchControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  valueControl: {
    flex: 1,
  },
  iconBack: {
    flex: 0.1,
    marginRight: 10,
  },
  textSearch: {
    flex: 0.9,
  },
  list: {
    flex: 1,
    borderWidth: 1,
    height: HEIGHT_TEXT_INPUT,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    borderColor: Colors.border,
    flexDirection: 'row',
  },
  nodata: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNoData: {
    color: Colors.black,
  },
});
