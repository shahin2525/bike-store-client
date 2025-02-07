import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBike: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args.forEach((arg: TQueryParam) =>
          params.append(arg.name, arg.value as string)
        );
        return {
          url: "/api/products",
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useGetAllBikeQuery } = bikeApi;
