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
import {navigate} from '@navigators/index';
import ProfileSettingsBox from './shared/ProfileSettingsBox';
import {Box, useDisclose} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Constants, ScreenName} from '@constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {logOutRequestAction} from '@store/actionTypes/signIn';
import {
  accessTokenSelector,
  userSelector,
} from '@store/selectors/authentication';
import {isNull} from '@utils/index';
import {
  getProfileRequestAction,
  updateProfileAvatarRequestAction,
} from '@store/actionTypes/profile';
import PrimaryFastImage from '@components/PrimaryFastImage';
import {isRefreshingProfileSelector} from '@store/selectors/authentication';
import ImageCropPicker from 'react-native-image-crop-picker';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import {ImageBackground, RefreshControl, StyleSheet} from 'react-native';

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const accessToken = useSelector(accessTokenSelector);
  const isRefreshing = useSelector(isRefreshingProfileSelector);
  const {isOpen, onOpen, onClose} = useDisclose();

  // Refresh
  const onRefreshProfile = () => {
    dispatch(getProfileRequestAction({}));
  };

  // Relations
  const onPressChores = () => {
    navigate(ScreenName.MyChoresScreen);
  };
  const onPressEvents = () => {
    navigate(ScreenName.MyEventsScreen);
  };

  // Settings
  const onPressProfile = () => {
    navigate(ScreenName.UpdateProfileScreen);
  };
  const onPressSettings = () => {
    navigate(ScreenName.SettingsScreen);
  };

  // ActionSheet
  const takePhoto = () => {
    onClose();
    setTimeout(() => {
      navigate(ScreenName.CameraScreen, {updateProfileAvatar: true});
    }, 500);
  };
  const chooseFromGallery = () => {
    onClose();
    ImageCropPicker.openPicker({
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      width: Constants.PROFILE_AVATAR_WIDTH,
      height: Constants.PROFILE_AVATAR_HEIGHT,
    }).then(cropped => {
      if (!isNull(cropped.data)) {
        dispatch(
          updateProfileAvatarRequestAction({
            avatar: {
              name: 'avatar.jpg',
              base64Data: cropped.data ?? '',
            },
          }),
        );
      }
    });
  };

  // Log out
  const onLogOut = () => {
    dispatch(logOutRequestAction());
  };

  return (
    <Box flex={1} safeArea backgroundColor={'#FFD466'}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'#FFD466'}
      />
      <ImageBackground
        source={profileBackground}
        style={styles.profileContainer}
        imageStyle={styles.profileBackground}>
        <Scroll
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing ?? false}
              onRefresh={onRefreshProfile}
            />
          }>
          <EmptyView />
          <Content>
            <Box alignItems="center" justifyContent="center">
              <NameText>{user?.name}</NameText>
              <EmailText>{user?.username}</EmailText>
            </Box>

            <Box mt={5}>
              <PrimaryButton
                title={'My Posts'}
                titleColor={colors.HYPER_LINK}
                onPress={() => {
                  navigate(ScreenName.MyCuisinePostsScreen);
                }}
              />
              <PrimaryButton
                marginTop={5}
                title={'My Favorite Posts'}
                titleColor={colors.HYPER_LINK}
                onPress={() => {
                  navigate(ScreenName.MyBookmarkedCuisinePostsScreen);
                }}
              />
            </Box>

            <ProfileSettingsBox
              onPressSettings={onPressSettings}
              onPressUpdateProfile={onPressProfile}
            />

            <LogOutButton
              marginTop={40}
              titleColor={colors.RED_1}
              title={i18n.t('profile.logOut')}
              onPress={onLogOut}
            />
          </Content>

          <AvatarContainer activeOpacity={0.7} onPress={onOpen}>
            {!isNull(user?.avatarUrl) ? (
              <Avatar
                source={{
                  uri: user?.avatarUrl ?? '',
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }}
              />
            ) : (
              <Avatar source={defaultAvatar} />
            )}
            <CameraIconContainer>
              <PrimaryIcon width={24} height={24} source={cameraIcon} />
            </CameraIconContainer>
          </AvatarContainer>
        </Scroll>

        <PrimaryActionSheet
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
          isOpen={isOpen}
          onClose={onClose}
        />
      </ImageBackground>
    </Box>
  );
};

const EmptyView = styled.View`
  height: 68px;
`;

const Scroll = styled.ScrollView``;

const Content = styled.View`
  width: ${Constants.MAX_WIDTH - 40}px;
  height: ${Constants.MAX_HEIGHT}px;
  padding-top: 68px;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${colors.WHITE};
`;

const AvatarContainer = styled.TouchableOpacity`
  align-self: center;
  position: absolute;
`;

const CacheAvatar = styled(PrimaryFastImage)`
  width: 128px;
  height: 128px;
  border-radius: 64px;
`;
const Avatar = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 64px;
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

const LogOutButton = styled(PrimaryButton)`
  padding-left: 1px;
  padding-right: 1px;
  padding-bottom: 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.RED_1};
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
    paddingBottom: 150,
    alignItems: 'center',
  },
});

export default ProfileScreen;
