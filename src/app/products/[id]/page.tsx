// import { allProducts } from "../data";
import { allProducts } from "@/utils/products";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import RecommendedProducts from "./RecommendedProducts";
interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const productId = parseInt(params.id);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50  pt-24">
      <div className="">
        {/* Product Info */}
        <div>
          <ProductInfo product={product} />
        </div>

        {/* Ratings / Feedback / Comments */}
        <ProductReviews productId={productId} />

        {/* Recommended Products */}
        <RecommendedProducts
          currentId={productId}
          category={product.category}
        />
      </div>
    </div>
  );
}
