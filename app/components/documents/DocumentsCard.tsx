"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  FileText,
  Folder,
  CalendarDays,
  MessageSquare,
  Eye,
  Download,
  Trash2,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

export type DocumentItem = {
  id: number;
  fileName: string;
  documentName: string;
  classification: string;
  notes: string;
  date: string;
};

type DocumentsCardProps = {
  documents?: DocumentItem[];
  onAddFile?: () => void;
  onView?: (document: DocumentItem) => void;
  onDownload?: (document: DocumentItem) => void;
  onDelete?: (document: DocumentItem) => void;
};

/* ========================================================= */
/* DEFAULT DATA                                               */
/* ========================================================= */

const defaultDocuments: DocumentItem[] = [
  {
    id: 1,
    fileName: "OCR_Test.pdf",
    documentName: "asdfgjkl;dfd",
    classification: "ليست عربي",
    notes: "لا توجد ملاحظات",
    date: "27 سبتمبر 2026",
  },
  {
    id: 2,
    fileName: "medical info.pdf",
    documentName: "asdfgjkl;dfd",
    classification: "ليست عربي",
    notes: "لا توجد ملاحظات",
    date: "27 سبتمبر 2026",
  },
  {
    id: 3,
    fileName: "Lorem_ipsum.pdf",
    documentName: "asdfgjkl;dfd",
    classification: "ليست عربي",
    notes: "لا توجد ملاحظات",
    date: "27 سبتمبر 2026",
  },
  {
    id: 4,
    fileName: "medical info.pdf",
    documentName: "سيسيشن",
    classification: "ليست عربي",
    notes: "لا توجد ملاحظات",
    date: "27 سبتمبر 2026",
  },
  {
    id: 5,
    fileName: "Lorem_ipsum.pdf",
    documentName: "سيسيشن",
    classification: "ليست عربي",
    notes: "لا توجد ملاحظات",
    date: "27 سبتمبر 2026",
  },
  {
    id: 6,
    fileName: "Document2.pdf",
    documentName: "dasdsadd",
    classification: "تصنيف 2",
    notes: "لا توجد ملاحظات",
    date: "27 سبتمبر 2026",
  },
  {
    id: 7,
    fileName: "Document.pdf",
    documentName: "dasdsadd",
    classification: "تصنيف 2",
    notes: "لا توجد ملاحظات",
    date: "27 سبتمبر 2026",
  },
  {
    id: 8,
    fileName: "Document2.pdf",
    documentName: "new doc",
    classification: "تصنيف 1",
    notes: "asdfghj",
    date: "27 سبتمبر 2026",
  },
];

/* ========================================================= */
/* DOCUMENTS CARD                                             */
/* ========================================================= */

