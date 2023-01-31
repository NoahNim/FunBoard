import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getCSRFCookie = (name: string) => {

        if (name) {
            const cookieValue = document.cookie.split("; ").find((row) => row.startsWith(name))?.split('=')[1]

            return cookieValue;
        }
}

export const getAuthToken = async (url: string) => {
    try {
        const res = await fetch(url, {
            method: "POST",
        })
    } catch (error) {
        console.log(error)
    }
}

export const restoreCSRFCookie = async () => {
    try {
        const res = await fetch('/api/csrf/restore', {
            method: "GET"
        })
    } catch (error) {
        console.log(error)
    }
}