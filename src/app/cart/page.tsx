"use client";

import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const isExternalImage = (image: string) =>
    image.startsWith("http") || image.startsWith("data:");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">سبد خرید</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">سبد خرید شما خالی است</p>
            <Link
              href="/"
              className="inline-block bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition font-medium"
            >
              بازگشت به فروشگاه
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  محصولات ({getTotalItems()})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  پاک کردن سبد
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="relative w-full sm:w-24 h-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {isExternalImage(item.image) ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">
                          {item.title}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          href={`/book/${item.id}-${item.title
                            .trim()
                            .replace(/\s+/g, "-")
                            .replace(
                              /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\w\-]/g,
                              ""
                            )}`}
                          className="text-lg font-semibold text-gray-800 hover:text-sky-700 mb-2 block"
                        >
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.author}
                        </p>
                        <div className="flex items-center gap-2">
                          {item.oldPrice && (
                            <s className="text-sm text-gray-400">
                              {item.oldPrice.toLocaleString()} تومان
                            </s>
                          )}
                          <span className="text-lg font-bold text-sky-700">
                            {item.price.toLocaleString()} تومان
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-gray-800 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-left min-w-[100px]">
                          <p className="text-lg font-bold text-gray-800">
                            {(item.price * item.quantity).toLocaleString()}{" "}
                            تومان
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 p-2"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-80 bg-white rounded-lg shadow-md p-4 h-fit">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                خلاصه سفارش
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>تعداد کالا:</span>
                  <span>{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>جمع کل:</span>
                  <span>{getTotalPrice().toLocaleString()} تومان</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>مبلغ قابل پرداخت:</span>
                    <span>{getTotalPrice().toLocaleString()} تومان</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-sky-600 text-white px-4 py-3 rounded-lg hover:bg-sky-700 transition font-medium text-lg">
                ادامه خرید
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

