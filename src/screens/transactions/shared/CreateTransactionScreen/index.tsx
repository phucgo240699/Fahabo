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
  isNumber,
  getDateTimeStringFrom,
  getOriginDateTimeString,
  convertOriginDateTimeStringToDate,
  getNumberWithCommas,
  getDateStringFrom,
  getOriginDateString,
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
import {RepeatType} from '@constants/types/chores';
import DatePicker from 'react-native-date-picker';
import PrimaryIcon from '@components/PrimaryIcon';
import {navigate} from '@navigators/index';
import {MemberType} from '@constants/types/family';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import {getRepeatText, getRepeatType} from '@utils/chores';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';

interface Props {
  route?: any;
}

const CreateTransactionScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const [cost, setCost] = useState(0);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedPhotos, setSelectedPhotos] = useState<
    {id?: number; uri?: string; base64?: string}[]
  >([]);
  const [deletePhotos, setDeletePhotos] = useState<number[]>([]);
  const [note, setNote] = useState('');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const timeZoneOffset = new Date().getTimezoneOffset() * -1;
  const {isOpen, onOpen, onClose} = useDisclose();

  // Keyboard
  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Cost
  const onChangeCost = (value: string) => {
    setCost(parseFloat(value));
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

  // ActionSheet
  const onPressAddPhoto = () => {
    onOpen();
  };
  const renderSelectedPhoto = ({item}: {item: any}) => {
    const onPressContainer = () => {
      // if (!isNull(item.id)) {
      //   setSelectedPhotos(
      //     selectedPhotos.filter(photo => {
      //       return photo.id !== item.id;
      //     }),
      //   );
      //   if (oldChore) {
      //     // update
      //     setDeletePhotos([...deletePhotos, item.id]);
      //   }
      // } else {
      //   setSelectedPhotos(
      //     selectedPhotos.filter(photo => {
      //       return photo.uri !== item.uri;
      //     }),
      //   );
      // }
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
  };
  const chooseFromGallery = () => {
    onClose();
    // ImageCropPicker.openPicker({
    //   cropping: true,
    //   mediaType: 'photo',
    //   includeBase64: true,
    //   width: Constants.PROFILE_AVATAR_WIDTH,
    //   height: Constants.PROFILE_AVATAR_HEIGHT,
    // }).then(cropped => {
    //   if (!isNull(cropped.data)) {
    //     dispatch(
    //       updateProfileAvatarRequestAction({
    //         avatar: {
    //           name: 'avatar.jpg',
    //           base64Data: cropped.data ?? '',
    //         },
    //       }),
    //     );
    //   }
    // });
  };

  const onChangeNote = (text: string) => {
    setNote(text);
  };

  // Done
  const onCreateTraction = () => {};

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
              <CategoryName>All</CategoryName>
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
              disabled={isNull(cost) || isNull(category) || isNull(date)}
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

const CategoryName = styled(fonts.PrimaryFontRegularSize16)`
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
