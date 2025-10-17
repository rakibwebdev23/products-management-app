import { baseAPI } from "@/redux/api/baseApi";


export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
    verifyOTP: build.mutation({
      query: (data) => ({
        url: "/auth/signup-verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),

    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOTPMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
} = userAPI;