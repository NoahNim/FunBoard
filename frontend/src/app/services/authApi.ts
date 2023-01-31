import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { getCSRFCookie } from '../hooks';

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
    credential: string,
    password: string
  }

  export interface restoreRequest {
    user: User
  }

  export const api = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: '/',
      prepareHeaders: async (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token !== null) {
          console.log(token)
          headers.set('XSRF-TOKEN', `${token}`)
        } 
        else {
          const authToken = getCSRFCookie("XSRF-TOKEN")

          if (authToken) {
            headers.set('XSRF-TOKEN', authToken);
          }
        }

        headers.set('Content-Type', 'application/json')
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
      restoreUser: builder.mutation<UserResponse, restoreRequest>({
        query: () => ('/api/session/')
      }, 
      ),
      restore: builder.query({
        query: () => '/api/csrf/restore'
      }),
      protected: builder.mutation<{ message: string }, void>({
        query: () => 'protected',
      }),
    }),
  })

  export const {useLoginMutation, useProtectedMutation, useRestoreQuery, useRestoreUserMutation } = api;