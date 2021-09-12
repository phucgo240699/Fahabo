import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {navigateReset} from '@navigators/index';
import {StackName} from '@constants/Constants';
import colors from '@themes/colors';
import i18n from '@locales/index';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const onPressLogOut = () => {
    navigateReset(StackName.AuthenticationStack);
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={i18n.t('sideBar.logOut')}
        labelStyle={{color: colors.RED_1, alignSelf: 'center'}}
        onPress={onPressLogOut}
      />
    </DrawerContentScrollView>
  );
}
