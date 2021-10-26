import React, {memo} from 'react';
import {Box, FlatList, Menu, Pressable, ScrollView, Text} from 'native-base';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard, StyleSheet} from 'react-native';
import {DummyChores} from '@constants/DummyData';
import HorizontalChoreItem from '../HorizontalChoreItem';
import PrimaryButton from '@components/PrimaryButton';
import {filterIcon} from '@constants/sources';
import {Constants} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import ChoreFilterBox from '../ChoreFilterBox';
import {MemberType} from '@constants/types/family';
import {ChoreStatus} from '@constants/types/chores';

interface Props {
  selectedMember?: MemberType;
  selectedStatus?: ChoreStatus;
  onChangeMember?: (member: MemberType) => void;
  onChangeStatus?: (status: ChoreStatus) => void;
}

const ListChoresHeader: React.FC<Props> = ({
  selectedMember,
  selectedStatus,
  onChangeMember,
  onChangeStatus,
}) => {
  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState('bottom right');

  return (
    <Menu
      p={3}
      height={300}
      borderRadius={14}
      bgColor={colors.WHITE}
      borderColor={colors.WHITE}
      width={Constants.MAX_WIDTH - 100}
      shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
      placement={position == 'auto' ? undefined : position}
      trigger={triggerProps => {
        return (
          <Pressable mt={4} mr={7} {...triggerProps} alignSelf={'flex-end'}>
            <PrimaryIcon source={filterIcon} tintColor={colors.DANUBE} />
          </Pressable>
        );
      }}>
      <ChoreFilterBox
        selectedMember={selectedMember}
        selectedStatus={selectedStatus}
        onPressMember={onChangeMember}
        onPressStatus={onChangeStatus}
      />
    </Menu>
  );
};

export default React.memo(ListChoresHeader);
