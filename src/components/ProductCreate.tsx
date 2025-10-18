/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateProductsMutation } from "@/redux/features/products/products.api";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categories.api";
import { toast } from "sonner";
import { Category } from "@/redux/features/products/products.type";

const ProductCreate = () => {
  const [open, setOpen] = useState(false);
  const [createProduct, { isLoading }] = useCreateProductsMutation();
  const { data: categories = [] } = useGetAllCategoriesQuery(undefined);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    categoryId: "",
    images: [""],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newImageUrl, setNewImageUrl] = useState("");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    
    const validImages = formData.images.filter(url => url.trim() !== "");
    if (validImages.length === 0) newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Validation Error", {
        description: "Please fix the errors in the form",
      });
      return;
    }

    try {
      const filteredImages = formData.images.filter(url => url.trim() !== "");
      
      await createProduct({
        name: formData.name,
        price: formData.price,
        description: formData.description,
        categoryId: formData.categoryId,
        images: filteredImages,
      }).unwrap();

      toast.success("Product created", {
        description: "Your product has been created successfully",
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        price: 0,
        description: "",
        categoryId: "",
        images: [""],
      });
      setNewImageUrl("");
      setErrors({});
      setOpen(false);
    } catch (error: any) {
      toast.error("Create failed", {
        description: error?.data?.message || "Failed to create product",
      });
    }
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images.filter(url => url), newImageUrl],
      }));
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-6 cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your store. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (USD) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price || ""}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              className={errors.price ? "border-destructive" : ""}
            />
            {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              rows={3}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.categoryId} 
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger className={errors.categoryId ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category : Category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId}</p>}
          </div>

          <div className="space-y-2">
            <Label>Product Images *</Label>
            <div className="space-y-3">
              {formData.images.filter(url => url).map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input value={url} readOnly className="flex-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="flex-1"
                />
                <Button type="button" onClick={addImageUrl} variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
            </div>
            {errors.images && <p className="text-sm text-destructive">{errors.images}</p>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreate;