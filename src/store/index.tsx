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
import interactionsReducer, {
  InteractionsState,
} from '@store/reducers/interactions';
import notificationsReducer, {
  NotificationsState,
} from '@store/reducers/notifications';
import locationsReducer, {LocationsState} from '@store/reducers/locations';
import transactionsReducer, {
  TransactionsState,
} from '@store/reducers/transactions';
import cuisineReducer, {CuisineState} from '@store/reducers/cuisine';

const persistConfig: PersistConfig<
  CombinedState<{
    session: any;
    modals: any;
    authentication: any;
    family: any;
    albums: any;
    chores: any;
    events: any;
    interactions: any;
    notifications: any;
    locations: any;
    transactions: any;
    cuisine: any;
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
  interactions: interactionsReducer,
  notifications: notificationsReducer,
  locations: locationsReducer,
  transactions: transactionsReducer,
  cuisine: cuisineReducer,
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
  interactions: InteractionsState;
  notifications: NotificationsState;
  locations: LocationsState;
  transactions: TransactionsState;
  cuisine: CuisineState;
}

export default store;
