"use client";

import { findBookBySlug, createSlug } from "@/data/books";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BookDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const book = findBookBySlug(slug);

  const [showDetails, setShowDetails] = useState(false);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">کتاب یافت نشد</h1>
        <Link href="/" className="text-sky-600 hover:text-sky-700">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  const discountPercent = book.oldPrice
    ? Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100)
    : 0;

  const isExternalImage = book.image.startsWith("http");
  const isBase64Image = book.image.startsWith("data:");

  return (
    <div className="bg-gradient-to-br bg-white min-h-screen flex items-center justify-center py-5">
        <div className="w-full max-w-7xl mx-auto px-4">
        <div className="lg:hidden bg-white rounded-lg shadow-md p-4 mb-3">
          <h1 className="font-bold text-xl text-center mb-2">{book.title}</h1>
          <div className="flex gap-2 items-center justify-center">
            <span className="text-gray-600">نویسنده:</span>
            <Link
              href={`/profile/${createSlug(book.author)}`}
              className="flex items-center gap-2 font-bold text-sky-700 hover:text-sky-800"
            >
              <span>{book.author}</span>
              <span>←</span>
            </Link>
          </div>
        </div>

        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-4/5">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-lg">
                    {book.isBestseller && (
                      <div className="absolute top-2 right-2 bg-sky-700/80 text-white text-xs px-2 py-1 rounded z-10">
                        پیشنهاد ویژه
                      </div>
                    )}
                    {isExternalImage || isBase64Image ? (
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={160}
                        height={240}
                        className="rounded-lg w-[126px] lg:w-[160px]"
                        unoptimized
                      />
                    ) : (
                      <div className="w-[126px] lg:w-[160px] h-[189px] lg:h-[240px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                        {book.title}
                      </div>
                    )}
                    <span className="absolute flex items-center rounded-full bottom-2 left-2 gap-1 px-3 py-1 bg-black/60 text-white text-xs">
                      <span>1</span>
                      <span>📷</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col w-full lg:w-2/3 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1 text-xs text-gray-600 font-bold">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-yellow-500">
                        {book.rating || 3.5}
                      </span>
                      <span>از</span>
                      <span>{book.ratingCount || 1}</span>
                      <span>رأی</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg lg:text-xl text-zinc-950">{book.title}</h2>
                    <div className="text-gray-400 text-sm ltr text-right">
                      {book.description}
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
                      <span className="text-gray-600">نویسنده:</span>
                      <h2 className="text-sky-700 text-xs">{book.author}</h2>
                    </div>

                    {book.publisher && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">انتشارات:</span>
                        <Link
                          href={`/publisher/${createSlug(book.publisher)}`}
                          className="flex items-center gap-1 font-bold text-sky-700 hover:text-sky-800"
                        >
                          <span>{book.publisher}</span>
                          <span>←</span>
                        </Link>
                      </div>
                    )}

                    <div className="flex lg:hidden items-center justify-between mt-4">
                      <div className="flex gap-2 items-center">
                        {book.oldPrice && (
                          <>
                            <div className="bg-red-600 rounded-md text-sm text-white px-1">
                              {discountPercent}%
                            </div>
                            <s className="text-sm text-gray-400 font-bold">
                              {book.oldPrice.toLocaleString()}
                            </s>
                          </>
                        )}
                      </div>
                      <div className="text-xl ltr">
                        <strong>{book.price.toLocaleString()}</strong>
                        <span className="text-sm mr-1 text-sky-700">تومان</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex lg:flex-col w-1/3 border-r-2 border-dotted border-gray-300 pr-4 gap-4">
                  <div className="flex justify-center items-center text-xs gap-1 text-gray-600">
                    <span>🚚</span>
                    <span>زودترین زمان ارسال:</span>
                    <span className="text-sky-600">20 آبان</span>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex flex-col gap-2">
                      {book.oldPrice && (
                        <div className="flex gap-2 justify-end items-center">
                          <s className="text-sm text-gray-400 font-bold">
                            {book.oldPrice.toLocaleString()}
                          </s>
                          <div className="bg-red-600 rounded-md text-sm text-white px-1">
                            {discountPercent}%
                          </div>
                        </div>
                      )}
                      <div className="flex ltr justify-end">
                        <strong className="text-zinc-950 text-xs">{book.price.toLocaleString()}</strong>
                        <span className="text-sm mr-1 text-sky-700">تومان</span>
                      </div>
                    </div>

                    <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition w-full font-medium">
                      افزودن به سبد
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 lg:hidden">
                
                <button className="grow bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition font-medium">
                  افزودن به سبد
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

