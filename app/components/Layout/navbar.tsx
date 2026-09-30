"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Home,
  Users,
  FolderTree,
  LogOut,
  ScanText,
} from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";

interface NavbarProps {
  isAdmin?: boolean;
  pageTitle?: string;
}

export default function Navbar({
  isAdmin = true,
  pageTitle = "OCR Archive",
}: NavbarProps) {
  const auth = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = async () => {
    try {
      await auth.logout();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      dir="rtl"
      className="
        sticky top-0 z-[1000]
        h-[74px] w-full
        border-b border-gray-200
        bg-white
      "
    >
      <div
        className="
          relative mx-auto
          flex h-[74px]
          w-[1200px]
          max-w-[calc(100%-40px)]
          items-center
          justify-between

          max-[1250px]:max-w-[calc(100%-32px)]
          max-[768px]:h-16
          max-[768px]:max-w-[calc(100%-24px)]
        "
      >

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-[14px]">

          {/* =================================================
              BACK BUTTON
          ================================================= */}

          <button
            type="button"
            title="رجوع"
            onClick={() => router.back()}
            className="
              flex
              h-[42px]
              w-[42px]
              items-center
              justify-center

              rounded-[10px]

              border
              border-[#dfe5ee]

              bg-white

              text-gray-700

              transition-all
              duration-200

              hover:border-slate-300
              hover:bg-slate-50
              hover:text-gray-900

              max-[768px]:h-[38px]
              max-[768px]:w-[38px]
            "
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3
              whitespace-nowrap
            "
          >

            {/* TITLE ICON */}

            <div
              className="
                flex
                h-[42px]
                w-[42px]
                shrink-0
                items-center
                justify-center

                rounded-[11px]

                bg-indigo-50
                text-[#3b5bdb]

                max-[768px]:h-[38px]
                max-[768px]:w-[38px]
              "
            >
              <ScanText className="h-[22px] w-[22px]" />
            </div>

            {/* TITLE */}

            <div>
              <h1
                className="
                  m-0
                  text-[20px]
                  font-bold
                  leading-[1.2]
                  text-gray-900

                  max-[768px]:text-[17px]
                "
              >
                {pageTitle}
              </h1>

              <span
                className="
                  mt-[3px]
                  block
                  font-sans
                  text-[11px]
                  text-[#8b95a7]

                  max-[768px]:hidden
                "
              >
                Document Management
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            CENTER NAVIGATION
        ===================================================== */}

        {isAdmin && (
          <nav
            className="
              absolute
              left-1/2
              top-1/2

              flex
              -translate-x-1/2
              -translate-y-1/2

              items-center
              gap-[6px]

              rounded-[10px]

              border
              border-gray-200

              bg-slate-50

              p-1

              max-[768px]:hidden
            "
          >

            {/* =================================================
                HOME
            ================================================= */}

            <NavItem
              href="/"
              icon={<Home className="h-[15px] w-[15px]" />}
              label="الرئيسيه"
              active={pathname === "/"}
            />

            {/* =================================================
                USERS
            ================================================= */}

            <NavItem
              href="/users"
              icon={<Users className="h-[15px] w-[15px]" />}
              label="المستخدمين"
              active={pathname.startsWith("/users")}
            />

            {/* =================================================
                CATEGORIES
            ================================================= */}

            <NavItem
              href="/categories"
              icon={<FolderTree className="h-[15px] w-[15px]" />}
              label="التصنيفات"
              active={pathname.startsWith("/categories")}
            />
          </nav>
        )}

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div className="flex items-center">

          {/* =================================================
              LOGOUT BUTTON
          ================================================= */}

          <button
            type="button"
            title="تسجيل الخروج"
            onClick={handleLogout}
            className="
              inline-flex
              h-[42px]

              items-center
              justify-center
              gap-[7px]

              rounded-[10px]

              border
              border-red-100

              bg-white

              px-[14px]

              text-xs
              font-semibold
              text-red-600

              transition-all
              duration-200

              hover:border-red-200
              hover:bg-red-50
              hover:text-red-700

              max-[768px]:h-[38px]
              max-[768px]:w-[38px]
              max-[768px]:p-0
            "
          >
            <LogOut className="h-[18px] w-[18px]" />

            <span className="max-[768px]:hidden">
              تسجيل الخروج
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   NAV ITEM
========================================================= */

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex
        h-[34px]

        items-center
        justify-center
        gap-[7px]

        rounded-[7px]

        px-[13px]

        text-xs
        font-semibold

        no-underline

        transition-all
        duration-200

        ${
          active
            ? "bg-white text-blue-600 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
            : "text-slate-500 hover:bg-white hover:text-blue-600"
        }
      `}
    >
      {icon}

      <span>{label}</span>
    </Link>
  );
}