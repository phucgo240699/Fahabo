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
  isNull,
  getNumberWithCommas,
  getDateStringFrom,
  getOriginDateString,
  convertOriginDateTimeStringToDate,
  convertOriginDateStringToDate,
} from '@utils/index';
import PrimaryButton from '@components/PrimaryButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {clearIcon, plusIcon, rightArrowIcon} from '@constants/sources';
import {Constants, ScreenName} from '@constants/Constants';
import {RepeatType} from '@constants/types/chores';
import DatePicker from 'react-native-date-picker';
import PrimaryIcon from '@components/PrimaryIcon';
import {navigate} from '@navigators/index';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import {getRepeatText, getRepeatType} from '@utils/chores';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  TransactionCategorySegment,
  TransactionCategoryType,
  TransactionType,
} from '@constants/types/transactions';
import {
  createTransactionRequestAction,
  getTransactionCategoriesRequestAction,
  getTransactionPhotosRequestAction,
  updateTransactionRequestAction,
} from '@store/actionTypes/transactions';
import {transactionPhotosSelector} from '@store/selectors/transactions';

interface Props {
  route?: any;
}

const CreateTransactionScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const transactionPhotos = useSelector(transactionPhotosSelector);
  const [cost, setCost] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<
    TransactionCategoryType | undefined
  >(undefined);
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState<RepeatType>(RepeatType.NONE);
  const [selectedPhotos, setSelectedPhotos] = useState<
    {id?: number; uri?: string; base64?: string}[]
  >([]);
  const [deletePhotos, setDeletePhotos] = useState<number[]>([]);
  const [oldTransaction, setOldTransaction] = useState<
    TransactionType | undefined
  >(undefined);
  const [note, setNote] = useState('');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const timeZoneOffset = new Date().getTimezoneOffset() * -1;
  const {isOpen, onOpen, onClose} = useDisclose();

  // Life Cycle
  useEffect(() => {
    if (!isNull(focusFamily?.id)) {
      dispatch(
        getTransactionCategoriesRequestAction({
          getting: true,
          type: TransactionCategorySegment.EXPENSE,
          familyId: focusFamily?.id,
        }),
      );
      dispatch(
        getTransactionCategoriesRequestAction({
          getting: true,
          type: TransactionCategorySegment.INCOME,
          familyId: focusFamily?.id,
        }),
      );
    }
  }, []);
  useEffect(() => {
    if (route && route.params) {
      if (route.params.selectedRepeat) {
        setRepeat(route.params.selectedRepeat);
      }
      if (route.params.selectedCategory) {
        setSelectedCategory(route.params.selectedCategory);
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
      if (route.params.oldTransaction) {
        const _oldTransaction: TransactionType = route.params.oldTransaction;

        setOldTransaction(_oldTransaction);
        setCost(_oldTransaction.cost ?? 0);
        setSelectedCategory(_oldTransaction.category);
        setDate(convertOriginDateStringToDate(_oldTransaction.date ?? ''));
        setRepeat(getRepeatType(_oldTransaction.repeatType));
        setNote(_oldTransaction.note ?? '');

        dispatch(
          getTransactionPhotosRequestAction({
            showHUD: true,
            transactionId: _oldTransaction.id,
          }),
        );
      }
    }
  }, [route]);

  useEffect(() => {
    if (oldTransaction) {
      setSelectedPhotos(
        transactionPhotos.map(item => {
          return {
            id: item.id,
            uri: item.uri,
            base64: undefined,
          };
        }),
      );
    }
  }, [transactionPhotos]);

  // Keyboard
  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Cost
  const onChangeCost = (value: string) => {
    if (value === '') {
      setCost(0);
    } else {
      if (value.includes(',')) {
        const parts = value.split(',');
        setCost(parseInt(parts.join('')));
      } else {
        setCost(parseInt(value));
      }
    }
  };

  // Category
  const onPressCategory = () => {
    navigate(ScreenName.TransactionCategoriesScreen);
  };

  // Date
  const onPressDate = () => {
    setVisibleDatePicker(true);
  };
  const onDatePickerChange = (date: Date) => {};
  const onConfirmDatePicker = (_date: Date) => {
    setVisibleDatePicker(false);
    setDate(_date);
  };
  const onCloseDatePicker = () => {
    setVisibleDatePicker(false);
  };

  const onPressRepeat = () => {
    navigate(ScreenName.RepeatPickerScreen, {fromCreateTransaction: true});
  };

  // ActionSheet
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
        if (oldTransaction) {
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

  const takePhoto = () => {
    onClose();
    navigate(ScreenName.CameraScreen, {fromCreateTransaction: true});
  };
  const chooseFromGallery = () => {
    onClose();
    ImageCropPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      includeBase64: true,
      maxFiles: Constants.LIMIT_PHOTO_UPLOAD,
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

  const onChangeNote = (text: string) => {
    setNote(text);
  };

  // Done
  const onCreateTraction = () => {
    if (oldTransaction) {
      if (!isNull(oldTransaction.id)) {
        dispatch(
          updateTransactionRequestAction({
            transactionId: oldTransaction.id,
            type: selectedCategory?.type,
            note: note,
            categoryId: selectedCategory?.id,
            repeatType: repeat,
            date: getOriginDateString(date),
            cost: cost,
            photos: selectedPhotos
              .filter(item => {
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
          createTransactionRequestAction({
            familyId: focusFamily?.id,
            type: selectedCategory?.type,
            note: note,
            categoryId: selectedCategory?.id,
            repeatType: repeat === RepeatType.NONE ? '' : repeat,
            date: getOriginDateString(date),
            cost: cost,
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
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={i18n.t('transaction.createNewTransaction')} />
      <Container onPress={onDismissKeyboard}>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          {/* Title */}
          <FormControl mt={6} width={`${Constants.MAX_WIDTH - 60}px`}>
            <Label>{`${i18n.t('transaction.cost')}* :`}</Label>
            <Input
              mt={-1}
              height={50}
              value={getNumberWithCommas(cost)}
              borderRadius={20}
              isRequired={true}
              color={colors.TEXT}
              keyboardType={'number-pad'}
              borderColor={colors.SILVER}
              onChangeText={onChangeCost}
            />

            {/* Category */}
            <Label>{`${i18n.t('transaction.category')}* :`}</Label>
            <CategoryButton onPress={onPressCategory}>
              <CategoryName
                color={isNull(selectedCategory) ? colors.SILVER : colors.BLACK}>
                {isNull(selectedCategory)
                  ? i18n.t('transaction.selectCategory')
                  : selectedCategory?.translated
                  ? i18n.t(`backend.${selectedCategory.title}`)
                  : selectedCategory?.title}
              </CategoryName>
              <ArrowIcon
                width={16}
                height={16}
                source={rightArrowIcon}
                tintColor={colors.SILVER}
              />
            </CategoryButton>

            {/* Date */}
            <Label>{`${i18n.t('transaction.date')}* :`}</Label>
            <Button
              variant="outline"
              height={50}
              borderRadius={20}
              borderColor={colors.SILVER}
              _text={{color: colors.TEXT}}
              onPress={onPressDate}>
              {isNull(date)
                ? i18n.t('profile.formatDate')
                : getDateStringFrom(getOriginDateString(date))}
            </Button>

            {/* Repeat */}
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

            {/* Photos */}
            <Box flexDirection="row" justifyContent="space-between">
              <Label>{`${i18n.t('transaction.photo')}:`}</Label>
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

            {/* Note */}
            <Label>{`${i18n.t('transaction.note')}:`}</Label>
            <Input
              multiline
              height={150}
              borderRadius={25}
              value={note}
              autoCorrect={false}
              color={colors.BLACK}
              autoCompleteType="off"
              textAlignVertical="top"
              borderColor={colors.SILVER}
              onChangeText={onChangeNote}
            />

            <Button
              mt={10}
              mb={6}
              size="lg"
              borderRadius={28}
              onPress={onCreateTraction}
              disabled={
                isNull(cost) ||
                cost == 0 ||
                isNull(selectedCategory) ||
                isNull(date)
              }
              _text={{color: colors.WHITE}}
              backgroundColor={colors.GREEN_1}>
              {i18n.t('chores.done')}
            </Button>
          </FormControl>

          <DatePicker
            modal
            mode="date"
            locale={i18n.locale}
            open={visibleDatePicker}
            date={date}
            textColor={colors.BLACK}
            timeZoneOffsetInMinutes={timeZoneOffset}
            onDateChange={onDatePickerChange}
            onConfirm={onConfirmDatePicker}
            onCancel={onCloseDatePicker}
          />

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
        </Content>
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const Container = styled.TouchableWithoutFeedback`
  flex: 1;
`;

const Content = styled.ScrollView``;

const Label = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 16px;
  margin-bottom: 10px;
  color: ${colors.DANUBE};
`;

const CategoryButton = styled.TouchableOpacity`
  height: 50px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  border-color: ${colors.CONCRETE};
`;

const CategoryName = styled(fonts.PrimaryFontRegularSize16)<{color: string}>`
  color: ${props => props.color};
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

const PhotoContainer = styled.TouchableOpacity`
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

export default CreateTransactionScreen;
