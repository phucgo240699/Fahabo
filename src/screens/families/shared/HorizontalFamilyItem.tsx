import React, {memo} from 'react';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';
import {profileIcon} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';

interface Props {
  item?: any;
  containerStyle?: any;
  onPress?: (item: any) => void;
}

const HorizontalFamilyItem: React.FC<Props> = ({
  item,
  containerStyle,
  onPress,
}) => {
  const onPressContainer = () => {
    if (onPress) {
      onPress(item);
    }
  };
  return (
    <Container style={containerStyle} onPress={onPressContainer}>
      <Title numberOfLines={3}>{item.title}</Title>
      <Description numberOfLines={1}>{item.hostName}</Description>
      <HLine />
      <BottomContainer>
        <TotalMembersText>{item.totalMembers}</TotalMembersText>
        <PrimaryIcon width={14} height={14} source={profileIcon} />
      </BottomContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px 30px 0px 30px;
  border-radius: 10px;
  background-color: ${colors.WHITE};
  shadow-color: ${colors.SILVER}
  shadow-opacity: 0.5;
  shadow-radius: 8px;
  elevation: 5;
`;

const Title = styled(fonts.PrimaryFontBoldSize14)`
  width: 85%;
  color: ${colors.DANUBE};
`;

const Description = styled(fonts.PrimaryFontMediumSize12)`
  margin-top: 8px;
  margin-left: 0px;
  margin-right: 0px;
`;

const HLine = styled.View`
  height: 1px;
  opacity: 0.4;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 0px;
  margin-right: 0px;
  background-color: ${colors.SILVER};
`;

const BottomContainer = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

const TotalMembersText = styled(fonts.PrimaryFontBoldSize16)`
  max-width: 80%;
  margin-right: 2px;
  color: ${colors.ZEST};
`;

export default memo(HorizontalFamilyItem);
