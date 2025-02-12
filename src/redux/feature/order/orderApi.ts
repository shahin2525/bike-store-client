import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/api/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
    }),

    // get single bike

    getSingleOrder: builder.query({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: "GET",
      }),
    }),
    // create bike

    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/api/orders/",
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["order"],
    }),

    // update bike
    updateOrder: builder.mutation({
      query: (args) => ({
        url: `/api/orders/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["order"],
    }),
    // delete bike
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    // get all order by email
    getAllOrderByEmail: builder.query({
      query: (email) => ({
        url: `/api/orders/${email}`,
        method: "GET",
      }),
    }),
    //
  }),
});

export const {
  useGetAllOrderQuery,
  useGetSingleOrderQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useGetAllOrderByEmailQuery,
} = orderApi;
