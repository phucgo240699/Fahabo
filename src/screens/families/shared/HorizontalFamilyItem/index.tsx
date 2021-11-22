import React, {memo} from 'react';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';
import {profileIcon} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import {FamilyType} from '@constants/types/family';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import {updateFocusFamilyRequestAction} from '@store/actionTypes/family';

interface Props {
  item: FamilyType;
  containerStyle?: any;
  onPress?: (item: any) => void;
}

const HorizontalFamilyItem: React.FC<Props> = ({
  item,
  containerStyle,
  onPress,
}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);

  const onPressCircle = () => {
    dispatch(updateFocusFamilyRequestAction(item));
  };
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
        <Thumbnail source={{uri: item?.thumbnail}} />
        <Content>
          <Title numberOfLines={2}>{item?.name}</Title>
          <HLine />
          <BottomContainer>
            <TotalMembersText numberOfLines={1}>
              {item?.totalMembers}
            </TotalMembersText>
            <PrimaryIcon width={14} height={14} source={profileIcon} />
          </BottomContainer>
        </Content>
        <Circle onPress={onPressCircle}>
          {focusFamily?.id === item?.id && <Point />}
        </Circle>
      </Container>
    </Touch>
  );
};

const Touch = styled.TouchableOpacity`
  border-radius: 10px;
`;

const Container = styled.View`
  elevation: 10;
  padding: 10px;
  shadow-radius: 10px;
  shadow-opacity: 0.2;
  border-radius: 10px;
  flex-direction: row;
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
  width: 80%;
  margin-left: 10px;
  color: ${colors.DANUBE};
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

const Circle = styled.TouchableOpacity`
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  border-width: 1px;
  position: absolute;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  border-color: ${colors.SILVER};
`;

const Point = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${colors.DANUBE};
`;

export default memo(HorizontalFamilyItem);
