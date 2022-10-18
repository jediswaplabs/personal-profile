import { configureStore } from '@reduxjs/toolkit';

import activitiesReducer from '../features/activities/activitiesSlice';
import walletReducer from '../features/wallet/walletSlice';
import guidsReducer from '../features/guilds/guildsSlice';
import profileReducer from '../features/profile/profileSlice';
import { apiSlice } from '../features/api/apiSlice';

export default function setupStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      activities: activitiesReducer,
      profile: profileReducer,
      wallet: walletReducer,
      guilds: guidsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  });
}
