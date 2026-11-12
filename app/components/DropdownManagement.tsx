

"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {

  Plus,

  Search,

  Pencil,

  Trash2,

  X,


  LoaderCircle,

  ChevronRight,

  ChevronLeft,
  ArrowLeft,

} from "lucide-react";

/* =========================================================

   TYPES

========================================================= */

export interface DropdownItem {

  Code: number;

  DescA: string;


}

export interface DropdownPayload {

  DescA: string;


}

interface DropdownManagementProps {

  title: string;

  description?: string;

  items: DropdownItem[];

  isLoading?: boolean;

  isSaving?: boolean;

  pageSize?: number;

  onCreate: (data: DropdownPayload) => Promise<void>;

  onUpdate: (

    code: number,

    data: DropdownPayload

  ) => Promise<void>;

  onDelete: (code: number) => Promise<void>;

}

/* =========================================================

   COMPONENT

========================================================= */

export default function DropdownManagement({

  title,

  description = "إدارة عناصر القائمة",

  items,

  isLoading = false,

  isSaving = false,

  pageSize = 10,

  onCreate,

  onUpdate,

  onDelete,

}: DropdownManagementProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingItem, setEditingItem] =

    useState<DropdownItem | null>(null);

  const [deletingItem, setDeletingItem] =

    useState<DropdownItem | null>(null);

  const [descA, setDescA] = useState("");

  const [formError, setFormError] = useState("");


  /* =======================================================

     SEARCH & PAGINATION

  ======================================================= */

  const filteredItems = useMemo(() => {

    const query = search.trim().toLocaleLowerCase();

    if (!query) return items;

    return items.filter((item) => {

      const arabic = item.DescA?.toLocaleLowerCase() ?? "";


      const code = String(item.Code);

      return (

        arabic.includes(query) ||

        code.includes(query)

      );

    });

  }, [items, search]);

  const totalPages = Math.max(

    1,

    Math.ceil(filteredItems.length / pageSize)

  );

  const currentPage = Math.min(page, totalPages);

  const paginatedItems = useMemo(() => {

    const start = (currentPage - 1) * pageSize;

    return filteredItems.slice(start, start + pageSize);

  }, [filteredItems, currentPage, pageSize]);

  const startItem =

    filteredItems.length === 0

      ? 0

      : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(

    currentPage * pageSize,

    filteredItems.length

  );

  /* =======================================================

     MODAL

  ======================================================= */

  function openCreateModal() {

    setEditingItem(null);

    setDescA("");

    setFormError("");


    setModalOpen(true);

  }

  function openEditModal(item: DropdownItem) {

    setEditingItem(item);

    setDescA(item.DescA ?? "");

    setFormError("");


    setModalOpen(true);

  }

  function closeModal() {

    if (isSaving) return;

    setModalOpen(false);

    setEditingItem(null);

    setFormError("");

  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const arabicName = descA.trim();
    if (!arabicName) {
      setFormError("اسم العنصر مطلوب.");
      return;
    }

    setFormError("");

    const payload: DropdownPayload = { DescA: arabicName };

    try {
      if (editingItem) {
        await onUpdate(editingItem.Code, payload);
        toast.success("تم تعديل العنصر بنجاح.");
      } else {
        await onCreate(payload);
        toast.success("تمت إضافة العنصر بنجاح.");
      }

      setModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء حفظ البيانات.";

      toast.error(message);
    }
  }

  /* =======================================================

     DELETE

  ======================================================= */

  async function handleDelete() {
    if (!deletingItem) return;

    try {
      await onDelete(deletingItem.Code);
      toast.success("تم حذف العنصر بنجاح.");
      setDeletingItem(null);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "تعذر حذف العنصر.";

      toast.error(message);
    }
  }

  /* =======================================================

     REUSABLE ACTION BUTTON

  ======================================================= */

  function ActionButton({

    onClick,

    label,

    danger = false,

    children,

  }: {

    onClick: () => void;

    label: string;

    danger?: boolean;

    children: ReactNode;

  }) {

    return (

      <button

        type="button"

        title={label}

        aria-label={label}

        onClick={(e) => {

          e.stopPropagation();

          onClick();

        }}

        className={`

          flex h-8 w-8 shrink-0 items-center

          justify-center rounded-lg transition

          ${

            danger

              ? "text-slate-400 hover:bg-red-50 hover:text-red-600"

              : "text-slate-400 hover:bg-blue-50 hover:text-blue-600"

          }

        `}

      >

        {children}

      </button>

    );

  }

  /* =======================================================

     RENDER

  ======================================================= */

  return (
    <div dir="rtl" className="w-full min-w-0">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-50 px-2 text-xs font-semibold text-blue-600">
              {filteredItems.length}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-slate-500">{description}</p>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
        >
          <ArrowLeft size={16} />
          رجوع
        </button>
      </header>

      <section
      dir="rtl"
      className="
        w-full min-w-0 overflow-hidden

        rounded-2xl border border-slate-200

        bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)]

      "

    >

      {/* TOOLBAR */}

      <div className="border-b border-slate-200 bg-white px-5 py-4">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
            <span>عدد العناصر</span>
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-50 px-1.5 text-[11px] font-semibold text-blue-600">
              {filteredItems.length}
            </span>
          </div>

          <div

            className="

              flex min-w-0 flex-1 flex-wrap items-center

              justify-end gap-2.5 max-[600px]:w-full

            "

          >

            {/* SEARCH */}

            <div className="relative w-61.25 max-[700px]:w-50 max-[600px]:w-full">

              <Search

                size={16}

                className="

                  pointer-events-none absolute right-3 top-1/2

                  -translate-y-1/2 text-slate-400

                "

              />

              <input

                value={search}

                onChange={(e) => {

                  setSearch(e.target.value);

                  setPage(1);

                }}

                placeholder="ابحث بالاسم أو الكود..."

                className="

                  h-10 w-full rounded-lg border border-slate-200

                  bg-white pr-9 pl-9 text-[12px] text-slate-700

                  outline-none transition placeholder:text-slate-400

                  focus:border-blue-400 focus:ring-2 focus:ring-blue-50

                "

              />

              {search && (

                <button

                  type="button"

                  onClick={() => {

                    setSearch("");

                    setPage(1);

                  }}

                  aria-label="مسح البحث"

                  className="

                    absolute left-2 top-1/2 flex h-5 w-5

                    -translate-y-1/2 items-center justify-center

                    rounded-full text-slate-400 hover:bg-slate-100

                  "

                >

                  <X size={13} />

                </button>

              )}

            </div>

            {/* ADD */}

            <button

              type="button"

              onClick={openCreateModal}

              className="

                flex h-10 shrink-0 items-center gap-1.5

                rounded-lg bg-indigo-600 px-4 text-[12px]

                font-semibold text-white shadow-sm transition

                hover:bg-indigo-700 active:scale-[0.98]

                max-[600px]:w-full max-[600px]:justify-center

              "

            >

              <Plus size={16} />

              إضافة عنصر

            </button>

          </div>

        </div>

      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden w-full overflow-x-auto lg:block">

        <table className="w-full min-w-150 border-collapse">

          <thead>

            <tr className="border-b border-slate-200 bg-slate-50/70">

              <th className="w-[10%] px-3 py-3 text-center">

                <span className="text-[12px] font-semibold text-slate-700">

                  #

                </span>

              </th>

              <th className="px-5 py-3 text-right">

                <span className="text-[12px] font-semibold text-slate-700">

                  الاسم العربي

                </span>

              </th>
