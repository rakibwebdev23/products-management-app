'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye } from 'lucide-react';
import { IProduct } from '@/redux/features/products/products.type';
import Link from 'next/link';

interface ProductCardProps {
    product: IProduct;
    onDelete: (id: string) => void;
}

const ProductCard = ({ product, onDelete }: ProductCardProps) => {


    return (
        <Link
            href={`products/${product?.slug}`}
        >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
                <div
                    className="relative aspect-square bg-muted cursor-pointer overflow-hidden"
                >
                    {product.images?.length > 0 && (
                        <img
                            src={product.images[0]}
                            alt="Product image"
                            className="w-full object-cover rounded-lg"
                        />
                    )}

                    <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                            {product.category.name}
                        </Badge>
                    </div>
                </div>

                <CardContent className="p-4">
                    <h3
                        className="font-semibold text-lg mb-2 line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                    >
                        {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {product.description}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                        ${product.price.toLocaleString()}
                    </p>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        View
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                        className="gap-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ProductCard;
