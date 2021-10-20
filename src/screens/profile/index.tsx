import React, {useEffect, useState} from 'react';
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
import {ImageBackground, RefreshControl, StyleSheet} from 'react-native';
import {navigate} from '@navigators/index';
import ProfileRelationBox from './shared/ProfileRelationBox';
import ProfileSettingsBox from './shared/ProfileSettingsBox';
import {Box, Actionsheet, useDisclose} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {
  Constants,
  Pagination,
  ScreenName,
  StackName,
} from '@constants/Constants';
import PrimaryActionSheetItem from '@components/PrimaryActionSheetItem';
import {useDispatch, useSelector} from 'react-redux';
import {logOutAction} from '@store/actionTypes/signIn';
import {userSelector} from '@store/selectors/authentication';
import {isNull} from '@utils/index';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  getProfileRequestAction,
  updateProfileAvatarRequestAction,
} from '@store/actionTypes/profile';
import PreviewFamilyBox from '@screens/families/shared/PreviewFamilyBox';
import {DummyFamilies} from '@constants/DummyData';
import PrimaryFastImage from '@components/PrimaryFastImage';
import {isRefreshingProfileSelector} from '@store/selectors/session';
import {
  getFamiliesRequestAction,
  getFamilyDetailRequestAction,
} from '@store/actionTypes/family';
import {myFamiliesSelector} from '@store/selectors/family';

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const families = useSelector(myFamiliesSelector);
  const bottomInset = getInset('bottom', false);
  const isRefreshing = useSelector(isRefreshingProfileSelector);
  const {isOpen, onOpen, onClose} = useDisclose();

  // Life Cycle
  useEffect(() => {
    dispatch(getFamiliesRequestAction({}));
  }, []);

  // Refresh
  const onRefreshProfile = () => {
    dispatch(getProfileRequestAction({}));
    dispatch(getFamiliesRequestAction({}));
  };

  // Relations
  const onPressChores = () => {
    navigate(ScreenName.MyChoresScreen);
  };
  const onPressEvents = () => {
    navigate(ScreenName.MyEventsScreen);
  };

  // Family
  const onPressFamilyItem = (item: any) => {
    dispatch(getFamilyDetailRequestAction({familyId: item.id}));
  };
  const onPressViewAllFamily = () => {
    navigate(ScreenName.FamiliesScreen);
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
    setTimeout(() => {
      launchImageLibrary(
        {mediaType: 'photo', includeBase64: true},
        response => {
          if (
            response.assets !== undefined &&
            !isNull(response.assets[0]?.base64)
          ) {
            dispatch(
              updateProfileAvatarRequestAction({
                avatar: {
                  name: 'avatar.jpg',
                  base64Data: response.assets[0]?.base64,
                },
              }),
            );
          }
        },
      );
    }, 500);
  };

  // Log out
  const onLogOut = () => {
    dispatch(logOutAction());
  };

  return (
    <Box flex={1}>
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
              refreshing={isRefreshing}
              onRefresh={onRefreshProfile}
            />
          }>
          <EmptyView />
          <Content>
            <Box alignItems="center" justifyContent="center">
              <NameText>{user?.name}</NameText>
              <EmailText>{user?.username}</EmailText>
            </Box>

            <ProfileRelationBox
              onPressChores={onPressChores}
              onPressEvents={onPressEvents}
            />

            <PreviewFamilyBox
              data={families.filter((item, index) => {
                return index < Pagination.Family;
              })}
              onPressItem={onPressFamilyItem}
              onPressViewAll={onPressViewAllFamily}
            />

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
              <CacheAvatar source={{uri: user?.avatarUrl ?? ''}} />
            ) : (
              <Avatar source={defaultAvatar} />
            )}
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
  width: ${Constants.MAX_WIDTH - 40}px;
  height: 200%;
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
    marginTop: 50,
    paddingBottom: 150,
    alignItems: 'center',
  },
});

export default ProfileScreen;
