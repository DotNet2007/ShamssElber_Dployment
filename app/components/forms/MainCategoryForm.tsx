
"use client";

import type { ReactNode } from "react";
import {
  X,
  Plus,
  Trash2,
  Save,
  Send,
} from "lucide-react";

type MainCategoryFormProps = {
  title: string;
  description?: string;
  children: ReactNode;

  

  // Show / hide buttons
  showNew?: boolean;
  showDelete?: boolean;
  showSave?: boolean;
  showSubmit?: boolean;

  // Button states
  disableNew?: boolean;
  disableDelete?: boolean;
  disableSave?: boolean;
  disableSubmit?: boolean;

  // Button actions
  onClose?: () => void;
  onNew?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onSubmit?: () => void;

  actions?: ReactNode;
};

export default function MainCategoryForm({
  title,
  description,
  children,

  showNew = false,
  showDelete = false,
  showSave = false,
  showSubmit = false,

  disableNew = false,
  disableDelete = false,
  disableSave = false,
  disableSubmit = false,

  onClose,
  onNew,
  onDelete,
  onSave,
  onSubmit,

  actions,
}: MainCategoryFormProps) {
  const buttonClass =
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <main
      dir="rtl"
      className="mt-6 min-h-[calc(100vh-74px)]  px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Title */}
          <div className="flex min-w-0 items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {title}
              </h1>

              {description && (
                <p className="mt-1 text-sm text-gray-500">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {actions}

            {showNew && (
              <button
                type="button"
                onClick={onNew}
                disabled={disableNew || !onNew}
                className={`${buttonClass} border border-gray-300 bg-white text-gray-700 shadow-sm hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700`}
              >
                <Plus size={18} />
                جديد
              </button>
            )}

            {showDelete && (
              <button
                type="button"
                onClick={onDelete}
                disabled={disableDelete || !onDelete}
                className={`${buttonClass} border border-red-200 bg-white text-red-600 hover:bg-red-50`}
              >
                <Trash2 size={18} />
                حذف
              </button>
            )}

            {showSave && (
              <button
                type="button"
                onClick={onSave}
                disabled={disableSave || !onSave}
                className={`${buttonClass} bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800`}
              >
                <Save size={18} />
                حفظ
              </button>
            )}

            {showSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={disableSubmit || !onSubmit}
                className={`${buttonClass} bg-linear-to-r from-violet-600 to-purple-600 text-white shadow-sm hover:from-violet-700 hover:to-purple-700 active:from-violet-800 active:to-purple-800`}
              >
                <Send size={18} />
                تقديم
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                title="إغلاق"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="space-y-6">{children}</div>
      </div>
    </main>
  );
}
