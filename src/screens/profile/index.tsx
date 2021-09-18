import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {navigateReset} from '@navigators/index';
import {Avatar, Box, ScrollView} from 'native-base';
import ProfileAlbumBox from './shared/ProfileAlbumBox';
import {ImageBackground, StyleSheet} from 'react-native';
import {Constants, StackName} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {profileBackground, defaultAvatar} from '@constants/sources/index';

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
        <Avatar
          top={9}
          zIndex={1}
          size="2xl"
          alignSelf="center"
          position="absolute"
          backgroundColor={'transparent'}
          source={DATA.avatarUrl ? {uri: DATA.avatarUrl} : defaultAvatar}
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Box mt={20} alignItems="center" justifyContent="center">
            <NameText>{DATA.name}</NameText>
            <EmailText>{DATA.email ?? DATA.phoneNumber}</EmailText>
          </Box>
          <ProfileAlbumBox />
        </ScrollView>
      </ImageBackground>
    </Box>
  );
};

const NameText = styled(fonts.PrimaryFontBoldSize25)`
  color: ${colors.THEME_OPPOSITE_COLOR_10};
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
    flex: 1,
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
});

export default ProfileScreen;
