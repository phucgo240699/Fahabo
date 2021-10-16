import React, {useState} from 'react';
import {Box, VStack, Input, Button, Avatar, FlatList} from 'native-base';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import PrimaryHeader from '@components/PrimaryHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import styled from 'styled-components/native';
import {Keyboard, Platform} from 'react-native';
import {isNull} from '@utils/index';
import PrimaryButton from '@components/PrimaryButton';
import {DummyDetailFamily} from '@constants/DummyData';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import PrimaryIcon from '@components/PrimaryIcon';
import {clearIcon} from '@constants/sources';

interface Props {}

const CreateChoreScreen: React.FC<Props> = ({}) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity>
        <>
          <Avatar mr={2} source={{uri: item.avatarUrl}} />
          <PrimaryIcon source={clearIcon} />
        </>
      </TouchableOpacity>
    );
  };

  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const onPressDeadline = () => {};
  return (
    <SafeView>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <ProfileHeader title={i18n.t('chores.createNewChore')} />

      <TouchableWithoutFeedback
        style={{width: '100%', height: '100%'}}
        onPress={onDismissKeyboard}>
        <Content>
          <Input
            height={50}
            borderRadius={25}
            color={colors.TEXT}
            borderColor={colors.SILVER}
            placeholderTextColor={colors.SILVER}
            placeholder={i18n.t('chores.title')}
          />
          <TouchableOpacity onPress={onPressDeadline}>
            <DeadlineContainer>
              <DeadlineText value={deadline}>
                {isNull(deadline) ? i18n.t('chores.deadline') : deadline}
              </DeadlineText>
            </DeadlineContainer>
          </TouchableOpacity>
          <AssignButton
            titleFontSize={15}
            titleFontWeight={500}
            titleColor={colors.DANUBE}
            title={`${i18n.t('chores.assign')}:`}
          />
          <FlatList
            horizontal
            scrollEnabled={true}
            renderItem={renderItem}
            data={DummyDetailFamily.members}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </TouchableWithoutFeedback>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
  background-color: ${colors.WHITE};
`;

const Touch = styled.TouchableWithoutFeedback``;

const DeadlineContainer = styled.View`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border-width: 1px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  border-color: ${colors.SILVER};
`;

const DeadlineText = styled(fonts.PrimaryFontRegularSize16)<{
  value?: string;
}>`
  margin: 10px;
  text-align: center;
  color: ${props => (isNull(props.value) ? colors.SILVER : colors.TEXT)};
`;

const Content = styled.View`
  padding: 30px;
`;

const AssignButton = styled(PrimaryButton)`
  margin-top: 25px;
  align-self: flex-start;
`;

export default React.memo(CreateChoreScreen);
