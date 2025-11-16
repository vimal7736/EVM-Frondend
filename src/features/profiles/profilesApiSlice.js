import { apiSlice } from '../../api/apiSlice';

export const profilesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getProfiles: builder.query({
      query: () => '/profiles',
      providesTags: ['Profile'],
      transformResponse: (response) => response.data,
    }),

    getProfile: builder.query({
      query: (id) => `/profiles/${id}`,
      providesTags: (result, error, id) => [{ type: 'Profile', id }],
      transformResponse: (response) => response.data,
    }),

    createProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profiles',
        method: 'POST',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
      transformResponse: (response) => response.data,
    }),

    updateProfile: builder.mutation({
      query: ({ id, ...profileData }) => ({
        url: `/profiles/${id}`,
        method: 'PUT',
        body: profileData,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: 'Profile', id },
        'Profile',
        'Event',
      ],

      transformResponse: (response) => response.data,
    }),

    getProfileEvents: builder.query({
      query: (profileId) => `/profiles/${profileId}/events`,

      providesTags: (result, error, profileId) => [
        { type: 'Event', id: `PROFILE-${profileId}` },
      ],

      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetProfileEventsQuery,
} = profilesApiSlice;