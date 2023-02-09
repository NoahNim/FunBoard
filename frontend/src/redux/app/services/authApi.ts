import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCSRFCookie } from '../hooks';

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  password: string;
  biography: string;
  profilePhoto: Blob | null | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  user: User;
  token: string | null | undefined;
  userImage: Buffer | null;
}

export interface LoginRequest {
  credential: string;
  password: string;
}

export interface restoreRequest {
  user: User;
}

export interface Message {
  id: number;
  userId: number;
  title: string;
  message: string;
  photo: Blob;
  createdAt: Date;
  updatedAt: Date;
}

export interface messageResponse {
  message: Message;
}

export interface MessageList {
  messages: {
    [key: string]: Message | null
  } | null
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: async (headers, endpoint) => {
      const authToken = getCSRFCookie("XSRF-TOKEN")

      if (authToken) {
        headers.set('XSRF-TOKEN', authToken);
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/session/',
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credentials)
      }),
    }),
    signup: builder.mutation<UserResponse, FormData>({
      query: (userInfo) => ({
        url: "/api/users/",
        method: "POST",
        body: userInfo
      })
    }),
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
    getMessages: builder.mutation<MessageList, "/api/messages/">({
      query: () => ("/api/messages/")
    }),
    createMessage: builder.mutation<messageResponse, FormData>({
      query: (messageData) => ({
        url: "/api/messages/",
        method: "POST",
        body: messageData
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

export const { useLoginMutation, useProtectedMutation, useRestoreQuery, useRestoreUserMutation, useLazyLogoutQuery, useSignupMutation, useCreateMessageMutation, useGetMessagesMutation } = api;