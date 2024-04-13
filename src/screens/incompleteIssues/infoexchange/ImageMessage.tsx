/* eslint-disable react-native/no-inline-styles */
import {View, Image} from 'react-native';
import React from 'react';
import Colors from '../../../common/Colors';
import {WIDTH_SCREEN} from '../../../common/Dimentions';
import Theme from '../../../common/Theme';

type Props = {
  imageURL: string[];
};
const ImageMessage = (props: Props) => {
  const {imageURL} = props;

  if (imageURL && imageURL.length > 0) {
    return (
      <View className="flex-row gap-1 flex-wrap">
        {imageURL.map((image, index) => (
          <View
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
          </View>
          //   <Text>{image}</Text>
        ))}
      </View>
    );
  } else {
    return null;
  }
};

export default ImageMessage;
