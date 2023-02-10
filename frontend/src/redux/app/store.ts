import { configureStore, ThunkAction, Action, } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from '../features/auth/userSlice';
import messageReducer from '../features/message/messageSlice';
import { api } from './services/authApi';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: userReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).concat(logger)
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;