// "use client";

// import Link from "next/link";
// import {
//   FileText,
//   Video,
//   Headphones,
//   Image as ImageIcon,
//   Users,
//   ArrowLeft,
// } from "lucide-react";

// const dashboardCards = [
//   {
//     title: "أرشيف الملفات",
//     description: "إدارة وتصفح جميع الملفات والمستندات",
//     href: "/files",
//     icon: FileText,
//     iconBg: "bg-blue-50",
//     iconColor: "text-blue-600",
//   },
//   {
//     title: "أرشيف الفيديوهات",
//     description: "تصفح وإدارة مكتبة الفيديوهات",
//     href: "/videos",
//     icon: Video,
//     iconBg: "bg-red-50",
//     iconColor: "text-red-600",
//   },
//   {
//     title: "أرشيف الملفات الصوتية",
//     description: "تصفح وإدارة التسجيلات والملفات الصوتية",
//     href: "/audio",
//     icon: Headphones,
//     iconBg: "bg-purple-50",
//     iconColor: "text-purple-600",
//   },
//   {
//     title: "أرشيف الصور",
//     description: "تصفح وإدارة الصور والألبومات",
//     href: "/images",
//     icon: ImageIcon,
//     iconBg: "bg-emerald-50",
//     iconColor: "text-emerald-600",
//   },
//   {
//     title: "أرشيف المكرسين",
//     description: "إدارة بيانات وملفات المكرسين",
//     href: "/deacons",
//     icon: Users,
//     iconBg: "bg-amber-50",
//     iconColor: "text-amber-600",
//   },
// ];

// export default function DashboardPage() {
//   return (
//     <main
//       dir="rtl"
//       className="
//         mx-auto
//         w-full
//         max-w-[1200px]
//         px-5
//         py-12
//         md:py-16
//       "
//     >
//       {/* ============================================== */}
//       {/* HEADER                                         */}
//       {/* ============================================== */}

//       <div className="mb-8">
//         <h1
//           className="
//             text-2xl
//             font-bold
//             tracking-tight
//             text-slate-900
//             md:text-3xl
//           "
//         >
//           لوحة التحكم
//         </h1>

//         <p
//           className="
//             mt-2
//             text-sm
//             text-slate-500
//             md:text-[15px]
//           "
//         >
//           اختر القسم الذي تريد الوصول إليه
//         </p>
//       </div>

//       {/* ============================================== */}
//       {/* CARDS                                          */}
//       {/* ============================================== */}

//       <div
//         className="
//           grid
//           grid-cols-1
//           gap-5
//           sm:grid-cols-2
//           lg:grid-cols-3
//         "
//       >
//         {dashboardCards.map((card) => {
//           const Icon = card.icon;

//           return (
//             <Link
//               key={card.href}
//               href={card.href}
//               className="
//                 group
//                 relative
//                 min-h-[190px]
//                 overflow-hidden
//                 rounded-2xl
//                 border
//                 border-slate-200
//                 bg-white
//                 p-6
//                 shadow-[0_2px_10px_rgba(15,23,42,0.04)]
//                 transition-all
//                 duration-200
//                 hover:-translate-y-1
//                 hover:border-slate-300
//                 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]
//               "
//             >
//               {/* Background decoration */}

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   -left-10
//                   -top-10
//                   h-32
//                   w-32
//                   rounded-full
//                   bg-slate-50
//                   transition-transform
//                   duration-300
//                   group-hover:scale-150
//                 "
//               />

//               {/* ICON */}

//               <div
//                 className={`
//                   relative
//                   flex
//                   h-14
//                   w-14
//                   items-center
//                   justify-center
//                   rounded-2xl
//                   ${card.iconBg}
//                   ${card.iconColor}
//                   transition-transform
//                   duration-200
//                   group-hover:scale-105
//                 `}
//               >
//                 <Icon size={27} strokeWidth={1.8} />
//               </div>

//               {/* TEXT */}

//               <div className="relative mt-5">
//                 <h2
//                   className="
//                     text-lg
//                     font-bold
//                     text-slate-800
//                     transition-colors
//                     group-hover:text-blue-600
//                   "
//                 >
//                   {card.title}
//                 </h2>

