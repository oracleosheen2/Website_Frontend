"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  // { name: "Readers", href: "/readers" },
  { name: "Services", href: "/services" },
  { name: "Horoscope", href: "/horoscope" },
  { name: "Blog", href: "/blog" },
];

const profileLinks = [
  { name: "View Profile", href: "/profile", icon: "👤" },
  { name: "My Orders", href: "/orders", icon: "📦" },
  { name: "Order History", href: "/order-history", icon: "📋" },
  { name: "Wishlist", href: "/wishlist", icon: "❤️" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
  { name: "Payment Methods", href: "/payment-methods", icon: "💳" },
  { name: "Address Book", href: "/addresses", icon: "🏠" },
  { name: "Notifications", href: "/notifications", icon: "🔔" },
  { name: "Help & Support", href: "/support", icon: "❓" },
  { name: "Logout", href: "/logout", icon: "🚪" },
];

export default function HeroHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { getTotalItems } = useCart();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
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

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleProfileItemClick = (href: string) => {
    setProfileDropdownOpen(false);
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
            <a
              key={link.name}
              href={link.href}
              className="text-gray-800 text-sm lg:text-base font-medium hover:text-purple-600 transition-all duration-300 hover:scale-105"
            >
              {link.name}
            </a>
          ))}

          <Link
            href="/products"
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-4 py-2 lg:px-5 lg:py-2.5 rounded-lg transition-all duration-300 text-sm lg:text-base hover:scale-105 hover:shadow-lg"
          >
            Buy products
          </Link>

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
                {profileLinks.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleProfileItemClick(item.href)}
                    className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-all duration-200 flex items-center space-x-3 group ${
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

        {/* Mobile Menu Toggle & Cart */}
        <div className="md:hidden flex items-center gap-4">
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
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-purple-900 to-[#FBB5E7] transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col p-8 pt-24 space-y-6">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white text-xl font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {/* Profile Section in Mobile Menu */}
            <div className="border-t border-white/20 pt-6 mt-4">
              <p className="text-white/80 text-sm font-medium mb-4 px-4">
                MY ACCOUNT
              </p>
              {profileLinks.slice(0, 6).map((item, index) => (
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

            {/* Cart Link in Mobile Menu */}
            <button
              onClick={() => {
                navigateToCart();
                setMenuOpen(false);
              }}
              className="text-white text-xl font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2 text-left flex items-center gap-3"
            >
              <svg
                className="w-5 h-5"
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
              Cart ({getTotalItems()})
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
