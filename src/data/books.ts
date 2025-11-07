export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  isBestseller?: boolean;
  isNew?: boolean;
  publisher?: string;
  isbn?: string;
  pages?: number;
  year?: number;
  format?: string;
  cover?: string;
  rating?: number;
  ratingCount?: number;
  bookCode?: string;
  printSeries?: number;
}

export function createSlug(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\w\-]/g, "");
}

export function findBookBySlug(slug: string): Book | undefined {
  const decodedSlug = decodeURIComponent(slug);
  
  const bookById = books.find((book) => book.id === slug || book.id === decodedSlug);
  if (bookById) return bookById;
  
  const parts = decodedSlug.split("-");
  const idFromSlug = parts[0];
  const bookByIdFromSlug = books.find((book) => book.id === idFromSlug);
  if (bookByIdFromSlug) return bookByIdFromSlug;
  
  return books.find((book) => {
    const bookSlug = createSlug(book.title);
    return bookSlug === decodedSlug || bookSlug === slug;
  });
}

export const categories = [
  "همه",
  "ادبیات داستانی",
  "خودپروری",
  "روانشناسی",
  "فلسفه",
  "تاریخ",
  "علمی",
  "داستان کوتاه",
  "ادبیات نمایشی",
  "سیاسی",
  "کودک",
];

