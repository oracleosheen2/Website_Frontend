import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Yahan wahi data use karen jo aapke ProductListing me hai
const allProducts = [
  {
    id: 1,
    name: "Raksha Kavach Bracelet",
    price: 120.23,
    image: "https://picsum.photos/id/1011/300/300",
    category: "Dresses",
    brand: "H&M",
    size: ["Medium", "Large"],
    gender: ["Women", "Girls"],
    isNew: true,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Golden Thread Bracelet",
    price: 150.0,
    image: "https://picsum.photos/id/1012/300/300",
    category: "Tops",
    brand: "Zara",
    size: ["Large", "Plus Size"],
    gender: ["Women", "Ladies"],
    isNew: false,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Silver Charm Bracelet",
    price: 180.5,
    image: "https://picsum.photos/id/1013/300/300",
    category: "Lingerie & Lounge Wear",
    brand: "Victoria's Secret",
    size: ["Medium"],
    gender: ["Women"],
    isNew: true,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Beaded Bracelet",
    price: 90.0,
    image: "https://picsum.photos/id/1015/300/300",
    category: "Blouse",
    brand: "Mark & Spencer",
    size: ["Large", "Plus Size", "Sexy Plus Size"],
    gender: ["Ladies"],
    isNew: false,
    rating: 3.9,
  },
  {
    id: 5,
    name: "Leather Strap Bracelet",
    price: 200.0,
    image: "https://picsum.photos/id/1016/300/300",
    category: "Vintage",
    brand: "Gucci",
    size: ["Medium", "Large"],
    gender: ["Women", "Ladies"],
    isNew: true,
    rating: 4.7,
  },
  {
    id: 6,
    name: "Pearl Bracelet",
    price: 250.5,
    image: "https://picsum.photos/id/1018/300/300",
    category: "Dresses",
    brand: "Chanel",
    size: ["Medium"],
    gender: ["Women"],
    isNew: false,
    rating: 4.9,
  },
  {
    id: 7,
    name: "Thread Friendship Bracelet",
    price: 75.0,
    image: "https://picsum.photos/id/1020/300/300",
    category: "Tops",
    brand: "H&M",
    size: ["Large", "Plus Size"],
    gender: ["Girls", "Babies"],
    isNew: true,
    rating: 4.1,
  },
  {
    id: 8,
    name: "Gold Plated Bracelet",
    price: 300.0,
    image: "https://picsum.photos/id/1021/300/300",
    category: "Lingerie & Lounge Wear",
    brand: "Dior",
    size: ["Medium", "Large", "Sexy Plus Size"],
    gender: ["Women", "Ladies"],
    isNew: false,
    rating: 4.6,
  },
  {
    id: 9,
    name: "Classic Woven Bracelet",
    price: 110.0,
    image: "https://picsum.photos/id/1024/300/300",
    category: "Blouse",
    brand: "Prada",
    size: ["Medium"],
    gender: ["Women"],
    isNew: true,
    rating: 4.3,
  },
  {
    id: 10,
    name: "Mystic Stone Bracelet",
    price: 175.0,
    image: "https://picsum.photos/id/1025/300/300",
    category: "Vintage",
    brand: "Fendi",
    size: ["Large", "Plus Size"],
    gender: ["Ladies"],
    isNew: false,
    rating: 4.4,
  },
  {
    id: 11,
    name: "Diamond Elegance Bracelet",
    price: 280.0,
    image: "https://picsum.photos/id/1027/300/300",
    category: "Dresses",
    brand: "Versace",
    size: ["Medium"],
    gender: ["Women"],
    isNew: true,
    rating: 4.9,
  },
  {
    id: 12,
    name: "Rose Gold Beauty",
    price: 195.0,
    image: "https://picsum.photos/id/1028/300/300",
    category: "Tops",
    brand: "Dolce & Gabbana",
    size: ["Large", "Sexy Plus Size"],
    gender: ["Ladies"],
    isNew: false,
    rating: 4.5,
  },
];

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const productId = parseInt(params.id);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-500 text-lg lg:text-xl">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500 text-lg lg:text-xl">
          ☆
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-lg lg:text-xl">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-12 pt-24">
      <div className="container mx-auto md:px-4 px-0 py-6 sm:py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 lg:mb-8">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link
            href="/products"
            className="hover:text-gray-700 transition-colors"
          >
            Products
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  New Arrival
                </span>
              )}
              <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                20% OFF
              </span>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm lg:text-base text-gray-500 uppercase tracking-wide font-medium">
                  {product.category}
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                  {product.name}
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 mt-1">
                  {product.brand}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600 text-base lg:text-lg">
                  {product.rating} out of 5
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <p className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Rs. {product.price.toFixed(2)}
                </p>
                <p className="text-xl lg:text-2xl text-gray-500 line-through">
                  Rs. {(product.price * 1.2).toFixed(2)}
                </p>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  20% OFF
                </span>
              </div>
              <p className="text-green-600 font-medium text-sm lg:text-base">
                Free shipping • 30-day return policy
              </p>
            </div>

            {/* Gender Tags */}
            <div className="flex flex-wrap gap-2">
              {product.gender.map((g) => (
                <span
                  key={g}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Size Selection */}
            {product.size && product.size.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-lg">
                  Available Sizes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((s) => (
                    <button
                      key={s}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-black transition-colors font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                Product Description
              </h3>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                This beautiful {product.name.toLowerCase()} from {product.brand}{" "}
                is perfect for {product.gender.join(" and ").toLowerCase()}.
                Made with premium materials and exquisite craftsmanship, this
                bracelet adds elegance to any outfit. Available in multiple
                sizes for the perfect fit.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm lg:text-base">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Premium quality materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>1-year warranty included</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Free shipping worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 bg-black text-white py-4 px-8 rounded-xl hover:bg-gray-800 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl">
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors text-lg font-semibold">
                Add to Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
                <div className="text-center">
                  <div className="text-2xl mb-2">🚚</div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-xs">On orders over $50</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">↩️</div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-xs">30-day return policy</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-xs">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }));
}
