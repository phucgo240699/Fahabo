import React, {useEffect, useState} from 'react';
import {
  Box,
  Input,
  Avatar,
  FlatList,
  FormControl,
  Button,
  useDisclose,
} from 'native-base';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import styled from 'styled-components/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {
  convertOriginDateTimeStringToDate,
  getDateStringFrom,
  getOriginDateString,
  getOriginDateTimeString,
  isNull,
} from '@utils/index';
import PrimaryButton from '@components/PrimaryButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  clearIcon,
  familyIcon,
  plusIcon,
  rightArrowIcon,
} from '@constants/sources';
import {Constants, ScreenName} from '@constants/Constants';
import ChoreStatusBox from '../shared/ChoreStatusBox';
import {ChoreStatus, ChoreType, RepeatType} from '@constants/types/chores';
import DatePicker from 'react-native-date-picker';
import PrimaryIcon from '@components/PrimaryIcon';
import {navigate} from '@navigators/index';
import {MemberType} from '@constants/types/family';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  createChoreRequestAction,
  getChorePhotosRequestAction,
  updateChoreRequestAction,
} from '@store/actionTypes/chores';
import {focusFamilySelector} from '@store/selectors/family';
import {getChoreStatus, getRepeatText, getRepeatType} from '@utils/chores';
import {chorePhotosSelector} from '@store/selectors/chores';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';
import {accessTokenSelector} from '@store/selectors/authentication';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

interface Props {
  route?: any;
}

const CreateChoreScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(accessTokenSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const chorePhotos = useSelector(chorePhotosSelector);
  const {isOpen, onOpen, onClose} = useDisclose();

  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [status, setStatus] = useState<ChoreStatus | undefined>(
    ChoreStatus.IN_PROGRESS,
  );
  const [repeat, setRepeat] = useState<RepeatType>(RepeatType.NONE);
  const [selectedMembers, setSelectedMembers] = useState<MemberType[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<
    {id?: number; uri?: string; base64?: string}[]
  >([]);
  const [deletePhotos, setDeletePhotos] = useState<number[]>([]);
  const [description, setDescription] = useState('');
  const [oldChore, setOldChore] = useState<ChoreType | undefined>(undefined);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const timeZoneOffset = new Date().getTimezoneOffset() * -1;

  useEffect(() => {
    if (route && route.params) {
      setTimeout(() => {
        if (route.params.selectedMembers) {
          setSelectedMembers(route.params.selectedMembers);
        }
        if (route.params.selectedRepeat) {
          setRepeat(route.params.selectedRepeat);
        }
        if (route.params.thumbnailUri && route.params.thumbnailBase64) {
          if (
            selectedPhotos.filter((item, index) => {
              return !isNull(item.base64);
            }).length >= Constants.LIMIT_PHOTO_UPLOAD
          ) {
            dispatch(
              showToastAction(
                `${i18n.t('warningMessage.limitPhotoUpload')} :${
                  Constants.LIMIT_PHOTO_UPLOAD
                }`,
                ToastType.WARNING,
              ),
            );
          } else {
            setSelectedPhotos([
              ...selectedPhotos,
              {
                id: undefined,
                uri: route.params.thumbnailUri,
                base64: route.params.thumbnailBase64,
              },
            ]);
          }
        }
        if (route.params.oldChore) {
          const _oldChore: ChoreType = route.params.oldChore;
          setOldChore(_oldChore);
          setTitle(_oldChore.title ?? '');
          setDeadline(
            convertOriginDateTimeStringToDate(_oldChore.deadline ?? ''),
          );
          setStatus(getChoreStatus(_oldChore.status));
          setRepeat(getRepeatType(_oldChore.repeatType));
          setSelectedMembers(_oldChore.assignees ?? []);
          setDescription(_oldChore.description ?? '');
          dispatch(
            getChorePhotosRequestAction({
              showHUD: true,
              choreId: _oldChore.id,
              size: Constants.LIMIT_CHORE_PHOTO,
            }),
          );
        }
      }, 200);
    }
  }, [route]);

  useEffect(() => {
    if (oldChore) {
      setSelectedPhotos(
        chorePhotos.map(item => {
          return {
            id: item.id,
            uri: item.uri,
            base64: undefined,
          };
        }),
      );
    }
  }, [chorePhotos]);

  // Input
  const onChangeTitle = (text: string) => {
    setTitle(text);
  };

  const onPressDeadline = () => {
    setVisibleDatePicker(true);
  };
  const onDatePickerChange = (date: Date) => {};
  const onConfirmDatePicker = (date: Date) => {
    setVisibleDatePicker(false);
    setDeadline(date);
  };
  const onCloseDatePicker = () => {
    setVisibleDatePicker(false);
  };

  const onPressRepeat = () => {
    navigate(ScreenName.RepeatPickerScreen, {fromCreateChore: true});
  };

  const onPressAssign = () => {
    if (!isNull(focusFamily?.id)) {
      navigate(ScreenName.MembersPickerScreen, {
        fromCreateChore: true,
        familyId: focusFamily?.id,
      });
    }
  };

  const onChangeDescription = (text: string) => {
    setDescription(text);
  };

  // Assignee Item
  const renderSelectedMember = ({item}: {item: MemberType}) => {
    const onPressContainer = () => {
      setSelectedMembers(
        selectedMembers.filter(member => {
          return member.id !== item.id;
        }),
      );
    };
    return (
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
    );
  };

  const onPressAddPhoto = () => {
    onOpen();
  };
  const renderSelectedPhoto = ({item}: {item: any}) => {
    const onPressContainer = () => {
      if (!isNull(item.id)) {
        setSelectedPhotos(
          selectedPhotos.filter(photo => {
            return photo.id !== item.id;
          }),
        );
        if (oldChore) {
          // update
          setDeletePhotos([...deletePhotos, item.id]);
        }
      } else {
        setSelectedPhotos(
          selectedPhotos.filter(photo => {
            return photo.uri !== item.uri;
          }),
        );
      }
    };
    return (
      <PhotoContainer onPress={onPressContainer}>
        <Avatar source={{uri: item.uri}} />
        <KickIcon source={clearIcon} />
      </PhotoContainer>
    );
  };

  // ActionSheet
  const takePhoto = () => {
    onClose();
    navigate(ScreenName.CameraScreen, {fromCreateChore: true});
  };
  const chooseFromGallery = () => {
    onClose();
    ImageCropPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      includeBase64: true,
      maxFiles: Constants.LIMIT_PHOTO_UPLOAD,
      width: Constants.FAMILY_THUMBNAIL_WIDTH,
      height: Constants.FAMILY_THUMBNAIL_HEIGHT,
    }).then(cropped => {
      const unique = new Set<{id?: number; uri?: string; base64?: string}>([]);
      const currentNumberPhotoBase64 = selectedPhotos.filter((item, index) => {
        return !isNull(item.base64);
      }).length;
      if (
        cropped.length + currentNumberPhotoBase64 >
        Constants.LIMIT_PHOTO_UPLOAD
      ) {
        dispatch(
          showToastAction(
            `${i18n.t('warningMessage.limitPhotoUpload')} :${
              Constants.LIMIT_PHOTO_UPLOAD
            }`,
            ToastType.WARNING,
          ),
        );
      }
      cropped.forEach((item, index) => {
        if (index + currentNumberPhotoBase64 < Constants.LIMIT_PHOTO_UPLOAD) {
          unique.add({
            id: undefined,
            uri: item.path,
            base64: item.data ?? undefined,
          });
        }
      });
      selectedPhotos.forEach(item => {
        unique.add(item);
      });
      const result: {id?: number; uri?: string; base64?: string}[] = [];
      unique.forEach(item => {
        result.push(item);
      });
      setSelectedPhotos(result);
    });
  };

  // Submit
  const onCreateChore = () => {
    if (oldChore) {
      if (!isNull(oldChore.id)) {
        dispatch(
          updateChoreRequestAction({
            goBack: true,
            choreId: oldChore.id,
            status: status,
            title: title,
            description: description,
            deadline: getOriginDateString(deadline),
            repeatType: repeat === RepeatType.NONE ? '' : repeat,
            assigneeIds: selectedMembers.map((item, index) => {
              return item.id;
            }),
            photos: selectedPhotos
              .filter((item, index) => {
                return !isNull(item.base64);
              })
              .map(item => {
                return item.base64;
              }),
            deletePhotos: deletePhotos,
          }),
        );
      }
    } else {
      if (!isNull(focusFamily?.id)) {
        dispatch(
          createChoreRequestAction({
            familyId: focusFamily?.id,
            status: status,
            title: title,
            description: description,
            deadline: getOriginDateString(deadline),
            repeatType: repeat === RepeatType.NONE ? '' : repeat,
            assigneeIds: selectedMembers.map((item, index) => {
              return item.id;
            }),
            photos: selectedPhotos.map((item, index) => {
              if (index < Constants.LIMIT_PHOTO_UPLOAD) {
                return item.base64;
              }
            }),
          }),
        );
      }
    }
  };
  return (
    <SafeView>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <ProfileHeader
        title={
          isNull(oldChore)
            ? i18n.t('chores.createNewChore')
            : i18n.t('chores.updateChore')
        }
      />

      <KeyboardAwareScrollView
        enableOnAndroid
        overScrollMode="never"
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        {/* Title */}
        <FormControl mt={6} width={`${Constants.MAX_WIDTH - 60}px`}>
          <Label>{`${i18n.t('chores.title')}* :`}</Label>
          <Input
            mt={-1}
            height={50}
            value={title}
            borderRadius={20}
            isRequired={true}
            color={colors.TEXT}
            borderColor={colors.SILVER}
            onChangeText={onChangeTitle}
          />

          {/* Deadline */}
          <Label>{`${i18n.t('chores.deadline')}* :`}</Label>
          <Button
            variant="outline"
            height={50}
            borderRadius={20}
            borderColor={colors.SILVER}
            _text={{color: isNull(deadline) ? colors.SILVER : colors.TEXT}}
            onPress={onPressDeadline}>
            {isNull(deadline)
              ? i18n.t('profile.formatDate')
              : getDateStringFrom(getOriginDateString(deadline))}
          </Button>

          {/* Repeat */}
          {!isNull(deadline) && (
            <RepeatContainer onPress={onPressRepeat}>
              <RepeatName>
                {repeat === RepeatType.NONE
                  ? i18n.t('chores.repeat')
                  : getRepeatText(repeat)}
              </RepeatName>
              <ArrowIcon
                width={16}
                height={16}
                source={rightArrowIcon}
                tintColor={colors.SILVER}
              />
            </RepeatContainer>
          )}
        </FormControl>

        {/* Assignees */}
        <FormControl mt={6} width={`${Constants.MAX_WIDTH - 60}px`}>
          <Box flexDirection="row" justifyContent="space-between">
            <Label>{`${i18n.t('chores.assign')}:`}</Label>
            <PrimaryButton
              leftIconWidth={20}
              leftIconHeight={20}
              leftSource={familyIcon}
              leftTintColor={colors.THEME_COLOR_7}
              onPress={onPressAssign}
            />
          </Box>

          <FlatList
            horizontal={true}
            scrollEnabled={true}
            renderItem={renderSelectedMember}
            data={selectedMembers}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listAssignees}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* Photos */}
          <Box flexDirection="row" justifyContent="space-between">
            <Label>{`${i18n.t('chores.photo')}:`}</Label>
            <PrimaryButton
              leftIconWidth={18}
              leftIconHeight={18}
              leftSource={plusIcon}
              leftTintColor={colors.THEME_COLOR_7}
              onPress={onPressAddPhoto}
            />
          </Box>
          <FlatList
            horizontal
            data={selectedPhotos}
            renderItem={renderSelectedPhoto}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* Description */}
          <Label>{`${i18n.t('chores.description')}:`}</Label>
          <Input
            multiline
            height={150}
            borderRadius={25}
            value={description}
            autoCorrect={false}
            color={colors.BLACK}
            autoCompleteType="off"
            textAlignVertical="top"
            borderColor={colors.SILVER}
            onChangeText={onChangeDescription}
          />

          <Button
            mt={10}
            mb={6}
            size="lg"
            borderRadius={28}
            onPress={onCreateChore}
            disabled={isNull(title) || isNull(deadline)}
            _text={{color: colors.WHITE}}
            backgroundColor={colors.DANUBE}>
            {i18n.t('chores.done')}
          </Button>
        </FormControl>

        <DatePicker
          modal
          mode="date"
          locale={i18n.locale}
          open={visibleDatePicker}
          date={deadline}
          textColor={colors.BLACK}
          timeZoneOffsetInMinutes={timeZoneOffset}
          onDateChange={onDatePickerChange}
          onConfirm={onConfirmDatePicker}
          onCancel={onCloseDatePicker}
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
      </KeyboardAwareScrollView>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
  background-color: ${colors.WHITE};
`;

const Label = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 14px;
  margin-bottom: 10px;
  color: ${colors.DANUBE};
`;

const AvatarContainer = styled.TouchableOpacity`
  margin-right: 12px;
`;

const PhotoContainer = styled.TouchableOpacity`
  margin-right: 12px;
`;

const RepeatContainer = styled.TouchableOpacity`
  height: 50px;
  margin-top: 30px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  border-color: ${colors.CONCRETE};
`;

const RepeatName = styled(fonts.PrimaryFontRegularSize16)`
  color: ${colors.BLACK};
`;

const ArrowIcon = styled(PrimaryIcon)`
  right: 10px;
  position: absolute;
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
  listAssignees: {
    paddingRight: 30,
  },
});

export default CreateChoreScreen;
