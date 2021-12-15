import React, {useEffect, useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PrimaryButton from '@components/PrimaryButton';
import {navigate} from '@navigators/index';
import {Constants, ScreenName} from '@constants/Constants';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import ProfileHeader from '@components/ProfileHeader';
import {isNull} from '@utils/index';
import {cameraIcon, rectanglePlaceHolderImage} from '@constants/sources';
import {Input, useDisclose} from 'native-base';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import ImageCropPicker from 'react-native-image-crop-picker';

const thumbnailWidth = Constants.MAX_WIDTH;
const thumbnailHeight = (thumbnailWidth / 4) * 3;

interface Props {
  route?: any;
}

const PreCreateCuisinePostScreen: React.FC<Props> = ({route}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [title, setTitle] = useState('');
  const [thumbnailBase64, setThumbnailBase64] = useState('');

  // Life cycle
  useEffect(() => {
    if (route && route.params) {
      if (route.params.thumbnailBase64) {
        setThumbnailBase64(route.params.thumbnailBase64);
      } else if (route.params.preparingPost) {
        const _preparingPost = route.params.preparingPost;
        if (_preparingPost.title) {
          setTitle(_preparingPost.title);
        }
        if (_preparingPost.thumbnail) {
          setThumbnailBase64(_preparingPost.thumbnail);
        }
      }
    }
  }, [route]);

  // Thumbnail
  const onPressThumbnail = () => {
    onOpen();
  };

  // Name
  const onChangeTitle = (value: string) => {
    setTitle(value);
  };

  const onPressNext = () => {
    navigate(ScreenName.CreateCuisinePostScreen, {
      preparingPost: {
        title: title,
        thumbnail: thumbnailBase64,
        content: route.params?.preparingPost?.content ?? '',
        cuisinePostId: route.params?.preparingPost?.cuisinePostId,
      },
    });
  };

  // ActionSheet
  const takePhoto = () => {
    onClose();
    setTimeout(() => {
      navigate(ScreenName.CameraScreen, {fromPreCreateCuisinePost: true});
    }, 500);
  };
  const chooseFromGallery = () => {
    onClose();
    ImageCropPicker.openPicker({
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      width: Constants.CUISINE_POST_THUMBNAIL_WIDTH,
      height: Constants.CUISINE_POST_THUMBNAIL_HEIGHT,
    }).then(cropped => {
      if (!isNull(cropped.data)) {
        setThumbnailBase64(cropped.data ?? '');
      }
    });
  };
  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        rightComponent={
          <PrimaryButton
            marginRight={10}
            title={i18n.t('cuisine.next')}
            onPress={onPressNext}
          />
        }
      />

      <ThumbnailContainer activeOpacity={0.6} onPress={onPressThumbnail}>
        <Thumbnail
          source={
            isNull(thumbnailBase64)
              ? rectanglePlaceHolderImage
              : {
                  uri: thumbnailBase64.slice(0, 10).includes('http')
                    ? thumbnailBase64
                    : `data:image/png;base64,${thumbnailBase64}`,
                }
          }
        />
        <CameraIconContainer>
          <CameraIconImage source={cameraIcon} />
        </CameraIconContainer>
      </ThumbnailContainer>

      <Input
        mt={4}
        value={title}
        color={colors.TEXT}
        autoCapitalize="none"
        borderRadius={0}
        borderRightWidth={0}
        borderLeftWidth={0}
        borderColor={colors.SILVER}
        onChangeText={onChangeTitle}
        placeholder={i18n.t('cuisine.title')}
      />

      <PrimaryActionSheet
        isOpen={isOpen}
        onClose={onClose}
        items={[
          {
            title: i18n.t('popUp.takePhoto'),
            onPress: takePhoto,
          },
          {
            title: i18n.t('popUp.chooseFromGallery'),
            onPress: chooseFromGallery,
          },
        ]}
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const ThumbnailContainer = styled.TouchableOpacity`
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;
const Thumbnail = styled.Image`
  resize-mode: contain;
  width: ${thumbnailWidth}px;
  height: ${thumbnailHeight}px;
  background-color: ${colors.WHITE};
`;
const CameraIconContainer = styled.View`
  padding: 10px;
  position: absolute;
  border-radius: 30px;
  background-color: #f2f2f2;
`;
const CameraIconImage = styled.Image`
  width: 32px;
  height: 32px;
`;

export default PreCreateCuisinePostScreen;
