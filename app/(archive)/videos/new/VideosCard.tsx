"use client";

import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  FileVideo,
  Folder,
  Plus,
  Search,
} from "lucide-react";

import { getArabicDayName } from "@/app/helpers/getArabicDayName";

/* =========================================================
   TYPES
   ========================================================= */

export interface DropdownEntity {
  Code: number;
  DescA: string;
  DescL?: string | null;
}

export interface Employee {
  Code: number;
  Company_Code: number;
  DescA?: string;
  DescL?: string | null;
}

export interface VideoItem {
  Code: number;

  TDate: string;

  Item_Code: number;
  ProdEntity1_Code: number;
  ProdEntity2_Code: number | null;
  Sec_Code: number;

  ItemSer_Code: number | null;
  Translation_Code: number | null;
  Channel_Code: number | null;

  ItemType_Code: number | null;
  EventType_Code: number | null;
  ProdLine_Code: number | null;
  ContentType_Code: number | null;

  ItemName: string;

  Event_Code: number | null;
  Song_Code: number | null;
  Speaker_Code: number | null;

  EventStatus: string | null;

  YouTubeLink: string | null;
  FaceBookLink: string | null;
  InstagramLink: string | null;

  FileName: string | null;
  ImageLink: string | null;

  RecordStatus: string;

  Emp_Code: number | null;
  Company_Code: number;

  Sector: DropdownEntity | null;

  Item_Type: DropdownEntity | null;
  Event_Type: DropdownEntity | null;
  Prod_Line: DropdownEntity | null;

  Event: DropdownEntity | null;
  Song: DropdownEntity | null;
  Speaker: DropdownEntity | null;

  ProdEntity1: DropdownEntity | null;
  ProdEntity2: DropdownEntity | null;

  Item: DropdownEntity | null;

  Content_Type: DropdownEntity | null;

  Employee: Employee | null;
}

/* =========================================================
   SORT
   ========================================================= */

export type SortColumn =
  | "Code"
  | "ItemName"
  | "Item"
  | "Sector"
  | "ProdEntity1"
  | "TDate";

export type SortDirection = "asc" | "desc";

/* =========================================================
   COLUMN SEARCH
   ========================================================= */

export interface VideoColumnSearch {
  video: string;
  item: string;
  sector: string;
  production: string;
}

/* =========================================================
   PROPS
   ========================================================= */

interface VideosCardProps {
  videos?: VideoItem[];

  /* General filters */
  search: string;
  dateFrom: string;
  dateTo: string;

  activeFilter: "all" | "mine";

  /* Sorting */
  sortBy: SortColumn;
  sortOrder: SortDirection;

  /* Pagination */
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  /* Column search */
  columnSearch: VideoColumnSearch;

  /* General events */
  onSearchChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;

  /* Column search events */
  onColumnSearchChange: (
    column: keyof VideoColumnSearch,
    value: string
  ) => void;

  /* Sorting */
  onSort: (column: SortColumn) => void;

  /* Pagination */
  onPageChange: (page: number) => void;

  /* Actions */
  onClear: () => void;
  onAllVideos: () => void;
  onMyVideos: () => void;
  onAddVideo: () => void;

