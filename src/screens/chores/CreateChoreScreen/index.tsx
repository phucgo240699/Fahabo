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
import {getDateStringFrom, getOriginDateString, isNull} from '@utils/index';
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
import {createChoreRequestAction} from '@store/actionTypes/chores';
import {focusFamilySelector} from '@store/selectors/family';

interface Props {
  route?: any;
}

const CreateChoreScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const {isOpen, onOpen, onClose} = useDisclose();

  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<ChoreStatus | undefined>(
    ChoreStatus.IN_PROGRESS,
  );
  const [repeat, setRepeat] = useState<RepeatType | undefined>(undefined);
  const [selectedMembers, setSelectedMembers] = useState<MemberType[]>([]);
  const [description, setDescription] = useState('');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<
    {uri: string; base64: string}[]
  >([]);
  const dateNow = new Date();

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
          setSelectedPhotos([
            ...selectedPhotos,
            {
              uri: route.params.thumbnailUri,
              base64: route.params.thumbnailBase64,
            },
          ]);
        }
      }, 500);
    }
  }, [route]);

  // Keyboard
  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

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
    setDeadline(getOriginDateString(date));
  };
  const onCloseDatePicker = () => {
    setVisibleDatePicker(false);
  };

  const onChangeStatus = (value: ChoreStatus) => {
    setStatus(value);
  };

  const onPressRepeat = () => {
    navigate(ScreenName.RepeatPickerScreen, {fromCreateChore: true});
  };

  const onPressAssign = () => {
    if (!isNull(focusFamily?.id)) {
      navigate(ScreenName.MembersPickerScreen, {
        familyId: focusFamily?.id,
      });
    }
  };

  const onChangeDescription = (text: string) => {
    setDescription(text);
  };

  // Assignee Item
  const renderSelectedMember = ({item}: {item: MemberType}) => {
    return (
      <AvatarContainer>
        <Avatar source={{uri: item.avatar}} />
      </AvatarContainer>
    );
  };

  const onPressAddPhoto = () => {
    onOpen();
  };
  const renderSelectedPhoto = ({item}: {item: any}) => {
    const onPressContainer = () => {
      setSelectedPhotos(
        selectedPhotos.filter(photo => {
          return photo.uri !== item.uri;
        }),
      );
    };
    return (
      <PhotoContainer onPress={onPressContainer}>
        <Avatar source={{uri: item.uri}} />
        <KickPhotoIcon source={clearIcon} />
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
      maxFiles: 5,
      width: Constants.FAMILY_THUMBNAIL_WIDTH,
      height: Constants.FAMILY_THUMBNAIL_HEIGHT,
    }).then(cropped => {
      const unique = new Set<{uri: string; base64: string}>(
        cropped.map((item, index) => {
          return {
            uri: item.path ?? '',
            base64: item.data ?? '',
          };
        }),
      );
      selectedPhotos.forEach(item => {
        unique.add(item);
      });
      const result: {uri: string; base64: string}[] = [];
      unique.forEach(item => {
        result.push(item);
      });
      setSelectedPhotos(result);
    });
  };

  // Submit
  const onCreateChore = () => {
    console.log({
      familyId: focusFamily?.id,
      status: status,
      title: title,
      description: description,
      deadline: deadline,
      assigneeIds: selectedMembers.map((item, index) => {
        return item.id;
      }),
      photos: selectedPhotos.map((item, index) => {
        if (index < 5) {
          return item.base64;
        }
      }),
    });
    if (!isNull(focusFamily?.id)) {
      dispatch(
        createChoreRequestAction({
          familyId: focusFamily?.id,
          status: status,
          title: title,
          description: description,
          deadline: deadline,
          assigneeIds: selectedMembers.map((item, index) => {
            return item.id;
          }),
          photos: selectedPhotos.map((item, index) => {
            if (index < 5) {
              return item.base64;
            }
          }),
        }),
      );
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
        title={i18n.t('chores.createNewChore')}
        rightComponent={
          <PrimaryButton
            marginRight={8}
            leftSource={familyIcon}
            leftTintColor={colors.THEME_COLOR_7}
            onPress={onPressAssign}
          />
        }
      />

      <Container onPress={onDismissKeyboard}>
        <Content
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
            <Label>{`${i18n.t('chores.deadline')}:`}</Label>
            <Button
              variant="outline"
              height={50}
              borderRadius={20}
              borderColor={colors.SILVER}
              _text={{color: isNull(deadline) ? colors.SILVER : colors.TEXT}}
              onPress={onPressDeadline}>
              {isNull(deadline)
                ? i18n.t('profile.formatDate')
                : getDateStringFrom(deadline ?? '')}
            </Button>

            {/* Status */}
            <ChoreStatusBox status={status} onChangeStatus={onChangeStatus} />

            {/* Repeat */}
            <ItemContainer onPress={onPressRepeat}>
              <ItemName>
                {isNull(repeat) ? i18n.t('chores.repeat') : repeat}
              </ItemName>
              <ArrowIcon
                width={16}
                height={16}
                source={rightArrowIcon}
                tintColor={colors.SILVER}
              />
            </ItemContainer>
          </FormControl>

          {/* Assignees */}
          <FormControl mt={6} width={`${Constants.MAX_WIDTH - 60}px`}>
            <Label>{`${i18n.t('chores.assign')}:`}</Label>
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
              _text={{color: colors.WHITE}}>
              {i18n.t('chores.done')}
            </Button>
          </FormControl>

          <DatePicker
            modal
            mode="date"
            locale={i18n.locale}
            open={visibleDatePicker}
            minimumDate={dateNow}
            date={dateNow}
            textColor={colors.BLACK}
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
        </Content>
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
  background-color: ${colors.WHITE};
`;

const Container = styled.TouchableWithoutFeedback`
  flex: 1;
`;

const Content = styled.ScrollView``;

const Label = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 14px;
  margin-bottom: 10px;
  color: ${colors.DANUBE};
`;

const AvatarContainer = styled.View`
  margin-right: 12px;
`;

const PhotoContainer = styled.TouchableOpacity`
  margin-right: 12px;
`;

const ItemContainer = styled.TouchableOpacity`
  margin-top: 20px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  padding: 18px 15px 18px 15px;
  justify-content: space-between;
  border-color: ${colors.CONCRETE};
`;

const ItemName = styled(fonts.PrimaryFontRegularSize16)`
  color: ${colors.BLACK};
`;

const ArrowIcon = styled(PrimaryIcon)`
  right: 10px;
  position: absolute;
`;

const KickPhotoIcon = styled.Image`
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
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default React.memo(CreateChoreScreen);
