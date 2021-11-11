import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import coursesReducer from '../features/coursesSlice'
import pdfReducer from '../features/pdfSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/";
import storageSession from 'redux-persist/lib/storage/session'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
const persistConfig = {
  key: "root",
  storage:storageSession,
  whitelist: ['userReducer']
};
const reducer = combineReducers({
    coursesReducer,
    userReducer,
    pdfReducer,
})
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})
const persistReducer_ = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistReducer_,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export default store
