import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getCookie = async () => {

    try {
        const res = await fetch('/api/csrf/restore', {
            method: "GET"
        })
        
        
        if (res.ok) {
            const token = await res.json();
            console.log(token)
        }
    } catch (error) {

    }
}