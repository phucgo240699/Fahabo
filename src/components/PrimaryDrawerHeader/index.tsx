import React from 'react';
import styled from 'styled-components/native';
import Colors from '@themes/colors';
import {HamburgerIcon, IconButton, Text} from 'native-base';
import {DrawerActions, useNavigation} from '@react-navigation/native';

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
      <IconButton
        size="sm"
        variant="solid"
        icon={<HamburgerIcon />}
        onPress={openMenu}
      />
      <Text fontSize="3xl" fontWeight={'700'} color={Colors.SUNGLOW}>
        {title}
      </Text>
      <IconContainer onPress={navigateToNotifications}>
        <Icon source={require('@assets/images/bell_icon.png')} />
      </IconContainer>
    </Container>
  );
};

const Container = styled.View<{marginTop?: number}>`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: ${props => props.marginTop ?? 0}px;
`;

const IconContainer = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
  tint-color: ${Colors.SUNGLOW};
`;

export default React.memo(PrimaryDrawerHeader);
