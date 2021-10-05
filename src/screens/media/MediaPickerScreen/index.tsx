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

interface Props {}

const MediaPickerScreen: React.FC<Props> = ({}) => {
  const [photos, setPhotos] = useState<CameraRoll.PhotoIdentifier[]>([]);
  useEffect(() => {
    CameraRoll.getPhotos({
      first: 20,
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
                <PhotoContainer key={index}>
                  <Image
                    borderRadius={10}
                    width={Constants.MAX_WIDTH / 5}
                    height={Constants.MAX_WIDTH / 5}
                    source={{uri: item.node.image.uri}}
                    alt={i18n.t('application.loading')}
                  />
                </PhotoContainer>
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

const PhotoContainer = styled.TouchableOpacity<{marginLeft?: number}>`
  margin: 5px;
`;

const EmptyText = styled(fonts.PrimaryFontBoldSize25)`
  color: ${colors.SILVER};
`;

const styles = StyleSheet.create({
  scroll: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default MediaPickerScreen;
