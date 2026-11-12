"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Package, Building2, Factory, Layers3, Languages, Boxes, CalendarDays, GitBranch, ListOrdered, Music2, Mic2, Radio, FileText, ArrowLeft } from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";

const dropdownCards = [
  {
    title: "الأصناف",
    description: "إدارة قائمة الأصناف",
    href: "/categories/items",
    icon: Package,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "جهات الإنتاج الرئيسية",
    description: "إدارة جهات الإنتاج الرئيسية",
    href: "/categories/production-entities-one",
    icon: Factory,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "جهات الإنتاج الثانوية",
    description: "إدارة جهات الإنتاج الثانوية",
    href: "/categories/production-entities-two",
    icon: Building2,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "القطاعات",
    description: "إدارة قطاعات الشركة",
    href: "/categories/sectors",
    icon: Building2,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "الترجمات",
    description: "إدارة قائمة الترجمات",
    href: "/categories/translations",
    icon: Languages,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    title: "أنواع المنتجات",
    description: "إدارة أنواع المنتجات",
    href: "/categories/product-types",
    icon: Boxes,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "أنواع الأحداث",
    description: "إدارة أنواع الأحداث",
    href: "/categories/event-types",
    icon: Layers3,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "خطوط الإنتاج",
    description: "إدارة خطوط الإنتاج",
    href: "/categories/production-lines",
    icon: GitBranch,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "الأرقام التسلسلية",
    description: "إدارة الأرقام التسلسلية للمنتجات",
    href: "/admin/dropdowns/product-serials",
    icon: ListOrdered,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    title: "الأحداث",
    description: "إدارة قائمة الأحداث",
    href: "/admin/dropdowns/events",
    icon: CalendarDays,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    title: "الترانيم",
    description: "إدارة قائمة الترانيم",
    href: "/admin/dropdowns/songs",
    icon: Music2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "المتكلمين",
    description: "إدارة قائمة المتكلمين",
    href: "/admin/dropdowns/speakers",
    icon: Mic2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "قنوات النشر",
    description: "إدارة قنوات النشر",
    href: "/admin/dropdowns/channels",
    icon: Radio,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "أنواع المحتوى",
    description: "إدارة أنواع المحتوى",
    href: "/admin/dropdowns/content-types",
    icon: FileText,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export default function DropdownManagementPage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/sign-in");
      return;
    }

    if (user?.isAdmin !== true) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

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
            جاري التحقق من الصلاحيات...
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || user?.isAdmin !== true) {
    return null;
  }
  

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-300
        px-5
        py-12
        md:py-16
      "
    >
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
          إدارة قوائم الاختيارات
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
            md:text-[15px]
          "
        >
          إدارة جميع القوائم المستخدمة في النظام
        </p>

        {user && (
          <p className="mt-2 text-xs text-slate-400">
            مرحباً، {user.userName}
          </p>
        )}
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {dropdownCards.map((card) => {
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