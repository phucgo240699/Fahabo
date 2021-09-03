import React from 'react';
import i18n from '@locales/index';
import Colors from '@themes/colors';
import styled from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import {StackName} from '@constants/Constants';

const TabbarTitle = styled.Text`
  font-family: ArialRoundedMTBold;
  font-size: 12px;
`;

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          return null;
        },
        tabBarLabel: ({focused}) => {
          let title = '';
          switch (route.name) {
            case StackName.HomeStack:
              title = i18n.t('home.home');
              break;
            case StackName.ProfileStack:
              title = i18n.t('profile.profile');
              break;
          }
          return (
            <TabbarTitle
              style={{
                color: focused ? Colors.TORY_BLUE : Colors.BLACK,
              }}>
              {title}
            </TabbarTitle>
          );
        },
      })}>
      <Tab.Screen name={StackName.HomeStack} component={HomeStack} />
      <Tab.Screen name={StackName.ProfileStack} component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
