import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVacation, IFollow, IUser, ILogin, IError } from "../../models/models";
import { getTokenFromLocalStorage } from "../../utilities/getTokenFromLocalStorage";


export const vacationsApi = createApi({
  reducerPath: "vacationsApi",
  tagTypes: ["IVacation[]", "IFollow[]"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://"+window.location.hostname+":4001/",
  }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({


    getVacations: build.query<IVacation[], {stepFrom:string,filterName:string,filterBy:string}>({
      query: (args) => {
        const {stepFrom,filterName, filterBy} = args;
        return {
          url: `vacations?${stepFrom && `_stepFrom=${stepFrom}`}&${filterName && `_filterName=${filterName}`}&${filterBy && `_filterBy=${filterBy}`}`,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
          providesTags: ["IVacation[]"],
        }
      },
      providesTags: ["IVacation[]"],
    }),

    refreshVacations: build.mutation<IVacation[], string>({
      query: (stepFrom = "all") => ({
        url: `vacations?${stepFrom && `_stepFrom=${stepFrom}`}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },})
  
    }),
    
    getFollowingsByUser: build.mutation<IFollow[], string>({
      query: (email) => ({
        url: `following/by_user/${email}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },})
  
    }),

    getFollowingsByVacation: build.query<IFollow[], string>({
      query: (vcnId) => ({
        url: `following:${vcnId}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },}),
        providesTags: ["IFollow[]"],
    }),


    editVacations: build.query<IVacation[], string>({
      query: () => ({
        url: `vacations?${`_stepFrom=all`}&${`_filterName=all`}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },}),
        providesTags: ["IVacation[]"],
    }),

    registerUser: build.mutation<IUser, object>({
      query: (body) => ({
        url: "/users/new",
        method: "POST",
        body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        transformResponse: (response: { data: unknown; status: unknown }) =>
          response.data,
      }),
    }),

    loginUser: build.mutation<ILogin, object>({
      query: (payload) => ({
        url: "/users/login",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },

        transformResponse: (response: { data: unknown; error: IError }) =>
          response.data,
      }),
    }),

    addVacation: build.mutation<IVacation, object>({
      query: (payload) => ({
        url: "/vacations/new",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        transformResponse: (response: { data: unknown; status: unknown }) =>
          response.data,
      }),

      // invalidatesTags: ['IVacation[]'],
    }),

    addFollowing: build.mutation<IFollow, object>({
      query: (payload) => ({
        url: "/following/new",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        transformResponse: (response: { data: unknown; status: unknown }) =>
          response.data,
      }),
     
      // invalidatesTags: ['IVacation[]'],
    }),

    putVacation: build.mutation<IVacation, object>({
      query: (payload) => ({
        url: "/vacations/edit",
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        transformResponse: (response: { data: unknown; status: unknown }) =>
          response.data,
      }),

      // invalidatesTags: ['IVacation[]'],
    }),

    deleteVacation: build.mutation<IVacation[], string>({
      query: (vcnId) => ({
        url: `vacations/delete/${vcnId}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      invalidatesTags: ["IVacation[]"],
    }),


  deleteFollowing: build.mutation<IFollow[], object>({
    query: (payload) => ({
      url: `following/delete`,
      method: "DELETE",
      body: payload,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    }),
    // invalidatesTags: ["IFollow[]"],
  }),
}),
})

export const {
  useGetVacationsQuery,
  useRegisterUserMutation,
  useAddVacationMutation,
  useDeleteVacationMutation,
  usePutVacationMutation,
  useLoginUserMutation,
  useEditVacationsQuery,
  useAddFollowingMutation,
  useDeleteFollowingMutation,
  useGetFollowingsByUserMutation,
  useGetFollowingsByVacationQuery,
  useRefreshVacationsMutation
} = vacationsApi;
