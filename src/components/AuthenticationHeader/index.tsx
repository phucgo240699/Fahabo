import React from 'react';
import {Text} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import PrimaryButton from '@components/PrimaryButton';
import {navigationBackIcon} from '@constants/sources/index';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  marginTop?: number;
}

const AuthenticationHeader: React.FC<Props> = ({title, marginTop}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <Container marginTop={marginTop}>
      <PrimaryButton
        leftSource={navigationBackIcon}
        leftTintColor={colors.THEME_COLOR_5}
        onPress={onPressBack}
      />
      <Text fontSize="3xl" fontWeight={'700'} color={colors.THEME_COLOR_5}>
        {title}
      </Text>
      <EmptyView />
    </Container>
  );
};

const Container = styled.View<{marginTop?: number}>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.marginTop ?? 0}px;
`;

const EmptyView = styled.View`
  width: 32px;
  height: 32px;
  background-color: transparent;
`;

export default React.memo(AuthenticationHeader);
