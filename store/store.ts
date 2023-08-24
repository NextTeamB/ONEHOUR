'use client';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
	return {
		getItem(_key: any) {
			return Promise.resolve(null);
		},
		setItem(_key: any, value: any) {
			return Promise.resolve(value);
		},
		removeItem(_key: any) {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window === 'undefined'
		? createNoopStorage()
		: createWebStorage('local');

const persistConfig = {
	key: 'root',
	storage,
	whiteList: ['user'],
};

const rootReducer = combineReducers({
	user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
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
export type RootReducerType = ReturnType<typeof rootReducer>;
