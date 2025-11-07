"use client";

import Link from "next/link";
import { categories } from "@/data/books";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <Link href="/" className="text-3xl font-bold text-sky-900">
            کتابچی
          </Link>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">

              <input
                type="text"
                placeholder ="جستجوی کتاب، نویسنده یا موضوع.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 border border-sky-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black placeholder:text-black/40"
              />
              <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-900 hover:text-sky-600">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-sky-600 transition font-medium"
            >
              خانه
            </Link>
            <div className="relative">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="text-gray-700 hover:text-sky-600 transition font-medium flex items-center gap-1"
              >
                دسته‌بندی‌ها
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showCategories ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showCategories && (
                <div className="absolute left-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-white/30 p-4 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    {categories
                      .filter((cat) => cat !== "همه")
                      .map((category) => (
                        <Link
                          key={category}
                          href={`/categories?cat=${category}`}
                          className="text-sm text-gray-700 hover:text-sky-600 py-1 px-2 rounded hover:bg-gray-50"
                          onClick={() => setShowCategories(false)}
                        >
                          {category}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-sky-600 transition font-medium flex items-center gap-1"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              سبد خرید
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-sky-600 transition font-medium"
            >
              پروفایل
            </Link>
          </nav>
        </div>
        <div className="py-3 flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-sky-600 transition">
            پرفروش‌ها
          </Link>
          <Link href="/" className="hover:text-sky-600 transition">
            تازه‌ها
          </Link>
          <Link href="/" className="hover:text-sky-600 transition">
            پیشنهاد ویژه
          </Link>
          <Link href="/" className="hover:text-sky-600 transition">
            تخفیف‌ها
          </Link>
        </div>
      </div>
    </header>
  );
}

