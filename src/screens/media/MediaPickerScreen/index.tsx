import fonts from '@themes/fonts';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {Image, ScrollView} from 'native-base';
import {Constants} from '@constants/Constants';
import React, {useEffect, useState} from 'react';
import ProfileHeader from '@components/ProfileHeader';
import CameraRoll from '@react-native-community/cameraroll';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import Photo from './shared/Photo';
import {useDispatch} from 'react-redux';
import {updateProfileAvatarRequestAction} from '@store/actionTypes/profile';
import {convertToBase64String, isNull} from '@utils/index';

interface Props {
  route?: any;
}

const MediaPickerScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState<CameraRoll.PhotoIdentifier[]>([]);

  const onChoosePhoto = (item: any) => {
    console.log(item.node.image.uri);
    if (route && route.params && route.params.updateProfileAvatar) {
      convertToBase64String(item.node.image.uri).then(base64 => {
        dispatch(
          updateProfileAvatarRequestAction({
            avatar: {
              name: 'avatar.jpeg',
              base64Data: base64,
            },
          }),
        );
      });
    }
  };

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 80,
      assetType: 'Photos',
    })
      .then(result => {
        setPhotos(result.edges);
      })
      .catch(err => {
        console.log({err});
      });
  }, []);
  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('media.chooseAPhoto')}
        backgroundColor={colors.WHITE}
      />
      <Container>
        {photos.length === 0 ? (
          <EmptyText>{i18n.t('media.emptyGallery')}</EmptyText>
        ) : (
          <ScrollView contentContainerStyle={styles.scroll}>
            {photos.map((item, index) => {
              return (
                // <PhotoContainer key={index}>
                //   <Image
                //     flex={1}
                //     source={{uri: item.node.image.uri}}
                //     alt={i18n.t('application.loading')}
                //   />
                // </PhotoContainer>
                <Photo key={index} item={item} onPress={onChoosePhoto} />
              );
            })}
          </ScrollView>
        )}
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PhotoContainer = styled.TouchableOpacity`
  margin-top: 5px;
  width: ${(Constants.MAX_WIDTH - 35) / 4}px;
  height: ${(Constants.MAX_WIDTH - 35) / 4}px;
`;

const EmptyText = styled(fonts.PrimaryFontBoldSize25)`
  color: ${colors.SILVER};
`;

const styles = StyleSheet.create({
  scroll: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default MediaPickerScreen;
