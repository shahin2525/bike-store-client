import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBike: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // args.forEach((arg: TQueryParam) =>
        //   params.append(arg.name, arg.value as string)
        // );
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/api/products",
          method: "GET",
          params: params,
        };
      },
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
    }),

    // update bike
    updateBike: builder.mutation({
      query: ({ id, ...bikeInfo }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body: bikeInfo,
      }),
    }),
    //
  }),
});

export const {
  useGetAllBikeQuery,
  useGetSingleBikeQuery,
  useCreateBikeMutation,
  useUpdateBikeMutation,
} = bikeApi;
