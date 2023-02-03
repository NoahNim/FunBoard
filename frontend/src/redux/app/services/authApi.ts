import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { getCSRFCookie } from '../hooks';
import { ZodStringCheck } from 'zod';

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  password: string;
  biography: string;
  profilePhoto: File | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  user: User,
  token: string | null | undefined
}

export interface LoginRequest {
  credential: string,
  password: string
}

export interface restoreRequest {
  user: User
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: async (headers, endpoint) => {
      const authToken = getCSRFCookie("XSRF-TOKEN")

      if (authToken) {
        headers.set('XSRF-TOKEN', authToken);
      }

      headers.set('Content-type', 'application/json')


      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/session/',
        method: 'POST',
        body: JSON.stringify(credentials)
      }),
    }),
    // signup: builder.mutation<UserResponse, Partial<User>>({
    //   query: (userInfo) => ({
    //     url: "/api/session/signup",
    //     method: "POST",
    //     'XSRF-TOKEN': getCSRFCookie('_csrf'),
    //     body: JSON.stringify(userInfo)
    //   })
    // }),
    restoreUser: builder.mutation<UserResponse, restoreRequest>({
      query: () => ('/api/session/')
    },
    ),
    logout: builder.query({
      query: () => ({
        url: '/api/session/',
        method: "DELETE",
        'XSRF-TOKEN': getCSRFCookie('XSRF-TOKEN')
      })
    }),
    restore: builder.query({
      query: () => '/api/csrf/restore'
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
})

export const { useLoginMutation, useProtectedMutation, useRestoreQuery, useRestoreUserMutation, useLazyLogoutQuery, } = api;