//                 <p
//                   className="
//                     mt-2
//                     max-w-[280px]
//                     text-[13px]
//                     leading-6
//                     text-slate-500
//                   "
//                 >
//                   {card.description}
//                 </p>
//               </div>

//               {/* ARROW */}

//               <div
//                 className="
//                   absolute
//                   bottom-6
//                   left-6
//                   flex
//                   h-8
//                   w-8
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-slate-50
//                   text-slate-400
//                   transition-all
//                   duration-200
//                   group-hover:bg-blue-50
//                   group-hover:text-blue-600
//                 "
//               >
//                 <ArrowLeft
//                   size={16}
//                   className="
//                     transition-transform
//                     duration-200
//                     group-hover:-translate-x-0.5
//                   "
//                 />
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </main>
//   );
// }



"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  FileText,
  Video,
  Headphones,
  Image as ImageIcon,
  Users,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";

const dashboardCards = [
  {
    title: "أرشيف الملفات",
    description: "إدارة وتصفح جميع الملفات والمستندات",
    href: "/files",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "أرشيف الفيديوهات",
    description: "تصفح وإدارة مكتبة الفيديوهات",
    href: "/videos",
    icon: Video,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    title: "أرشيف الملفات الصوتية",
    description: "تصفح وإدارة التسجيلات والملفات الصوتية",
    href: "/audio",
    icon: Headphones,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "أرشيف الصور",
    description: "تصفح وإدارة الصور والألبومات",
    href: "/images",
    icon: ImageIcon,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "أرشيف المكرسين",
    description: "إدارة بيانات وملفات المكرسين",
    href: "/deacons",
    icon: Users,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  const router = useRouter();

  // =========================================================
  // CHECK AUTHENTICATION
  // =========================================================

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[calc(100vh-74px)] items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-slate-200
              border-t-blue-600
            "
          />

          <p className="text-sm text-slate-500">
            جاري التحقق من تسجيل الدخول...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // NOT AUTHENTICATED
  // =========================================================

  if (!isAuthenticated) {
    return null;
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-400
        px-5
        py-12
        md:py-16
      "
    >
      {/* ============================================== */}
      {/* HEADER                                         */}
      {/* ============================================== */}

      <div className="mb-8">
        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
            text-slate-900
            md:text-3xl
          "
        >
          لوحة التحكم
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
            md:text-[15px]
          "
        >
          اختر القسم الذي تريد الوصول إليه
        </p>

        {/* Optional User Name */}

        {user && (
          <p className="mt-2 text-xs text-slate-400">
            مرحباً، {user.userName}
          </p>
        )}
      </div>

      {/* ============================================== */}
      {/* CARDS                                          */}
      {/* ============================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="
                group
                relative
                min-h-47.5
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-[0_2px_10px_rgba(15,23,42,0.04)]
                transition-all
                duration-200

                hover:-translate-y-1
                hover:border-slate-300
                hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]
              "
            >
              {/* Background decoration */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -left-10
                  -top-10
                  h-32
                  w-32
                  rounded-full
                  bg-slate-50
                  transition-transform
                  duration-300
                  group-hover:scale-150
                "
              />

              {/* ICON */}

              <div
                className={`
                  relative
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl

                  ${card.iconBg}
                  ${card.iconColor}

                  transition-transform
                  duration-200

                  group-hover:scale-105
                `}
              >
                <Icon
                  size={27}
                  strokeWidth={1.8}
                />
              </div>

              {/* TEXT */}

              <div className="relative mt-5">
                <h2
                  className="
                    text-lg
                    font-bold
                    text-slate-800

                    transition-colors
                    group-hover:text-blue-600
                  "
                >
                  {card.title}
                </h2>

                <p
                  className="
                    mt-2
                    max-w-70
                    text-[13px]
                    leading-6
                    text-slate-500
                  "
                >
                  {card.description}
                </p>
              </div>

              {/* ARROW */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-50
                  text-slate-400

                  transition-all
                  duration-200

                  group-hover:bg-blue-50
                  group-hover:text-blue-600
                "
              >
                <ArrowLeft
                  size={16}
                  className="
                    transition-transform
                    duration-200
                    group-hover:-translate-x-0.5
                  "
                />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}