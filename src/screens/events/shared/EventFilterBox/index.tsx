import React, {useState} from 'react';
import fonts from '@themes/fonts';
import {Box} from 'native-base';
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
import PrimarySearchBar from '@components/PrimarySearchBar';
import {isNull} from '@utils/index';
import {getChoreFilterMembersRequestAction} from '@store/actionTypes/family';

interface Props {
  selectedMember: MemberType[];
  onPressMember?: (member: MemberType) => void;
}

const EventFilterBox: React.FC<Props> = ({selectedMember, onPressMember}) => {
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

  return (
    <Box flex={1}>
      <Label>{`${i18n.t('chores.members')}:`}</Label>
      <PrimarySearchBar
        text={searchMemberName}
        onChangeText={onChangeMemberName}
        onSubmitText={onSubmitMemberName}
      />
      <Box
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
      </Box>
    </Box>
  );
};

const Label = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 8px;
  color: ${colors.DANUBE};
`;

export default EventFilterBox;
