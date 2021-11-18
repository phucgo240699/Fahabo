import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import PrimaryButton from '@components/PrimaryButton';
import {leftArrowIcon} from '@constants/sources/index';
import {videoCallIcon} from '@constants/sources/index';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  onPressVideoCall?: () => void;
  onCustomNavigateBack?: () => void;
}

const ChatHeader: React.FC<Props> = ({
  title,
  onPressVideoCall,
  onCustomNavigateBack,
}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    if (onCustomNavigateBack) {
      onCustomNavigateBack();
    } else {
      navigation.dispatch(CommonActions.goBack());
    }
  };

  return (
    <Container>
      <Content>
        <PrimaryButton
          leftIconWidth={24}
          leftIconHeight={24}
          leftSource={leftArrowIcon}
          leftTintColor={colors.THEME_COLOR_5}
          onPress={onPressBack}
        />
        <Title numberOfLines={1}>{title}</Title>
        <VideoCallButton
          leftSource={videoCallIcon}
          leftTintColor={colors.THEME_COLOR_7}
          onPress={onPressVideoCall}
        />
      </Content>
      <BottomLine />
    </Container>
  );
};

const Container = styled.View``;

const Content = styled.View<{marginTop?: number}>`
  margin-top: 8px;
  margin-left: 10px;
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(fonts.PrimaryFontBoldSize16)``;

const VideoCallButton = styled(PrimaryButton)``;

const BottomLine = styled.View`
  height: 1px;
  margin-top: 8px;
  background-color: ${colors.THEME_COLOR_5};
`;

export default React.memo(ChatHeader);
