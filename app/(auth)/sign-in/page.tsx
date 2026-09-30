// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/AuthContext";

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // Temporary login
//     // Later this will call your API

//     if (username === "admin" && password === "123") {
//       login({
//         id: 1,
//         username: "admin",
//         name: "Administrator",
//         role: "admin",
//       });

//       router.push("/");
//     } else {
//       alert("اسم المستخدم أو كلمة المرور غير صحيحة");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
//         <h1 className="mb-6 text-2xl font-bold">
//           تسجيل الدخول
//         </h1>

//         <input
//           type="text"
//           placeholder="اسم المستخدم"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="mb-4 w-full rounded-lg border p-3"
//         />

//         <input
//           type="password"
//           placeholder="كلمة المرور"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-6 w-full rounded-lg border p-3"
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full rounded-lg bg-blue-600 p-3 text-white"
//         >
//           تسجيل الدخول
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import type { User as IUser } from "../../interface/auth-interface";

import {
  FileText,
  Languages,
  User,
  Lock,
  LogIn,
  CircleAlert,
} from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";



export default function SignInPage() {
  const auth = useAuth();
  const router = useRouter();

  const [errors, setErrors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // =========================
  // Validation
  // =========================

  const validationSchema = Yup.object({
    UserName: Yup.string()
      .required("UserName is required"),

    Password: Yup.string()
      .required("Password is required")
    //   .min(6, "Password must be at least 6 characters")
    //   .max(30, "Password must be at most 30 characters")
    //   .matches(
    //     /^[a-zA-Z0-9]{6,30}$/,
    //     "Password must be 6-30 characters and contain only letters and numbers"
    //   ),
  });

  // =========================
  // Login
  // =========================

 async function handleLogin(values: { UserName: string; Password: string;}) {
    try {
        setErrors(null);
        setIsLoading(true);

        const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        values
        );

        const token = response.data.token;

        // Save token
        localStorage.setItem("userToken", token);

        // Decode JWT
        const decoded = jwtDecode<IUser>(token);

        console.log("Logged user:", response);

        // Save user in AuthContext
        auth?.login(decoded);

        // Redirect
        if (response.status === 200) {
        router.push("/");
        }
    } catch (err: any) {
        setErrors(
        err.response?.data?.message ||
            err.response?.data ||
            "Invalid email or password"
        );
    } finally {
        setIsLoading(false);
    }
    }
  // =========================
  // Formik
  // =========================

  const formik = useFormik({
    initialValues: {
      UserName: "",
      Password: "",
    },

    validationSchema,

    onSubmit: handleLogin,
  });

  return (
    <div
      dir="ltr"
      className="
        min-h-screen
        bg-[#080d1a]
        text-[#f8fafc]
        relative
        overflow-hidden
      "
    >
      {/* ===================================================== */}
      {/* Background Glow */}
      {/* ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-10%]
          top-[-10%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-blue-500/20
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-10%]
          right-[-10%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-indigo-500/20
          blur-[100px]
        "
      />

      {/* ===================================================== */}
      {/* Glass Navbar */}
      {/* ===================================================== */}

      <nav
        className="
          fixed
          left-1/2
          top-5
          z-50
          flex
          h-[68px]
          w-[calc(100%-48px)]
          max-w-[1180px]
          -translate-x-1/2
          items-center
          justify-between
          rounded-[18px]
          border
          border-white/10
          bg-slate-900/50
          px-[22px]
          shadow-[0_8px_32px_rgba(0,0,0,0.22)]
          backdrop-blur-[18px]
        "
      >
        {/* Brand */}

        <Link
          href="/login"
          className="
            flex
            items-center
            gap-[11px]
            text-[#f8fafc]
            no-underline
            transition
            hover:opacity-90
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-[11px]
              bg-gradient-to-br
              from-[#3b82f6]
              to-[#6366f1]
              shadow-[0_8px_20px_rgba(59,130,246,0.25)]
            "
          >
            <FileText size={21} strokeWidth={2} />
          </div>

          <div className="flex flex-col gap-[2px]">
            <strong className="text-[15px] font-bold leading-none">
              Archive
            </strong>

            <span className="text-[9px] tracking-[0.3px] text-[#94a3b8]">
              DOCUMENT MANAGEMENT
            </span>
          </div>
        </Link>

        {/* Language */}

        <div
          className="
            flex
            h-[38px]
            items-center
            gap-2
            rounded-[9px]
            border
            border-white/10
            bg-white/[0.06]
            px-[11px]
            text-[#cbd5e1]
            transition
            hover:border-white/20
            hover:bg-white/10
          "
        >
          <Languages
            size={16}
            className="text-[#94a3b8]"
          />

          <select
            defaultValue="en"
            className="
              cursor-pointer
              appearance-none
              border-none
              bg-transparent
              p-0
              text-[12px]
              text-[#cbd5e1]
              outline-none
            "
          >
            <option
              value="en"
              className="bg-[#0f172a] text-white"
            >
              English
            </option>

            <option
              value="ar"
              className="bg-[#0f172a] text-white"
            >
              العربية
            </option>
          </select>
        </div>
      </nav>

      {/* ===================================================== */}
      {/* Main */}
      {/* ===================================================== */}

      <main
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          px-6
          pb-8
          pt-[115px]
        "
      >
        <div className="w-full max-w-[430px]">

          {/* ================================================= */}
          {/* Brand */}
          {/* ================================================= */}

          <div className="mb-7 text-center">
            <div
              className="
                mx-auto
                mb-[18px]
                flex
                h-[68px]
                w-[68px]
                items-center
                justify-center
                rounded-[18px]
                bg-gradient-to-br
                from-[#3b82f6]
                to-[#6366f1]
                shadow-[0_18px_40px_rgba(59,130,246,0.25)]
              "
            >
              <FileText
                size={34}
                strokeWidth={1.8}
              />
            </div>

            <h1
              className="
                text-[28px]
                font-bold
                tracking-[-0.6px]
              "
            >
              Archive
            </h1>

            <p className="mt-2 text-[14px] text-[#94a3b8]">
              Document Management System
            </p>
          </div>

          {/* ================================================= */}
          {/* Login Card */}
          {/* ================================================= */}

          <div
            className="
              rounded-[20px]
              border
              border-white/[0.12]
              bg-[rgba(15,23,42,0.88)]
              p-[34px]
              shadow-[0_25px_70px_rgba(0,0,0,0.45)]
              backdrop-blur-[18px]
            "
          >
            <h2 className="mb-[7px] text-[22px] font-bold">
              Welcome Back
            </h2>

            <p className="mb-7 text-[14px] text-[#94a3b8]">
              Sign in to access your account
            </p>

            {/* ================================================= */}
            {/* API Error */}
            {/* ================================================= */}

            {errors && (
              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-2.5
                  rounded-[10px]
                  border
                  border-red-500/25
                  bg-red-500/[0.08]
                  px-[14px]
                  py-3
                  text-[13px]
                  text-red-300
                "
              >
                <CircleAlert
                  size={17}
                  className="shrink-0"
                />

                <span>
                  {typeof errors === "string"
                    ? errors
                    : "Login failed"}
                </span>
              </div>
            )}

            {/* ================================================= */}
            {/* Form */}
            {/* ================================================= */}

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-5"
            >
              {/* Email */}

              <div>
                <label
                  htmlFor="UserName"
                  className="
                    mb-2
                    block
                    text-[13px]
                    font-semibold
                    text-[#cbd5e1]
                  "
                >
                  UserName
                </label>

                <div className="relative">
                  <User
                    size={18}
                    strokeWidth={1.8}
                    className="
                      pointer-events-none
                      absolute
                      left-[15px]
                      top-1/2
                      -translate-y-1/2
                      text-[#64748b]
                    "
                  />

                  <input
                    id="UserName"
                    name="UserName"
                    type="UserName"
                    autoComplete="UserName"
                    placeholder="Enter your UserName"
                    value={formik.values.UserName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="
                      h-12
                      w-full
                      rounded-[10px]
                      border
                      border-[#334155]
                      bg-[#0b1220]
                      pl-[46px]
                      pr-[14px]
                      text-[14px]
                      text-[#f8fafc]
                      outline-none
                      transition
                      placeholder:text-[#64748b]
                      hover:border-[#475569]
                      focus:border-[#3b82f6]
                      focus:bg-[#0d1628]
                      focus:ring-[3px]
                      focus:ring-blue-500/10
                    "
                  />
                </div>

                {formik.errors.UserName &&
                  formik.touched.UserName && (
                    <div className="mt-2 text-[12px] text-red-400">
                      {formik.errors.UserName}
                    </div>
                  )}
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="Password"
                  className="
                    mb-2
                    block
                    text-[13px]
                    font-semibold
                    text-[#cbd5e1]
                  "
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    strokeWidth={1.8}
                    className="
                      pointer-events-none
                      absolute
                      left-[15px]
                      top-1/2
                      -translate-y-1/2
                      text-[#64748b]
                    "
                  />

                  <input
                    id="Password"
                    name="Password"
                    type="Password"
                    autoComplete="current-Password"
                    placeholder="Enter your Password"
                    value={formik.values.Password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="
                      h-12
                      w-full
                      rounded-[10px]
                      border
                      border-[#334155]
                      bg-[#0b1220]
                      pl-[46px]
                      pr-[14px]
                      text-[14px]
                      text-[#f8fafc]
                      outline-none
                      transition
                      placeholder:text-[#64748b]
                      hover:border-[#475569]
                      focus:border-[#3b82f6]
                      focus:bg-[#0d1628]
                      focus:ring-[3px]
                      focus:ring-blue-500/10
                    "
                  />
                </div>

                {formik.errors.Password &&
                  formik.touched.Password && (
                    <div className="mt-2 text-[12px] text-red-400">
                      {formik.errors.Password}
                    </div>
                  )}
              </div>

              {/* Forgot Password */}

              <div className="flex justify-end">
                <Link
                  href="/forget-password"
                  className="
                    text-[12px]
                    text-[#60a5fa]
                    transition
                    hover:text-[#93c5fd]
                    hover:underline
                  "
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={isLoading}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-[9px]
                  rounded-[10px]
                  border-0
                  bg-gradient-to-br
                  from-[#3b82f6]
                  to-[#6366f1]
                  text-[14px]
                  font-bold
                  text-white
                  shadow-[0_10px_25px_rgba(59,130,246,0.2)]
                  transition
                  hover:-translate-y-[1px]
                  hover:shadow-[0_14px_30px_rgba(59,130,246,0.3)]
                  active:translate-y-0
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <LogIn
                  size={18}
                  strokeWidth={2}
                />

                <span>
                  {isLoading
                    ? "Signing In..."
                    : "Sign In"}
                </span>
              </button>
            </form>
          </div>

          {/* ================================================= */}
          {/* Footer */}
          {/* ================================================= */}

          <div
            className="
              mt-[22px]
              text-center
              text-[12px]
              text-[#475569]
            "
          >
            © 2026 Archive Management System
          </div>
        </div>
      </main>
    </div>
  );
}