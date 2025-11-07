"use client";

import { useState } from "react";
import { books, categories } from "@/data/books";
import BookCard from "@/components/BookCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "همه" || book.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div
          className="relative w-full h-65 bg-cover bg-center bg-no-repeat mb-8"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/736x/72/8d/40/728d406acc6e3196e5014b8b28d9f3ee.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-start">
            <div className="text-right text-white">
              <h1 className="text-right text-4xl font-bold mb-3">
                فروشگاه کتاب کتابچی
              </h1>
              <p className="text-xl text-white/90">مرجع تخصصی کتاب</p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-sky-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
            </div>
            
          </div>
          <div className="mb-6 text-gray-600 text-center">
            {filteredBooks.length > 0 ? (
              <p>تعداد {filteredBooks.length} کتاب یافت شد</p>
            ) : (
              <p>کتابی یافت نشد</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
