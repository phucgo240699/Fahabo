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
  defaultFamilyThumbnail,
  editProfileIcon,
  qrCodeIcon,
  tickIcon,
} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Constants, Pagination, ScreenName} from '@constants/Constants';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {DummyAlbums} from '@constants/DummyData';
import fonts, {PrimaryFontBold} from '@themes/fonts';
import PreviewAlbumBox from '@screens/albums/shared/PreviewAlbumBox';
import i18n from '@locales/index';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {navigate} from '@navigators/index';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFamilyMembersRequestAction,
  getRefreshFamilyMembersRequestAction,
  kickFamilyMemberRequestAction,
  leaveFamilyRequestAction,
  updateFamilyInfoRequestAction,
  updateFamilyThumbnailRequestAction,
} from '@store/actionTypes/family';
import {membersInFamilySelector} from '@store/selectors/family';
import {isNull} from '@utils/index';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import {userSelector} from '@store/selectors/authentication';
import {isRefreshingFamilyMembersSelector} from '@store/selectors/session';
import ImageCropPicker from 'react-native-image-crop-picker';

interface Props {
  route?: any;
}

const FamilyDetailScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isOpen, onOpen, onClose} = useDisclose();
  const user = useSelector(userSelector);
  const isRefreshingMembers = useSelector(isRefreshingFamilyMembersSelector);
  const familyDetail = route.params.familyDetail; //useSelector(familyDetailSelector);
  const membersInFamily = useSelector(membersInFamilySelector);
  const [allowEdit, setAllowEdit] = useState(false);
  const [name, setName] = useState(familyDetail?.name);
  const [thumbnailUri, setThumbnailUri] = useState(familyDetail?.thumbnail);
  const [thumbnailBase64, setThumbnailBase64] = useState('');

  // Life Cycle
  useEffect(() => {
    if (!isNull(familyDetail?.id)) {
      dispatch(getFamilyMembersRequestAction({familyId: familyDetail?.id}));
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
      dispatch(
        getRefreshFamilyMembersRequestAction({familyId: familyDetail?.id}),
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
      });
    }
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
  const renderItem = ({item}: {item: any}) => {
    const onPressContainer = () => {
      onPressKickMember(item);
    };
    return (
      <>
        {allowEdit && user?.id !== item.id ? (
          <AvatarContainer onPress={onPressContainer}>
            <Avatar source={{uri: item.avatar}} />
            <KickIcon source={clearIcon} />
          </AvatarContainer>
        ) : (
          <Avatar mr={3} source={{uri: item.avatar}} />
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
      data: DummyAlbums,
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
        </Banner>
        {!isNull(familyDetail?.thumbnail) ? (
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
        ) : (
          <ThumbnailContainer
            disabled={!allowEdit}
            activeOpacity={0.6}
            onPress={onPressThumbnail}>
            <Thumbnail source={defaultFamilyThumbnail} />
            {allowEdit && (
              <CameraIconContainer>
                <CameraIconImage source={cameraIcon} />
              </CameraIconContainer>
            )}
          </ThumbnailContainer>
        )}
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
            data={DummyAlbums}
            onPressItem={onPressPhotoItem}
            onPressViewAll={onPressViewAllPhotos}
          />

          <PrimaryButton
            marginTop={30}
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

const SafeView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
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
  margin-top: 10px;
  margin-left: 10px;
`;

const EditButton = styled(PrimaryButton)`
  top: 8px;
  right: 70px;
  position: absolute;
`;

const QRButton = styled(PrimaryButton)`
  top: 10px;
  right: 14px;
  position: absolute;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${colors.BLACK};
`;

const ThumbnailContainer = styled.TouchableOpacity`
  overflow: hidden;
  margin-top: -80px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
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
