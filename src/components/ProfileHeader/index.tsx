import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import PrimaryButton from '@components/PrimaryButton';
import {navigationBackIcon} from '@constants/sources/index';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
}

const ProfileHeader: React.FC<Props> = ({title}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <Container>
      <Content>
        <PrimaryButton
          leftSource={navigationBackIcon}
          leftTintColor={colors.THEME_COLOR_5}
          onPress={onPressBack}
        />
        <Title>{title}</Title>
        <EmptyView />
      </Content>
      <BottomLine />
    </Container>
  );
};

const Container = styled.View`
  background-color: ${colors.WHITE};
`;

const Content = styled.View<{marginTop?: number}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(fonts.PrimaryFontBoldSize18)``;

const EmptyView = styled.View`
  width: 28px;
  height: 28px;
  background-color: transparent;
`;

const BottomLine = styled.View`
  height: 1px;
  margin-top: 10px;
  background-color: ${colors.THEME_COLOR_5};
`;

export default React.memo(ProfileHeader);
