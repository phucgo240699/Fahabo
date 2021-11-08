import React, {useState} from 'react';
import fonts from '@themes/fonts';
import {Box, FlatList} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  choreFilterMembersSelector,
  focusFamilySelector,
  membersInFamilySelector,
} from '@store/selectors/family';
import {MemberType} from '@constants/types/family';
import HorizontalMemberItem from '@screens/families/shared/HorizontalMemberItem';
import i18n from '@locales/index';
import ChoreStatusBox from '../ChoreStatusBox';
import {ChoreStatus} from '@constants/types/chores';
import PrimarySearchBar from '@components/PrimarySearchBar';
import {isNull} from '@utils/index';
import {
  getChoreFilterMembersRequestAction,
  getFamilyMembersRequestAction,
} from '@store/actionTypes/family';
import {StyleSheet} from 'react-native';

interface Props {
  selectedMember: MemberType[];
  selectedStatus: ChoreStatus[];
  onPressMember?: (member: MemberType) => void;
  onPressStatus?: (status: ChoreStatus) => void;
}

const ChoreFilterBox: React.FC<Props> = ({
  selectedMember,
  selectedStatus,
  onPressMember,
  onPressStatus,
}) => {
  const dispatch = useDispatch();
  const members = useSelector(choreFilterMembersSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const [searchMemberName, setSearchMemberName] = useState('');

  const onChangeMemberName = (text: string) => {
    setSearchMemberName(text);
  };

  const onSubmitMemberName = (text: string) => {
    if (!isNull(focusFamily?.id)) {
      dispatch(
        getChoreFilterMembersRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          searchText: text,
        }),
      );
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <HorizontalMemberItem
        item={item}
        size={'small'}
        pickerMode={true}
        isPicked={selectedMember.includes(item)}
        onPress={onPressMember}
      />
    );
  };

  return (
    <Box flex={1}>
      <Label>{`${i18n.t('chores.members')}:`}</Label>
      <PrimarySearchBar
        text={searchMemberName}
        onChangeText={onChangeMemberName}
        onSubmitText={onSubmitMemberName}
      />
      {/* <Box
        mt={2}
        flexDirection={'row'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}>
        {members.map((item, index) => {
          if (index < 10) {
            return (
              <HorizontalMemberItem
                key={index}
                item={item}
                size={'small'}
                pickerMode={true}
                isPicked={selectedMember.includes(item)}
                onPress={onPressMember}
              />
            );
          } else {
            return null;
          }
        })}
      </Box> */}

      <FlatList
        mt={2}
        numColumns={2}
        data={members}
        scrollEnabled={false}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <ChoreStatusBox status={selectedStatus} onChangeStatus={onPressStatus} />
    </Box>
  );
};

const Label = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 8px;
  color: ${colors.DANUBE};
`;

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    flexDirection: 'column',
  },
});

export default ChoreFilterBox;
