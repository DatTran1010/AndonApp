import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import {ChooseImageComponent, IconTypeComponent} from '../../../components';
import {ImageType} from '../../../types/CommonType';

type Props = {
  onSelectDataImage?: (dataImage: ImageType[]) => void;
};
export default function ChooseImage(props: Props) {
  const {onSelectDataImage} = props;
  const [showOption, setShowOption] = React.useState(false);
  const bottomSheetRef = React.useRef<{
    handleCloseAcctionSheet: () => void;
  }>(null);

  const handleShowOption = () => {
    setShowOption(!showOption);
  };

  const handleChooseImage = (type: 'libary' | 'camera') => {
    if (type === 'libary') {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: false,
        cropperToolbarTitle: 'Chỉnh sửa ảnh',
        cropperStatusBarColor: 'red',
        multiple: true,
        maxFiles: 10,
        loadingLabelText: 'Processing assets...',
        // includeBase64: true,
      }).then(image => {
        handleShowOption();

        if (image) {
          const dataTemp: ImageType[] = [];
          image.map(item => {
            dataTemp.push({
              uri: Platform.OS === 'ios' ? item.sourceURL : item.path,
              name:
                item.filename ||
                Math.floor(Math.random() * Math.floor(999999)) + '.png',
              type: 'image/' + item.mime?.replace('image/', '') || 'image/jpeg',
            });
          });

          onSelectDataImage && onSelectDataImage(dataTemp);
        }
      });
    } else {
      ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
      }).then(image => {
        handleShowOption();

        const filename = image.path.split('/').pop()?.replace(' ', '');

        const dataTemp: ImageType[] = [];

        dataTemp.push({
          uri: image.path,
          type: 'image/' + image.mime?.replace('image/', '') || 'image/jpeg',
          name:
            filename || Math.floor(Math.random() * Math.floor(999999)) + '.png',
        });
        onSelectDataImage && onSelectDataImage(dataTemp);
      });
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleShowOption} activeOpacity={0.8}>
        <IconTypeComponent
          iconname="camera"
          iconsize={24}
          activeOpacity={0.8}
        />
      </TouchableOpacity>
      {showOption && (
        <ChooseImageComponent
          ref={bottomSheetRef}
          onClose={handleShowOption}
          onSelectItem={handleChooseImage}
        />
      )}
    </>
  );
}
