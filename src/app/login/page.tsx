"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone || !password) {
      setError("لطفا شماره تلفن و رمز عبور را وارد کنید");
      return;
    }

    const success = login(phone, password);
    if (success) {
      router.push("/profile");
    } else {
      setError("شماره تلفن یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-black/60">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
              ورود به حساب کاربری
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  شماره تلفن
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="شماره تلفن خود را وارد کنید"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black/60 mb-2"
                >
                  رمز عبور
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-black/60 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition font-medium"
              >
                ورود
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                حساب کاربری ندارید؟{" "}
                <Link href="/register" className="text-sky-600 hover:text-sky-700">
                  ثبت نام کنید
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

