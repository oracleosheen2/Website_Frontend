"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Horoscope", href: "/horoscope" },
  { name: "Blog", href: "/blog" },
];

const profileLinks = [
  { name: "View Profile", href: "/header/profile", icon: "👤" },
  { name: "My Orders", href: "/header/orders", icon: "📦" },
  { name: "Order History", href: "/header/order-history", icon: "📋" },
  { name: "Wishlist", href: "/header/wishlist", icon: "❤️" },
  { name: "Settings", href: "/header/settings", icon: "⚙️" },
  { name: "Payment Methods", href: "/header/payment-methods", icon: "💳" },
  { name: "Address Book", href: "/header/addresses", icon: "🏠" },
  { name: "Notifications", href: "/header/notifications", icon: "🔔" },
  { name: "Help & Support", href: "/header/support", icon: "❓" },
  { name: "Logout", href: "/header/logout", icon: "🚪" },
];

// Services dropdown items
const servicesLinks = [
  { name: "Spells", href: "/services/spells" },
  { name: "Reading", href: "/services/reading" },
  // { name: "Consultation", href: "/services/consultation" },
];

export default function HeroHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { getTotalItems } = useCart();
  const { getTotalWishlistItems } = useWishlist();
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
      
      // Services dropdown outside click - check both trigger and dropdown
      if (
        servicesTriggerRef.current &&
        servicesDropdownRef.current &&
        !servicesTriggerRef.current.contains(event.target as Node) &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToCart = () => {
    router.push("/cart");
  };

  const navigateToWishlist = () => {
    router.push("/header/wishlist");
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleProfileItemClick = (href: string) => {
    setProfileDropdownOpen(false);
    router.push(href);
  };

  // Services dropdown handlers - FIXED VERSION
  const handleServicesMouseEnter = () => {
    if (window.innerWidth >= 768) { // Desktop
      setServicesDropdownOpen(true);
    }
  };

  const handleServicesMouseLeave = (e: React.MouseEvent) => {
    if (window.innerWidth >= 768) { // Desktop
      // Check if we're moving to the dropdown
      const relatedTarget = e.relatedTarget as Node;
      if (
        servicesDropdownRef.current &&
        servicesDropdownRef.current.contains(relatedTarget)
      ) {
        return; // Don't close if moving to dropdown
      }
      
      // Small delay to ensure smooth transition
      setTimeout(() => {
        if (!servicesDropdownRef.current?.contains(document.activeElement)) {
          setServicesDropdownOpen(false);
        }
      }, 100);
    }
  };

  const handleDropdownMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setServicesDropdownOpen(true);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (window.innerWidth >= 768) {
      // Small delay to ensure we're not moving back to trigger
      setTimeout(() => {
        setServicesDropdownOpen(false);
      }, 150);
    }
  };

  const handleServicesClick = () => {
    if (window.innerWidth < 768) { // Mobile
      setServicesDropdownOpen(!servicesDropdownOpen);
    } else {
      // Desktop click - navigate to main services page
      router.push("/services");
    }
  };

  const handleServicesItemClick = (href: string) => {
    setServicesDropdownOpen(false);
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FBB5E7] py-4" : "bg-[#FBB5E7] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative">
        {/* Logo */}
        <div
          className="cursor-pointer flex-shrink-0"
          onClick={() => router.push("/")}
        >
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Logo"
              width={scrolled ? 90 : 120}
              height={scrolled ? 90 : 120}
              className="rounded-full transition-all duration-300 hidden sm:block"
              style={{
                marginBottom: scrolled ? "-30px" : "-40px",
              }}
            />
            {/* Mobile logo (auto adjusts) */}
            <Image
              src="/logo.png"
              alt="Logo"
              width={scrolled ? 70 : 80}
              height={scrolled ? 70 : 80}
              className="rounded-full transition-all duration-300 sm:hidden"
              style={{
                marginBottom: scrolled ? "-20px" : "-25px",
              }}
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 lg:space-x-10 items-center">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
            >
              {link.name === "Services" ? (
                <div 
                  className="relative"
                  ref={servicesTriggerRef}
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <button
                    className="text-gray-800 text-sm lg:text-base font-medium hover:text-purple-600 transition-all duration-300 hover:scale-105 flex items-center gap-1 cursor-pointer"
                    onClick={handleServicesClick}
                  >
                    {link.name}
                    <MdKeyboardArrowDown 
                      className={`transition-transform duration-300 ${
                        servicesDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Services Dropdown with connector */}
                  <div
                    className="absolute top-full left-0 w-full h-2 bg-transparent"
                    style={{ zIndex: 60 }}
                  ></div>
                  
                  {/* Services Dropdown */}
                  <div
                    ref={servicesDropdownRef}
                    className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-purple-100 transition-all duration-300 transform ${
                      servicesDropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                    style={{ zIndex: 50 }}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    {servicesLinks.map((service) => (
                      <button
                        key={service.name}
                        onClick={() => handleServicesItemClick(service.href)}
                        className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-all duration-200 text-gray-700 hover:text-purple-600 font-medium first:rounded-t-xl last:rounded-b-xl cursor-pointer"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={link.href}
                  className="text-gray-800 text-sm lg:text-base font-medium hover:text-purple-600 transition-all duration-300 hover:scale-105"
                >
                  {link.name}
                </a>
              )}
            </div>
          ))}

          <Link
            href="/products"
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-4 py-2 lg:px-5 lg:py-2.5 rounded-lg transition-all duration-300 text-sm lg:text-base hover:scale-105 hover:shadow-lg"
          >
            Buy products
          </Link>

          {/* Wishlist Icon */}
          <button
            onClick={navigateToWishlist}
            className="relative p-2 text-gray-800 hover:text-red-500 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {getTotalWishlistItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getTotalWishlistItems()}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={navigateToCart}
            className="relative p-2 text-gray-800 hover:text-purple-600 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9"
              />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Profile Icon with Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <div
              className="cursor-pointer shadow-2xl border rounded-2xl px-4 py-1  hover:shadow-2xl"
              onClick={handleProfileClick}
            >
              <button
                onClick={handleProfileClick}
                className=" text-gray-800 hover:text-purple-600 transition-all duration-300 hover:scale-105 relative cursor-pointer "
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              <button className="cursor-pointer " onClick={handleProfileClick}>
                <MdKeyboardArrowDown />
              </button>
            </div>

            {/* Animated Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-purple-100 transition-all duration-300 transform ${
                profileDropdownOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {/* Dropdown Header */}
              <div className="p-4 border-b border-purple-50 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    U
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Welcome User!</p>
                    <p className="text-sm text-gray-600">Manage your account</p>
                  </div>
                </div>
              </div>

              {/* Dropdown Items */}
              <div className="max-h-96 overflow-y-auto">
                {profileLinks?.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleProfileItemClick(item.href)}
                    className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-all duration-200 flex items-center space-x-3 group cursor-pointer ${
                      index === profileLinks.length - 1
                        ? "border-t border-purple-50"
                        : ""
                    }`}
                  >
                    <span className="text-lg w-6 text-center">{item.icon}</span>
                    <span className="text-gray-700 group-hover:text-purple-600 font-medium">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Toggle & Icons */}
        <div className="md:hidden flex items-center gap-4">
          {/* Wishlist Icon for Mobile */}
          <button
            onClick={navigateToWishlist}
            className="relative p-2 text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {getTotalWishlistItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getTotalWishlistItems()}
              </span>
            )}
          </button>

          {/* Cart Icon for Mobile */}
          <button
            onClick={navigateToCart}
            className="relative p-2 text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9"
              />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Hamburger Menu */}
          <button
            className="flex flex-col justify-center items-center w-10 h-10 z-50 relative"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-800 mb-1.5 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2 bg-white" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 mb-1.5 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2 bg-white" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen
            ? "bg-black/50 backdrop-blur-sm opacity-100"
            : "bg-transparent backdrop-blur-0 opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          ref={mobileMenuRef}
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-purple-900 to-[#FBB5E7] transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scrollable Mobile Menu Content */}
          <div className="h-full flex flex-col">
            {/* Scrollable Menu Items */}
            <div className="flex-1 overflow-y-auto pb-6 pt-20">
              <nav className="flex flex-col px-6 space-y-4">
                {navLinks.map((link, index) => (
                  <div key={link.name}>
                    {link.name === "Services" ? (
                      <div className="relative">
                        <button
                          className="w-full text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2 flex items-center justify-between"
                          style={{ transitionDelay: `${index * 100}ms` }}
                          onClick={handleServicesClick}
                        >
                          <span>{link.name}</span>
                          <MdKeyboardArrowDown 
                            className={`transition-transform duration-300 ${
                              servicesDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        
                        {/* Mobile Services Dropdown */}
                        <div
                          className={`ml-4 mt-2 space-y-2 transition-all duration-300 overflow-hidden ${
                            servicesDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {servicesLinks.map((service, serviceIndex) => (
                            <a
                              key={service.name}
                              href={service.href}
                              className="block text-white/90 text-base font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                              style={{
                                transitionDelay: `${(index + serviceIndex) * 100 + 200}ms`,
                              }}
                              onClick={() => handleServicesItemClick(service.href)}
                            >
                              {service.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                        style={{ transitionDelay: `${index * 100}ms` }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                ))}

                {/* Profile Section in Mobile Menu */}
                <div className="border-t border-white/20 pt-6 mt-4">
                  <p className="text-white/80 text-sm font-medium mb-4 px-4">
                    MY ACCOUNT
                  </p>
                  {profileLinks.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2 flex items-center space-x-3"
                      style={{
                        transitionDelay: `${(index + navLinks.length) * 100}ms`,
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>

                <Link
                  href="/products"
                  className="mt-6 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Shop Now
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}