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
import HUD from '@components/HUD';
import {theme} from '@themes/index';
import store, {persistor} from './store';
import AppStack from '@navigators/AppStack';
import {AuthState} from '@constants/Constants';
import {NativeBaseProvider} from 'native-base';
import {navigationRef} from '@navigators/index';
import {Provider, useSelector} from 'react-redux';
import {getSessionLoading} from '@store/selectors/session';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import ToastSection from '@components/ToastSection';

const RootComponent = () => {
  const loading = useSelector(getSessionLoading);

  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider theme={theme}>
        <AppStack authState={AuthState.UNAUTHORIZED} />
        <HUD loading={loading} />
        <ToastSection />
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
