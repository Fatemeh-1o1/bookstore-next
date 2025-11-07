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
        <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          {book.isBestseller && (
            <div className="absolute top-1 right-1 bg-sky-900 text-white text-xs px-1.5 py-0.5 rounded z-10">
              پرفروش
            </div>
          )}
          {book.isNew && (
            <div className="absolute top-1 right-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded z-10">
              جدید
            </div>
          )}
          {book.oldPrice && (
            <div className="absolute top-1 left-1 bg-sky-400/50 text-white text-xs px-1.5 py-0.5 rounded z-10">
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
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">
              {book.title}
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-bold text-sm mb-1 text-gray-800 line-clamp-2 h-10">
            {book.title}
          </h3>
          <p className="text-gray-600 text-xs mb-2">{book.author}</p>
          <div className="flex items-center gap-2 mb-1">
            {book.oldPrice && (
              <span className="text-gray-400 text-xs line-through">
                {book.oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-sky-700 text-sm">
              {book.price.toLocaleString()} تومان
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{book.category}</p>
        </div>
      </div>
    </Link>
  );
}

