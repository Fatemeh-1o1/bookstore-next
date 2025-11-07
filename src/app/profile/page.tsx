"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("info");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [isAuthenticated, user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">پروفایل کاربری</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {user?.name || "کاربر عزیز"}
                </h2>
                <p className="text-sm text-gray-600">{user?.phone || ""}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`w-full text-right px-4 py-2 rounded-lg transition ${
                    activeTab === "info"
                      ? "bg-sky-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  اطلاعات شخصی
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-right px-4 py-2 rounded-lg transition ${
                    activeTab === "orders"
                      ? "bg-sky-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  سفارش‌های من
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full text-right px-4 py-2 rounded-lg transition ${
                    activeTab === "addresses"
                      ? "bg-sky-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  آدرس‌ها
                </button>
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full text-right px-4 py-2 rounded-lg transition ${
                    activeTab === "favorites"
                      ? "bg-sky-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  علاقه‌مندی‌ها
                </button>
              </nav>

              <button
                onClick={logout}
                className="w-full mt-4 text-right px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                خروج از حساب
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === "info" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    اطلاعات شخصی
                  </h2>
                  {showSuccess && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                      ✓ تغییرات با موفقیت ذخیره شد
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام و نام خانوادگی
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="text-black/60 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="نام و نام خانوادگی"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شماره تلفن
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="text-black/60 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition font-medium"
                    >
                      ذخیره تغییرات
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    سفارش‌های من
                  </h2>
                  <div className="text-center py-12 text-gray-500">
                    <p>هنوز سفارشی ثبت نشده است</p>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    آدرس‌ها
                  </h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">آدرس پیش‌فرض</h3>
                        <button className="text-sky-600 hover:text-sky-700 text-sm">
                          ویرایش
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm">
                        تهران، خیابان ولیعصر، پلاک 123
                      </p>
                    </div>
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-sky-600 hover:text-sky-600 transition">
                      + افزودن آدرس جدید
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "favorites" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    علاقه‌مندی‌ها
                  </h2>
                  <div className="text-center py-12 text-gray-500">
                    <p>هنوز کتابی به علاقه‌مندی‌ها اضافه نشده است</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

