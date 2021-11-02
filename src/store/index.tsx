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
import familyReducer, {FamilyState} from '@store/reducers/family';
import albumsReducer, {AlbumsState} from '@store/reducers/albums';
import choresReducer, {ChoresState} from '@store/reducers/chores';
import eventsReducer, {EventsState} from '@store/reducers/events';

const persistConfig: PersistConfig<
  CombinedState<{
    session: any;
    modals: any;
    authentication: any;
    family: any;
    albums: any;
    chores: any;
    events: any;
  }>,
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
  family: familyReducer,
  albums: albumsReducer,
  chores: choresReducer,
  events: eventsReducer,
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
  family: FamilyState;
  albums: AlbumsState;
  chores: ChoresState;
  events: EventsState;
}

export default store;
