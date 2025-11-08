"use client";
import React, { useState } from "react";
import Image from "next/image";

// Define TypeScript interfaces
interface UserData {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  profileImage: string;
  membership: string;
  loyaltyPoints: number;
  dateOfBirth?: string;
}

interface Order {
  id: number;
  productName: string;
  price: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  image: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  discount: string;
}

interface Address {
  id: number;
  type: string;
  name: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: number;
  type: string;
  name: string;
  details: string;
  isDefault: boolean;
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // User data with state
  const [userData, setUserData] = useState<UserData>({
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    joinDate: "January 15, 2023",
    profileImage:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
    membership: "Gold Member",
    loyaltyPoints: 1250,
    dateOfBirth: "1990-05-15",
  });

  // Form state for editing
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    dateOfBirth: userData.dateOfBirth || "",
  });

  // Recent orders with state
  const [recentOrders, setRecentOrders] = useState<Order[]>([
    {
      id: 1,
      productName: "Wireless Bluetooth Headphones",
      price: "₹2,499",
      date: "Dec 12, 2024",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      productName: "Smart Fitness Band",
      price: "₹1,799",
      date: "Dec 8, 2024",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      productName: "Organic Face Cream",
      price: "₹899",
      date: "Dec 5, 2024",
      status: "Shipped",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop",
    },
  ]);

  // Wishlist items with state
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Designer Handbag",
      price: "₹3,499",
      originalPrice: "₹4,999",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop",
      discount: "30% off",
    },
    {
      id: 2,
      name: "Running Shoes",
      price: "₹2,199",
      originalPrice: "₹3,199",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
      discount: "31% off",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: "₹4,999",
      originalPrice: "₹6,999",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      discount: "28% off",
    },
  ]);

  // Addresses with state
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Home",
      name: "Priya Sharma",
      address: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      phone: "+91 98765 43210",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "Priya Sharma",
      address:
        "Tech Park, Office No. 304, Andheri East, Mumbai, Maharashtra 400093",
      phone: "+91 98765 43210",
      isDefault: false,
    },
  ]);

  // Payment methods with state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: "Visa",
      name: "Visa Classic",
      details: "**** **** **** 4242",
      isDefault: true,
    },
    {
      id: 2,
      type: "PayPal",
      name: "PayPal Account",
      details: "user@example.com",
      isDefault: false,
    },
  ]);

  // New address form state
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    name: "",
    address: "",
    phone: "",
    isDefault: false,
  });

  // New payment method form state
  const [newPayment, setNewPayment] = useState({
    type: "Credit Card",
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });

  // Handle profile edit
  const handleEditProfile = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth || "",
    });
    setIsEditing(true);
  };

  // Handle profile save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData((prev) => ({
      ...prev,
      ...formData,
    }));
    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle address input changes
  const handleAddressInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle payment input changes
  const handlePaymentInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setNewPayment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add new address
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const address: Address = {
      id: addresses.length + 1,
      ...newAddress,
    };

    if (newAddress.isDefault) {
      setAddresses((prev) => [
        address,
        ...prev.map((addr) => ({ ...addr, isDefault: false })),
      ]);
    } else {
      setAddresses((prev) => [...prev, address]);
    }

    setNewAddress({
      type: "Home",
      name: "",
      address: "",
      phone: "",
      isDefault: false,
    });
    setShowAddAddress(false);
  };

  // Add new payment method
  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const payment: PaymentMethod = {
      id: paymentMethods.length + 1,
      type: newPayment.type,
      name: newPayment.name,
      details: `**** **** **** ${newPayment.cardNumber.slice(-4)}`,
      isDefault: newPayment.isDefault,
    };

    if (newPayment.isDefault) {
      setPaymentMethods((prev) => [
        payment,
        ...prev.map((pm) => ({ ...pm, isDefault: false })),
      ]);
    } else {
      setPaymentMethods((prev) => [...prev, payment]);
    }

    setNewPayment({
      type: "Credit Card",
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    });
    setShowAddPayment(false);
  };

  // Set default address
  const setDefaultAddress = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  // Set default payment method
  const setDefaultPayment = (id: number) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  // Delete address
  const deleteAddress = (id: number) => {
    setAddresses((prev) => {
      const newAddresses = prev.filter((addr) => addr.id !== id);
      if (
        newAddresses.length > 0 &&
        !newAddresses.some((addr) => addr.isDefault)
      ) {
        newAddresses[0].isDefault = true;
      }
      return newAddresses;
    });
  };

  // Delete payment method
  const deletePaymentMethod = (id: number) => {
    setPaymentMethods((prev) => {
      const newPayments = prev.filter((pm) => pm.id !== id);
      if (newPayments.length > 0 && !newPayments.some((pm) => pm.isDefault)) {
        newPayments[0].isDefault = true;
      }
      return newPayments;
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Add to cart from wishlist
  const addToCart = (item: WishlistItem) => {
    alert(`Added ${item.name} to cart!`);
  };

  // View order details
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  // Close order details
  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      case "Processing":
        return "text-amber-600 bg-amber-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPaymentLogo = (type: string) => {
    switch (type) {
      case "Visa":
        return (
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
            Visa
          </div>
        );
      case "PayPal":
        return (
          <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
            PayPal
          </div>
        );
      case "MasterCard":
        return (
          <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs">
            Master
          </div>
        );
      default:
        return (
          <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white font-bold text-xs">
            Card
          </div>
        );
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg relative">
              <Image
                src={userData.profileImage}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover border-4 border-white"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-pink-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent mb-2">
            {userData.name}
          </h1>
          <p className="text-gray-600 text-lg">{userData.email}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              {userData.membership}
            </span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              {userData.loyaltyPoints} Points
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-l-4 border-pink-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  Total Orders
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  47
                </p>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-lg md:text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-l-4 border-amber-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  Wishlist
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {wishlistItems.length}
                </p>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-lg md:text-2xl">❤️</span>
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  Coupons
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  5
                </p>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg md:text-2xl">🎫</span>
              </div>
            </div>
          </div> */}

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  Member Since
                </p>
                <p className="text-sm md:text-lg font-bold text-gray-800">
                  {userData.joinDate}
                </p>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg md:text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 md:gap-2 mb-6 md:mb-8 bg-white rounded-2xl shadow-lg p-1 md:p-2">
          {[
            { key: "profile", label: "Profile", icon: "👤" },
            { key: "orders", label: "Orders", icon: "📦" },
            { key: "wishlist", label: "Wishlist", icon: "❤️" },
            { key: "addresses", label: "Addresses", icon: "🏠" },
            { key: "payments", label: "Payments", icon: "💳" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 text-sm md:text-base ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-sm md:text-base">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Info Tab */}
          {activeTab === "profile" && (
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Profile Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={handleEditProfile}
                    className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form
                  onSubmit={handleSaveProfile}
                  className="space-y-6 max-w-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Full Name
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {userData.name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Phone
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {userData.phone}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Member Since
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {userData.joinDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                Recent Orders
              </h2>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 gap-4"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <Image
                        src={order.image}
                        alt={order.productName}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {order.productName}
                        </h3>
                        <p className="text-pink-600 font-medium">
                          {order.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Ordered on {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-normal">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="bg-pink-50 text-pink-600 px-4 py-2 rounded-xl hover:bg-pink-100 transition-colors duration-200 text-sm whitespace-nowrap"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  View All Orders
                </button>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                My Wishlist ({wishlistItems.length})
              </h2>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-pink-600">❤️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start adding items you love!
                  </p>
                  <button className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-2 rounded-xl">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full h-40 md:h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-gray-800 mb-2 truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-pink-600 font-bold text-lg">
                          {item.price}
                        </span>
                        <span className="text-gray-500 line-through text-sm">
                          {item.originalPrice}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {item.discount}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(item)}
                          className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 text-sm"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                        >
                          <span>❌</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Saved Addresses
                </h2>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                >
                  Add New Address
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border-2 rounded-xl p-4 transition-all duration-300 ${
                      address.isDefault
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                        {address.type}
                      </span>
                      {address.isDefault && (
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {address.name}
                    </h3>
                    <p className="text-gray-600 mb-2 text-sm">
                      {address.address}
                    </p>
                    <p className="text-gray-600 mb-4 text-sm">
                      {address.phone}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAddress(address.id)}
                        className="text-gray-600 hover:text-red-600 font-medium text-sm"
                      >
                        Delete
                      </button>
                      {!address.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(address.id)}
                          className="text-amber-600 hover:text-amber-700 font-medium text-sm ml-auto"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Payment Methods
                </h2>
                <button
                  onClick={() => setShowAddPayment(true)}
                  className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                >
                  Add New Payment
                </button>
              </div>
              <div className="max-w-2xl space-y-4">
                {paymentMethods.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-xl gap-4"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {getPaymentLogo(payment.type)}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {payment.name}
                        </p>
                        <p className="text-gray-600">{payment.details}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-normal">
                      {payment.isDefault ? (
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          Default
                        </span>
                      ) : (
                        <button
                          onClick={() => setDefaultPayment(payment.id)}
                          className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => deletePaymentMethod(payment.id)}
                        className="text-gray-600 hover:text-red-600 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {paymentMethods.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-pink-600">💳</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      No payment methods
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Add a payment method for faster checkout
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Add New Address
                </h2>
                <button
                  onClick={() => setShowAddAddress(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Type
                  </label>
                  <select
                    name="type"
                    value={newAddress.type}
                    onChange={handleAddressInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newAddress.name}
                    onChange={handleAddressInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={newAddress.address}
                    onChange={handleAddressInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleAddressInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={newAddress.isDefault}
                    onChange={handleAddressInputChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Set as default address
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-xl hover:from-pink-600 hover:to-amber-600 transition-all duration-300 font-medium"
                  >
                    Add Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Add Payment Method
                </h2>
                <button
                  onClick={() => setShowAddPayment(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Type
                  </label>
                  <select
                    name="type"
                    value={newPayment.type}
                    onChange={handlePaymentInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newPayment.name}
                    onChange={handlePaymentInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter card holder name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={newPayment.cardNumber}
                    onChange={handlePaymentInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={newPayment.expiryDate}
                      onChange={handlePaymentInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={newPayment.cvv}
                      onChange={handlePaymentInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={newPayment.isDefault}
                    onChange={handlePaymentInputChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddPayment(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-xl hover:from-pink-600 hover:to-amber-600 transition-all duration-300 font-medium"
                  >
                    Add Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Order Details
                </h2>
                <button
                  onClick={closeOrderDetails}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={selectedOrder.image}
                    alt={selectedOrder.productName}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {selectedOrder.productName}
                    </h3>
                    <p className="text-pink-600 font-medium text-xl">
                      {selectedOrder.price}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">{selectedOrder.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">
                      #ORD{selectedOrder.id.toString().padStart(6, "0")}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Delivery Information
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {selectedOrder.status === "Delivered"
                      ? "Your order has been successfully delivered to your address."
                      : selectedOrder.status === "Shipped"
                      ? "Your order is on the way and will be delivered soon."
                      : "Your order is being processed."}
                  </p>
                </div>

                <button
                  onClick={closeOrderDetails}
                  className="w-full bg-gradient-to-r from-pink-500 to-amber-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Close
                </button>
              </div>
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
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;