export const books: Book[] = [
  {
    id: "1",
    title: "شازده کوچولو",
    author: "آنتوان دو سنت اگزوپری",
    category: "ادبیات داستانی",
    price: 150000,
    oldPrice: 180000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/27422d8f060b49d3bf21ad9f5722c9ef.jpg",
    description: "داستان زیبای شازده کوچولو",
    isBestseller: true,
    bookCode: "4563",
    isbn: "978-964-311-374-2",
    format: "رقعی",
    pages: 344,
    year: 1404,
    cover: "شومیز",
    printSeries: 43,
  },
  {
    id: "2",
    title: "کیمیاگر",
    author: "پائولو کوئیلو",
    category: "خودپروری",
    price: 180000,
    oldPrice: 220000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/44fca04c9bda4be4a19dbd810c382f55.jpg",
    description: "رمان فلسفی کیمیاگر",
    isBestseller: true,
    bookCode: "4564",
    isbn: "978-964-311-375-9",
    format: "رقعی",
    pages: 280,
    year: 1403,
    cover: "شومیز",
    printSeries: 25,
  },
  {
    id: "3",
    title: "تاریخ ایران",
    author: "عباس اقبال",
    category: "تاریخ",
    price: 250000,
    image: "/book3.jpg",
    description: "کتاب جامع تاریخ ایران",
    bookCode: "4565",
    isbn: "978-964-311-376-6",
    format: "وزیری",
    pages: 520,
    year: 1402,
    cover: "گالینگور",
    printSeries: 12,
  },
  {
    id: "4",
    title: "فیزیک کوانتوم",
    author: "استیون هاوکینگ",
    category: "علمی",
    price: 300000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/d170d2183f9f49088249a11c6f346e5a.jpg",
    description: "مقدمه ای بر فیزیک کوانتوم",
    bookCode: "4566",
    isbn: "978-964-311-377-3",
    format: "رقعی",
    pages: 380,
    year: 1403,
    cover: "شومیز",
    printSeries: 8,
  },
  {
    id: "5",
    title: "نیچه",
    author: "والتر کافمن",
    category: "فلسفه",
    price: 220000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/77c59d7562d74594935833ac4201f7b2.jpg",
    description: "زندگی و اندیشه نیچه",
    bookCode: "4567",
    isbn: "978-964-311-378-0",
    format: "رقعی",
    pages: 320,
    year: 1402,
    cover: "شومیز",
    printSeries: 15,
  },
  {
    id: "6",
    title: "قصه های خوب",
    author: "مهدی آذریزدی",
    category: "کودک",
    price: 120000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/45eb82e636aa434eb306f0cf69708750.jpg",
    description: "مجموعه قصه های خوب برای بچه های خوب",
    bookCode: "4568",
    isbn: "978-964-311-379-7",
    format: "رقعی",
    pages: 200,
    year: 1404,
    cover: "شومیز",
    printSeries: 50,
  },
  {
    id: "7",
    title: "1984",
    author: "جورج اورول",
    category: "ادبیات داستانی",
    price: 200000,
    oldPrice: 250000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/ff610865d73e48e99979fa3eab09c75b.jpg",
    description: "رمان معروف 1984",
    isBestseller: true,
    bookCode: "4569",
    isbn: "978-964-311-380-4",
    format: "رقعی",
    pages: 360,
    year: 1403,
    cover: "شومیز",
    printSeries: 30,
  },
  {
    id: "8",
    title: "انقلاب اسلامی",
    author: "حمید انصاری",
    category: "تاریخ",
    price: 280000,
    oldPrice: 350000,
    image: "https://img.iranketab.ir/img/150x200?pic=www.iranketab.ir/Images/ProductImages/Thumbs/3020c508bec94b1e8b206a58a6a0ec53.jpg",
    description: "تاریخ انقلاب اسلامی ایران",
    publisher: "مرکز اسناد انقلاب",
    isbn: "978-9644197352",
    pages: 256,
    year: 1393,
    format: "وزیری",
    cover: "شومیز",
    rating: 3.5,
    ratingCount: 1,
    bookCode: "4570",
    printSeries: 10,
  },
  {
    id: "10",
    title: "بوف کور",
    author: "صادق هدایت",
    category: "ادبیات داستانی",
    price: 190000,
    oldPrice: 230000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/2229cad1d2b144ea85c0cd440af8cd5b.jpg",
    description: "رمان معروف بوف کور",
    isBestseller: true,
    bookCode: "4571",
    isbn: "978-964-311-381-1",
    format: "رقعی",
    pages: 180,
    year: 1402,
    cover: "شومیز",
    printSeries: 20,
  },
  {
    id: "11",
    title: "روانشناسی مثبت",
    author: "مارتین سلیگمن",
    category: "روانشناسی",
    price: 270000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/41c19296be7d4a0daff9f0067ce919b8.jpg",
    description: "مقدمه‌ای بر روانشناسی مثبت",
    isNew: true,
    bookCode: "4572",
    isbn: "978-964-311-382-8",
    format: "رقعی",
    pages: 400,
    year: 1404,
    cover: "شومیز",
    printSeries: 5,
  },
  {
    id: "12",
    title: "انقلاب",
    author: "جورج اورول",
    category: "سیاسی",
    price: 210000,
    image: "/book12.jpg",
    description: "کتاب سیاسی انقلاب",
    bookCode: "4573",
    isbn: "978-964-311-383-5",
    format: "رقعی",
    pages: 300,
    year: 1403,
    cover: "شومیز",
    printSeries: 18,
  },
  {
    id: "13",
    title: "هملت",
    author: "ویلیام شکسپیر",
    category: "ادبیات نمایشی",
    price: 170000,
    oldPrice: 200000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/311725220f43489c8d132ab6360fd840.jpg",
    description: "نمایشنامه معروف هملت",
    bookCode: "4574",
    isbn: "978-964-311-384-2",
    format: "رقعی",
    pages: 240,
    year: 1402,
    cover: "شومیز",
    printSeries: 22,
  },
  {
    id: "14",
    title: "تاریخ جهان",
    author: "ویل دورانت",
    category: "تاریخ",
    price: 320000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/16a9039e7e8f404981d7629389d8712e.jpg",
    description: "تاریخ جامع جهان",
    isNew: true,
    bookCode: "4575",
    isbn: "978-964-311-385-9",
    format: "وزیری",
    pages: 680,
    year: 1403,
    cover: "گالینگور",
    printSeries: 7,
  },
  {
    id: "15",
    title: "فلسفه زندگی",
    author: "آلن دوباتن",
    category: "فلسفه",
    price: 240000,
    oldPrice: 280000,
    image: "https://img.iranketab.ir/img/225x330?pic=www.iranketab.ir/Images/ProductImages/fb9c880894ef4c639e469e69b7a9dd66.jpg",
    description: "فلسفه زندگی روزمره",
    isBestseller: true,
    bookCode: "4576",
    isbn: "978-964-311-386-6",
    format: "رقعی",
    pages: 350,
    year: 1404,
    cover: "شومیز",
    printSeries: 14,
  },
  {
    id: "16",
    title: "کتاب کودک",
    author: "احمد شاملو",
    category: "کودک",
    price: 110000,
    image: "/book16.jpg",
    description: "کتاب مناسب کودکان",
    bookCode: "4577",
    isbn: "978-964-311-387-3",
    format: "رقعی",
    pages: 150,
    year: 1404,
    cover: "شومیز",
    printSeries: 35,
  },
];

