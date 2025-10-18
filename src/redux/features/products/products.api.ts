import { baseAPI } from "@/redux/api/baseApi";
import { IProduct } from "./products.type";

const userAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createProducts: build.mutation<IProduct, Partial<IProduct>>({
            query: (data) => ({
                url: "/products",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),

        getAllProducts: build.query<
            IProduct[],
            { offset?: number; limit?: number; categoryId?: string; search?: string }
        >({
            query: ({ offset, limit, categoryId, search } = {}) => {
                let url = `/products?`;
                if (offset !== undefined) url += `offset=${offset}&`;
                if (limit !== undefined) url += `limit=${limit}&`;
                if (categoryId && categoryId !== "all") url += `categoryId=${categoryId}&`;
                if (search) url += `searchedText=${encodeURIComponent(search)}&`;
                return { url: url.slice(0, -1), method: "GET" };
            },
            providesTags: ["Products"],
        }),
        searchProducts: build.query<IProduct[], string>({
            query: (searchedText) => ({
                url: `/products/search?searchedText=${encodeURIComponent(searchedText)}`,
                method: "GET",
            }),
            providesTags: ["Products"],
        }),

        getSingleProduct: build.query<IProduct, string>({
            query: (slugOrId) => ({
                url: `/products/${slugOrId}`,
                method: "GET",
            }),
            providesTags: ["Products"],
        }),

        updateProducts: build.mutation<IProduct, { id: string; data: Partial<IProduct> }>({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),

        deleteProducts: build.mutation<void, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useCreateProductsMutation,
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useUpdateProductsMutation,
    useDeleteProductsMutation,
    useSearchProductsQuery,
} = userAPI;








// import { baseAPI } from "@/redux/api/baseApi";
// import { IProduct, Products } from "./products.type";
// // import { IProduct, Products } from "@/types";

// const userAPI = baseAPI.injectEndpoints({
//     endpoints: (build) => ({
//         createProducts: build.mutation<IProduct, Partial<IProduct>>({
//             query: (data) => ({
//                 url: "/products",
//                 method: "POST",
//                 body: data,
//             }),
//             invalidatesTags: ["Products"],
//         }),
//         getAllProducts: build.query<Products, { offset?: number; limit?: number; categoryId?: string; search?: string }>({
//             query: ({ offset, limit, categoryId, search } = {}) => {
//                 let url = `/products?`;
//                 if (offset !== undefined) url += `offset=${offset}&`;
//                 if (limit !== undefined) url += `limit=${limit}&`;
//                 if (categoryId && categoryId !== "all") url += `categoryId=${categoryId}&`;
//                 if (search) url += `searchedText=${encodeURIComponent(search)}&`;
//                 return { url: url.slice(0, -1), method: "GET" };
//             },
//             providesTags: ["Products"],
//         }),
//         getSingleProduct: build.query<IProduct, string>({
//             query: (slugOrId) => ({
//                 url: `/products/${slugOrId}`,
//                 method: "GET",
//             }),
//             providesTags: ["Products"],
//         }),
//         updateProducts: build.mutation<IProduct, { id: string; data: Partial<IProduct> }>({
//             query: ({ id, data }) => ({
//                 url: `/products/${id}`,
//                 method: "PUT",
//                 body: data,
//             }),
//             invalidatesTags: ["Products"],
//         }),
//         deleteProducts: build.mutation<void, string>({
//             query: (id) => ({
//                 url: `/products/${id}`,
//                 method: "DELETE",
//             }),
//             invalidatesTags: ["Products"],
//         }),
//     }),
// });

// export const {
//     useCreateProductsMutation,
//     useGetAllProductsQuery,
//     useGetSingleProductQuery,
//     useUpdateProductsMutation,
//     useDeleteProductsMutation,
// } = userAPI;