<th className="w-30 px-4 py-3 text-center">

                <span className="text-[12px] font-semibold text-slate-700">

                  الإجراءات

                </span>

              </th>

            </tr>

          </thead>

          <tbody>

            {isLoading ? (

              <tr>

                <td colSpan={3} className="py-14">

                  <LoadingState />

                </td>

              </tr>

            ) : paginatedItems.length === 0 ? (

              <tr>

                <td

                  colSpan={3}

                  className="py-14 text-center text-sm text-slate-400"

                >

                  لا توجد عناصر مطابقة للبحث

                </td>

              </tr>

            ) : (

              paginatedItems.map((item) => (

                <tr

                  key={item.Code}

                  onClick={() => openEditModal(item)}

                  title="اضغط لفتح التعديل"

                  className="

                    group cursor-pointer border-b border-slate-100

                    transition hover:bg-blue-50/40

                  "

                >

                  <td className="px-3 py-4 text-center">

                    <span

                      className="

                        inline-flex h-7 min-w-7 items-center

                        justify-center rounded-full bg-slate-100

                        px-2 text-[11px] font-semibold text-slate-500

                      "

                    >

                      {item.Code}

                    </span>

                  </td>

                  <td className="max-w-0 px-5 py-4">

                    <span

                      className="block truncate text-[13px] font-medium text-slate-700"

                      title={item.DescA}

                    >

                      {item.DescA}

                    </span>

                  </td>
<td className="px-4 py-3">

                    <div className="flex items-center justify-center gap-1">

                      <ActionButton

                        label="تعديل العنصر"

                        onClick={() => openEditModal(item)}

                      >

                        <Pencil size={15} />

                      </ActionButton>

                      <ActionButton

                        label="حذف العنصر"

                        danger

                        onClick={() => {

                          setDeletingItem(item);

                      
                        }}

                      >

                        <Trash2 size={15} />

                      </ActionButton>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* MOBILE CARDS */}

      <div className="grid grid-cols-1 gap-3 p-4 lg:hidden max-[480px]:p-3">

        {isLoading ? (

          <LoadingState />

        ) : paginatedItems.length === 0 ? (

          <div className="rounded-xl border border-slate-200 bg-slate-50 py-12 text-center text-sm text-slate-400">

            لا توجد عناصر مطابقة للبحث

          </div>

        ) : (

          paginatedItems.map((item) => (

            <div

              key={item.Code}

              onClick={() => openEditModal(item)}

              className="

                cursor-pointer rounded-2xl border border-slate-200

                bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.03)]

                transition hover:border-blue-300 hover:bg-blue-50/20

              "

            >

              <div className="flex min-w-0 items-center gap-3">

                <span

                  className="

                    flex h-8 min-w-8 shrink-0 items-center

                    justify-center rounded-full bg-slate-100

                    px-2 text-[11px] font-semibold text-slate-500

                  "

                >

                  {item.Code}

                </span>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-[13px] font-semibold text-slate-800">

                    {item.DescA}

                  </p>
</div>

                <div className="flex shrink-0 items-center gap-1">

                  <ActionButton

                    label="تعديل العنصر"

                    onClick={() => openEditModal(item)}

                  >

                    <Pencil size={15} />

                  </ActionButton>

                  <ActionButton

                    label="حذف العنصر"

                    danger

                    onClick={() => {

                      setDeletingItem(item);

                  
                    }}

                  >

                    <Trash2 size={15} />

                  </ActionButton>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

      {/* PAGINATION */}

      {!isLoading && filteredItems.length > 0 && (

        <div

          dir="rtl"

          className="

            flex flex-wrap items-center justify-between gap-3

            border-t border-slate-200 px-4 py-4

          "

        >

          <span className="text-xs text-slate-500">

            عرض {startItem}–{endItem} من {filteredItems.length} عنصر

          </span>

          <div className="flex items-center gap-2">

            <button

              type="button"

              disabled={currentPage <= 1}

              onClick={() => setPage((p) => Math.max(1, p - 1))}

              className="

                flex items-center gap-1 rounded-lg border

                border-slate-200 px-3 py-2 text-xs text-slate-600

                transition hover:bg-slate-50 disabled:cursor-not-allowed

                disabled:opacity-40

              "

            >

              <ChevronRight size={14} />

              السابق

            </button>

            <span className="min-w-20 text-center text-xs text-slate-500">

              صفحة{" "}

              <span className="font-semibold text-slate-800">

                {currentPage}

              </span>{" "}

              من{" "}

              <span className="font-semibold text-slate-800">

                {totalPages}

              </span>

            </span>

            <button

              type="button"

              disabled={currentPage >= totalPages}

              onClick={() =>

                setPage((p) => Math.min(totalPages, p + 1))

              }

              className="

                flex items-center gap-1 rounded-lg border

                border-slate-200 px-3 py-2 text-xs text-slate-600

                transition hover:bg-slate-50 disabled:cursor-not-allowed

                disabled:opacity-40

              "

            >

              التالي

              <ChevronLeft size={14} />

            </button>

          </div>

        </div>

      )}

      {/* CREATE / EDIT MODAL */}

      {modalOpen && (

        <div

          dir="rtl"

          className="

            fixed inset-0 z-50 flex items-center justify-center

            overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]

          "

          onMouseDown={(e) => {

            if (e.target === e.currentTarget) closeModal();

          }}

        >

          <div

            role="dialog"

            aria-modal="true"

            aria-labelledby="dropdown-modal-title"

            className="

              my-auto w-full max-w-md overflow-hidden rounded-2xl

              border border-slate-200 bg-white

              shadow-[0_20px_60px_rgba(15,23,42,0.18)]

            "

          >

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

              <div>

                <h2

                  id="dropdown-modal-title"

                  className="text-base font-bold text-slate-900"

                >

                  {editingItem ? "تعديل العنصر" : "إضافة عنصر جديد"}

                </h2>

                <p className="mt-1 text-xs text-slate-500">

                  {title}

                </p>

              </div>

              <button

                type="button"

                onClick={closeModal}

                disabled={isSaving}

                aria-label="إغلاق"

                className="

                  flex h-8 w-8 items-center justify-center

                  rounded-lg text-slate-400 transition

                  hover:bg-slate-100 hover:text-slate-700

                  disabled:opacity-40

                "

              >

                <X size={18} />

              </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">

              <div>

                <label

                  htmlFor="dropdown-desc-a"

                  className="mb-2 block text-xs font-semibold text-slate-700"

                >

                  الاسم العربي <span className="text-red-500">*</span>

                </label>

                <input

                  id="dropdown-desc-a"

                  value={descA}

                  onChange={(e) => setDescA(e.target.value)}

                  required

                  maxLength={200}

                  autoFocus

                  placeholder="أدخل اسم العنصر"

                  className="

                    h-11 w-full rounded-lg border border-slate-200

                    bg-white px-3 text-sm text-slate-700 outline-none

                    transition placeholder:text-slate-400

                    focus:border-blue-400 focus:ring-2 focus:ring-blue-50

                  "

                />

              </div>
{formError && (

                <p role="alert" className="text-xs text-red-600">

                  {formError}

                </p>

              )}

              <div className="flex items-center gap-2 border-t border-slate-100 pt-4">

                <button

                  type="submit"

                  disabled={isSaving}

                  className="

                    flex h-10 flex-1 items-center justify-center gap-2

                    rounded-lg bg-indigo-600 px-4 text-sm font-semibold

                    text-white transition hover:bg-indigo-700

                    disabled:cursor-not-allowed disabled:opacity-60

                  "

                >

                  {isSaving && (

                    <LoaderCircle size={16} className="animate-spin" />

                  )}

                  {isSaving

                    ? "جاري الحفظ..."

                    : editingItem

                      ? "حفظ التعديلات"

                      : "إضافة العنصر"}

                </button>

                <button

                  type="button"

                  onClick={closeModal}

                  disabled={isSaving}

                  className="

                    h-10 rounded-lg border border-slate-200

                    px-4 text-sm font-medium text-slate-600

                    transition hover:bg-slate-50 disabled:opacity-40

                  "

                >

                  إلغاء

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* DELETE CONFIRMATION */}

      {deletingItem && (

        <div

          dir="rtl"

          className="

            fixed inset-0 z-60 flex items-center justify-center

            bg-slate-950/40 p-4 backdrop-blur-[2px]

          "

        >

          <div

            role="alertdialog"

            aria-modal="true"

            className="

              w-full max-w-sm rounded-2xl border border-slate-200

              bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.18)]

            "

          >

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">

                <Trash2 size={19} />

              </div>

              <div className="min-w-0 flex-1">

                <h2 className="text-sm font-bold text-slate-900">

                  تأكيد حذف العنصر

                </h2>

                <p className="mt-2 wrap-break-word text-sm leading-6 text-slate-500">

                  هل أنت متأكد من حذف{" "}

                  <span className="font-semibold text-slate-800">

                    {deletingItem.DescA}

                  </span>

                  ؟ لا يمكن التراجع عن هذا الإجراء.

                </p>

              </div>

            </div>
<div className="mt-5 flex gap-2">

              <button

                type="button"

                onClick={handleDelete}

                className="

                  flex h-10 flex-1 items-center justify-center gap-2

                  rounded-lg bg-red-600 px-4 text-sm font-semibold

                  text-white transition hover:bg-red-700

                "

              >

                <Trash2 size={15} />

                تأكيد الحذف

              </button>

              <button

                type="button"

                onClick={() => {

                  setDeletingItem(null);

              
                }}

                className="

                  h-10 rounded-lg border border-slate-200

                  px-4 text-sm font-medium text-slate-600

                  transition hover:bg-slate-50

                "

              >

                إلغاء

              </button>

            </div>

          </div>

        </div>

      )}

    </section>
    </div>
  );
}

/* =========================================================
   LOADING STATE

========================================================= */

function LoadingState() {

  return (

    <div className="flex flex-col items-center justify-center gap-3 py-10">

      <LoaderCircle

        size={27}

        className="animate-spin text-blue-600"

      />

      <p className="text-sm text-slate-500">

        جاري تحميل البيانات...

      </p>

    </div>

  );

}
