import React, {memo} from 'react';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';
import {defaultAvatar, profileIcon} from '@constants/sources';
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
    <Touch onPress={onPressContainer}>
      <Container style={containerStyle}>
        <Thumbnail source={defaultAvatar} />
        <Content>
          <Title numberOfLines={2}>{item.title}</Title>
          <Description numberOfLines={1}>{item.hostName}</Description>
          <HLine />
          <BottomContainer>
            <TotalMembersText numberOfLines={1}>
              {item.totalMembers}
            </TotalMembersText>
            <PrimaryIcon width={14} height={14} source={profileIcon} />
          </BottomContainer>
        </Content>
      </Container>
    </Touch>
  );
};

const Touch = styled.TouchableOpacity``;

const Container = styled.View`
  elevation: 10;
  padding: 10px;
  shadow-radius: 10px;
  border-radius: 10px;
  flex-direction: row;
  shadow-opacity: 0.2;
  align-items: center;
  margin: 15px 20px 0px 20px;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
`;

const Content = styled.View`
  flex: 1;
  height: 100%;
  margin-left: 10px;
`;

const Thumbnail = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 6px;
`;

const Title = styled(fonts.PrimaryFontBoldSize14)`
  margin-left: 10px;
  color: ${colors.DANUBE};
`;

const Description = styled(fonts.PrimaryFontMediumSize12)`
  margin-top: 8px;
  margin-left: 10px;
`;

const HLine = styled.View`
  bottom: 25px
  width: 100%;
  height: 1px;
  opacity: 0.4;
  position: absolute;
  background-color: ${colors.SILVER};
`;

const BottomContainer = styled.View`
  bottom: 0px
  margin-left: 10px;
  position: absolute;
  flex-direction: row;
  align-items: center;
`;

const TotalMembersText = styled(fonts.PrimaryFontBoldSize16)`
  max-width: 90%;
  margin-right: 2px;
  color: ${colors.ZEST};
`;

export default memo(HorizontalFamilyItem);
