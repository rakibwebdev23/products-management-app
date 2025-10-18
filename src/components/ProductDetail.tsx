/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsAPI } from '@/lib/api';
import { Product } from '@/store/slices/productsSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Edit, Trash2, Loader2 } from 'lucide-react';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const loadProduct = async () => {
    if (!slug) return;
    
    setIsLoading(true);
    try {
      const data = await productsAPI.getBySlug(slug);
      setProduct(data);
    } catch (error: any) {
      toast({
        title: 'Error loading product',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    
    try {
      await productsAPI.delete(product.id);
      toast({
        title: 'Product deleted',
        description: 'The product has been removed successfully',
      });
      navigate('/products');
    } catch (error: any) {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Skeleton className="h-10 w-40" />
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => navigate('/products')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
              <img
                src={product.images[currentImageIndex] || 'https://placehold.co/600x600?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x600?text=No+Image';
                }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
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

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category.name}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {product.name}
              </h1>
              <p className="text-4xl font-bold text-primary mb-6">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                className="w-full gap-2"
                onClick={() => navigate(`/products/edit/${product.id}`, { state: { product } })}
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

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        productName={product.name}
      />
    </div>
  );
};

export default ProductDetail;
