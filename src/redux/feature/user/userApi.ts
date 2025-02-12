import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/api/customers",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),

    // get single bike

    getSingleUser: builder.query({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({
        url: `/api/customers/${id}`,
        method: "GET",
      }),
    }),
    // create bike

    // createBike: builder.mutation({
    //   query: (bikeInfo) => ({
    //     url: "/api/products/",
    //     method: "POST",
    //     body: bikeInfo,
    //   }),
    //   invalidatesTags: ["bike"],
    // }),

    // update bike
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/api/customers/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["user"],
    }),
    // delete bike
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    //deactivated user
    deactivateUser: builder.mutation({
      query: (args) => ({
        url: `/api/admin/users/${args.id}/block`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["user"],
    }),

    // change password
    updatePassword: builder.mutation({
      query: (info) => ({
        url: "/api/auth/change-password",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["user"],
    }),

    //
  }),
});

export const {
  useUpdatePasswordMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeactivateUserMutation,
} = userApi;
