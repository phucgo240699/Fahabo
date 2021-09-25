import React from 'react';
import {Text} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import PrimaryButton from '@components/PrimaryButton';
import {navigationBackIcon} from '@constants/sources/index';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {
  title?: string;
  marginTop?: number;
  backgroundColor?: string;
}

const AuthenticationHeader: React.FC<Props> = ({
  title,
  marginTop = Platform.OS === 'android' ? getStatusBarHeight() : 0,
  backgroundColor,
}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <Container marginTop={marginTop}>
      <PrimaryButton
        leftSource={navigationBackIcon}
        leftTintColor={colors.THEME_COLOR_6}
        onPress={onPressBack}
      />
      <Text fontSize="3xl" fontWeight={'700'} color={colors.THEME_COLOR_6}>
        {title}
      </Text>
      <EmptyView />
    </Container>
  );
};

const Container = styled.View<{marginTop?: number; backgroundColor?: string}>`
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
