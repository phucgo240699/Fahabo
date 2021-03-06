import React, {useEffect, useState} from 'react';
import {Avatar, FlatList, ScrollView, useDisclose} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryButton from '@components/PrimaryButton';
import {
  backButtonIcon,
  cameraIcon,
  clearIcon,
  editProfileIcon,
  locationsIcon,
  qrCodeIcon,
  tickIcon,
} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Constants, Pagination, ScreenName} from '@constants/Constants';
import {RefreshControl, StyleSheet} from 'react-native';
import fonts, {PrimaryFontBold} from '@themes/fonts';
import PreviewAlbumBox from '@screens/albums/shared/PreviewAlbumBox';
import i18n from '@locales/index';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {navigate} from '@navigators/index';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFamilyMembersRequestAction,
  getFamilyMembersSuccessAction,
  kickFamilyMemberRequestAction,
  leaveFamilyRequestAction,
  updateFamilyInfoRequestAction,
  updateFamilyThumbnailRequestAction,
} from '@store/actionTypes/family';
import {
  familyDetailSelector,
  membersInFamilySelector,
} from '@store/selectors/family';
import {isNull} from '@utils/index';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import {
  accessTokenSelector,
  userSelector,
} from '@store/selectors/authentication';
import {isRefreshingFamilyMembersSelector} from '@store/selectors/family';
import ImageCropPicker from 'react-native-image-crop-picker';
import {previewAlbumSelector} from '@store/selectors/albums';
import {MemberType} from '@constants/types/family';
import {
  getPreviewAlbumRequestAction,
  getPreviewAlbumSuccessAction,
} from '@store/actionTypes/albums';
import {hasLocationPermission} from '@utils/locations';

interface Props {
  route?: any;
}

const FamilyDetailScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const accessToken = useSelector(accessTokenSelector);
  const user = useSelector(userSelector);
  const previewAlbum = useSelector(previewAlbumSelector);
  const familyDetail = useSelector(familyDetailSelector);
  const membersInFamily = useSelector(membersInFamilySelector);
  const isRefreshingMembers = useSelector(isRefreshingFamilyMembersSelector);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [allowEdit, setAllowEdit] = useState(false);
  const [name, setName] = useState(familyDetail?.name);
  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState(familyDetail?.thumbnail);

  // Life Cycle
  useEffect(() => {
    if (!isNull(familyDetail?.id)) {
      dispatch(getFamilyMembersSuccessAction([]));
      dispatch(getPreviewAlbumSuccessAction([]));
      dispatch(getPreviewAlbumRequestAction({familyId: familyDetail?.id}));
      dispatch(
        getFamilyMembersRequestAction({
          familyId: familyDetail?.id,
        }),
      );
    }
  }, []);
  useEffect(() => {
    if (
      route &&
      route.params &&
      route.params.thumbnailUri &&
      route.params.thumbnailBase64
    ) {
      setThumbnailUri(route.params.thumbnailUri);
      setThumbnailBase64(route.params.thumbnailBase64);
    }
  }, [route]);

  // Refresh
  const onRefreshingFamilyDetail = () => {
    if (isRefreshingMembers === false) {
      dispatch(getPreviewAlbumRequestAction({familyId: familyDetail?.id}));
      dispatch(
        getFamilyMembersRequestAction({
          refresh: true,
          familyId: familyDetail?.id,
        }),
      );
    }
  };

  // Navigate Back
  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  // Edit Button
  const onPressEdit = () => {
    setAllowEdit(true);
  };

  // QR Button
  const onPressQRCode = () => {
    if (!isNull(familyDetail?.id)) {
      navigate(ScreenName.QRPresenterScreen, {
        value: familyDetail?.id,
        instruction: i18n.t('family.scanInstruction'),
        iconUri: familyDetail?.thumbnail,
      });
    }
  };

  // Location Button
  const onPressLocation = () => {
    hasLocationPermission().then(allow => {
      if (allow) {
        navigate(ScreenName.LocationsScreen);
      }
    });
  };

  // Update
  const onPressThumbnail = () => {
    onOpen();
  };
  const onChangeName = (text: string) => {
    setName(text);
  };
  const onUpdate = () => {
    setAllowEdit(false);
    if (!isNull(name)) {
      dispatch(
        updateFamilyInfoRequestAction({familyId: familyDetail?.id, name: name}),
      );
    }
    if (!isNull(thumbnailBase64)) {
      dispatch(
        updateFamilyThumbnailRequestAction({
          familyId: familyDetail?.id,
          thumbnail: {base64Data: thumbnailBase64},
        }),
      );
    }
  };
  const onPressKickMember = (item: any) => {
    dispatch(
      kickFamilyMemberRequestAction({
        familyId: familyDetail?.id,
        userIdToKick: item.id,
      }),
    );
  };

  // Members
  const onPressViewAllMembers = () => {
    if (!isNull(familyDetail?.id)) {
      navigate(ScreenName.FamilyMembersScreen, {familyId: familyDetail?.id});
    }
  };
  const renderItem = ({item}: {item: MemberType}) => {
    const onPressContainer = () => {
      onPressKickMember(item);
    };
    return (
      <>
        {allowEdit && user?.id !== item.id && item.isHost !== true ? (
          <AvatarContainer onPress={onPressContainer}>
            <Avatar
              source={{
                uri: item.avatar,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }}
            />
            <KickIcon source={clearIcon} />
          </AvatarContainer>
        ) : (
          <Avatar
            mr={3}
            source={{
              uri: item.avatar,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
          />
        )}
      </>
    );
  };

  // Photo
  const onPressViewAllPhotos = () => {
    navigate(ScreenName.AlbumsScreen, {familyId: familyDetail?.id});
  };
  const onPressPhotoItem = (index: number) => {
    navigate(ScreenName.ImageViewerScreen, {
      data: previewAlbum,
      currentIndex: index,
    });
  };

  // Leave
  const onPressLeave = () => {
    if (!isNull(familyDetail?.id)) {
      dispatch(leaveFamilyRequestAction({familyId: familyDetail?.id}));
    }
  };

  // ActionSheet
  const takePhoto = () => {
    onClose();
    setTimeout(() => {
      navigate(ScreenName.CameraScreen, {fromFamilyDetail: true});
    }, 500);
  };
  const chooseFromGallery = () => {
    onClose();
    ImageCropPicker.openPicker({
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      width: Constants.FAMILY_THUMBNAIL_WIDTH,
      height: Constants.FAMILY_THUMBNAIL_HEIGHT,
    }).then(cropped => {
      if (!isNull(cropped.path) && !isNull(cropped.data)) {
        setThumbnailUri(cropped.path ?? '');
        setThumbnailBase64(cropped.data ?? '');
      }
    });
  };

  const members = isNull(membersInFamily)
    ? []
    : membersInFamily.filter((item, index) => {
        return index < Pagination.FamilyMembers;
      });
  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.THEME_COLOR_4}
      />
      <ScrollView
        bgColor={colors.WHITE}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshingMembers}
            onRefresh={onRefreshingFamilyDetail}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <Banner>
          <BackButton onPress={onPressBack}>
            <PrimaryIcon width={48} height={48} source={backButtonIcon} />
          </BackButton>
          {allowEdit ? (
            <EditButton
              leftIconWidth={28}
              leftIconHeight={28}
              onPress={onUpdate}
              leftSource={tickIcon}
              leftTintColor={colors.BLACK}
            />
          ) : (
            <EditButton
              leftIconWidth={28}
              leftIconHeight={28}
              onPress={onPressEdit}
              leftSource={editProfileIcon}
              leftTintColor={colors.BLACK}
            />
          )}
          <QRButton
            leftSource={qrCodeIcon}
            onPress={onPressQRCode}
            leftTintColor={colors.BLACK}
          />
          <LocationButton
            leftSource={locationsIcon}
            onPress={onPressLocation}
            leftTintColor={colors.BLACK}
          />
        </Banner>
        <ThumbnailContainer
          disabled={!allowEdit}
          activeOpacity={0.6}
          onPress={onPressThumbnail}>
          <Thumbnail source={{uri: thumbnailUri}} />
          {allowEdit && (
            <CameraIconContainer>
              <CameraIconImage source={cameraIcon} />
            </CameraIconContainer>
          )}
        </ThumbnailContainer>
        <Content>
          <Name value={name} editable={allowEdit} onChangeText={onChangeName} />
          <HLine />
          {members.length > 0 && (
            <>
              <MemberHeader>
                <MemberLabel>{i18n.t('family.members')}</MemberLabel>
                <PrimaryButton
                  titleColor={colors.HYPER_LINK}
                  title={i18n.t('family.viewAll')}
                  onPress={onPressViewAllMembers}
                />
              </MemberHeader>
              <FlatList
                mt={1}
                horizontal
                data={members}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}
          <PreviewAlbumBox
            data={previewAlbum}
            onPressItem={onPressPhotoItem}
            onPressViewAll={onPressViewAllPhotos}
          />

          <PrimaryButton
            marginTop={40}
            titleColor={colors.RED_1}
            title={i18n.t('family.leave')}
            onPress={onPressLeave}
          />

          <PrimaryActionSheet
            isOpen={isOpen}
            onClose={onClose}
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
          />
        </Content>
      </ScrollView>
    </SafeView>
  );
};

