import React from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';
import {RNCamera} from 'react-native-camera';
import {StyleSheet} from 'react-native';
import PrimaryIcon from '@components/PrimaryIcon';
import {cameraIcon} from '@constants/sources';

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
        backgroundColor={colors.BLACK}
      />
      <AuthenticationHeader />
      <RNCamera
        style={styles.preview}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') {
            return <></>;
          }
          return (
            <SnapContainer
              onPress={() => {
                takePicture(camera);
              }}>
              <PrimaryIcon width={40} height={40} source={cameraIcon} />
            </SnapContainer>
          );
        }}
      </RNCamera>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.BLACK};
`;

const SnapContainer = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 40px;
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
