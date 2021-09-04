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
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from '@navigators/AppStack';
import {navigationRef} from '@navigators/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store';
import {AuthState} from '@constants/Constants';

const App = () => {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#FFF1CC',
        100: '#FFE9B3',
        200: '#FFE299',
        300: '#FFD466',
        400: '#FFC634',
        500: '#FFB700',
        600: '#CC9200',
        700: '#996E00',
        800: '#805B00',
        900: '#4D3700',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <NativeBaseProvider theme={theme}>
              <AppStack authState={AuthState.UNAUTHORIZED} />
            </NativeBaseProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