const SafeView = styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight()}px;
  background-color: ${colors.THEME_COLOR_4};
`;

const Banner = styled.View`
  width: 100%;
  height: 150px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: ${colors.THEME_COLOR_4};
`;

const Name = styled.TextInput`
  font-size: 25px;
  text-align: center;
  color: ${colors.BLACK};
  font-family: ${PrimaryFontBold};
`;

const BackButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  margin-top: 10px;
  margin-left: 10px;
`;

const EditButton = styled(PrimaryButton)`
  top: 8px;
  right: 14px;
  position: absolute;
`;

const QRButton = styled(PrimaryButton)`
  top: 10px;
  right: 60px;
  position: absolute;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${colors.BLACK};
`;

const LocationButton = styled(PrimaryButton)`
  top: 10px;
  right: 110px;
  position: absolute;
  border-color: ${colors.BLACK};
`;

const ThumbnailContainer = styled.TouchableOpacity`
  elevation: 10;
  overflow: hidden;
  margin-top: -80px;
  border-radius: 10px;
  shadow-radius: 16px;
  shadow-opacity: 0.2;
  align-items: center;
  justify-content: center;
  shadow-color: ${colors.BLACK};
`;
const Thumbnail = styled.Image`
  resize-mode: contain;
  background-color: ${colors.WHITE};
  width: ${Constants.MAX_WIDTH - 100}px;
  height: ${((Constants.MAX_WIDTH - 100) / 16) * 10}px;
`;
const CameraIconContainer = styled.View`
  padding: 10px;
  position: absolute;
  border-radius: 30px;
  background-color: #f2f2f2;
`;
const CameraIconImage = styled.Image`
  width: 32px;
  height: 32px;
`;

const Content = styled.View`
  flex: 1;
  padding: 30px;
`;

const HLine = styled.View`
  height: 1px;
  margin-top: 20px;
  width: ${Constants.MAX_WIDTH - 60}px;
  background-color: ${colors.CONCRETE};
`;

const MemberHeader = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
`;

const MemberLabel = styled(fonts.PrimaryFontMediumSize14)``;

const AvatarContainer = styled.TouchableOpacity`
  margin-right: 12px;
`;

const KickIcon = styled.Image`
  width: 16px;
  right: -2px;
  bottom: 0px;
  height: 16px;
  border-radius: 8px;
  position: absolute;
  tint-color: #c0c0c0;
  background-color: #ffffff;
`;

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
  },
});

export default FamilyDetailScreen;
