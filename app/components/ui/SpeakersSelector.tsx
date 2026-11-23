"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  User,
  UserPlus,
  X,
  Check,
  ChevronDown,
  Plus,
} from "lucide-react";

type Speaker = {
  Code: number;
  DescA: string | null;
};

type Props = {
  speakers: Speaker[];
  selectedCodes: number | null;
  manualSpeakers: string[];
  isAdmin: boolean;
  disabled?: boolean;
  loading?: boolean;
  onSelectedChange: (code: number | null) => void;
  onManualChange: (names: string[]) => void;
  onAdd: () => void;
};

export default function SpeakersSelector({
  speakers,
  selectedCodes,
  manualSpeakers,
  isAdmin,
  disabled = false,
  loading = false,
  onSelectedChange,
  onManualChange,
  onAdd,
}: Props) {
  const [search, setSearch] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [showList, setShowList] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredSpeakers = useMemo(() => {
    return speakers.filter((speaker) =>
      (speaker.DescA || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [speakers, search]);

  const toggleSpeaker = (code: number) => {
    if (disabled) return;

    onSelectedChange(selectedCodes === code ? null : code);
  };

  const addManualSpeaker = () => {
    const name = manualInput.trim();

    if (!name) return;

    const alreadyExists = manualSpeakers.some(
      (item) => item.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      setManualInput("");
      return;
    }

    onManualChange([...manualSpeakers, name]);
    setManualInput("");
    setShowManualInput(false);
  };

  const removeManualSpeaker = (name: string) => {
    onManualChange(
      manualSpeakers.filter((item) => item !== name)
    );
  };

  const selectedSpeaker = speakers.find(
    (speaker) => speaker.Code === selectedCodes
  );

  return (
    <div dir="rtl">

      {/* Registered speakers */}
      <div className="relative z-50 space-y-2">

        <div className="flex items-center gap-2">

          {/* Search and dropdown */}
          <div
            ref={dropdownRef}
            className="relative z-50 min-w-0 flex-1"
          >
            <div className="flex h-11 items-center gap-2 rounded-lg border border-[#dfe5ed] bg-[#fbfcfe] px-3">
              <User
                size={16}
                className="shrink-0 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowList(true);
                }}
                onFocus={() => setShowList(true)}
                placeholder="اختر متكلم أو ابحث عنه ..."
                disabled={disabled || loading}
                className="w-full bg-transparent text-xs outline-none"
              />

              <button
                type="button"
                onClick={() => setShowList((prev) => !prev)}
                disabled={disabled || loading}
                aria-label={
                  showList ? "إغلاق القائمة" : "فتح القائمة"
                }
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronDown
                  size={17}
                  className={`transition-transform duration-200 ${
                    showList ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Dropdown list */}
            {showList && !disabled && (
              <div className="absolute right-0 left-0 top-full z-9999 mt-1 max-h-37 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-xl">

                {loading ? (
                  <p className="p-3 text-center text-xs text-slate-400">
                    جاري تحميل المتكلمين...
                  </p>
                ) : filteredSpeakers.length === 0 ? (
                  <p className="p-3 text-center text-xs text-slate-400">
                    لا يوجد متكلم مطابق
                  </p>
                ) : (
                  filteredSpeakers.map((speaker) => {
                    const checked = selectedCodes === speaker.Code;

                    return (
                      <button
                        key={speaker.Code}
                        type="button"
                        onClick={() => toggleSpeaker(speaker.Code)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-right text-xs transition ${
                          checked
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <User size={14} />
                          {speaker.DescA}
                        </span>

                        {checked && <Check size={15} />}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Add registered speaker - Admin only */}
          {isAdmin && (
            <button
              type="button"
              title="إضافة متكلم للقائمة الرئيسية"
              aria-label="إضافة متكلم"
              onClick={onAdd}
              disabled={disabled}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] border border-[#dfe5ed] bg-white text-[#718096] transition-all duration-200 hover:border-[#2563eb] hover:bg-[#eff6ff] hover:text-[#2563eb] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={18} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Selected registered speaker */}
        <div className="flex flex-wrap gap-2">
          {selectedSpeaker && (
            <span
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
            >
              {selectedSpeaker.DescA}

              {!disabled && (
                <button
                  type="button"
                  onClick={() => onSelectedChange(null)}
                  aria-label={`حذف ${selectedSpeaker.DescA}`}
                  className="transition hover:text-red-600"
                >
                  <X size={13} />
                </button>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Manual speakers */}
      <div className="relative space-y-3 pt-3 mt-2">

        <div className="flex items-center justify-between">

          {/* Add manual speaker link */}
          {!disabled && (
            <>
              <button
                type="button"
                onClick={() =>
                  setShowManualInput((prev) => !prev)
                }
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors duration-200 hover:text-emerald-700"
              >
                <UserPlus size={14} />

                {showManualInput
                  ? "إلغاء إضافة متكلم"
                  : "إضافة متكلم"}
              </button>

              <span className="text-[10px] text-emerald-600">
                لا يضافون إلى القائمة الرئيسية
              </span>
            </>
          )}
        </div>

        {/* Manual input */}
        {showManualInput && !disabled && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/50 p-2">

            <input
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addManualSpeaker();
                }
              }}
              placeholder="اكتب اسم المتحدث..."
              className="h-9 min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-emerald-400"
              autoFocus
            />

            <button
              type="button"
              onClick={addManualSpeaker}
              disabled={!manualInput.trim()}
              className="flex h-9 cursor-pointer items-center gap-1.5 rounded-md bg-emerald-600 px-3 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check size={14} />
              إضافة
            </button>
          </div>
        )}

        {/* Manual speaker chips */}
        <div className="flex flex-wrap gap-2">
          {manualSpeakers.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
            >
              {name}

              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeManualSpeaker(name)}
                  aria-label={`حذف ${name}`}
                  className="transition hover:text-red-600"
                >
                  <X size={13} />
                </button>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
