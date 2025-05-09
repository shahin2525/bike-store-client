import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all bike
    // getAllBike: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: "/api/products",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["bike"],
    // }),
    getAllBike: builder.query({
      query: (args: TQueryParam[]) => {
        const params = new URLSearchParams();

        args?.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/api/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["bike"],
    }),

    // get single bike

    getSingleBike: builder.query({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "GET",
      }),
    }),
    // create bike

    createBike: builder.mutation({
      query: (bikeInfo) => ({
        url: "/api/products/",
        method: "POST",
        body: bikeInfo,
      }),
      invalidatesTags: ["bike"],
    }),

    // update bike
    updateBike: builder.mutation({
      query: (args) => ({
        url: `/api/products/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["bike"],
    }),
    // delete bike
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bike"],
    }),
    //
  }),
});

export const {
  useGetAllBikeQuery,
  useGetSingleBikeQuery,
  useCreateBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
} = bikeApi;
