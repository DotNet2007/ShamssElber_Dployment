// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";

// import {
//   Home,
//   Users,
//   FolderTree,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";

// import { useAuth } from "@/app/context/AuthContext";

// interface NavbarProps {
//   isAdmin?: boolean;
// }

// export default function Navbar({
//   isAdmin = true,
// }: NavbarProps) {
//   const auth = useAuth();

//   const pathname = usePathname();
//   const router = useRouter();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // =========================================================
//   // LOGOUT
//   // =========================================================

//   const handleLogout = async () => {
//     try {
//       setMobileMenuOpen(false);

//       await auth.logout();

//       router.replace("/sign-in");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   // =========================================================
//   // CLOSE MOBILE MENU
//   // =========================================================

//   const closeMobileMenu = () => {
//     setMobileMenuOpen(false);
//   };

//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (
//     <header
//       dir="rtl"
//       className="
//         sticky
//         top-0
//         z-[1000]
//         w-full
//         border-b
//         border-gray-200
//         bg-white
//       "
//     >
//       {/* =====================================================
//           MAIN NAVBAR
//       ===================================================== */}

//       <div
//         className="
//           mx-auto
//           flex
//           h-[74px]
//           w-full
//           max-w-[1200px]
//           items-center
//           px-5

//           max-[1100px]:px-4
//           max-[768px]:h-[64px]
//         "
//       >

//         {/* ===================================================
//             RIGHT SIDE
//             LOGO
//         =================================================== */}

//         <div
//           className="
//             flex
//             min-w-0
//             flex-1
//             items-center
//             justify-start
//           "
//         >
//           <Link
//             href="/"
//             onClick={closeMobileMenu}
//             className="
//               flex
//               shrink-0
//               items-center
//               no-underline
//             "
//           >
//             {/* =================================================
//                 LOGO
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 h-[44px]
//                 w-[100px]
//                 shrink-0
//                 overflow-hidden

//                 max-[768px]:h-[48px]
//                 max-[768px]:w-[80px]
//               "
//             >
//               <Image
//                 src="/Logo.jpg"
//                 alt="OCR Archive"
//                 fill
//                 priority
//                 sizes="110px"
//                 className="object-cover"
//               />
//             </div>
//           </Link>
//         </div>

//         {/* ===================================================
//             CENTER NAVIGATION
//         =================================================== */}

//         {isAdmin && (
//           <nav
//             className="
//               flex
//               shrink-0
//               items-center
//               gap-1
//               rounded-[11px]
//               border
//               border-gray-200
//               bg-slate-50
//               p-1

//               max-[900px]:hidden
//             "
//           >

//             {/* =================================================
//                 HOME
//             ================================================= */}

//             <NavItem
//               href="/"
//               icon={
//                 <Home className="h-[15px] w-[15px]" />
//               }
//               label="الرئيسية"
//               active={pathname === "/"}
//             />

//             {/* =================================================
//                 USERS
//             ================================================= */}

//             <NavItem
//               href="/users"
//               icon={
//                 <Users className="h-[15px] w-[15px]" />
//               }
//               label="المستخدمين"
//               active={pathname.startsWith("/users")}
//             />

//             {/* =================================================
//                 CATEGORIES
//             ================================================= */}

//             <NavItem
//               href="/categories"
//               icon={
//                 <FolderTree className="h-[15px] w-[15px]" />
//               }
//               label="التصنيفات"
//               active={pathname.startsWith("/categories")}
//             />
//           </nav>
//         )}

//         {/* ===================================================
//             LEFT SIDE
//             LOGOUT + MOBILE MENU
//         =================================================== */}

//         <div
//           className="
//             flex
//             flex-1
//             items-center
//             justify-end
//             gap-2
//           "
//         >

//           {/* =================================================
//               DESKTOP LOGOUT
//           ================================================= */}

//           <button
//             type="button"
//             title="تسجيل الخروج"
//             onClick={handleLogout}
//             className="
//               inline-flex
//               h-[42px]
//               shrink-0
//               items-center
//               justify-center
//               gap-2
//               rounded-[10px]
//               border
//               border-red-100
//               bg-white
//               px-[14px]
//               text-xs
//               font-semibold
//               text-red-600
//               transition-all
//               duration-200

//               hover:border-red-200
//               hover:bg-red-50
//               hover:text-red-700

