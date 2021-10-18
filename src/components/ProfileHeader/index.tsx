import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import PrimaryButton from '@components/PrimaryButton';
import {leftArrowIcon} from '@constants/sources/index';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  titleMarginLeft?: number;
  titleMarginRight?: number;
  rightComponent?: any;
  backgroundColor?: string;
  onCustomNavigateBack?: () => void;
}

const ProfileHeader: React.FC<Props> = ({
  title,
  titleMarginLeft,
  titleMarginRight,
  rightComponent = <EmptyView />,
  backgroundColor = 'transparent',
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
    <Container backgroundColor={backgroundColor}>
      <Content>
        <PrimaryButton
          leftIconWidth={24}
          leftIconHeight={24}
          leftSource={leftArrowIcon}
          leftTintColor={colors.THEME_COLOR_5}
          onPress={onPressBack}
        />
        <Title marginLeft={titleMarginLeft} marginRight={titleMarginRight}>
          {title}
        </Title>
        {rightComponent}
      </Content>
      <BottomLine />
    </Container>
  );
};

const Container = styled.View<{backgroundColor?: string}>``;

const Content = styled.View<{marginTop?: number}>`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(fonts.PrimaryFontBoldSize18)<{
  marginLeft?: number;
  marginRight?: number;
}>`
  margin-left: ${props => props.marginLeft ?? 0}px;
  margin-right: ${props => props.marginRight ?? 0}px;
`;

const EmptyView = styled.View`
  width: 24px;
  height: 24px;
  background-color: transparent;
`;

const BottomLine = styled.View`
  height: 1px;
  margin-top: 8px;
  background-color: ${colors.THEME_COLOR_5};
`;

export default React.memo(ProfileHeader);
