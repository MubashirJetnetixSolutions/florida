"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const BLUE = "#4A9DE8";

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/");
  }

  return (
    <div className="h-screen w-full bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left — branding */}
      <section className="hidden lg:flex w-1/2 h-full flex-col justify-between px-12 xl:px-16 2xl:px-20 py-12 xl:py-14">
        <div className="flex flex-col justify-center flex-1 max-w-[540px] w-full">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#1F2937] uppercase mb-8">
            Professional Window Services
          </p>

          <h1 className="font-extrabold text-[40px] xl:text-[46px] 2xl:text-[50px] leading-[1.18] tracking-tight text-[#0F172A]">
            <span className="block">
              BETTER{" "}
              <span
                className="inline-block text-white px-2.5 py-[2px] rounded-[6px]"
                style={{ backgroundColor: BLUE }}
              >
                WINDOWS.
              </span>
            </span>
            <span className="block mt-2">
              BETTER{" "}
              <span
                className="inline-block text-white px-2.5 py-[2px] rounded-[6px]"
                style={{ backgroundColor: BLUE }}
              >
                SERVICE.
              </span>
            </span>
            <span className="block mt-2">
              BETTER{" "}
              <span
                className="inline-block text-white px-2.5 py-[2px] rounded-[6px]"
                style={{ backgroundColor: BLUE }}
              >
                RESULTS.
              </span>
            </span>
          </h1>

          <p className="mt-7 text-[15px] leading-relaxed text-[#6B7280] max-w-[390px]">
            From installation to repairs, manage every job, customer, and order
            in one place.
          </p>
        </div>

        <div className="relative w-full max-w-[540px] mt-10 h-[190px] xl:h-[210px] rounded-[16px] overflow-hidden shrink-0">
          <Image
            src="/login-bg1.png"
            alt="Modern glass building facade"
            fill
            className="object-cover object-center scale-[1.15]"
            sizes="540px"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <div className="bg-[#152238]/60 backdrop-blur-md rounded-[12px] px-6 py-4 max-w-[360px] text-center shadow-lg">
              <p className="text-white text-[13px] leading-relaxed font-medium">
                Quality window installation and repair, handled by a team you
                can rely on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right — form over photo */}
      <section className="relative flex-1 h-full min-h-screen lg:min-h-0 flex items-center justify-center p-5 sm:p-8 overflow-hidden lg:rounded-l-[28px]">
        <Image
          src="/login-bg2.png"
          alt=""
          fill
          className="object-fill "
          sizes="50vw"
          priority
        />
        <div
          className="absolute inset-0"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-[400px] bg-white/92 backdrop-blur-xl rounded-[16px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] px-8 py-9 sm:px-10 sm:py-10">
          <div className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="Florida Builders Installations"
              width={160}
              height={80}
              className="h-auto w-[150px] sm:w-[160px] object-contain"
              priority
            />
            <p className="mt-4 text-[13px] text-[#6B7280] text-center">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-[#4B5563] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-[10px] border border-[#E5E7EB] bg-white px-3.5 text-[14px] text-[#111827] outline-none transition focus:border-[#4A9DE8] focus:ring-2 focus:ring-[#4A9DE8]/25"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-[#4B5563] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-[10px] border border-[#E5E7EB] bg-white px-3.5 pr-11 text-[14px] text-[#111827] outline-none transition focus:border-[#4A9DE8] focus:ring-2 focus:ring-[#4A9DE8]/25"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-[#D1D5DB] accent-[#4A9DE8] cursor-pointer"
                />
                <span className="text-[13px] text-[#6B7280]">Remember me</span>
              </label>
              <Link
                href="#"
                className="text-[13px] font-medium hover:opacity-80 transition-opacity"
                style={{ color: BLUE }}
              >
                Forgot password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-[10px] text-white text-[15px] font-semibold transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
              style={{ backgroundColor: BLUE }}
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
