import React from 'react';
import {Box, Menu, Pressable} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {filterIcon} from '@constants/sources';
import {Constants} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import {MemberType} from '@constants/types/family';
import fonts from '@themes/fonts';
import i18n from '@locales/index';
import PrimarySearchBar from '@components/PrimarySearchBar';
import EventFilterBox from '../EventFilterBox';

interface Props {
  searchText: string;
  sortBy: 'created_at' | 'deadline';
  selectedMember: MemberType[];
  onChangeMember?: (member: MemberType) => void;
  onPressLatestCreate?: () => void;
  onPressLatestDeadline?: () => void;
  onChangeSearchText?: (text: string) => void;
  onSubmitSearchText?: (text: string) => void;
}

const ListEventsHeader: React.FC<Props> = ({
  searchText,
  sortBy,
  selectedMember,
  onChangeMember,
  onPressLatestCreate,
  onPressLatestDeadline,
  onChangeSearchText,
  onSubmitSearchText,
}) => {
  return (
    <Menu
      p={3}
      borderRadius={14}
      bgColor={colors.WHITE}
      borderColor={colors.WHITE}
      width={Constants.MAX_WIDTH - 60}
      placement={'bottom right'}
      trigger={triggerProps => {
        return (
          <Box>
            <PrimarySearchBar
              text={searchText}
              marginTop={8}
              marginLeft={10}
              marginRight={10}
              onChangeText={onChangeSearchText}
              onSubmitText={onSubmitSearchText}
            />
            <SortContainer>
              <SortItemContainer onPress={onPressLatestCreate}>
                <Circle>{sortBy === 'created_at' && <Point />}</Circle>
                <SortLabel>{i18n.t('events.latestCreate')}</SortLabel>
              </SortItemContainer>
              <SortItemContainer onPress={onPressLatestDeadline}>
                <Circle>{sortBy === 'deadline' && <Point />}</Circle>
                <SortLabel>{i18n.t('events.latestDeadline')}</SortLabel>
              </SortItemContainer>
              <Pressable {...triggerProps}>
                <PrimaryIcon source={filterIcon} tintColor={colors.DANUBE} />
              </Pressable>
            </SortContainer>
          </Box>
        );
      }}>
      <EventFilterBox
        selectedMember={selectedMember}
        onPressMember={onChangeMember}
      />
    </Menu>
  );
};

const SortContainer = styled.View`
  padding: 4px;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const SortItemContainer = styled.TouchableOpacity`
  align-items center;
  flex-direction: row;
`;

const SortLabel = styled(fonts.PrimaryFontRegularSize12)`
  margin-top: 1px;
  margin-left: 6px;
  color: ${colors.GRAY};
`;

const Circle = styled.View`
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 15px;
  border-color: ${colors.SILVER};
`;

const Point = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 10px;
  background-color: ${colors.HYPER_LINK};
`;

export default ListEventsHeader;
