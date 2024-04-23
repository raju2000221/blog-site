import { configureStore , combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { version } from 'react';

const rootReducer = combineReducers({
  user : userReducer
});

const persistconfig ={
  key: 'root',
  storage,
  version: 1
}
const persistedReducer = persistReducer(persistconfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => 
  getDefaultMiddleware(
    {serializableCheck:false}
  )
})

export const persistor = persistStore(store)
