import { baseAPI } from "@/redux/api/baseApi";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: { email: string; }) => ({
        url: "/auth",
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const {
  useLoginMutation
} = userAPI;