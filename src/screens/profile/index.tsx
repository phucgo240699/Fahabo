import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {navigate, navigateReset} from '@navigators/index';
import {Avatar, Box} from 'native-base';
import ProfileAlbumBox from './shared/ProfileAlbumBox';
import {ImageBackground, StyleSheet} from 'react-native';
import {Constants, ScreenName, StackName} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {profileBackground, defaultAvatar} from '@constants/sources/index';
import PrimaryButton from '@components/PrimaryButton';
import i18n from '@locales/index';
import ProfileSettingsBox from './shared/ProfileSettingsBox';

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
  const onLogOut = () => {
    navigateReset(StackName.AuthenticationStack);
  };
  const onNavigateToUpdateProfile = () => {
    navigate(ScreenName.UpdateProfileScreen);
  };
  const onNavigateToSettings = () => {
    navigate(ScreenName.SettingsScreen);
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
          bounces={false}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <EmptyView />
          <Content>
            <Box alignItems="center" justifyContent="center">
              <NameText>{DATA.name}</NameText>
              <EmailText>{DATA.email ?? DATA.phoneNumber}</EmailText>
            </Box>
            <ProfileSettingsBox
              onPressSettings={onNavigateToSettings}
              onPressUpdateProfile={onNavigateToUpdateProfile}
            />
            <ProfileAlbumBox />
            <PrimaryButton
              titleColor={colors.RED_1}
              title={i18n.t('profile.logOut')}
              onPress={onLogOut}
            />
          </Content>
          <Avatar
            size="2xl"
            alignSelf="center"
            position="absolute"
            backgroundColor={'transparent'}
            source={DATA.avatarUrl ? {uri: DATA.avatarUrl} : defaultAvatar}
          />
        </Scroll>
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
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${colors.WHITE};
`;

const NameText = styled(fonts.PrimaryFontBoldSize25)`
  color: ${colors.BLACK};
`;

const EmailText = styled(fonts.PrimaryFontMediumSize14)`
  color: ${colors.SILVER};
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
});

export default ProfileScreen;
