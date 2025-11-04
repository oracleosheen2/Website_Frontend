"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaStar,
  FaUndo,
  FaEye,
  FaShoppingBag,
} from "react-icons/fa";

// Define TypeScript interfaces
interface Order {
  id: number;
  productName: string;
  price: string;
  originalPrice: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  reason: string;
  image: string;
  quantity: number;
  trackingId: string;
  deliveryDate: string;
  size: string;
  color: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      productName: "Golden Floral Handbag",
      price: "₹1,499",
      originalPrice: "₹2,499",
      date: "Oct 25, 2025",
      status: "delivered",
      reason: "Successfully delivered to your address.",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      quantity: 1,
      trackingId: "TRK123456789",
      deliveryDate: "Oct 28, 2025",
      size: "One Size",
      color: "Golden",
    },
    {
      id: 2,
      productName: "Pink Velvet Dress",
      price: "₹2,299",
      originalPrice: "₹3,299",
      date: "Oct 29, 2025",
      status: "shipped",
      reason: "Expected delivery by Nov 5, 2025.",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      quantity: 1,
      trackingId: "TRK987654321",
      deliveryDate: "Nov 5, 2025",
      size: "M",
      color: "Pink",
    },
    {
      id: 3,
      productName: "Golden Earrings Set",
      price: "₹899",
      originalPrice: "₹1,499",
      date: "Nov 1, 2025",
      status: "cancelled",
      reason: "Cancelled by user due to change in preference.",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      quantity: 2,
      trackingId: "TRK456789123",
      deliveryDate: "Nov 4, 2025",
      size: "Standard",
      color: "Gold",
    },
    {
      id: 4,
      productName: "Designer Sunglasses",
      price: "₹1,799",
      originalPrice: "₹2,799",
      date: "Nov 3, 2025",
      status: "processing",
      reason: "Your order is being processed and will be shipped soon.",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      quantity: 1,
      trackingId: "TRK789123456",
      deliveryDate: "Nov 8, 2025",
      size: "One Size",
      color: "Black",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewProduct, setReviewProduct] = useState<Order | null>(null);

  // Filter orders based on status
  const filteredOrders = orders.filter(
    (order) => activeFilter === "all" || order.status === activeFilter
  );

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "shipped":
        return <FaShippingFast className="text-blue-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaBox className="text-amber-500" />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const cancelOrder = (orderId: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const reorderProduct = (order: Order) => {
    alert(`Added ${order.productName} to cart!`);
  };

  const writeReview = (order: Order) => {
    setReviewProduct(order);
    setShowReviewModal(true);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewProduct) {
      alert(`Review submitted for ${reviewProduct.productName}!`);
    }
    setShowReviewModal(false);
    setReviewProduct(null);
  };

  const getOrderCountByStatus = (status: string) => {
    if (status === "all") return orders.length;
    return orders.filter((order) => order.status === status).length;
  };

  // Calculate savings
  const calculateSavings = (price: string, originalPrice: string) => {
    const priceNum = parseInt(price.replace("₹", "").replace(",", ""));
    const originalPriceNum = parseInt(
      originalPrice.replace("₹", "").replace(",", "")
    );
    return originalPriceNum - priceNum;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaShoppingBag className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent mb-3">
            My Orders
          </h1>
          <p className="text-gray-600 text-lg">
            Track and manage your orders effortlessly
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              status: "all",
              label: "Total Orders",
              icon: "📦",
              color: "from-pink-500 to-amber-500",
            },
            {
              status: "processing",
              label: "Processing",
              icon: "⏳",
              color: "from-amber-400 to-amber-600",
            },
            {
              status: "shipped",
              label: "Shipped",
              icon: "🚚",
              color: "from-blue-400 to-blue-600",
            },
            {
              status: "delivered",
              label: "Delivered",
              icon: "✅",
              color: "from-green-400 to-green-600",
            },
          ].map((stat) => (
            <div
              key={stat.status}
              className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-pink-500 transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setActiveFilter(stat.status)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {getOrderCountByStatus(stat.status)}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center text-white`}
                >
                  <span className="text-lg">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: "all", label: "All Orders" },
            { key: "processing", label: "Processing" },
            { key: "shipped", label: "Shipped" },
            { key: "delivered", label: "Delivered" },
            { key: "cancelled", label: "Cancelled" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* List Header */}
          <div className="bg-gradient-to-r from-pink-500 to-amber-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg font-semibold">
                Order History
              </h2>
              <span className="bg-white bg-opacity-20 text-gray-600 px-3 py-1 rounded-full text-sm">
                {filteredOrders.length} orders
              </span>
            </div>
          </div>

          {/* Orders */}
          <div className="divide-y divide-gray-100">
            {filteredOrders.map((order, index) => (
              <div
                key={order.id}
                className="p-6 transition-all duration-300 hover:bg-gray-50 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Product Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    <Image
                      src={order.image}
                      alt={order.productName}
                      width={80}
                      height={80}
                      className="rounded-xl object-cover border-2 border-amber-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">
                        {order.productName}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                        <span>Size: {order.size}</span>
                        <span>Color: {order.color}</span>
                        <span>Qty: {order.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-pink-600">
                          {order.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {order.originalPrice}
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Save ₹
                          {calculateSavings(order.price, order.originalPrice)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Ordered on {order.date}
                      </p>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col items-start lg:items-end gap-3">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="font-medium capitalize">
                        {order.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-2 px-3 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors duration-200 text-sm"
                      >
                        <FaEye className="w-3 h-3" />
                        View Details
                      </button>

                      {order.status === "delivered" && (
                        <button
                          onClick={() => writeReview(order)}
                          className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors duration-200 text-sm"
                        >
                          <FaStar className="w-3 h-3" />
                          Write Review
                        </button>
                      )}

                      {order.status === "processing" && (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm"
                        >
                          <FaTimesCircle className="w-3 h-3" />
                          Cancel Order
                        </button>
                      )}

                      <button
                        onClick={() => reorderProduct(order)}
                        className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm"
                      >
                        <FaUndo className="w-3 h-3" />
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-r from-pink-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBox className="h-16 w-16 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {activeFilter === "all"
                  ? "You haven't placed any orders yet. Start shopping now!"
                  : `No ${activeFilter} orders found.`}
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Order Details
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Product Info */}
                <div className="flex items-start space-x-4">
                  <Image
                    src={selectedOrder.image}
                    alt={selectedOrder.productName}
                    width={100}
                    height={100}
                    className="rounded-xl object-cover border-2 border-amber-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">
                      {selectedOrder.productName}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Size:</span>{" "}
                        {selectedOrder.size}
                      </div>
                      <div>
                        <span className="font-medium">Color:</span>{" "}
                        {selectedOrder.color}
                      </div>
                      <div>
                        <span className="font-medium">Quantity:</span>{" "}
                        {selectedOrder.quantity}
                      </div>
                      <div>
                        <span className="font-medium">Order Date:</span>{" "}
                        {selectedOrder.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-pink-600 text-lg">
                        {selectedOrder.price}
                      </span>
                      <span className="text-gray-500 line-through">
                        {selectedOrder.originalPrice}
                      </span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Save ₹
                        {calculateSavings(
                          selectedOrder.price,
                          selectedOrder.originalPrice
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Status */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">
                      Order Status
                    </span>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {getStatusIcon(selectedOrder.status)}
                      <span className="font-medium capitalize">
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {selectedOrder.reason}
                  </p>
                </div>

                {/* Tracking Info */}
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <h4 className="font-medium text-amber-800 mb-2">
                    Tracking Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Tracking ID:</span>{" "}
                      {selectedOrder.trackingId}
                    </div>
                    <div>
                      <span className="font-medium">Expected Delivery:</span>{" "}
                      {selectedOrder.deliveryDate}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                  >
                    Close
                  </button>
                  {selectedOrder.status === "processing" && (
                    <button
                      onClick={() => {
                        cancelOrder(selectedOrder.id);
                        setSelectedOrder(null);
                      }}
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium"
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={() => {
                      reorderProduct(selectedOrder);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-xl hover:from-pink-600 hover:to-amber-600 transition-all duration-300 font-medium"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && reviewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Write a Review
                </h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={submitReview} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={reviewProduct.image}
                    alt={reviewProduct.productName}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {reviewProduct.productName}
                    </h3>
                    <p className="text-pink-600 font-medium">
                      {reviewProduct.price}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-2xl text-amber-400 hover:text-amber-500 transition-colors"
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Share your experience with this product..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-xl hover:from-pink-600 hover:to-amber-600 transition-all duration-300 font-medium"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Orders;
