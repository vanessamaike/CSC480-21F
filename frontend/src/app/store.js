import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import coursesReducer from '../features/coursesSlice'

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
    coursesReducer,
    userReducer,
})

const persistReducer_ = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistReducer_,
});

export const persistor = persistStore(store);
export default store
