import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'native-base';
import PrimaryButton from '@components/PrimaryButton';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import colors from '@themes/colors';

interface Props {
  title?: string;
  marginTop?: number;
}

const PrimaryDrawerHeader: React.FC<Props> = ({title, marginTop}) => {
  const navigation = useNavigation();

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const navigateToNotifications = () => {
    console.log('navigate to notifications');
  };

  return (
    <Container marginTop={marginTop}>
      <PrimaryButton
        leftTintColor={colors.THEME_COLOR_5}
        leftSource={require('@assets/images/menu_icon.png')}
        onPress={openMenu}
      />
      <Text fontSize="3xl" fontWeight={'700'} color={colors.THEME_COLOR_5}>
        {title}
      </Text>
      <PrimaryButton
        leftTintColor={colors.THEME_COLOR_5}
        leftSource={require('@assets/images/bell_icon.png')}
        onPress={navigateToNotifications}
      />
    </Container>
  );
};

const Container = styled.View<{marginTop?: number}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: ${props => props.marginTop ?? 0}px;
`;

export default React.memo(PrimaryDrawerHeader);
