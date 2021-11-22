import React, {memo} from 'react';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';
import {profileIcon} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import {isNull} from '@utils/index';
import {Platform} from 'react-native';

interface Props {
  item?: any;
  containerStyle?: any;
  onPress?: (item: any) => void;
}

const VerticalFamilyItem: React.FC<Props> = ({
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
    <Touch
      onPress={onPressContainer}
      activeOpacity={Platform.OS === 'ios' ? 0.6 : 1.0}>
      <Container style={containerStyle}>
        <Thumbnail source={{uri: item.thumbnail}} />
        <Title numberOfLines={2}>{item.name}</Title>
        <HLine />
        <BottomContainer>
          <TotalMembersText numberOfLines={1}>
            {item.totalMembers}
          </TotalMembersText>
          <PrimaryIcon width={14} height={14} source={profileIcon} />
        </BottomContainer>
      </Container>
    </Touch>
  );
};

const Touch = styled.TouchableOpacity`
  margin-right: 20px;
`;

const Container = styled.View`
  elevation: 10;
  width: 160px;
  height: 200px;
  border-radius: 10px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
`;

const Thumbnail = styled.Image`
  width: 160px;
  height: 100px;
  resize-mode: contain;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Title = styled(fonts.PrimaryFontBoldSize14)`
  flex: 1;
  margin-top: 12px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  justify-content: center;
  color: ${colors.DANUBE};
`;

const HLine = styled.View`
  bottom: 35px
  width: 100%;
  height: 1px;
  opacity: 0.4;
  position: absolute;
  background-color: ${colors.SILVER};
`;

const BottomContainer = styled.View`
  width: 100%;
  bottom: 10px
  margin-left: 10px;
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TotalMembersText = styled(fonts.PrimaryFontBoldSize16)`
  max-width: 80%;
  margin-right: 2px;
  color: ${colors.ZEST};
`;

export default memo(VerticalFamilyItem);
