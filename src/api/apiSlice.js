import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', // название редьюсера
    // обязательные поля
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Heroes'],
    endpoints: builder => ({
        // endpoint (хук) useGetHeroesQuery
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes']
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        })
    })
});

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice;