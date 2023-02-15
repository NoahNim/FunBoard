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

export const restoreCSRFCookie = async () => {
    try {
        const res = await fetch('/api/csrf/restore', {
            method: "GET"
        })

    } catch (error) {
        // console.log(error)
    }
}

export const getBase64Img = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}