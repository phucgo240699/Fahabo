import React from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {Platform, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {cameraIcon} from '@constants/sources';
import styled from 'styled-components/native';
import PrimaryIcon from '@components/PrimaryIcon';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {useDispatch} from 'react-redux';
import {updateProfileAvatarRequestAction} from '@store/actionTypes/profile';
import {navigate} from '@navigators/index';
import {Constants, ScreenName} from '@constants/Constants';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ImageCropPicker from 'react-native-image-crop-picker';
import {isNull} from '@utils/index';

interface Props {
  route?: any;
}

const CameraScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPressBack = () => {
    if (route && route.params && route.params.fromFamilyOptions) {
      navigate(ScreenName.FamilyOptionsScreen, {
        showCreationModal: true,
      });
    } else if (route && route.params && route.params.fromFamilies) {
      navigate(ScreenName.FamiliesScreen, {
        showCreationModal: true,
      });
    } else {
      navigation.dispatch(CommonActions.goBack());
    }
  };

  const takePicture = async function (camera: any) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    onMakeEffect(data.uri);
  };

  const onMakeEffect = (uri: string) => {
    const cropWidth =
      route.params.updateProfileAvatar === true
        ? Constants.PROFILE_AVATAR_WIDTH
        : Constants.FAMILY_THUMBNAIL_WIDTH;
    const cropHeight =
      route.params.updateProfileAvatar === true
        ? Constants.PROFILE_AVATAR_HEIGHT
        : Constants.FAMILY_THUMBNAIL_HEIGHT;

    ImageCropPicker.openCropper({
      path: uri,
      cropping: true,
      width: cropWidth,
      height: cropHeight,
      mediaType: 'photo',
      includeBase64: true,
    }).then(cropped => {
      if (!isNull(cropped.path) && !isNull(cropped.data)) {
        onAfterEffect(cropped.path ?? '', cropped.data ?? '');
      }
    });
  };

  const onAfterEffect = (uri: string, base64: string) => {
    if (route && route.params && route.params.updateProfileAvatar) {
      dispatch(
        updateProfileAvatarRequestAction({
          avatar: {
            name: 'avatar.jpg',
            base64Data: base64,
          },
        }),
      );
    } else if (route && route.params && route.params.fromFamilyOptions) {
      navigate(ScreenName.FamilyOptionsScreen, {
        thumbnailUri: uri,
        thumbnailBase64: base64,
        showCreationModal: true,
      });
    } else if (route && route.params && route.params.fromFamilies) {
      navigate(ScreenName.FamiliesScreen, {
        thumbnailUri: uri,
        thumbnailBase64: base64,
        showCreationModal: true,
      });
    } else if (route && route.params && route.params.fromFamilyDetail) {
      navigate(ScreenName.FamilyDetailScreen, {
        thumbnailUri: uri,
        thumbnailBase64: base64,
      });
    } else if (route && route.params && route.params.fromCreateChore) {
      navigate(ScreenName.CreateChoreScreen, {
        thumbnailUri: uri,
        thumbnailBase64: base64,
      });
    }
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('media.takeAPhoto')}
        backgroundColor={colors.WHITE}
        onCustomNavigateBack={onPressBack}
      />
      <RNCamera
        style={styles.preview}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}>
        {({camera, status}) => {
          if (status !== 'READY') {
            return <></>;
          }
          return (
            <SnapContainer
              onPress={() => {
                takePicture(camera);
              }}>
              <PrimaryIcon width={36} height={36} source={cameraIcon} />
            </SnapContainer>
          );
        }}
      </RNCamera>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
  background-color: ${colors.WHITE};
`;

const Container = styled.View`
  flex: 1;
  background-color: #000000;
`;

const SnapContainer = styled.TouchableOpacity`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  padding-bottom: 4px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.CONCRETE};
`;

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CameraScreen;
