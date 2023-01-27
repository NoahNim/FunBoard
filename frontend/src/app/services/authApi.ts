import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { createCSRFCookie, getCSRFCookie } from '../hooks';

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
      prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).auth.token
        if (token !== null) {
          console.log(token)
          headers.set('Cookie', `${token}`)
        }
        else {
          createCSRFCookie();
          const createdToken = getCSRFCookie("XSRF-TOKEN");
          headers.set('Cookie', `${createdToken}`)
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
      }),
      protected: builder.mutation<{ message: string }, void>({
        query: () => 'protected',
      }),
    }),
  })

  export const {useLoginMutation, useProtectedMutation } = api;