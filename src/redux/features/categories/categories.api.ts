import { baseAPI } from "@/redux/api/baseApi";

const userAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getAllCategories: build.query({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
    }),
});

export const { useGetAllCategoriesQuery } = userAPI;
