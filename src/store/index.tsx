import logger from 'redux-logger';
import {
  applyMiddleware,
  CombinedState,
  combineReducers,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sessionReducer, {SessionState} from '@store/reducers/session';
import authenticationReducer, {
  AuthenticationState,
} from '@store/reducers/authentication';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import rootSaga from './sagas';
import modalsReducer, {ModalsState} from '@store/reducers/modals';

const persistConfig: PersistConfig<
  CombinedState<{session: any; modals: any; authentication: any}>,
  any,
  any,
  any
> = {
  key: 'root',
  storage: AsyncStorage,
  timeout: undefined,
};

const sagaMiddleware = createSagaMiddleware();
let middleware = [];

// if (__DEV__) {
//   middleware = [sagaMiddleware, logger];
// } else {
//   middleware = [sagaMiddleware];
// }

middleware = [sagaMiddleware];

const rootReducer = combineReducers({
  session: sessionReducer,
  modals: modalsReducer,
  authentication: authenticationReducer,
});

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(...middleware),
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export interface RootState {
  session: SessionState;
  modals: ModalsState;
  authentication: AuthenticationState;
}

export default store;
