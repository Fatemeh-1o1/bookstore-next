import { Book, createSlug } from "@/data/books";
import Link from "next/link";
import Image from "next/image";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const discountPercent = book.oldPrice
    ? Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100)
    : 0;

  const isExternalImage = book.image.startsWith("http");
  const isBase64Image = book.image.startsWith("data:");

  const bookSlug = `${book.id}-${createSlug(book.title)}`;
  return (
    <Link href={`/book/${bookSlug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          {book.isBestseller && (
            <div className="absolute top-2 right-2 bg-sky-900 text-white text-xs px-2 py-1 rounded z-10">
              پرفروش
            </div>
          )}
          {book.isNew && (
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
              جدید
            </div>
          )}
          {book.oldPrice && (
            <div className="absolute top-2 left-2 bg-sky-400/50 text-white text-xs px-2 py-1 rounded z-10">
              {discountPercent}% تخفیف
            </div>
          )}
          {isExternalImage || isBase64Image ? (
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm text-center p-4">
              {book.title}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-base mb-2 text-gray-800 line-clamp-2 h-12">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{book.author}</p>
          <div className="flex items-center gap-2 mb-2">
            {book.oldPrice && (
              <span className="text-gray-400 text-sm line-through">
                {book.oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-sky-700 text-base">
              {book.price.toLocaleString()} تومان
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">{book.category}</p>
        </div>
      </div>
    </Link>
  );
}

