"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / itemsPerPage)
  );

  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div
      dir="rtl"
      className="
        flex
        w-full
        items-center
        justify-between
        border-t
        border-gray-200
        px-5
        py-4
        max-[640px]:flex-col
        max-[640px]:gap-4
      "
    >
      {/* ==================================================
          RESULT COUNT
          ================================================== */}

      <div className="text-xs text-gray-500">
        عرض{" "}
        <span className="text-gray-700">
          {startItem}
        </span>
        {" - "}
        <span className="text-gray-700">
          {endItem}
        </span>
        {" من "}
        <span className="text-gray-700">
          {totalItems}
        </span>
      </div>

      {/* ==================================================
          PAGINATION
          ================================================== */}

      <div
        dir="ltr"
        className="flex items-center gap-1"
      >
        {/* Previous */}

        <button
          type="button"
          disabled={!canGoPrevious}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            bg-white
            text-gray-400
            transition

            hover:border-gray-300
            hover:text-gray-600

            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:hover:border-gray-200
            disabled:hover:text-gray-400
          "
        >
          <ChevronLeft size={17} />
        </button>

        {/* Current Page */}

        <button
          type="button"
          className="
            flex
            h-9
            min-w-9
            items-center
            justify-center
            rounded-lg
            bg-indigo-600
            px-3
            text-sm
            font-medium
            text-white
          "
        >
          {currentPage}
        </button>

        {/* Next */}

        <button
          type="button"
          disabled={!canGoNext}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            bg-white
            text-gray-400
            transition

            hover:border-gray-300
            hover:text-gray-600

            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:hover:border-gray-200
            disabled:hover:text-gray-400
          "
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}