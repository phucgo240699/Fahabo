import React from 'react';
import fonts from '@themes/fonts';
import {Box, FlatList} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {membersInFamilySelector} from '@store/selectors/family';
import {MemberType} from '@constants/types/family';
import HorizontalMemberItem from '@screens/families/shared/HorizontalMemberItem';
import i18n from '@locales/index';
import ChoreStatusBox from '../ChoreStatusBox';
import {ChoreStatus} from '@constants/types/chores';

interface Props {
  onPressMember?: (member: MemberType) => void;
  onPressStatus?: (status: ChoreStatus) => void;
}

const ChoreFilterBox: React.FC<Props> = ({onPressMember, onPressStatus}) => {
  const membersInFamily = useSelector(membersInFamilySelector);

  const renderItem = ({item}: {item: MemberType}) => {
    return (
      <HorizontalMemberItem
        item={item}
        size={'small'}
        onPress={onPressMember}
      />
    );
  };

  return (
    <Box flex={1}>
      <Label>{`${i18n.t('chores.members')}:`}</Label>
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}>
        {membersInFamily.map((item, index) => {
          if (index < 10) {
            return (
              <HorizontalMemberItem
                item={item}
                size={'small'}
                onPress={onPressMember}
              />
            );
          } else {
            return null;
          }
        })}
      </Box>
      <ChoreStatusBox onChangeStatus={onPressStatus} />
    </Box>
  );
};

const Label = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 8px;
  color: ${colors.DANUBE};
`;

export default React.memo(ChoreFilterBox);
