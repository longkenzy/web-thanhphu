"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Server,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    async function checkCurrentSession() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.replace("/admin");
            return;
          }
        }
      } catch {
        // Not logged in or error, stay on login page
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkCurrentSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!username.trim()) {
      setErrorMessage("Vui lòng nhập tên tài khoản");
      return;
    }

    if (!password) {
      setErrorMessage("Vui lòng nhập mật khẩu");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
          remember,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Tên đăng nhập hoặc mật khẩu không chính xác");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Đăng nhập thành công! Đang chuyển hướng vào hệ thống...");
      setTimeout(() => {
        router.replace("/admin");
      }, 700);
    } catch {
      setErrorMessage("Lỗi kết nối máy chủ. Vui lòng thử lại sau!");
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex flex-col items-center justify-center text-slate-600">
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#ed3237] border-t-transparent animate-spin" />
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold animate-pulse">
            Đang khởi tạo phiên bảo mật...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 via-red-50/20 to-slate-100 text-slate-800 flex flex-col justify-between relative overflow-hidden selection:bg-[#ed3237] selection:text-white font-sans">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.8) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radiant Ambient Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-[#ed3237]/15 to-[#f43f5e]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-36 -right-36 w-[650px] h-[650px] bg-gradient-to-tl from-[#3e4095]/15 via-[#6366f1]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-sky-300/20 to-indigo-200/20 rounded-full blur-[110px] pointer-events-none" />

      {/* Header bar with Back Link */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all group px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 backdrop-blur-md shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#ed3237] group-hover:-translate-x-0.5 transition-transform" />
          <span>Về trang chủ Thành Phú</span>
        </Link>
      </header>

      {/* Main Login Card Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-4 sm:py-6">
        <div className="w-full max-w-[420px]">
          {/* Main Card with Glassmorphism */}
          <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-xl shadow-xl shadow-slate-300/40 overflow-hidden relative">
            {/* Top Brand Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#ed3237] via-[#f43f5e] via-[#6366f1] to-[#3e4095]" />

            <div className="p-6 sm:p-7">
              {/* Logo & Heading */}
              <div className="text-center mb-5">
                <div className="inline-flex items-center justify-center mb-3 relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-600/15 to-blue-600/15 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
                    <Image
                      src="/logo.png"
                      alt="Thành Phú Logo"
                      width={150}
                      height={38}
                      className="h-8 w-auto object-contain"
                      priority
                    />
                  </div>
                </div>

                <h1 className="text-lg sm:text-xl font-black uppercase tracking-tight text-slate-900 mt-0.5">
                  Cổng Quản Trị Hệ Thống
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-normal">
                  Đăng nhập tài khoản điều hành và quản trị nội dung
                </p>
              </div>

              {/* Notification Alerts */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <AlertCircle className="w-4 h-4 text-[#ed3237] shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">{errorMessage}</div>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">{successMessage}</div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username Input */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Tên đăng nhập
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nhập tên đăng nhập"
                      autoComplete="username"
                      disabled={isLoading}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#ed3237] focus:ring-2 focus:ring-[#ed3237]/15 rounded-lg text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Mật khẩu
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      disabled={isLoading}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#ed3237] focus:ring-2 focus:ring-[#ed3237]/15 rounded-lg text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none transition-all disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#ed3237] focus:ring-0 focus:ring-offset-0 accent-[#ed3237]"
                    />
                    <span className="text-xs text-slate-600 hover:text-slate-800">
                      Ghi nhớ phiên đăng nhập (30 ngày)
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#ed3237] via-[#dc2626] to-[#b91c1c] hover:from-[#f04449] hover:via-[#ed3237] hover:to-[#991b1b] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang xác thực hệ thống...</span>
                    </>
                  ) : (
                    <>
                      <span>Đăng Nhập Quản Trị</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom Footer Note inside card */}
            <div className="px-6 py-2.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mã hóa bảo mật 256-Bit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-blue-600" />
                <span>D1 Cloudflare Database</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="relative z-10 w-full text-center py-3 text-[11px] text-slate-500 border-t border-slate-200/60">
        <p>
          © {new Date().getFullYear()} CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY LẮP THÀNH PHÚ. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
