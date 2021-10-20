import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import {Avatar} from 'native-base';
import {MemberType} from '@constants/types/family';

interface Props {
  item?: MemberType;
  onPress?: (item: MemberType) => void;
}

const HorizontalMemberItem: React.FC<Props> = ({item, onPress}) => {
  const onPressContainer = () => {
    if (onPress) {
      onPress(item);
    }
  };
  return (
    <Container onPress={onPressContainer}>
      <Avatar size="lg" source={{uri: item?.avatar}} />
      <Name numberOfLines={2}>{item?.name}</Name>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex: 1;
  height: 80px;
  margin-left: 30px;
  margin-right: 30px;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.WHITE};
`;

const Name = styled(fonts.PrimaryFontMediumSize16)`
  flex: 1;
  margin-left: 15px;
  margin-right: 15px;
`;

export default React.memo(HorizontalMemberItem);
