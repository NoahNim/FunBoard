import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { getCSRFCookie, getAuthToken } from '../hooks';

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
    credential: string,
    password: string
  }

  export const api = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: '/api/session',
      prepareHeaders: async (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token !== null) {
          console.log(token)
          headers.set('Cookie', `${token}`)
          console.log("if conditional fired")
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
        query: (credentials) => (console.log(credentials), {
          url: '/',
          method: 'POST',    
          body: JSON.stringify(credentials),
        }),
      }),
      protected: builder.mutation<{ message: string }, void>({
        query: () => 'protected',
      }),
    }),
  })

  export const {useLoginMutation, useProtectedMutation } = api;