"use client";
import React, { useState } from "react";
import {
  Package,
  Truck,
  RefreshCw,
  FileText,
  X,
  Download,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

interface Order {
  id: string;
  productName: string;
  image: string;
  price: number;
  date: string;
  status: string;
  deliveryDate: string;
}

const OrderHistory: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: "ORD12345",
      productName: "Elegant Pink Handbag",
      image:
        "https://www.shutterstock.com/image-photo/hands-businesswoman-packing-orders-desk-260nw-2225138165.jpg",
      price: 1499,
      date: "25 Oct 2025",
      status: "Delivered",
      deliveryDate: "28 Oct 2025",
    },
    {
      id: "ORD67890",
      productName: "Golden Designer Heels",
      image:
        "https://www.shutterstock.com/image-photo/hands-businesswoman-packing-orders-desk-260nw-2225138165.jpg",
      price: 2399,
      date: "29 Oct 2025",
      status: "Shipped",
      deliveryDate: "Expected by 5 Nov 2025",
    },
    {
      id: "ORD11223",
      productName: "Stylish Pink Kurti Set",
      image:
        "https://www.shutterstock.com/image-photo/hands-businesswoman-packing-orders-desk-260nw-2225138165.jpg",
      price: 999,
      date: "1 Nov 2025",
      status: "Processing",
      deliveryDate: "Will update soon",
    },
  ]);

  // Modal states
  const [trackingModal, setTrackingModal] = useState<{
    open: boolean;
    orderId: string;
  }>({ open: false, orderId: "" });
  const [invoiceModal, setInvoiceModal] = useState<{
    open: boolean;
    orderId: string;
  }>({ open: false, orderId: "" });
  const [returnModal, setReturnModal] = useState<{
    open: boolean;
    orderId: string;
  }>({ open: false, orderId: "" });

  // Tracking steps data
  const trackingSteps = [
    { status: "Order Placed", completed: true, date: "25 Oct 2025" },
    { status: "Order Confirmed", completed: true, date: "25 Oct 2025" },
    { status: "Shipped", completed: true, date: "26 Oct 2025" },
    { status: "Out for Delivery", completed: true, date: "28 Oct 2025" },
    { status: "Delivered", completed: true, date: "28 Oct 2025" },
  ];

  // Modal handlers
  const handleTrack = (id: string) =>
    setTrackingModal({ open: true, orderId: id });
  const handleInvoice = (id: string) =>
    setInvoiceModal({ open: true, orderId: id });
  const handleReturn = (id: string) =>
    setReturnModal({ open: true, orderId: id });

  // Close modals
  const closeModals = () => {
    setTrackingModal({ open: false, orderId: "" });
    setInvoiceModal({ open: false, orderId: "" });
    setReturnModal({ open: false, orderId: "" });
  };

  // Get current order for modals
  const currentOrder = orders.find(
    (order) =>
      order.id === trackingModal.orderId ||
      order.id === invoiceModal.orderId ||
      order.id === returnModal.orderId
  );

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
          My Orders 🛍️
        </h1>
        <p className="text-gray-600 text-lg">
          View, track, and manage all your past orders in one place.
        </p>
      </div>

      <div className="w-full max-w-5xl space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border-l-4 border-pink-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <div className="relative">
                <Image
                  src={order.image}
                  alt={order.productName}
                  className="w-24 h-24 object-cover rounded-xl border-2 border-pink-200 shadow-md"
                  width={200}
                  height={200}
                />
                <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  {order.status}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {order.productName}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  Order ID: {order.id}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar size={14} /> Ordered on: {order.date}
                </p>
                <p
                  className={`text-sm font-semibold mt-2 flex items-center gap-1 ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  <MapPin size={14} /> {order.deliveryDate}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
              <span className="text-2xl font-bold text-pink-600 bg-pink-50 px-4 py-2 rounded-xl shadow-sm">
                ₹{order.price.toLocaleString()}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() => handleTrack(order.id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Truck size={18} /> Track Order
                </button>
                <button
                  onClick={() => handleInvoice(order.id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FileText size={18} /> Get Invoice
                </button>
                <button
                  onClick={() => handleReturn(order.id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 border-2 border-pink-200 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-pink-200 hover:border-pink-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <RefreshCw size={18} /> Return
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center text-gray-600 mt-16">
          <Package className="w-16 h-16 text-pink-400 mx-auto mb-3" />
          <p className="text-lg">You have no orders yet. Start shopping now!</p>
          <button className="mt-4 bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-all shadow-lg hover:shadow-xl">
            Shop Now
          </button>
        </div>
      )}

      {/* Tracking Modal */}
      {trackingModal.open && currentOrder && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Order Tracking
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
              <p className="font-semibold text-gray-800">
                {currentOrder.productName}
              </p>
              <p className="text-sm text-gray-600">
                Order ID: {currentOrder.id}
              </p>
            </div>

            <div className="space-y-4">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step.completed ? <CheckCircle size={16} /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        step.completed ? "text-gray-800" : "text-gray-500"
                      }`}
                    >
                      {step.status}
                    </p>
                    <p className="text-sm text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={closeModals}
              className="w-full mt-6 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceModal.open && currentOrder && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Download Invoice
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={currentOrder.image}
                  alt={currentOrder.productName}
                  className="w-16 h-16 object-cover rounded-lg border border-yellow-300"
                  width={80}
                  height={80}
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {currentOrder.productName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Order ID: {currentOrder.id}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{currentOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">
                    {currentOrder.status}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-yellow-200">
                  <span className="text-gray-800">Total Amount:</span>
                  <span className="text-pink-600">
                    ₹{currentOrder.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  alert(`Invoice downloaded for ${currentOrder.id}`)
                }
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-500 transition"
              >
                <Download size={18} /> Download PDF
              </button>
              <button
                onClick={closeModals}
                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return Modal */}
      {returnModal.open && currentOrder && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Return Request
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
              <p className="font-semibold text-gray-800 mb-2">
                {currentOrder.productName}
              </p>
              <p className="text-sm text-gray-600">
                Order ID: {currentOrder.id}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Reason
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                  <option>Product damaged</option>
                  <option>Wrong item received</option>
                  <option>Size doesn&rsquo;t fit</option>
                  <option>Quality issues</option>
                  <option>Changed my mind</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  rows={3}
                  placeholder="Please provide more details about your return request..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert(`Return request submitted for ${currentOrder.id}`);
                  closeModals();
                }}
                className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
              >
                Submit Return Request
              </button>
              <button
                onClick={closeModals}
                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
