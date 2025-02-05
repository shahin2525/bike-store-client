import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBike: builder.query({
      query: () => ({
        url: "/api/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBikeQuery } = bikeApi;
