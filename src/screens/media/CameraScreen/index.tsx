import React from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {cameraIcon} from '@constants/sources';
import styled from 'styled-components/native';
import PrimaryIcon from '@components/PrimaryIcon';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

interface Props {}

const CameraScreen: React.FC<Props> = ({}) => {
  const takePicture = async function (camera: any) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
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
      />
      <RNCamera
        style={styles.preview}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}>
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
  background-color: ${colors.WHITE};
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