export default function DocumentsCard({
  documents = defaultDocuments,
  onAddFile,
  onView,
  onDownload,
  onDelete,
}: DocumentsCardProps) {
  const [search, setSearch] = useState("");
  const [fileSearch, setFileSearch] = useState("");
  const [classification, setClassification] =
    useState("كل التصنيفات");
  const [documentSearch, setDocumentSearch] = useState("");
  const [notesSearch, setNotesSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");

  /* ========================================================= */
  /* FILTER                                                     */
  /* ========================================================= */

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const generalSearch =
        !search ||
        doc.fileName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        doc.documentName
          .toLowerCase()
          .includes(search.toLowerCase());

      const fileMatch =
        !fileSearch ||
        doc.fileName
          .toLowerCase()
          .includes(fileSearch.toLowerCase());

      const classificationMatch =
        classification === "كل التصنيفات" ||
        doc.classification === classification;

      const documentMatch =
        !documentSearch ||
        doc.documentName
          .toLowerCase()
          .includes(documentSearch.toLowerCase());

      const notesMatch =
        !notesSearch ||
        doc.notes
          .toLowerCase()
          .includes(notesSearch.toLowerCase());

      const dateMatch =
        !dateSearch ||
        doc.date.includes(dateSearch);

      return (
        generalSearch &&
        fileMatch &&
        classificationMatch &&
        documentMatch &&
        notesMatch &&
        dateMatch
      );
    });
  }, [
    documents,
    search,
    fileSearch,
    classification,
    documentSearch,
    notesSearch,
    dateSearch,
  ]);

  /* ========================================================= */
  /* UI                                                         */
  /* ========================================================= */

  return (
    <section
      dir="rtl"
      className="
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-[0_2px_10px_rgba(15,23,42,0.04)]
      "
    >
      {/* ===================================================== */}
      {/* TOP TOOLBAR                                           */}
      {/* ===================================================== */}

      <div
        className="
          border-b
          border-slate-200
          bg-white
          px-5
          py-4
          max-[600px]:px-[18px]
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
          "
        >
          {/* ================================================= */}
          {/* RIGHT SIDE - TITLE                                */}
          {/* ================================================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              text-slate-900
            "
          >
            <FileText
              size={19}
              strokeWidth={2}
              className="text-blue-600"
            />

            <span
              className="
                whitespace-nowrap
                text-[17px]
                font-bold
              "
            >
              ملفاتي
            </span>

            {/* COUNT */}

            <span
              className="
                flex
                h-6
                min-w-6
                items-center
                justify-center
                rounded-full
                bg-blue-50
                px-1.5
                text-[11px]
                font-semibold
                text-blue-600
              "
            >
              {documents.length}
            </span>
          </div>

          {/* ================================================= */}
          {/* LEFT SIDE - CONTROLS                             */}
          {/* ================================================= */}

          <div
            className="
              flex
              min-w-0
              flex-1
              flex-wrap
              items-center
              justify-end
              gap-2.5
            "
          >
            {/* GENERAL SEARCH */}

            <div
              className="
                relative
                w-[245px]
                max-[700px]:w-[200px]
                max-[600px]:w-full
              "
            >
              <Search
                size={16}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث باسم الملف أو المستند ..."
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  pr-9
                  pl-3
                  text-[12px]
                  text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-50
                "
              />
            </div>

            {/* COLUMNS */}

            <button
              type="button"
              className="
                flex
                h-10
                shrink-0
                items-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                text-[12px]
                font-medium
                text-slate-600
                transition
                hover:bg-slate-50
              "
            >
              <SlidersHorizontal size={15} />

              <span>
                الأعمدة
              </span>
            </button>

            {/* FROM DATE */}

            <div
              className="
                relative
                shrink-0
                max-[600px]:flex-1
              "
            >
              <label
                className="
                  absolute
                  -top-2
                  right-2
                  z-10
                  bg-white
                  px-1
                  text-[9px]
                  text-slate-500
                "
              >
                من التاريخ
              </label>

              <input
                type="date"
                className="
                  h-10
                  w-[135px]
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-[11px]
                  text-slate-500
                  outline-none
                  focus:border-blue-400
                  max-[600px]:w-full
                "
              />
            </div>

            {/* TO DATE */}

            <div
              className="
                relative
                shrink-0
                max-[600px]:flex-1
              "
            >
              <label
                className="
                  absolute
                  -top-2
                  right-2
                  z-10
                  bg-white
                  px-1
                  text-[9px]
                  text-slate-500
                "
              >
                إلى التاريخ
              </label>

              <input
                type="date"
                className="
                  h-10
                  w-[135px]
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-[11px]
                  text-slate-500
                  outline-none
                  focus:border-blue-400
                  max-[600px]:w-full
                "
              />
            </div>

            {/* ADD FILE */}

            <button
              type="button"
              onClick={onAddFile}
              className="
                flex
                h-10
                shrink-0
                items-center
                gap-1.5
                rounded-lg
                bg-indigo-600
                px-4
                text-[12px]
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-indigo-700
                active:scale-[0.98]
              "
            >
              <Plus size={16} />

              <span>
                إضافة ملف
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* DESKTOP TABLE - LG / XL                              */}
      {/* ===================================================== */}

      <div
        className="
          hidden
          w-full
          overflow-x-auto
          lg:block
        "
      >
        <table
          className="
            w-full
            min-w-[950px]
            border-collapse
          "
        >
          {/* ================================================= */}
          {/* TABLE HEADER                                      */}
          {/* ================================================= */}

          <thead>
            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50/70
              "
            >
              {/* FILE */}

              <th
                className="
                  w-[20%]
                  px-5
                  py-3
                  text-right
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[12px]
                      font-semibold
                      text-slate-700
                    "
                  >
                    الملف
                  </span>

                  <ChevronsUpDown
                    size={14}
                    className="text-slate-400"
                  />
                </div>
              </th>

              {/* DOCUMENT */}

              <th
                className="
                  w-[20%]
                  px-4
                  py-3
                  text-right
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[12px]
                      font-semibold
                      text-slate-700
                    "
                  >
                    المستند
                  </span>

                  <ChevronsUpDown
                    size={14}
                    className="text-slate-400"
                  />
                </div>
              </th>

              {/* CLASSIFICATION */}

              <th
                className="
                  w-[17%]
                  px-4
                  py-3
                  text-right
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[12px]
                      font-semibold
                      text-slate-700
                    "
                  >
                    التصنيف
                  </span>

                  <ChevronsUpDown
                    size={14}
                    className="text-slate-400"
                  />
                </div>
              </th>

              {/* NOTES */}

              <th
                className="
                  w-[20%]
                  px-4
                  py-3
                  text-right
                "
              >
                <span
                  className="
                    text-[12px]
                    font-semibold
                    text-slate-700
                  "
                >
                  الملاحظات
                </span>
              </th>

              {/* DATE */}

              <th
                className="
                  w-[15%]
                  bg-indigo-50/70
                  px-4
                  py-3
                  text-right
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[12px]
                      font-semibold
                      text-slate-700
                    "
                  >
                    التاريخ
                  </span>

                  <ChevronsUpDown
                    size={14}
                    className="text-blue-500"
                  />
                </div>
              </th>

              {/* ACTIONS */}

              <th
                className="
                  w-[8%]
                  px-4
                  py-3
                  text-center
                "
              >
                <span
                  className="
                    text-[12px]
                    font-semibold
                    text-slate-700
                  "
                >
                  الإجراءات
                </span>
              </th>
            </tr>

            {/* ================================================= */}
            {/* FILTER ROW                                        */}
            {/* ================================================= */}

            <tr
              className="
                border-b
                border-slate-200
                bg-white
              "
            >
              {/* FILE FILTER */}

              <th className="px-3 py-2">
                <div className="relative">
                  <Search
                    size={14}
                    className="
                      absolute
                      right-2.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    value={fileSearch}
                    onChange={(e) =>
                      setFileSearch(e.target.value)
                    }
                    placeholder="بحث باسم الملف..."
                    className="
                      h-9
                      w-full
                      rounded-md
                      border
                      border-slate-200
                      pr-8
                      pl-2
                      text-[11px]
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-400
                    "
                  />
                </div>
              </th>

              {/* DOCUMENT FILTER */}

              <th className="px-3 py-2">
                <div className="relative">
                  <Search
                    size={14}
                    className="
                      absolute
                      right-2.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    value={documentSearch}
                    onChange={(e) =>
                      setDocumentSearch(e.target.value)
                    }
                    placeholder="بحث في المستند..."
                    className="
                      h-9
                      w-full
                      rounded-md
                      border
                      border-slate-200
                      pr-8
                      pl-2
                      text-[11px]
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-400
                    "
                  />
                </div>
              </th>

              {/* CLASSIFICATION FILTER */}

              <th className="px-3 py-2">
                <div className="relative">
                  <select
                    value={classification}
                    onChange={(e) =>
                      setClassification(e.target.value)
                    }
                    className="
                      h-9
                      w-full
                      appearance-none
                      rounded-md
                      border
                      border-slate-200
                      bg-white
                      px-3
                      pl-8
                      text-[11px]
                      text-slate-600
                      outline-none
                      focus:border-blue-400
                    "
                  >
                    <option>
                      كل التصنيفات
                    </option>

                    <option>
                      ليست عربي
                    </option>

                    <option>
                      تصنيف 1
                    </option>

                    <option>
                      تصنيف 2
                    </option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="
                      pointer-events-none
                      absolute
                      left-2.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />
                </div>
              </th>

              {/* NOTES FILTER */}

              <th className="px-3 py-2">
                <input
                  value={notesSearch}
                  onChange={(e) =>
                    setNotesSearch(e.target.value)
                  }
                  placeholder="بحث في الملاحظات..."
                  className="
                    h-9
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    px-3
                    text-[11px]
                    outline-none
                    placeholder:text-slate-400
                    focus:border-blue-400
                  "
                />
              </th>

              {/* DATE FILTER */}

              <th
                className="
                  bg-indigo-50/40
                  px-3
                  py-2
                "
              >
                <div className="relative">
                  <CalendarDays
                    size={14}
                    className="
                      absolute
                      right-2.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="date"
                    value={dateSearch}
                    onChange={(e) =>
                      setDateSearch(e.target.value)
                    }
                    className="
                      h-9
                      w-full
                      rounded-md
                      border
                      border-slate-200
                      bg-white
                      pr-8
                      pl-2
                      text-[10px]
                      text-slate-500
                      outline-none
                      focus:border-blue-400
                    "
                  />
                </div>
              </th>

              {/* ACTION FILTER */}

              <th className="px-3 py-2" />
            </tr>
          </thead>

          {/* ================================================= */}
          {/* TABLE BODY                                        */}
          {/* ================================================= */}

          <tbody>
            {filteredDocuments.map((document) => (
              <DocumentRow
                key={document.id}
                document={document}
                onView={onView}
                onDownload={onDownload}
                onDelete={onDelete}
              />
            ))}

            {filteredDocuments.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="
                    py-14
                    text-center
                    text-sm
                    text-slate-400
                  "
                >
                  لا توجد ملفات مطابقة للبحث
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===================================================== */}
      {/* MOBILE / TABLET CARDS - MD / SM / XS                */}
      {/* ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-3
          p-4
          lg:hidden
          max-[480px]:p-3
        "
      >
        {filteredDocuments.map((document) => (
          <DocumentMobileCard
            key={document.id}
            document={document}
            onView={onView}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        ))}

        {filteredDocuments.length === 0 && (
          <div
            className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-12
              text-center
              text-sm
              text-slate-400
            "
          >
            لا توجد ملفات مطابقة للبحث
          </div>
        )}
      </div>
    </section>
  );
}

/* ========================================================= */
/* DESKTOP DOCUMENT ROW                                      */
/* ========================================================= */

function DocumentRow({
  document,
  onView,
  onDownload,
  onDelete,
}: {
  document: DocumentItem;
  onView?: (document: DocumentItem) => void;
  onDownload?: (document: DocumentItem) => void;
  onDelete?: (document: DocumentItem) => void;
}) {
  return (
    <tr
      className="
        group
        border-b
        border-slate-100
        transition
        hover:bg-slate-50/60
      "
    >
      {/* =================================================== */}
      {/* FILE                                                */}
      {/* =================================================== */}

      <td
        className="
          max-w-0
          px-5
          py-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-red-50
              text-red-500
            "
          >
            <FileText size={20} />
          </div>

          <span
            className="
              block
              min-w-0
              truncate
              text-[13px]
              font-medium
              text-slate-800
            "
            title={document.fileName}
          >
            {document.fileName}
          </span>
        </div>
      </td>

      {/* =================================================== */}
      {/* DOCUMENT                                            */}
      {/* =================================================== */}

      <td
        className="
          max-w-0
          px-4
          py-4
        "
      >
        <button
          type="button"
          onClick={() => onView?.(document)}
          className="
            flex
            w-full
            min-w-0
            items-center
            gap-2
            text-right
            text-[12px]
            font-medium
            text-blue-600
            hover:underline
          "
        >
          <span
            className="
              min-w-0
              truncate
            "
            title={document.documentName}
          >
            {document.documentName}
          </span>

          <FileText
            size={14}
            className="shrink-0"
          />
        </button>
      </td>

      {/* =================================================== */}
      {/* CLASSIFICATION                                      */}
      {/* =================================================== */}

      <td
        className="
          max-w-0
          px-4
          py-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-2
            text-[12px]
            text-slate-600
          "
        >
          <Folder
            size={15}
            className="
              shrink-0
              text-slate-400
            "
          />

          <span
            className="
              min-w-0
              truncate
            "
            title={document.classification}
          >
            {document.classification}
          </span>
        </div>
      </td>

      {/* =================================================== */}
      {/* NOTES                                               */}
      {/* =================================================== */}

      <td
        className="
          max-w-0
          px-4
          py-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-2
            text-[12px]
            text-slate-500
          "
        >
          <MessageSquare
            size={15}
            className="
              shrink-0
              text-slate-400
            "
          />

          <span
            className="
              min-w-0
              truncate
            "
            title={document.notes}
          >
            {document.notes}
          </span>
        </div>
      </td>

      {/* =================================================== */}
      {/* DATE                                                */}
      {/* =================================================== */}

      <td
        className="
          max-w-0
          bg-indigo-50/20
          px-4
          py-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-2
            text-[11px]
            text-slate-500
          "
        >
          <CalendarDays
            size={14}
            className="
              shrink-0
              text-slate-400
            "
          />

          <span
            className="
              min-w-0
              truncate
            "
            title={document.date}
          >
            {document.date}
          </span>
        </div>
      </td>

      {/* =================================================== */}
      {/* ACTIONS                                             */}
      {/* =================================================== */}

      <td className="px-4 py-4">
        <div
          className="
            flex
            items-center
            justify-center
            gap-1.5
          "
        >
          <ActionButton
            title="عرض"
            onClick={() =>
              onView?.(document)
            }
          >
            <Eye size={15} />
          </ActionButton>

          <ActionButton
            title="تحميل"
            onClick={() =>
              onDownload?.(document)
            }
          >
            <Download size={15} />
          </ActionButton>

          <ActionButton
            title="حذف"
            danger
            onClick={() =>
              onDelete?.(document)
            }
          >
            <Trash2 size={15} />
          </ActionButton>
        </div>
      </td>
    </tr>
  );
}

/* ========================================================= */
/* MOBILE / TABLET DOCUMENT CARD                            */
/* ========================================================= */

function DocumentMobileCard({
  document,
  onView,
  onDownload,
  onDelete,
}: {
  document: DocumentItem;
  onView?: (document: DocumentItem) => void;
  onDownload?: (document: DocumentItem) => void;
  onDelete?: (document: DocumentItem) => void;
}) {
  return (
    <div
      className="
        w-full
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-[0_2px_8px_rgba(15,23,42,0.03)]
        transition
        hover:border-slate-300
        max-[480px]:p-3
      "
    >
      {/* FILE HEADER */}

      <div
        className="
          flex
          min-w-0
          items-center
          gap-3
          border-b
          border-slate-100
          pb-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-red-50
            text-red-500
          "
        >
          <FileText size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="
              truncate
              text-[13px]
              font-semibold
              text-slate-800
            "
            title={document.fileName}
          >
            {document.fileName}
          </div>

          <div
            className="
              mt-1
              text-[10px]
              text-slate-400
            "
          >
            PDF Document
          </div>
        </div>
      </div>

      {/* INFORMATION */}

      <div className="mt-4 space-y-3">

        {/* DOCUMENT */}

        <MobileInfoRow
          icon={<FileText size={15} />}
          label="المستند"
        >
          <button
            type="button"
            onClick={() =>
              onView?.(document)
            }
            className="
              block
              min-w-0
              max-w-full
              truncate
              text-right
              text-[12px]
              font-medium
              text-blue-600
              hover:underline
            "
            title={document.documentName}
          >
            {document.documentName}
          </button>
        </MobileInfoRow>

        {/* CLASSIFICATION */}

        <MobileInfoRow
          icon={<Folder size={15} />}
          label="التصنيف"
        >
          <span
            className="
              block
              min-w-0
              truncate
              text-[12px]
              text-slate-600
            "
            title={document.classification}
          >
            {document.classification}
          </span>
        </MobileInfoRow>

        {/* NOTES */}

        <MobileInfoRow
          icon={<MessageSquare size={15} />}
          label="الملاحظات"
        >
          <span
            className="
              block
              min-w-0
              truncate
              text-[12px]
              text-slate-500
            "
            title={document.notes}
          >
            {document.notes}
          </span>
        </MobileInfoRow>

        {/* DATE */}

        <MobileInfoRow
          icon={<CalendarDays size={15} />}
          label="التاريخ"
        >
          <span
            className="
              block
              min-w-0
              truncate
              text-[12px]
              font-medium
              text-slate-600
            "
            title={document.date}
          >
            {document.date}
          </span>
        </MobileInfoRow>

      </div>

      {/* ACTIONS */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-end
          gap-2
          border-t
          border-slate-100
          pt-3
        "
      >
        <ActionButton
          title="عرض"
          onClick={() =>
            onView?.(document)
          }
        >
          <Eye size={15} />
        </ActionButton>

        <ActionButton
          title="تحميل"
          onClick={() =>
            onDownload?.(document)
          }
        >
          <Download size={15} />
        </ActionButton>

        <ActionButton
          title="حذف"
          danger
          onClick={() =>
            onDelete?.(document)
          }
        >
          <Trash2 size={15} />
        </ActionButton>
      </div>
    </div>
  );
}

/* ========================================================= */
/* MOBILE INFO ROW                                           */
/* ========================================================= */

function MobileInfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-center
        gap-3
      "
    >
      <div
        className="
          flex
          w-[100px]
          shrink-0
          items-center
          gap-2
          text-[11px]
          font-medium
          text-slate-400
          max-[480px]:w-[85px]
        "
      >
        <span className="shrink-0 text-slate-400">
          {icon}
        </span>

        <span>
          {label}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}

/* ========================================================= */
/* ACTION BUTTON                                              */
/* ========================================================= */

function ActionButton({
  children,
  title,
  danger = false,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-lg
        border
        bg-white
        transition

        ${
          danger
            ? `
              border-slate-200
              text-slate-500
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-500
            `
            : `
              border-slate-200
              text-slate-500
              hover:bg-slate-50
              hover:text-blue-600
            `
        }
      `}
    >
      {children}
    </button>
  );
}