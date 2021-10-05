import {useState} from 'react';
import {Platform} from 'react-native';
import React, {useEffect} from 'react';
import ImageView from 'react-native-image-viewing';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {ImageSource} from 'react-native-image-viewing/dist/@types';

interface Props {
  route?: any;
}

const ImageViewerScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState<ImageSource[]>([]);
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (route && route.params) {
      if (route.params.data) {
        setData(route.params.data);
      }
      if (route.params.currentIndex) {
        setCurrentIndex(route.params.currentIndex);
      }
    }
  }, [route]);

  const onClose = () => {
    setVisible(false);
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <ImageView
      visible={visible}
      images={data}
      imageIndex={currentIndex}
      swipeToCloseEnabled
      presentationStyle={
        Platform.OS === 'android' ? 'overFullScreen' : 'fullScreen'
      }
      onRequestClose={onClose}
    />
  );
};

export default ImageViewerScreen;
