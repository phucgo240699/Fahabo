import React, {useState} from 'react';
import {Input, Avatar, FlatList, FormControl, Button} from 'native-base';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import PrimaryHeader from '@components/PrimaryHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import styled from 'styled-components/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {getDateStringFrom, getOriginDateString, isNull} from '@utils/index';
import PrimaryButton from '@components/PrimaryButton';
import {DummyDetailFamily} from '@constants/DummyData';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {clearIcon, familyIcon} from '@constants/sources';
import {Constants} from '@constants/Constants';
import ChoreStatusBox from '../shared/ChoreStatusBox';
import {ChoreStatus} from '@constants/types/chores';
import DatePicker from 'react-native-date-picker';

interface Props {}

const CreateChoreScreen: React.FC<Props> = ({}) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<ChoreStatus | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);

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

  const onChangeDescription = (text: string) => {
    setDescription(text);
  };

  // Assignee Item
  const renderItem = ({item}: {item: any}) => {
    const onPressContainer = () => {};
    return (
      <AvatarContainer onPress={onPressContainer}>
        <Avatar source={{uri: item.avatarUrl}} />
        <KickIcon source={clearIcon} />
      </AvatarContainer>
    );
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
          />
        }
      />

      <Container onPress={onDismissKeyboard}>
        <Content>
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
              borderRadius={25}
              borderColor={colors.SILVER}
              _text={{color: isNull(deadline) ? colors.SILVER : colors.TEXT}}
              onPress={onPressBirthday}>
              {isNull(deadline)
                ? i18n.t('profile.formatDate')
                : getDateStringFrom(deadline ?? '')}
            </Button>

            <ChoreStatusBox status={status} onChangeStatus={onChangeStatus} />
          </FormControl>

          {/* Assignees */}
          <FormControl mt={8}>
            <FormControl.Label
              ml={8}
              _text={{color: colors.DANUBE, fontSize: 'sm', fontWeight: 500}}>
              {`${i18n.t('chores.assignees')}:`}
            </FormControl.Label>
            <FlatList
              horizontal={true}
              scrollEnabled={true}
              renderItem={renderItem}
              data={DummyDetailFamily.members}
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

const Content = styled.View`
  align-items: center;
`;

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
  listAssignees: {
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default React.memo(CreateChoreScreen);
