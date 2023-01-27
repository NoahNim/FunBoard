import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getCSRFCookie = (name: string) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length == 2) {
        return parts.pop()?.split(";").shift();
    }
}

export const createCSRFCookie = async () => {
    try {
        const res = await fetch('/api/csrf/restore', {
            method: "GET"
        })
    } catch (error) {
        console.log(error)
    }
}

