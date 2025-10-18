/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductDetail from "@/components/ProductDetail"

const Product = ({params}:any) => {
    console.log(params?.productId)

    return (
        <div>
            <ProductDetail productId={params?.productId} />
        </div>
    )
}

export default Product;