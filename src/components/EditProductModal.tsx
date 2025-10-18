"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUpdateProductsMutation } from "@/redux/features/products/products.api";

interface EditProductModalProps {
    open: boolean;
    onClose: () => void;
    product: any;
}

const EditProductModal = ({ open, onClose, product }: EditProductModalProps) => {
    const [updateProduct, { isLoading }] = useUpdateProductsMutation();

    const [formData, setFormData] = useState<{ name?: string, description?: string }>({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name ?? "",
                description: product.description ?? "",
            });
        }
    }, [product]);


    const handleSave = async () => {
        if (!product?.id) {
            toast.error("Product ID is missing.");
            return;
        }

        try {
            const result = await updateProduct({ id: product?.id, data: formData }).unwrap();
            if (result) {
                toast.success("Product updated successfully!");
            } else {
                toast.error("Update failed.");
            }

            onClose();
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Something went wrong while updating the product.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={e => setFormData({ name: e.target.value })}
                            placeholder="Enter product name"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={e => setFormData({ description: e.target.value })}
                            placeholder="Enter product description"
                        />
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductModal;
