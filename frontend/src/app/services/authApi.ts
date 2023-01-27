import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { getCSRFCookie } from '../hooks';

const cookieHead = "set-cookie"

export interface User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    biography: string;
    profilePhoto: File;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserResponse {
    user: User,
    token: string
  }

  export interface LoginRequest {
    username: string
    password: string
  }

  export const api = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: '/api/session',
      prepareHeaders: async (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token !== null) {
          console.log(token)
          headers.set('_csrf', `${token}`)
        } 
        return headers
      },
    }),
    endpoints: (builder) => ({
      login: builder.mutation<UserResponse, LoginRequest>({
        query: (credentials) => ({
          url: '/',
          method: 'POST',    
          body: credentials,
        }),
          transformResponse: (response, meta, error) => console.log(meta?.response?.headers)
      }),
      protected: builder.mutation<{ message: string }, void>({
        query: () => 'protected',
      }),
    }),
  })

  export const {useLoginMutation, useProtectedMutation } = api;