import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from '../features/users/usersSlice';
import { hotelsReducer } from '../features/hotels/hotelsSlice';
import { apartmentsReducer } from '../features/apartments/apartmentSlice';
import { ordersReducer } from '../features/orders/ordersSlice';
import { commentsReducer } from '../features/comments/commentsSlice';
import { currencyReducer } from '../features/currency/currencySlice';
import { roomTypesReducer } from '../features/roomTypes/roomTypesSlice';

const usersPersistConfig = {
  key: 'booking:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  hotels: hotelsReducer,
  apartments: apartmentsReducer,
  orders: ordersReducer,
  comments: commentsReducer,
  currency: currencyReducer,
  roomTypes: roomTypesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