  /*
    Kept as onView for compatibility with the parent.
    It now opens the Edit screen.
  */
  onView: (video: VideoItem) => void;
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function VideosCard({
  videos = [],

  search,
  dateFrom,
  dateTo,

  activeFilter,

  sortBy,
  sortOrder,

  total,
  page,
  limit,
  totalPages,

  columnSearch,

  onSearchChange,
  onDateFromChange,
  onDateToChange,

  onColumnSearchChange,

  onSort,

  onPageChange,

  onAllVideos,
  onMyVideos,

  onAddVideo,

  onView,
}: VideosCardProps) {
  return (
    <section
      dir="rtl"
      className="
        mt-4
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
      {/* =====================================================
          TOOLBAR
          ===================================================== */}

      <VideoToolbar
        total={total}
        search={search}
        dateFrom={dateFrom}
        dateTo={dateTo}
        activeFilter={activeFilter}
        onSearchChange={onSearchChange}
        onDateFromChange={onDateFromChange}
        onDateToChange={onDateToChange}
        onAllVideos={onAllVideos}
        onMyVideos={onMyVideos}
        onAddVideo={onAddVideo}
      />

      {/* =====================================================
          DESKTOP TABLE
          ===================================================== */}

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
            min-w-[1050px]
            border-collapse
          "
        >
          <thead>
            {/* ================= HEADER ================= */}

            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50/70
              "
            >
              {/* CODE */}

              <th
                className="
                  w-[6%]
                  px-3
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
                  #
                </span>
              </th>

              {/* VIDEO NAME */}

              <th
                className="
                  w-[24%]
                  px-5
                  py-3
                  text-right
                "
              >
                <TableHeader
                  title="اسم الفيديو"
                  sortColumn="ItemName"
                  currentSortColumn={sortBy}
                  sortDirection={sortOrder}
                  onSort={onSort}
                />
              </th>

              {/* ITEM */}

              <th
                className="
                  w-[18%]
                  px-4
                  py-3
                  text-right
                "
              >
                <TableHeader
                  title="الصنف"
                  sortColumn="Item"
                  currentSortColumn={sortBy}
                  sortDirection={sortOrder}
                  onSort={onSort}
                />
              </th>

              {/* SECTOR */}

              <th
                className="
                  w-[18%]
                  px-4
                  py-3
                  text-right
                "
              >
                <TableHeader
                  title="القطاع"
                  sortColumn="Sector"
                  currentSortColumn={sortBy}
                  sortDirection={sortOrder}
                  onSort={onSort}
                />
              </th>

              {/* PRODUCTION */}

              <th
                className="
                  w-[20%]
                  px-4
                  py-3
                  text-right
                "
              >
                <TableHeader
                  title="جهة الإنتاج 1"
                  sortColumn="ProdEntity1"
                  currentSortColumn={sortBy}
                  sortDirection={sortOrder}
                  onSort={onSort}
                />
              </th>

              {/* DATE */}

              <th
                className="
                  w-[14%]
                  bg-transparent
                  px-4
                  py-3
                  text-right
                "
              >
                <TableHeader
                  title="التاريخ"
                  sortColumn="TDate"
                  currentSortColumn={sortBy}
                  sortDirection={sortOrder}
                  onSort={onSort}
                />
              </th>
            </tr>

            {/* ================= FILTER ROW ================= */}

            <tr
              className="
                border-b
                border-slate-200
                bg-white
              "
            >
              {/* CODE */}

              <th className="px-2 py-2" />

              {/* VIDEO */}

              <th className="px-3 py-2">
                <SearchInput
                  value={columnSearch.video}
                  onChange={(value) =>
                    onColumnSearchChange("video", value)
                  }
                  placeholder="بحث باسم الفيديو..."
                />
              </th>

              {/* ITEM */}

              <th className="px-3 py-2">
                <SearchInput
                  value={columnSearch.item}
                  onChange={(value) =>
                    onColumnSearchChange("item", value)
                  }
                  placeholder="بحث في الصنف..."
                />
              </th>

              {/* SECTOR */}

              <th className="px-3 py-2">
                <SearchInput
                  value={columnSearch.sector}
                  onChange={(value) =>
                    onColumnSearchChange("sector", value)
                  }
                  placeholder="بحث في القطاع..."
                />
              </th>

              {/* PRODUCTION */}

              <th className="px-3 py-2">
                <SearchInput
                  value={columnSearch.production}
                  onChange={(value) =>
                    onColumnSearchChange("production", value)
                  }
                  placeholder="بحث في جهة الإنتاج..."
                />
              </th>

              {/* DATE */}

              <th
                className="
                    bg-transparent
                    px-3
                    py-2
                "
                >
                <div className="flex items-center justify-center">
                    <CalendarDays
                    size={14}
                    className="text-slate-400"
                    />
                </div>
                </th>
            </tr>
          </thead>

          {/* ================= TABLE BODY ================= */}

          <tbody>
            {videos.map((video) => (
              <VideoRow
                key={video.Code}
                video={video}
                onView={onView}
              />
            ))}

            {videos.length === 0 && (
              <EmptyTableRow />
            )}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          DESKTOP PAGINATION
          ===================================================== */}

      {total > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {/* =====================================================
          MOBILE / TABLET
          ===================================================== */}

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
        {videos.map((video) => (
          <VideoMobileCard
            key={video.Code}
            video={video}
            onView={onView}
          />
        ))}

        {videos.length === 0 && (
          <EmptyMobileCard />
        )}
      </div>

      {/* =====================================================
          MOBILE PAGINATION
          ===================================================== */}

      {total > 0 && (
        <div className="lg:hidden">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
}

/* =========================================================
   TOOLBAR
   ========================================================= */

function VideoToolbar({
  total,
  search,
  dateFrom,
  dateTo,
  activeFilter,
  onSearchChange,
  onDateFromChange,
  onDateToChange,
  onAllVideos,
  onMyVideos,
  onAddVideo,
}: {
  total: number;
  search: string;
  dateFrom: string;
  dateTo: string;
  activeFilter: "all" | "mine";
  onSearchChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onAllVideos: () => void;
  onMyVideos: () => void;
  onAddVideo: () => void;
}) {
  return (
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
        {/* ================= TITLE ================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            text-slate-900
          "
        >
          <FileVideo
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
            الفيديوهات
          </span>

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
            {total}
          </span>
        </div>

        {/* ================= CONTROLS ================= */}

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
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="ابحث باسم الفيديو أو الملف ..."
              className="
                h-10
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
                pr-9
                pl-9
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

            {search && (
              <ClearButton
                onClick={() => onSearchChange("")}
                label="مسح البحث"
              />
            )}
          </div>

          {/* ALL / MY */}

          <div
            className="
              flex
              h-10
              shrink-0
              items-center
              rounded-lg
              border
              border-slate-200
              bg-white
              p-1
            "
          >
            <button
              type="button"
              onClick={onAllVideos}
              className={`
                h-8
                rounded-md
                px-3
                text-[11px]
                font-medium
                transition
                ${
                  activeFilter === "all"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50"
                }
              `}
            >
              كل الفيديوهات
            </button>

            <button
              type="button"
              onClick={onMyVideos}
              className={`
                h-8
                rounded-md
                px-3
                text-[11px]
                font-medium
                transition
                ${
                  activeFilter === "mine"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50"
                }
              `}
            >
              فيديوهاتي
            </button>
          </div>

          {/* FROM DATE */}

          <DateFilter
            label="من التاريخ"
            value={dateFrom}
            onChange={onDateFromChange}
          />

          {/* TO DATE */}

          <DateFilter
            label="إلى التاريخ"
            value={dateTo}
            onChange={onDateToChange}
          />

          {/* ADD VIDEO */}

          <button
            type="button"
            onClick={onAddVideo}
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
              max-[600px]:w-full
              max-[600px]:justify-center
            "
          >
            <Plus size={16} />

            <span>
              إضافة فيديو
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DATE FILTER
   ========================================================= */

function DateFilter({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
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
        {label}
      </label>

      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}

/* =========================================================
   TABLE HEADER
   ========================================================= */

function TableHeader({
  title,
  sortColumn,
  currentSortColumn,
  sortDirection,
  onSort,
}: {
  title: string;
  sortColumn: SortColumn;
  currentSortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}) {
  const active = currentSortColumn === sortColumn;

  return (
    <button
      type="button"
      onClick={() => onSort(sortColumn)}
      className="
        flex
        w-full
        items-center
        justify-between
        gap-2
        text-right
        transition
        hover:text-blue-600
      "
    >
      <span
        className="
          text-[12px]
          font-semibold
          text-slate-700
        "
      >
        {title}
      </span>

      {!active && (
        <span className="text-[15px] text-slate-400">
          ↕
        </span>
      )}

      {active && sortDirection === "asc" && (
        <ArrowUp
          size={14}
          className="text-blue-500"
        />
      )}

      {active && sortDirection === "desc" && (
        <ArrowDown
          size={14}
          className="text-blue-500"
        />
      )}
    </button>
  );
}

/* =========================================================
   SEARCH INPUT
   ========================================================= */

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search
        size={14}
        className="
          pointer-events-none
          absolute
          right-2.5
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-9
          w-full
          rounded-md
          border
          border-slate-200
          bg-white
          pr-8
          pl-8
          text-[11px]
          text-slate-700
          outline-none
          placeholder:text-slate-400
          focus:border-blue-400
          focus:ring-1
          focus:ring-blue-50
        "
      />

      {value && (
        <ClearButton
          onClick={() => onChange("")}
          label="مسح البحث"
        />
      )}
    </div>
  );
}

/* =========================================================
   CLEAR BUTTON
   ========================================================= */

function ClearButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        absolute
        left-2
        top-1/2
        flex
        h-5
        w-5
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        text-[14px]
        leading-none
        text-slate-400
        transition
        hover:bg-slate-100
        hover:text-slate-600
      "
      aria-label={label}
    >
      ×
    </button>
  );
}

/* =========================================================
   DESKTOP ROW
   IMPORTANT:
   Entire row opens EDIT.
   ========================================================= */

function VideoRow({
  video,
  onView,
}: {
  video: VideoItem;
  onView: (video: VideoItem) => void;
}) {
  return (
    <tr
      onClick={() => onView(video)}
      className="
        group
        cursor-pointer
        border-b
        border-slate-100
        transition
        hover:bg-blue-50/40
      "
      title="اضغط لفتح التعديل"
    >
      {/* ================= CODE ================= */}

      <td
        className="
          px-3
          py-4
          text-center
        "
      >
        <span
          className="
            inline-flex
            h-7
            min-w-7
            items-center
            justify-center
            rounded-full
            bg-slate-100
            px-2
            text-[11px]
            font-semibold
            text-slate-500
          "
        >
          {video.Code}
        </span>
      </td>

      {/* ================= VIDEO NAME ================= */}

      <td className="max-w-0 px-5 py-4">
        <div
          className="
            flex
            w-full
            min-w-0
            items-center
            gap-3
            text-right
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
            <FileVideo size={20} />
          </div>

          <span
            className="
              block
              min-w-0
              truncate
              text-[13px]
              font-medium
              text-slate-700
            "
            title={getVideoName(video)}
          >
            {getVideoName(video)}
          </span>
        </div>
      </td>

      {/* ================= ITEM ================= */}

      <td className="max-w-0 px-4 py-4">
        <InfoCell
          icon={<Folder size={15} />}
          value={getItem(video)}
        />
      </td>

      {/* ================= SECTOR ================= */}

      <td className="max-w-0 px-4 py-4">
        <InfoCell
          icon={<Folder size={15} />}
          value={getSection(video)}
        />
      </td>

      {/* ================= PRODUCTION ================= */}

      <td className="max-w-0 px-4 py-4">
        <InfoCell
          icon={<Folder size={15} />}
          value={getProductionEntity1(video)}
        />
      </td>

      {/* ================= DATE ================= */}

      <td
        className="
          max-w-0
          bg-transparent
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
            title={getDate(video)}
          >
            {getDate(video)}
          </span>
        </div>
      </td>
    </tr>
  );
}

/* =========================================================
   MOBILE CARD
   Entire card opens EDIT.
   ========================================================= */

function VideoMobileCard({
  video,
  onView,
}: {
  video: VideoItem;
  onView: (video: VideoItem) => void;
}) {
  return (
    <div
      onClick={() => onView(video)}
      className="
        w-full
        min-w-0
        cursor-pointer
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-[0_2px_8px_rgba(15,23,42,0.03)]
        transition
        hover:border-blue-300
        hover:bg-blue-50/20
        max-[480px]:p-3
      "
      title="اضغط لفتح التعديل"
    >
      {/* ================= HEADER ================= */}

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
        {/* CODE */}

        <span
          className="
            flex
            h-7
            min-w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-slate-100
            px-2
            text-[10px]
            font-semibold
            text-slate-500
          "
        >
          {video.Code}
        </span>

        {/* ICON */}

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
          <FileVideo size={20} />
        </div>

        {/* NAME */}

        <div className="min-w-0 flex-1">
          <div
            className="
              block
              w-full
              truncate
              text-right
              text-[13px]
              font-semibold
              text-slate-800
            "
            title={getVideoName(video)}
          >
            {getVideoName(video)}
          </div>

          <div
            className="
              mt-1
              text-[10px]
              text-slate-400
            "
          >
            فيديو
          </div>
        </div>
      </div>

      {/* ================= INFORMATION ================= */}

      <div className="mt-4 space-y-3">
        {/* ITEM */}

        <MobileInfoRow
          icon={<Folder size={15} />}
          label="الصنف"
        >
          <span
            className="
              truncate
              text-[12px]
              text-slate-600
            "
          >
            {getItem(video)}
          </span>
        </MobileInfoRow>

        {/* SECTOR */}

        <MobileInfoRow
          icon={<Folder size={15} />}
          label="القطاع"
        >
          <span
            className="
              truncate
              text-[12px]
              text-slate-600
            "
          >
            {getSection(video)}
          </span>
        </MobileInfoRow>

        {/* PRODUCTION */}

        <MobileInfoRow
          icon={<Folder size={15} />}
          label="جهة الإنتاج 1"
        >
          <span
            className="
              truncate
              text-[12px]
              text-slate-600
            "
          >
            {getProductionEntity1(video)}
          </span>
        </MobileInfoRow>

        {/* DATE */}

        <MobileInfoRow
          icon={<CalendarDays size={15} />}
          label="التاريخ"
        >
          <span
            className="
              truncate
              text-[12px]
              font-medium
              text-slate-600
            "
          >
            {getDate(video)}
          </span>
        </MobileInfoRow>
      </div>
    </div>
  );
}

/* =========================================================
   INFO CELL
   ========================================================= */

function InfoCell({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
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
      <span className="shrink-0 text-slate-400">
        {icon}
      </span>

      <span
        className="
          min-w-0
          truncate
        "
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   MOBILE INFO ROW
   ========================================================= */

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

        <span>{label}</span>
      </div>

      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY DESKTOP ROW
   ========================================================= */

function EmptyTableRow() {
  return (
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
        لا توجد فيديوهات مطابقة للبحث
      </td>
    </tr>
  );
}

/* =========================================================
   EMPTY MOBILE
   ========================================================= */

function EmptyMobileCard() {
  return (
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
      لا توجد فيديوهات مطابقة للبحث
    </div>
  );
}

/* =========================================================
   PAGINATION
   ========================================================= */

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div
      dir="rtl"
      className="
        flex
        items-center
        justify-center
        gap-2
        border-t
        border-slate-200
        px-4
        py-4
      "
    >
      {/* PREVIOUS */}

      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="
          rounded-lg
          border
          border-slate-200
          px-3
          py-2
          text-xs
          text-slate-600
          transition
          hover:bg-slate-50
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        السابق
      </button>

      {/* PAGE */}

      <span
        className="
          min-w-[120px]
          text-center
          text-xs
          font-medium
          text-slate-500
        "
      >
        صفحة{" "}
        <span className="font-semibold text-slate-800">
          {page}
        </span>{" "}
        من{" "}
        <span className="font-semibold text-slate-800">
          {totalPages}
        </span>
      </span>

      {/* NEXT */}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="
          rounded-lg
          border
          border-slate-200
          px-3
          py-2
          text-xs
          text-slate-600
          transition
          hover:bg-slate-50
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        التالي
      </button>
    </div>
  );
}

/* =========================================================
   DATA HELPERS
   ========================================================= */

function getVideoName(video: VideoItem): string {
  return video.ItemName?.trim() || "-";
}

function getItem(video: VideoItem): string {
  return video.Item?.DescA?.trim() || "-";
}

function getSection(video: VideoItem): string {
  return video.Sector?.DescA?.trim() || "-";
}

function getProductionEntity1(video: VideoItem): string {
  return video.ProdEntity1?.DescA?.trim() || "-";
}

function getDate(video: VideoItem): string {
  if (!video.TDate) {
    return "-";
  }

  return getArabicDayName(video.TDate) || "-";
}