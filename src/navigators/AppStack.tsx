import React, {useEffect, useState} from 'react';
import {navigationOptions} from './index';
import AuthenticationStack from './AuthenticationStack';
import {AuthState, StackName} from '@constants/Constants';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import SplashScreen from 'react-native-splash-screen';
import i18n from '@locales/index';
import {useSelector} from 'react-redux';
import {languageCodeSelector} from '@store/selectors/authentication';

const Stack = createStackNavigator();

interface Props {
  authState: AuthState;
}

const AppStack: React.FC<Props> = ({authState}) => {
  const [toggle, setToggle] = useState(false);
  const languageCode = useSelector(languageCodeSelector);
  useEffect(() => {
    SplashScreen.hide();
    i18n.defaultLocale = languageCode;
    i18n.locale = languageCode;
    setToggle(!toggle);
  }, []);
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={StackName.AuthenticationStack}
        component={AuthenticationStack}
      />
      <Stack.Screen name={StackName.MainStack} component={MainStack} />
    </Stack.Navigator>
  );
};

export default AppStack;
