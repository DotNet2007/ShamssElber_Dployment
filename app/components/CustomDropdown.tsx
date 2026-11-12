"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "اختر عنصر",
  loading = false,
  disabled = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full max-w-full">
      {/* Dropdown Trigger */}
      <button
        type="button"
        disabled={disabled || loading}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className={`
          flex w-full items-center justify-between gap-3
          rounded-xl border bg-white px-3 py-2.5
          text-right text-sm text-slate-800
          outline-none transition-all duration-200
          ${
            isOpen
              ? "border-blue-500 ring-2 ring-blue-100"
              : "border-slate-300 hover:border-slate-400"
          }
          ${
            disabled || loading
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          }
        `}
      >
        <span className="min-w-0 flex-1 truncate">
          {loading
            ? "جاري تحميل البيانات..."
            : selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && !loading && (
        <div
          className="
            absolute right-0 top-full z-50 mt-2
            w-full max-w-[320px]
            overflow-hidden rounded-xl
            border border-slate-200 bg-white
            shadow-xl shadow-slate-900/10
            ring-1 ring-black/5
          "
        >
          <ul
            role="listbox"
            aria-label={placeholder}
            className="max-h-60 overflow-y-auto p-1.5"
          >
            {options.length === 0 ? (
              <li className="px-3 py-4 text-center text-sm text-slate-400">
                لا توجد بيانات
              </li>
            ) : (
              options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                      }}
                      className={`
                        flex w-full items-center justify-between gap-3
                        rounded-lg px-3 py-2.5 text-right text-sm
                        transition-colors duration-150
                        ${
                          isSelected
                            ? "bg-blue-50 font-medium text-blue-700"
                            : "text-slate-700 hover:bg-slate-100"
                        }
                      `}
                    >
                      <span className="min-w-0 flex-1 wrap-break-word">
                        {option.label}
                      </span>

                      {isSelected && (
                        <Check
                          size={16}
                          className="shrink-0 text-blue-600"
                        />
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}