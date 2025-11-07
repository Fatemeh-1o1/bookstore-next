import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-sky-700">ایران‌کتاب</h3>
            <p className="text-gray-400 text-sm">
              فروشگاه آنلاین کتاب با بهترین قیمت‌ها و تخفیف‌های ویژه
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-red-500 transition"
                >
                  دسته‌بندی‌ها
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-red-500 transition">
                  پروفایل
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/categories?cat=ادبیات داستانی" className="hover:text-red-500 transition">
                  ادبیات داستانی
                </Link>
              </li>
              <li>
                <Link href="/categories?cat=خودپروری" className="hover:text-red-500 transition">
                  خودپروری
                </Link>
              </li>
              <li>
                <Link href="/categories?cat=روانشناسی" className="hover:text-red-500 transition">
                  روانشناسی
                </Link>
              </li>
              <li>
                <Link href="/categories?cat=فلسفه" className="hover:text-red-500 transition">
                  فلسفه
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">تماس با ما</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>ایمیل: info@iranketab.ir</li>
              <li>تلفن: 021-12345678</li>
              <li>آدرس: تهران، ایران</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 ایران‌کتاب. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}