//               max-[900px]:hidden
//             "
//           >
//             <LogOut className="h-[17px] w-[17px]" />

//             <span>
//               تسجيل الخروج
//             </span>
//           </button>

//           {/* =================================================
//               MOBILE MENU BUTTON
//           ================================================= */}

//           <button
//             type="button"
//             title={
//               mobileMenuOpen
//                 ? "إغلاق القائمة"
//                 : "فتح القائمة"
//             }
//             aria-label={
//               mobileMenuOpen
//                 ? "إغلاق القائمة"
//                 : "فتح القائمة"
//             }
//             aria-expanded={mobileMenuOpen}
//             onClick={() =>
//               setMobileMenuOpen((prev) => !prev)
//             }
//             className="
//               hidden
//               h-[40px]
//               w-[40px]
//               shrink-0
//               items-center
//               justify-center
//               rounded-[10px]
//               border
//               border-slate-200
//               bg-white
//               text-slate-700
//               transition-all
//               duration-200

//               hover:border-slate-300
//               hover:bg-slate-50

//               max-[900px]:flex
//             "
//           >
//             {mobileMenuOpen ? (
//               <X className="h-5 w-5" />
//             ) : (
//               <Menu className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* =====================================================
//           MOBILE MENU
//       ===================================================== */}

//       {mobileMenuOpen && (
//         <div
//           className="
//             border-t
//             border-slate-200
//             bg-white
//             px-4
//             pb-4
//             pt-3
//             shadow-[0_10px_25px_rgba(15,23,42,0.06)]

//             min-[901px]:hidden
//           "
//         >
//           <div
//             className="
//               mx-auto
//               flex
//               w-full
//               max-w-[1200px]
//               flex-col
//               gap-1.5
//             "
//           >

//             {/* =================================================
//                 MOBILE NAVIGATION
//             ================================================= */}

//             {isAdmin && (
//               <div className="flex flex-col gap-1">

//                 {/* HOME */}

//                 <MobileNavItem
//                   href="/"
//                   icon={
//                     <Home className="h-[18px] w-[18px]" />
//                   }
//                   label="الرئيسية"
//                   active={pathname === "/"}
//                   onClick={closeMobileMenu}
//                 />

//                 {/* USERS */}

//                 <MobileNavItem
//                   href="/users"
//                   icon={
//                     <Users className="h-[18px] w-[18px]" />
//                   }
//                   label="المستخدمين"
//                   active={pathname.startsWith("/users")}
//                   onClick={closeMobileMenu}
//                 />

//                 {/* CATEGORIES */}

//                 <MobileNavItem
//                   href="/categories"
//                   icon={
//                     <FolderTree className="h-[18px] w-[18px]" />
//                   }
//                   label="التصنيفات"
//                   active={pathname.startsWith("/categories")}
//                   onClick={closeMobileMenu}
//                 />

//               </div>
//             )}

//             {/* =================================================
//                 MOBILE LOGOUT
//             ================================================= */}

//             <button
//               type="button"
//               onClick={handleLogout}
//               className="
//                 mt-2
//                 flex
//                 h-11
//                 w-full
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-xl
//                 border
//                 border-red-100
//                 bg-red-50
//                 text-sm
//                 font-semibold
//                 text-red-600
//                 transition-all
//                 duration-200

//                 hover:border-red-200
//                 hover:bg-red-100
//               "
//             >
//               <LogOut className="h-[18px] w-[18px]" />

//               <span>
//                 تسجيل الخروج
//               </span>
//             </button>

//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// /* =========================================================
//    DESKTOP NAV ITEM
// ========================================================= */

// function NavItem({
//   href,
//   icon,
//   label,
//   active,
// }: {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
//   active: boolean;
// }) {
//   return (
//     <Link
//       href={href}
//       className={`
//         flex
//         h-[34px]
//         items-center
//         justify-center
//         gap-[7px]
//         rounded-[7px]
//         px-[13px]
//         text-xs
//         font-semibold
//         no-underline
//         transition-all
//         duration-200

//         ${
//           active
//             ? "bg-white text-blue-600 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
//             : "text-slate-500 hover:bg-white hover:text-blue-600"
//         }
//       `}
//     >
//       {icon}

//       <span>
//         {label}
//       </span>
//     </Link>
//   );
// }

// /* =========================================================
//    MOBILE NAV ITEM
// ========================================================= */

