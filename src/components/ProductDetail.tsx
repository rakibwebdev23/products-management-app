/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
// import EditProductModal from "@/components/EditProductModal";
import { useRouter } from "next/navigation";
import {
  useDeleteProductsMutation,
  useGetSingleProductQuery,
} from "@/redux/features/products/products.api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import EditProductModal from "./EditProductModal";

const ProductDetail = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [deleteProduct] = useDeleteProductsMutation();
  const { data: product, isLoading, isError } = useGetSingleProductQuery(productId);

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteProduct(id).unwrap();
      const success = (result as any)?.success === true;

      if (success) {
        toast.success(`Product ${(result as any)?.id ?? id} deleted successfully`);
        router.push("/products");
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Delete failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <Skeleton className="h-10 w-40 mb-4" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return <p className="text-center mt-10">Failed to load product.</p>;
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => router.push("/products")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
              {product?.images?.length > 0 && (
                <img
                  src={product.images[currentImageIndex]}
                  alt="Product image"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {product?.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category?.name}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-3">{product.name}</h1>
              <p className="text-4xl font-bold text-primary mb-6">
                ${product.price?.toLocaleString()}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                className="w-full gap-2"
                onClick={() => setShowEditModal(true)}
              >
                <Edit className="w-4 h-4" />
                Edit Product
              </Button>

              <Button
                variant="outline"
                className="w-full gap-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4" />
                Delete Product
              </Button>
            </div>

            <div className="pt-6 border-t border-border text-sm text-muted-foreground">
              <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
              <p className="mt-2">Product ID: {product.id}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => handleDelete(product.id)}
        productName={product.name}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;








// "use client";

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
// import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
// import { useRouter } from 'next/navigation';
// import { useDeleteProductsMutation, useGetSingleProductQuery } from '@/redux/features/products/products.api';
// import { Skeleton } from '@/components/ui/skeleton';
// import { toast } from 'sonner';
// // import { IProduct } from '@/types/product.types';

// const ProductDetail = ({ productId }: { productId: string }) => {
//   const [deleteProduct] = useDeleteProductsMutation();
//   const router = useRouter();
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const { data: product, isLoading, isError } = useGetSingleProductQuery(productId);
//   console.log(product)
// const handleDelete = async (id: string) => {
//         try {
//             // unwrap() gives the actual response payload
//             const result = await deleteProduct(id).unwrap();

//             // if TypeScript doesn't know the type, cast as any
//             const success = (result as any)?.success === true;

//             if (success) {
//                 toast.success(`Product ${(result as any)?.id ?? id} deleted successfully`);
//             } else {
//                 toast.error("Delete failed");
//             }
//         } catch (err) {
//             console.error("Delete failed:", err);
//             toast.error("Delete failed");
//         }
//     };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background p-8">
//         <Skeleton className="h-10 w-40 mb-4" />
//         <div className="grid md:grid-cols-2 gap-8">
//           <Skeleton className="aspect-square rounded-2xl" />
//           <div className="space-y-4">
//             <Skeleton className="h-8 w-3/4" />
//             <Skeleton className="h-10 w-32" />
//             <Skeleton className="h-24 w-full" />
//             <Skeleton className="h-12 w-full" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !product) {
//     return <p className="text-center mt-10">Failed to load product.</p>;
//   }

//   return (
//     <div className="min-h-screen bg-background pb-12">
//       <header className="bg-card border-b border-border">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <Button variant="ghost" onClick={() => router.push('/products')} className="gap-2">
//             <ArrowLeft className="w-4 h-4" />
//             Back to Products
//           </Button>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Images */}
//           <div className="space-y-4">
//             <div className="aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
//               {product?.images?.length > 0 && (
//                         <img
//                             src={product.images[0]}
//                             alt="Product image"
//                             className="w-full object-cover rounded-lg"
//                         />
//                     )}
//             </div>
//             {product?.images?.length > 1 && (
//               <div className="flex gap-2 overflow-x-auto">
//                 {product?.images?.map((image: string, index: number) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
//                       currentImageIndex === index
//                         ? 'border-primary'
//                         : 'border-border hover:border-primary/50'
//                     }`}
//                   >
//                     <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Details */}
//           <div className="space-y-6">
//             <div>
//               <Badge variant="secondary" className="mb-3">
//                 {product.category.name}
//               </Badge>
//               <h1 className="text-3xl font-bold text-foreground mb-3">{product.name}</h1>
//               <p className="text-4xl font-bold text-primary mb-6">
//                 ${product.price.toLocaleString()}
//               </p>
//             </div>

//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-2">Description</h2>
//               <p className="text-muted-foreground leading-relaxed">{product.description}</p>
//             </div>

//             <div className="pt-4 space-y-3">
//               <Button
//                 className="w-full gap-2 cursor-pointer"
//                 onClick={() => alert('Edit clicked (demo)')}
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit Product
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full gap-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive cursor-pointer"
//                 onClick={() => setShowDeleteDialog(true)}
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Delete Product
//               </Button>
//             </div>

//             <div className="pt-6 border-t border-border text-sm text-muted-foreground">
//               <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
//               <p>Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
//               <p className="mt-2">Product ID: {product.id}</p>
//             </div>
//           </div>
//         </div>
//       </main>

//       <DeleteConfirmDialog
//         open={showDeleteDialog}
//         onClose={() => setShowDeleteDialog(false)}
//         onConfirm={() => handleDelete(product.id)}
//         productName={product.name}
//       />
//     </div>
//   );
// };

// export default ProductDetail;