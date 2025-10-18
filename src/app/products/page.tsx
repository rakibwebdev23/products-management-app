/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Navbar from "@/shared/Navbar";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categories.api";
import {
    useGetAllProductsQuery,
    useDeleteProductsMutation,
    useSearchProductsQuery,
} from "@/redux/features/products/products.api";
import ProductCardSkeleton from "@/components/ProductSkeleton";
import ProductCreate from "@/components/ProductCreate";
import { Category } from "@/redux/features/products/products.type";
import { toast } from "sonner";

const itemsPerPage = 10;

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

    const offset = (currentPage - 1) * itemsPerPage;

    const {
        data: allProducts = [],
        isLoading: isAllLoading,
    } = useGetAllProductsQuery({
        offset,
        limit: itemsPerPage,
        categoryId: selectedCategory,
        search: "",
    });

    console.log(allProducts);

    const {
        data: searchResults = [],
        isLoading: isSearchLoading,
    } = useSearchProductsQuery(searchQuery, { skip: !searchQuery });

    const { data: categories = [] } = useGetAllCategoriesQuery(undefined);
    const [deleteProduct] = useDeleteProductsMutation();


    const handleDelete = async (id: string) => {
        try {
            // unwrap() gives the actual response payload
            const result = await deleteProduct(id).unwrap();

            // if TypeScript doesn't know the type, cast as any
            const success = (result as any)?.success === true;

            if (success) {
                toast.success(`Product ${(result as any)?.id ?? id} deleted successfully`);
            } else {
                toast.error("Delete failed");
            }

            setDeleteProductId(null);
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Delete failed");
        }
    };




    const isLoading = searchQuery ? isSearchLoading : isAllLoading;
    const products = searchQuery ? searchResults : allProducts;

    return (
        <div>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12"
                        />
                    </div>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full sm:w-[200px] py-6">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category: Category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Add Product Button - Now using the dialog */}
                    <ProductCreate />
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                        <p className="text-muted-foreground mb-6">
                            {searchQuery ? "Try adjusting your search" : "Get started by adding your first product"}
                        </p>
                        {!searchQuery && (
                            <ProductCreate />
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} onDelete={(id) => setDeleteProductId(id)} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {!searchQuery && products.length >= itemsPerPage && (
                            <div className="flex justify-center gap-2 mt-12">
                                <Button
                                className="cursor-pointer"
                                    variant="outline"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <div className="flex items-center px-4 text-sm text-muted-foreground">
                                    Page {currentPage}
                                </div>
                                <Button
                                className="cursor-pointer"
                                    variant="outline"
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    disabled={products.length < itemsPerPage}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Delete Dialog */}
            <DeleteConfirmDialog
                open={!!deleteProductId}
                onClose={() => setDeleteProductId(null)}
                onConfirm={() => deleteProductId && handleDelete(deleteProductId)}
                productName={products.find((p) => p.id === deleteProductId)?.name || ""}
            />
        </div>
    );
};

export default Page;