import React from 'react';
import {
  profileBackground,
  defaultAvatar,
  cameraIcon,
} from '@constants/sources/index';
import fonts from '@themes/fonts';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import PrimaryIcon from '@components/PrimaryIcon';
import PrimaryButton from '@components/PrimaryButton';
import {getInset} from 'react-native-safe-area-view';
import ProfileAlbumBox from './shared/ProfileAlbumBox';
import {ImageBackground, StyleSheet} from 'react-native';
import {navigate, navigateReset} from '@navigators/index';
import ProfileRelationBox from './shared/ProfileRelationBox';
import ProfileSettingsBox from './shared/ProfileSettingsBox';
import {Avatar, Box, Actionsheet, useDisclose} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Constants, ScreenName, StackName} from '@constants/Constants';
import PrimaryActionSheetItem from '@components/PrimaryActionSheetItem';

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
  const {isOpen, onOpen, onClose} = useDisclose();
  const bottomInset = getInset('bottom', false);

  const onLogOut = () => {
    navigateReset(StackName.AuthenticationStack);
  };

  const onPressFamilies = () => {
    navigate(ScreenName.FamiliesScreen);
  };
  const onPressProfile = () => {
    navigate(ScreenName.UpdateProfileScreen);
  };
  const onPressSettings = () => {
    navigate(ScreenName.SettingsScreen);
  };
  const onPressChores = () => {
    navigate(ScreenName.MyChoresScreen);
  };
  const onPressEvents = () => {
    navigate(ScreenName.MyEventsScreen);
  };
  const takePhoto = () => {
    onClose();
    setTimeout(() => {
      navigate(ScreenName.CameraScreen);
    }, 500);
  };
  const chooseFromGallery = () => {
    onClose();
    setTimeout(() => {
      navigate(ScreenName.MediaPickerScreen);
    }, 500);
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
              onPressChores={onPressChores}
              onPressEvents={onPressEvents}
            />

            <ProfileSettingsBox
              onPressFamilies={onPressFamilies}
              onPressSettings={onPressSettings}
              onPressUpdateProfile={onPressProfile}
            />

            <ProfileAlbumBox />

            <PrimaryButton
              titleColor={colors.RED_1}
              title={i18n.t('profile.logOut')}
              onPress={onLogOut}
            />
          </Content>

          <AvatarContainer activeOpacity={0.7} onPress={onOpen}>
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

        <Actionsheet
          pb={bottomInset}
          isOpen={isOpen}
          onClose={onClose}
          bgColor={colors.WHITE}>
          <PrimaryActionSheetItem
            title={i18n.t('popUp.takePhoto')}
            onPress={takePhoto}
          />
          <HLine />
          <PrimaryActionSheetItem
            title={i18n.t('popUp.chooseFromGallery')}
            onPress={chooseFromGallery}
          />
          <HLine />
          <PrimaryActionSheetItem
            title={i18n.t('popUp.cancel')}
            titleColor={colors.RED_1}
            onPress={onClose}
          />
        </Actionsheet>
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

const HLine = styled.View`
  width: 80%;
  height: 1px;
  background-color: ${colors.CONCRETE};
`;

const styles = StyleSheet.create({
  profileContainer: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    backgroundColor: colors.CONCRETE,
  },
  profileBackground: {
    width: Constants.MAX_WIDTH,
    height: 300,
  },
  scrollView: {
    marginTop: 50,
    paddingBottom: 150,
    alignItems: 'center',
  },
});

export default ProfileScreen;
