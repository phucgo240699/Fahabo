import React from 'react';
import styled from 'styled-components/native';
import {HamburgerIcon, Text} from 'native-base';
import CustomIconButton from '@components/CustomIconButton';
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
      <CustomIconButton
        iconWidth={30}
        iconHeight={30}
        containerWidth={38}
        containerHeight={38}
        tintColor={colors.SUNGLOW}
        source={require('@assets/images/menu_icon.png')}
        onPress={openMenu}
      />
      <Text fontSize="3xl" fontWeight={'700'} color={colors.SUNGLOW}>
        {title}
      </Text>
      <CustomIconButton
        iconWidth={30}
        iconHeight={30}
        containerWidth={38}
        containerHeight={38}
        tintColor={colors.SUNGLOW}
        source={require('@assets/images/bell_icon.png')}
        onPress={navigateToNotifications}
      />
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

export default React.memo(PrimaryDrawerHeader);
