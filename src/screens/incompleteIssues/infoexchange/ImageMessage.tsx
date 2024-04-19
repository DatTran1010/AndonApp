/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import Colors from '../../../common/Colors';
import {WIDTH_SCREEN} from '../../../common/Dimentions';
import Theme from '../../../common/Theme';
import {ModalComponent} from '../../../components';

type Props = TouchableOpacityProps & {
  imageURL: string[];
};
const ImageMessage = (props: Props) => {
  const {imageURL, onLongPress} = props;
  const [showModalImage, setShowModalImage] = React.useState({
    show: false,
    imageURL: '',
  });

  const handleSelectImage = (image: string) => {
    setShowModalImage(prev => ({...prev, imageURL: image, show: !prev.show}));
  };

  if (imageURL && imageURL.length > 0) {
    return (
      <View className="flex-row gap-1 flex-wrap">
        {imageURL.map((image, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleSelectImage(image);
            }}
            onLongPress={onLongPress}
            key={index}
            style={[
              {
                borderStyle: 'dashed', // Sử dụng 'dashed' để tạo nét đứt
                borderWidth: 1,
                borderRadius: 10,
                borderColor: Colors.gray,
                height: WIDTH_SCREEN / 3,
                width: WIDTH_SCREEN / 3,
              },
              Theme.shadow,
            ]}>
            <Image
              source={{uri: image}}
              className="w-full h-full"
              resizeMode="cover"
              style={{borderRadius: 10}}
            />
          </TouchableOpacity>
        ))}

        {showModalImage.show && (
          <ModalComponent
            title=""
            height="85%"
            onClose={() => {
              handleSelectImage('');
            }}>
            <View className="flex-1">
              <Image
                source={{
                  uri: showModalImage.imageURL,
                }}
                className="w-full h-full"
                resizeMode="contain"
                style={{borderRadius: 10}}
              />
            </View>
          </ModalComponent>
        )}
      </View>
    );
  } else {
    return null;
  }
};

export default ImageMessage;
