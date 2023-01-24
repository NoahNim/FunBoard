import { configureStore, ThunkAction, Action, applyMiddleware, compose, MiddlewareArray } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {

  },
  middleware: new MiddlewareArray().concat(logger)
  
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