// function MobileNavItem({
//   href,
//   icon,
//   label,
//   active,
//   onClick,
// }: {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
//   active: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       className={`
//         flex
//         h-11
//         w-full
//         items-center
//         gap-3
//         rounded-xl
//         px-4
//         text-sm
//         font-semibold
//         no-underline
//         transition-all
//         duration-200

//         ${
//           active
//             ? "bg-blue-50 text-blue-600"
//             : "text-slate-600 hover:bg-slate-50"
//         }
//       `}
//     >
//       {icon}

//       <span>
//         {label}
//       </span>
//     </Link>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Home,
  Users,
  FolderTree,
  Video,
  Headphones,
  Image as ImageIcon,
  FileText,
  UserRound,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";

interface NavbarProps {
  isAdmin?: boolean;
}

export default function Navbar({
  isAdmin = false,
}: NavbarProps) {
  const auth = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = auth.user;

  const userRole = String(
    (user as any)?.role ??
      (user as any)?.Role ??
      (user as any)?.userRole ??
      (user as any)?.UserRole ??
      (user as any)?.userType ??
      (user as any)?.UserType ??
      ""
  )
    .trim()
    .toUpperCase();

  const isAdminUser = user?.isAdmin === true;

  const handleLogout = async () => {
    try {
      setMobileMenuOpen(false);

      await auth.logout();

      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      dir="rtl"
      className="
        sticky
        top-0
        z-[1000]
        w-full
        border-b
        border-gray-200
        bg-white
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[74px]
          w-full
          max-w-[1200px]
          items-center
          px-5
          max-[1100px]:px-4
          max-[768px]:h-[64px]
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            justify-start
          "
        >
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="
              flex
              shrink-0
              items-center
              no-underline
            "
          >
            <div
              className="
                relative
                h-[44px]
                w-[100px]
                shrink-0
                overflow-hidden
                max-[768px]:h-[48px]
                max-[768px]:w-[80px]
              "
            >
              <Image
                src="/Logo.jpg"
                alt="OCR Archive"
                fill
                priority
                sizes="110px"
                className="object-cover"
              />
            </div>
          </Link>
        </div>

        <nav
          className="
            flex
            shrink-0
            items-center
            gap-1
            rounded-[11px]
            border
            border-gray-200
            bg-slate-50
            p-1
            max-[900px]:hidden
          "
        >
          {isAdminUser ? (
            <>
              <NavItem
                href="/"
                icon={
                  <Home className="h-[15px] w-[15px]" />
                }
                label="الرئيسية"
                active={pathname === "/"}
              />

              <NavItem
                href="/users"
                icon={
                  <Users className="h-[15px] w-[15px]" />
                }
                label="المستخدمين"
                active={pathname.startsWith("/users")}
              />

              <NavItem
                href="/categories"
                icon={
                  <FolderTree className="h-[15px] w-[15px]" />
                }
                label="القوائم"
                active={
                  pathname.startsWith("/categories") ||
                  pathname.startsWith("/admin/dropdowns")
                }
              />
            </>
          ) : (
            <>
              <NavItem
                href="/"
                icon={
                  <Home className="h-[15px] w-[15px]" />
                }
                label="الرئيسية"
                active={pathname === "/"}
              />

              <NavItem
                href="/videos"
                icon={
                  <Video className="h-[15px] w-[15px]" />
                }
                label="الفيديو"
                active={pathname.startsWith("/videos")}
              />

              <NavItem
                href="/audio"
                icon={
                  <Headphones className="h-[15px] w-[15px]" />
                }
                label="الأوديو"
                active={pathname.startsWith("/audio")}
              />

              <NavItem
                href="/images"
                icon={
                  <ImageIcon className="h-[15px] w-[15px]" />
                }
                label="الصور"
                active={pathname.startsWith("/images")}
              />

              <NavItem
                href="/files"
                icon={
                  <FileText className="h-[15px] w-[15px]" />
                }
                label="الملفات"
                active={pathname.startsWith("/files")}
              />

              <NavItem
                href="/deacons"
                icon={
                  <UserRound className="h-[15px] w-[15px]" />
                }
                label="المكرسين"
                active={pathname.startsWith("/deacons")}
              />
            </>
          )}
        </nav>

        <div
          className="
            flex
            flex-1
            items-center
            justify-end
            gap-2
          "
        >
          <button
            type="button"
            title="تسجيل الخروج"
            onClick={handleLogout}
            className="
              inline-flex
              h-[42px]
              shrink-0
              items-center
              justify-center
              gap-2
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
              max-[900px]:hidden
            "
          >
            <LogOut className="h-[17px] w-[17px]" />

            <span>
              تسجيل الخروج
            </span>
          </button>

          <button
            type="button"
            title={
              mobileMenuOpen
                ? "إغلاق القائمة"
                : "فتح القائمة"
            }
            aria-label={
              mobileMenuOpen
                ? "إغلاق القائمة"
                : "فتح القائمة"
            }
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen((prev) => !prev)
            }
            className="
              hidden
              h-[40px]
              w-[40px]
              shrink-0
              items-center
              justify-center
              rounded-[10px]
              border
              border-slate-200
              bg-white
              text-slate-700
              transition-all
              duration-200
              hover:border-slate-300
              hover:bg-slate-50
              max-[900px]:flex
            "
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="
            border-t
            border-slate-200
            bg-white
            px-4
            pb-4
            pt-3
            shadow-[0_10px_25px_rgba(15,23,42,0.06)]
            min-[901px]:hidden
          "
        >
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[1200px]
              flex-col
              gap-1.5
            "
          >
            {isAdminUser ? (
              <>
                <MobileNavItem
                  href="/"
                  icon={
                    <Home className="h-[18px] w-[18px]" />
                  }
                  label="الرئيسية"
                  active={pathname === "/"}
                  onClick={closeMobileMenu}
                />

                <MobileNavItem
                  href="/users"
                  icon={
                    <Users className="h-[18px] w-[18px]" />
                  }
                  label="المستخدمين"
                  active={pathname.startsWith("/users")}
                  onClick={closeMobileMenu}
                />

                <MobileNavItem
                  href="/categories"
                  icon={
                    <FolderTree className="h-[18px] w-[18px]" />
                  }
                  label="القوائم"
                  active={
                    pathname.startsWith("/categories") ||
                    pathname.startsWith("/admin/dropdowns")
                  }
                  onClick={closeMobileMenu}
                />
              </>
            ) : (
              <>
                <MobileNavItem
                  href="/"
                  icon={
                    <Home className="h-[18px] w-[18px]" />
                  }
                  label="الرئيسية"
                  active={pathname === "/"}
                  onClick={closeMobileMenu}
                />

                <MobileNavItem
                  href="/videos"
                  icon={
                    <Video className="h-[18px] w-[18px]" />
                  }
                  label="الفيديو"
                  active={pathname.startsWith("/videos")}
                  onClick={closeMobileMenu}
                />

                <MobileNavItem
                  href="/audio"
                  icon={
                    <Headphones className="h-[18px] w-[18px]" />
                  }
                  label="الأوديو"
                  active={pathname.startsWith("/audio")}
                  onClick={closeMobileMenu}
                />

                <MobileNavItem
                  href="/images"
                  icon={
                    <ImageIcon className="h-[18px] w-[18px]" />
                  }
                  label="الصور"
                  active={pathname.startsWith("/images")}
                  onClick={closeMobileMenu}
                />

                <MobileNavItem
                  href="/files"
                  icon={
                    <FileText className="h-[18px] w-[18px]" />
                  }
                  label="الملفات"
                  active={pathname.startsWith("/files")}
                  onClick={closeMobileMenu}
                />

                <MobileNavItem
                  href="/deacons"
                  icon={
                    <UserRound className="h-[18px] w-[18px]" />
                  }
                  label="المكرسين"
                  active={pathname.startsWith("/deacons")}
                  onClick={closeMobileMenu}
                />
              </>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="
                mt-2
                flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-100
                bg-red-50
                text-sm
                font-semibold
                text-red-600
                transition-all
                duration-200
                hover:border-red-200
                hover:bg-red-100
              "
            >
              <LogOut className="h-[18px] w-[18px]" />

              <span>
                تسجيل الخروج
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

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

      <span>
        {label}
      </span>
    </Link>
  );
}

function MobileNavItem({
  href,
  icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex
        h-11
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        text-sm
        font-semibold
        no-underline
        transition-all
        duration-200

        ${
          active
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:bg-slate-50"
        }
      `}
    >
      {icon}

      <span>
        {label}
      </span>
    </Link>
  );
}