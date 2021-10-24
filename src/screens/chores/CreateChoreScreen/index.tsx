import React, {useEffect, useState} from 'react';
import {Input, Avatar, FlatList, FormControl, Button} from 'native-base';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import styled from 'styled-components/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {getDateStringFrom, getOriginDateString, isNull} from '@utils/index';
import PrimaryButton from '@components/PrimaryButton';
import {DummyDetailFamily} from '@constants/DummyData';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {clearIcon, familyIcon, rightArrowIcon} from '@constants/sources';
import {Constants, ScreenName} from '@constants/Constants';
import ChoreStatusBox from '../shared/ChoreStatusBox';
import {ChoreStatus} from '@constants/types/chores';
import DatePicker from 'react-native-date-picker';
import PrimaryIcon from '@components/PrimaryIcon';
import {navigate} from '@navigators/index';
import {getFamilyMembersRequestAction} from '@store/actionTypes/family';
import {useDispatch, useSelector} from 'react-redux';
import {membersInFamilySelector} from '@store/selectors/family';
import {MemberType} from '@constants/types/family';

interface Props {
  route?: any;
}

const CreateChoreScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<ChoreStatus | undefined>(undefined);
  const [repeatId, setRepeatId] = useState<number | undefined>(undefined);
  const [selectedMembers, setSelectedMembers] = useState<MemberType[]>([]);
  const [description, setDescription] = useState('');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);

  // Life Cycle
  useEffect(() => {
    if (route.params.familyId) {
      dispatch(
        getFamilyMembersRequestAction({
          familyId: route.params.familyId,
        }),
      );
    }
  }, []);
  useEffect(() => {
    if (route.params.selectedMembers) {
      setSelectedMembers(route.params.selectedMembers);
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

  const onPressBirthday = () => {
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

  const onPressAssign = () => {
    if (route.params.familyId) {
      navigate(ScreenName.MembersPickerScreen, {
        familyId: route.params.familyId,
      });
    }
  };

  const onChangeDescription = (text: string) => {
    setDescription(text);
  };

  // Assignee Item
  const renderItem = ({item}: {item: any}) => {
    return (
      <AvatarContainer>
        <Avatar source={{uri: item.avatar}} />
      </AvatarContainer>
    );
  };

  // Submit
  const onCreateChore = () => {
    console.log({title});
    console.log({deadline});
    console.log({status});
    console.log({repeatId});
    console.log({selectedMembers});
    console.log({description});
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
            <FormControl.Label
              _text={{color: colors.DANUBE, fontSize: 'sm', fontWeight: 500}}>
              {`${i18n.t('chores.title')}* :`}
            </FormControl.Label>
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

            <FormControl.Label
              mt={8}
              _text={{color: colors.DANUBE, fontSize: 'sm', fontWeight: 500}}>
              {`${i18n.t('chores.deadline')}:`}
            </FormControl.Label>
            <Button
              variant="outline"
              height={50}
              borderRadius={20}
              borderColor={colors.SILVER}
              _text={{color: isNull(deadline) ? colors.SILVER : colors.TEXT}}
              onPress={onPressBirthday}>
              {isNull(deadline)
                ? i18n.t('profile.formatDate')
                : getDateStringFrom(deadline ?? '')}
            </Button>

            <ChoreStatusBox status={status} onChangeStatus={onChangeStatus} />

            <ItemContainer>
              <ItemName>{i18n.t('chores.repeat')}</ItemName>
              <ArrowIcon
                width={16}
                height={16}
                tintColor={colors.SILVER}
                source={rightArrowIcon}
                // style={styles.rightArrow}
              />
            </ItemContainer>
          </FormControl>

          {/* Assignees */}
          <FormControl mt={8}>
            <FormControl.Label
              ml={8}
              _text={{color: colors.DANUBE, fontSize: 'sm', fontWeight: 500}}>
              {`${i18n.t('chores.assign')}:`}
            </FormControl.Label>
            <FlatList
              horizontal={true}
              scrollEnabled={true}
              renderItem={renderItem}
              data={selectedMembers}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listAssignees}
              keyExtractor={(item, index) => index.toString()}
            />
          </FormControl>

          {/* Description */}
          <FormControl mt={8} width={`${Constants.MAX_WIDTH - 60}px`}>
            <FormControl.Label
              _text={{color: colors.DANUBE, fontSize: 'sm', fontWeight: 500}}>
              {`${i18n.t('chores.description')}:`}
            </FormControl.Label>
            <Input
              multiline
              height={150}
              borderRadius={25}
              value={description}
              autoCorrect={false}
              color={colors.BLACK}
              autoCompleteType="off"
              borderColor={colors.SILVER}
              onChangeText={onChangeDescription}
            />

            <Button
              mt={10}
              mb={6}
              size="lg"
              borderRadius={28}
              onPress={onCreateChore}
              disabled={isNull(title)}
              _text={{color: colors.WHITE}}>
              {i18n.t('chores.done')}
            </Button>
          </FormControl>

          <DatePicker
            modal
            mode="date"
            locale={i18n.locale}
            open={visibleDatePicker}
            date={new Date()}
            maximumDate={new Date()}
            textColor={colors.BLACK}
            onDateChange={onDatePickerChange}
            onConfirm={onConfirmDatePicker}
            onCancel={onCloseDatePicker}
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

const AvatarContainer = styled.View`
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
