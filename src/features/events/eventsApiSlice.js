import { apiSlice } from '../../api/apiSlice';

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => '/events',
      providesTags: ['Event'],
      transformResponse: (response) => response.data,
    }),

    getEvent: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: (result, error, id) => [{ type: 'Event', id }],
      transformResponse: (response) => response.data,
    }),

    createEvent: builder.mutation({
      query: (eventData) => ({
        url: '/events',
        method: 'POST',
        body: eventData,
      }),
      invalidatesTags: ['Event'],
      transformResponse: (response) => response.data,
    }),

    updateEvent: builder.mutation({
      query: ({ id, ...eventData }) => ({
        url: `/events/${id}`,
        method: 'PUT',
        body: eventData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Event', id },
        'Event',
        'EventLog',
      ],
      transformResponse: (response) => response.data,
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),

    getEventLogs: builder.query({
      query: ({ eventId, userTimezone }) => ({
        url: `/events/${eventId}/logs`,
        params: { userTimezone },
      }),
      providesTags: (result, error, { eventId }) => [
        { type: 'EventLog', id: eventId },
      ],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventLogsQuery,
} = eventsApiSlice;