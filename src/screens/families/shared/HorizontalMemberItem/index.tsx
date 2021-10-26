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
  item: MemberType;
  pickerMode?: boolean;
  isPicked?: boolean; // only work when pickerMode === true
  size?: 'large' | 'small';
  onPress?: (item: MemberType) => void;
}

const HorizontalMemberItem: React.FC<Props> = ({
  item,
  pickerMode,
  isPicked,
  size = 'large',
  onPress,
}) => {
  const onPressContainer = () => {
    if (onPress) {
      onPress(item);
    }
  };
  return (
    <Container size={size} onPress={onPressContainer}>
      {pickerMode && <Circle>{isPicked && <Point />}</Circle>}
      <Avatar
        ml={size === 'large' ? 4 : 1}
        size={size === 'large' ? 'lg' : 'xs'}
        source={{uri: item?.avatar}}
      />
      <Name numberOfLines={2}>{item?.name}</Name>
    </Container>
  );
};

const Container = styled.TouchableOpacity<{size: string}>`
  flex: 1;
  height: ${props => (props.size === 'large' ? 80 : 40)}px;
  margin-left: ${props => (props.size === 'large' ? 30 : 10)}px;
  margin-right: ${props => (props.size === 'large' ? 30 : 10)}px;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.WHITE};
`;

const Name = styled(fonts.PrimaryFontMediumSize16)<{size: string}>`
  flex: 1;
  margin-left: ${props => (props.size === 'large' ? 15 : 5)}px;
  margin-right: ${props => (props.size === 'large' ? 15 : 5)}px;
  font-size: ${props => (props.size === 'large' ? 16 : 12)}px;
`;

const Circle = styled.View`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 15px;
  border-color: ${colors.SILVER};
`;

const Point = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${colors.DANUBE};
`;

export default React.memo(HorizontalMemberItem);