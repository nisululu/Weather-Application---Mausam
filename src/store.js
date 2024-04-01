import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './slice/dataSlice'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, dataSlice)

export const store = configureStore({
    reducer: {
        home: persistedReducer,
    },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
})

export const persistor = persistStore(store)