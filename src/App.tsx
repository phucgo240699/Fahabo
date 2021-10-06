import React, {useEffect} from 'react';
import HUD from '@components/HUD';
import {theme} from '@themes/index';
// import {Appearance} from 'react-native';
import store, {persistor} from './store';
import AppStack from '@navigators/AppStack';
// import RNRestart from 'react-native-restart';
import {NativeBaseProvider} from 'native-base';
import {navigationRef} from '@navigators/index';
import {Provider, useSelector} from 'react-redux';
import ToastSection from '@components/ToastSection';
import {isLoadingSelector} from '@store/selectors/session';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';

const RootComponent = () => {
  const loading = useSelector(isLoadingSelector);

  // useEffect(() => {
  //   Appearance.addChangeListener(onThemeChange);
  //   return () => Appearance.removeChangeListener(onThemeChange);
  // }, []);

  // const onThemeChange = (e: any) => {
  //   RNRestart.Restart();
  // };

  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider theme={theme}>
        <AppStack />
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
