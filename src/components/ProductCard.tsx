'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IProduct } from '@/redux/features/products/products.type';
import Link from 'next/link';

interface ProductCardProps {
    product: IProduct;
    onDelete: (id: string) => void;
}

const ProductCard = ({ product}: ProductCardProps) => {


    return (
        <Link
            href={`/products/${product?.slug}`}
        >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
                <div
                    className="relative aspect-square bg-muted cursor-pointer overflow-hidden"
                >
                    {product.images?.length > 0 && (
                        <img
                            src={product.images[0]}
                            alt="Product image"
                            className="w-full h-[200px] md:h-[300px] object-cover"
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
            </Card>
        </Link>
    );
};

export default ProductCard;
