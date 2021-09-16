/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
// import {useColorScheme} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from '@navigators/AppStack';
import {navigationRef} from '@navigators/index';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store';
import {AuthState} from '@constants/Constants';
import {theme} from '@themes/colors';
import {getSessionLoading} from '@store/selectors/session';
import HUD from '@components/HUD';

const RootComponent = () => {
  const loading = useSelector(getSessionLoading);

  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider theme={theme}>
        <AppStack authState={AuthState.UNAUTHORIZED} />
        <HUD loading={loading} />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootComponent />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
