import React, {createRef, LegacyRef, useRef} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {navigate, navigateReset} from '@navigators/index';
import {Avatar, Box} from 'native-base';
import ProfileAlbumBox from './shared/ProfileAlbumBox';
import {ImageBackground, StyleSheet} from 'react-native';
import {Constants, ScreenName, StackName} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {
  profileBackground,
  defaultAvatar,
  cameraIcon,
} from '@constants/sources/index';
import PrimaryButton from '@components/PrimaryButton';
import i18n from '@locales/index';
import ProfileSettingsBox from './shared/ProfileSettingsBox';
import ProfileRelationBox from './shared/ProfileRelationBox';
import PrimaryIcon from '@components/PrimaryIcon';
import ActionSheet from 'react-native-actions-sheet';
import {stubTrue} from 'lodash';

interface DataProps {
  name?: string;
  email?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

const DATA: DataProps = {
  name: 'Lý Hiền Phúc',
  email: 'phucgo240699@gmail.com',
  phoneNumber: '0908376416',
  avatarUrl:
    'https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/53014737_2233858510162760_5278280928634863616_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gfj-D8f-ThUAX___DMV&_nc_ht=scontent-hkt1-2.xx&oh=549ee43899ea3723475b63f5ae5d50dd&oe=61696260',
};

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
  let pictureOptionsRef = createRef<LegacyRef<ActionSheet>>();
  const onLogOut = () => {
    navigateReset(StackName.AuthenticationStack);
  };
  const navigateToUpdateProfile = () => {
    navigate(ScreenName.UpdateProfileScreen);
  };
  const navigateToSettings = () => {
    navigate(ScreenName.SettingsScreen);
  };
  const navigateToChores = () => {
    navigate(ScreenName.MyChoresScreen);
  };
  const navigateToEvents = () => {
    navigate(ScreenName.MyEventsScreen);
  };
  const openPictureOptions = () => {
    pictureOptionsRef.current?.setModalVisible(true);
  };
  const closePictureOptions = () => {
    pictureOptionsRef.current?.setModalVisible(false);
  };

  return (
    <Box flex={1}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.THEME_COLOR_4}
      />
      <ImageBackground
        source={profileBackground}
        style={styles.profileContainer}
        imageStyle={styles.profileBackground}>
        <Scroll
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <EmptyView />
          <Content>
            <Box alignItems="center" justifyContent="center">
              <NameText>{DATA.name}</NameText>
              <EmailText>{DATA.email ?? DATA.phoneNumber}</EmailText>
            </Box>

            <ProfileRelationBox
              onPressChores={navigateToChores}
              onPressEvents={navigateToEvents}
            />

            <ProfileSettingsBox
              onPressSettings={navigateToSettings}
              onPressUpdateProfile={navigateToUpdateProfile}
            />
            <ProfileAlbumBox />
            <PrimaryButton
              titleColor={colors.RED_1}
              title={i18n.t('profile.logOut')}
              onPress={onLogOut}
            />
          </Content>
          <AvatarContainer activeOpacity={0.7} onPress={openPictureOptions}>
            <Avatar
              size="2xl"
              backgroundColor={'transparent'}
              source={DATA.avatarUrl ? {uri: DATA.avatarUrl} : defaultAvatar}
            />
            <CameraIconContainer>
              <PrimaryIcon width={24} height={24} source={cameraIcon} />
            </CameraIconContainer>
          </AvatarContainer>
        </Scroll>
        <ActionSheet ref={pictureOptionsRef}>
          <PictureOptionContainer>
            <PictureOptionText>{i18n.t('popUp.takePhoto')}</PictureOptionText>
          </PictureOptionContainer>
          <HLine />
          <PictureOptionContainer>
            <PictureOptionText>
              {i18n.t('popUp.chooseFromGallery')}
            </PictureOptionText>
          </PictureOptionContainer>
          <HLine />
          <PictureOptionContainer onPress={closePictureOptions}>
            <PictureOptionCancelText>
              {i18n.t('popUp.cancel')}
            </PictureOptionCancelText>
          </PictureOptionContainer>
        </ActionSheet>
      </ImageBackground>
    </Box>
  );
};

const EmptyView = styled.View`
  height: 68px;
`;

const Scroll = styled.ScrollView``;

const Content = styled.View`
  width: 90%;
  height: 200%;
  padding-top: 68px;
  padding-left: 30px;
  padding-right: 30px;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${colors.WHITE};
`;

const AvatarContainer = styled.TouchableOpacity`
  align-self: center;
  position: absolute;
`;

const CameraIconContainer = styled.View`
  right: 0px;
  bottom: 0px
  width: 38px;
  height: 38px;
  position: absolute;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background-color: ${colors.CONCRETE};
`;

const NameText = styled(fonts.PrimaryFontBoldSize25)`
  color: ${colors.BLACK};
`;

const EmailText = styled(fonts.PrimaryFontMediumSize14)`
  color: ${colors.SILVER};
`;

const PictureOptionContainer = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  justify-content: center;
`;

const PictureOptionText = styled(fonts.PrimaryFontMediumSize16)`
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  color: ${colors.DANUBE};
`;

const HLine = styled.View`
  height: 1px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: ${colors.SILVER};
`;

const PictureOptionCancelText = styled(fonts.PrimaryFontMediumSize16)`
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  color: ${colors.RED_1};
`;

const styles = StyleSheet.create({
  profileContainer: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  profileBackground: {
    width: Constants.MAX_WIDTH,
    height: 300,
  },
  scrollView: {
    marginTop: 50,
    paddingBottom: 120,
    alignItems: 'center',
  },
  pictureOptions: {
    backgroundColor: colors.WHITE,
  },
});

export default ProfileScreen;
