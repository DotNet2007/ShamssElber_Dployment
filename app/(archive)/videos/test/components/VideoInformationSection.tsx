"use client";

import React from "react";

import {
  Building2,
  Calendar,
  CalendarDays,
  Globe2,
  Grid2X2,
  Grid3X3,
  Layers,
  Languages,
  ListOrdered,
  Music2,
  Package,
  Share2,
  User,
  Video,
  Workflow,
  Rows3,
  Folder,
} from "lucide-react";

import FormGroup from "./form/FormGroup";
import InputWrapper from "./form/InputWrapper";
import SelectWrapper from "./form/SelectWrapper";

import { getArabicDayName } from "@/app/helpers/getArabicDayName";

type VideoInformationSectionProps = {
  // ==================================================
  // LAYOUT
  // ==================================================

  formLayout: "grid3" | "grid2" | "full";

  changeFormLayout: (
    layout: "grid3" | "grid2" | "full"
  ) => void;

  // ==================================================
  // DATE
  // ==================================================

  date: string;

  dateInputRef: React.RefObject<HTMLInputElement | null>;

  openDatePicker: () => void;

  setDate: (value: string) => void;

  // ==================================================
  // ADMIN
  // ==================================================

  isAdmin: boolean;

  // ==================================================
  // ITEM / CLASSIFICATION
  // ==================================================

  item: string;

  setItem: (value: string) => void;

  items: any[];

  itemsIsLoading: boolean;

  // ==================================================
  // PRODUCTION
  // ==================================================

  production1: string;

  setProduction1: (value: string) => void;

  production2: string;

  setProduction2: (value: string) => void;

  productEntitiesOne: any[];

  productEntitiesOneIsLoading: boolean;

  productEntitiesTwo: any[];

  productEntitiesTwoIsLoading: boolean;

  // ==================================================
  // SECTOR
  // ==================================================

  sector: string;

  setSector: (value: string) => void;

  sectors: any[];

  sectorsIsLoading: boolean;

  // ==================================================
  // TRANSLATION
  // ==================================================

  translation: string;

  setTranslation: (value: string) => void;

  translations: any[];

  translationsIsLoading: boolean;

  // ==================================================
  // PRODUCT TYPE
  // ==================================================

  productType: string;

  setProductType: (value: string) => void;

  itemsType: any[];

  itemsTypeIsLoading: boolean;

  // ==================================================
  // EVENT TYPE
  // ==================================================

  eventType: string;

  setEventType: (value: string) => void;

  eventTypes: any[];

  eventTypesIsLoading: boolean;

  // ==================================================
  // PRODUCTION LINE
  // ==================================================

  productionLine: string;

  setProductionLine: (value: string) => void;

  productionLines: any[];

  productionLinesIsLoading: boolean;

  // ==================================================
  // PRODUCT
  // ==================================================

  productName: string;

  setProductName: (value: string) => void;

  productSerial: string;

  setProductSerial: (value: string) => void;

  // ==================================================
  // EVENT
  // ==================================================

  isRepeated: boolean;

  setIsRepeated: (value: boolean) => void;

  eventName: string;

  setEventName: (value: string) => void;

  events: any[];

  eventsIsLoading: boolean;

  // ==================================================
  // HYMN
  // ==================================================

  hymnName: string;

  setHymnName: (value: string) => void;

  songs: any[];

  songsIsLoading: boolean;

  // ==================================================
  // SPEAKER
  // ==================================================

  speakerName: string;

  setSpeakerName: (value: string) => void;

  speakers: any[];

  speakersIsLoading: boolean;

  // ==================================================
  // CONTENT TYPE
  // ==================================================

  contentType: string;

  setContentType: (value: string) => void;

  contentTypes: any[];

  contentTypesIsLoading: boolean;

  // ==================================================
  // UPLOAD CHANNELS
  // ==================================================

  mainUploadChannel: string;

  setMainUploadChannel: (value: string) => void;

  youtubeLink: string;

  setYoutubeLink: (value: string) => void;

  facebookLink: string;

  setFacebookLink: (value: string) => void;

  instagramLink: string;

  setInstagramLink: (value: string) => void;
};

// ==================================================
// STYLES
// ==================================================

const inputClass = `
  h-11
  w-full
  rounded-[9px]
  border
  border-[#dfe5ed]
  bg-[#fbfcfe]
  pr-[42px]
  pl-3
  text-xs
  text-[#172033]
  outline-none
  transition
  placeholder:text-[#a0aec0]
  focus:border-[#2563eb]
  focus:bg-white
  focus:ring-[3px]
  focus:ring-blue-500/10
`;

const selectClass = `
  h-11
  w-full
  appearance-none
  rounded-[9px]
  border
  border-[#dfe5ed]
  bg-[#fbfcfe]
  pr-[42px]
  pl-[38px]
  text-xs
  text-[#172033]
  outline-none
  transition
  cursor-pointer
  focus:border-[#2563eb]
  focus:bg-white
  focus:ring-[3px]
  focus:ring-blue-500/10
`;

// ==================================================
// COMPONENT
// ==================================================

export default function VideoInformationSection({
  formLayout,
  changeFormLayout,

  date,
  dateInputRef,
  openDatePicker,
  setDate,

  isAdmin,

  item,
  setItem,
  items,
  itemsIsLoading,

  production1,
  setProduction1,
  production2,
  setProduction2,

  productEntitiesOne,
  productEntitiesOneIsLoading,

  productEntitiesTwo,
  productEntitiesTwoIsLoading,

  sector,
  setSector,
  sectors,
  sectorsIsLoading,

  translation,
  setTranslation,
  translations,
  translationsIsLoading,

  productType,
  setProductType,
  itemsType,
  itemsTypeIsLoading,

  eventType,
  setEventType,
  eventTypes,
  eventTypesIsLoading,

  productionLine,
  setProductionLine,
  productionLines,
  productionLinesIsLoading,

  productName,
  setProductName,

  productSerial,
  setProductSerial,

  isRepeated,
  setIsRepeated,

  eventName,
  setEventName,
  events,
  eventsIsLoading,

  hymnName,
  setHymnName,
  songs,
  songsIsLoading,

  speakerName,
  setSpeakerName,
  speakers,
  speakersIsLoading,

  contentType,
  setContentType,
  contentTypes,
  contentTypesIsLoading,

  mainUploadChannel,
  setMainUploadChannel,

  youtubeLink,
  setYoutubeLink,

  facebookLink,
  setFacebookLink,

  instagramLink,
  setInstagramLink,
}: VideoInformationSectionProps) {
  return (
    <section
      className="
        mb-[22px]
        overflow-hidden
        rounded-[14px]
        border
        border-[#e6eaf0]
        bg-white
        shadow-[0_5px_20px_rgba(15,23,42,0.035)]
      "
    >
      {/* ==================================================
          HEADER
          ================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#e6eaf0]
          px-6
          py-5
          max-[600px]:px-4
        "
      >
        {/* TITLE */}

        <div className="flex flex-1 items-center gap-3">
          <div
            className="
              flex
              h-[38px]
              w-[38px]
              shrink-0
              items-center
              justify-center
              rounded-[10px]
              bg-[#eef2ff]
              text-[#4f46e5]
            "
          >
            <Video size={20} />
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#172033]">
              بيانات الفيديو
            </h3>

            <span className="mt-0.5 block text-[11px] text-[#718096]">
              المعلومات الأساسية للفيديو
            </span>
          </div>
        </div>

        {/* LAYOUT */}

        <div className="hidden shrink-0 items-center gap-1 md:flex">
          {/* 3 COLUMNS */}

          <button
            type="button"
            onClick={() =>
              changeFormLayout("grid3")
            }
            title="ثلاثة أعمدة"
            className={`rounded-md p-1.5 transition ${
              formLayout === "grid3"
                ? "bg-[#EEF4FF] text-[#2563EB]"
                : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
            }`}
          >
            <Grid3X3 size={17} />
          </button>

          {/* 2 COLUMNS */}

          <button
            type="button"
            onClick={() =>
              changeFormLayout("grid2")
            }
            title="عمودين"
            className={`rounded-md p-1.5 transition ${
              formLayout === "grid2"
                ? "bg-[#EEF4FF] text-[#2563EB]"
                : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
            }`}
          >
            <Grid2X2 size={17} />
          </button>

          {/* FULL WIDTH */}

          <button
            type="button"
            onClick={() =>
              changeFormLayout("full")
            }
            title="عرض كامل"
            className={`rounded-md p-1.5 transition ${
              formLayout === "full"
                ? "bg-[#EEF4FF] text-[#2563EB]"
                : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
            }`}
          >
            <Rows3 size={17} />
          </button>
        </div>
      </div>

      {/* ==================================================
          BODY
          ================================================== */}

      <div className="p-[25px] max-[600px]:p-4">
        <div
          className={`
            grid gap-5
            ${
              formLayout === "grid3"
                ? "grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
                : formLayout === "grid2"
                ? "grid-cols-2 max-[600px]:grid-cols-1"
                : "grid-cols-1"
            }
          `}
        >

          {/* ==================================================
              1. التاريخ - REQUIRED
              ================================================== */}

          <FormGroup
            label="التاريخ"
            required
          >
            <InputWrapper
              icon={<Calendar size={16} />}
            >
              <div
                className={`${inputClass} relative w-full cursor-pointer`}
                onClick={openDatePicker}
              >
                <div
                  className="
                    pointer-events-none
                    flex
                    h-full
                    w-full
                    items-center
                    overflow-hidden
                    whitespace-nowrap
                    text-[13px]
                    text-[#172033]
                  "
                >
                  {date
                    ? getArabicDayName(date)
                    : "اختر التاريخ"}
                </div>

                <input
                  ref={dateInputRef}
                  type="datetime-local"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    cursor-pointer
                    opacity-0
                  "
                  tabIndex={-1}
                />
              </div>
            </InputWrapper>
          </FormGroup>

          {/* ==================================================
              2. الصنف - REQUIRED
              ================================================== */}

          <FormGroup
            label="الصنف"
            required
          >
            <SelectWrapper
              isAdmin={isAdmin}
              icon={<Folder size={16} />}
              onAdd={() =>
                console.log("إضافة الصنف")
              }
            >
              <select
                value={item}
                onChange={(e) =>
                  setItem(e.target.value)
                }
                className={selectClass}
                disabled={itemsIsLoading}
              >
                <option value="">
                  {itemsIsLoading
                    ? "جاري تحميل الاصناف ..."
                    : "اختر الصنف"}
                </option>

                {items.map((item: any) => (
                  <option
                    key={item.Code}
                    value={item.Code}
                  >
                    {item.DescA}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              3. جهة انتاج 1 - REQUIRED
              ================================================== */}

          <FormGroup
            label="جهة انتاج 1"
            required
          >
            <SelectWrapper
              isAdmin={isAdmin}
              icon={<Building2 size={16} />}
              onAdd={() =>
                console.log(
                  "إضافة جهة إنتاج 1"
                )
              }
            >
              <select
                value={production1}
                onChange={(e) =>
                  setProduction1(
                    e.target.value
                  )
                }
                className={selectClass}
                disabled={
                  productEntitiesOneIsLoading
                }
              >
                <option value="">
                  {productEntitiesOneIsLoading
                    ? "جاري تحميل جهة الانتاج..."
                    : "اختر جهة الانتاج"}
                </option>

                {productEntitiesOne.map(
                  (productEntityOne: any) => (
                    <option
                      key={
                        productEntityOne.Code
                      }
                      value={
                        productEntityOne.Code
                      }
                    >
                      {productEntityOne.DescA}
                    </option>
                  )
                )}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              4. جهة انتاج 2
              ================================================== */}

          <FormGroup label="جهة انتاج 2">
            <SelectWrapper
              isAdmin={isAdmin}
              icon={<Building2 size={16} />}
              onAdd={() =>
                console.log(
                  "إضافة جهة إنتاج 2"
                )
              }
            >
              <select
                value={production2}
                onChange={(e) =>
                  setProduction2(
                    e.target.value
                  )
                }
                className={selectClass}
                disabled={
                  productEntitiesTwoIsLoading
                }
              >
                <option value="">
                  {productEntitiesTwoIsLoading
                    ? "جاري تحميل جهة الانتاج..."
                    : "اختر جهة الانتاج"}
                </option>

                {productEntitiesTwo.map(
                  (productEntityTwo: any) => (
                    <option
                      key={
                        productEntityTwo.Code
                      }
                      value={
                        productEntityTwo.Code
                      }
                    >
                      {productEntityTwo.DescA}
                    </option>
                  )
                )}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              5. القطاع - REQUIRED
              ================================================== */}

          <FormGroup
            label="القطاع"
            required
          >
            <SelectWrapper
              isAdmin={isAdmin}
              icon={<Layers size={16} />}
              onAdd={() =>
                console.log("إضافة قطاع")
              }
            >
              <select
                value={sector}
                onChange={(e) =>
                  setSector(e.target.value)
                }
                className={selectClass}
                disabled={sectorsIsLoading}
              >
                <option value="">
                  {sectorsIsLoading
                    ? "جاري تحميل القطاعات..."
                    : "اختر القطاع"}
                </option>

                {sectors.map((sector: any) => (
                  <option
                    key={sector.Code}
                    value={sector.Code}
                  >
                    {sector.DescA}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              6. الترجمة
              ================================================== */}

          <FormGroup label="الترجمه">
            <SelectWrapper
              isAdmin={isAdmin}
              icon={<Languages size={16} />}
              onAdd={() =>
                console.log("إضافة ترجمه")
              }
            >
              <select
                value={translation}
                onChange={(e) =>
                  setTranslation(
                    e.target.value
                  )
                }
                className={selectClass}
                disabled={translationsIsLoading}
              >
                <option value="">
                  {translationsIsLoading
                    ? "جاري تحميل الترجمات ..."
                    : "اختر ترجمه للمنتج"}
                </option>

                {translations.map(
                  (translation: any) => (
                    <option
                      key={translation.Code}
                      value={translation.Code}
                    >
                      {translation.DescA}
                    </option>
                  )
                )}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              7. نوع المنتج
              ================================================== */}

          <FormGroup label="نوع المنتج">
            <SelectWrapper
              isAdmin={isAdmin}
              icon={<Package size={16} />}
              onAdd={() =>
                console.log(
                  "إضافة نوع منتج"
                )
              }
            >
              <select
                value={productType}
                onChange={(e) =>
                  setProductType(
                    e.target.value
                  )
                }
                className={selectClass}
                disabled={
                  itemsTypeIsLoading
                }
              >
                <option value="">
                  {itemsTypeIsLoading
                    ? "جاري تحميل أنواع المنتجات..."
                    : "اختر نوع المنتج"}
                </option>

                {itemsType.map(
                  (itemType: any) => (
                    <option
                      key={itemType.Code}
                      value={itemType.Code}
                    >
                      {itemType.DescA}
                    </option>
                  )
                )}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              8. نوع الحدث
              ================================================== */}

          <FormGroup label="نوع الحدث">
            <SelectWrapper
              isAdmin={isAdmin}
              icon={
                <CalendarDays size={16} />
              }
              onAdd={() =>
                console.log(
                  "إضافة نوع حدث"
                )
              }
            >
              <select
                value={eventType}
                onChange={(e) =>
                  setEventType(
                    e.target.value
                  )
                }
                className={selectClass}
                disabled={
                  eventTypesIsLoading
                }
              >
                <option value="">
                  {eventTypesIsLoading
                    ? "جاري تحميل أنواع الاحداث..."
                    : "اختر نوع الحدث"}
                </option>

                {eventTypes.map(
                  (eventType: any) => (
                    <option
                      key={eventType.Code}
                      value={eventType.Code}
                    >
                      {eventType.DescA}
                    </option>
                  )
                )}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              9. خط الإنتاج
              ================================================== */}

          <FormGroup label="خط الانتاج">
            <SelectWrapper
              isAdmin={isAdmin}
              icon={<Workflow size={16} />}
              onAdd={() =>
                console.log(
                  "إضافة خط إنتاج"
                )
              }
            >
              <select
                value={productionLine}
                onChange={(e) =>
                  setProductionLine(
                    e.target.value
                  )
                }
                className={selectClass}
                disabled={
                  productionLinesIsLoading
                }
              >
                <option value="">
                  {productionLinesIsLoading
                    ? "جاري تحميل خطوط الانتاج..."
                    : "اختر خط انتاج"}
                </option>

                {productionLines.map(
                  (productionLine: any) => (
                    <option
                      key={
                        productionLine.Code
                      }
                      value={
                        productionLine.Code
                      }
                    >
                      {productionLine.DescA}
                    </option>
                  )
                )}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              10. اسم المنتج - REQUIRED
              ================================================== */}

          <FormGroup
            label="اسم المنتج"
            required
          >
            <InputWrapper
              icon={<Package size={16} />}
            >
              <input
                type="text"
                value={productName}
                onChange={(e) =>
                  setProductName(
                    e.target.value
                  )
                }
                placeholder="اسم المنتج"
                className={inputClass}
              />
            </InputWrapper>
          </FormGroup>

          {/* ==================================================
              11. تسلسل المنتج
              ================================================== */}

          <FormGroup label="تسلسل المنتج">
            <InputWrapper
              icon={
                <ListOrdered size={16} />
              }
            >
              <input
                type="text"
                value={productSerial}
                onChange={(e) =>
                  setProductSerial(
                    e.target.value
                  )
                }
                placeholder="تسلسل المنتج"
                className={inputClass}
              />
            </InputWrapper>
          </FormGroup>

          {/* ==================================================
              12. حالة الحدث + اسم الحدث
              ================================================== */}

          <div
            className="
              col-span-1
              grid
              grid-cols-[0.65fr_1.35fr]
              items-end
              gap-5
              max-[600px]:grid-cols-1
            "
          >
            {/* حالة الحدث */}

            <FormGroup label="حالة الحدث">
              <div
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-between
                  rounded-[9px]
                  border
                  border-[#dfe5ed]
                  bg-[#fbfcfe]
                  px-3
                "
              >
                <span
                  className={`
                    text-xs
                    font-medium
                    transition-colors
                    ${
                      isRepeated
                        ? "text-[#2563eb]"
                        : "text-[#718096]"
                    }
                  `}
                >
                  {isRepeated
                    ? "مكرر"
                    : "غير مكرر"}
                </span>

                <label
                  className="
                    relative
                    inline-flex
                    h-5
                    w-9
                    shrink-0
                    cursor-pointer
                    items-center
                  "
                >
                  <input
                    type="checkbox"
                    checked={isRepeated}
                    onChange={(e) => {
                      const checked =
                        e.target.checked;

                      setIsRepeated(
                        checked
                      );

                      setEventName("");
                    }}
                    className="peer sr-only"
                  />

                  <span
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-[#cbd5e1]
                      transition-all
                      duration-200
                      peer-checked:bg-[#2563eb]
                      peer-focus:ring-2
                      peer-focus:ring-blue-500/20
                    "
                  />

                  <span
                    className="
                      absolute
                      right-[18px]
                      top-[2px]
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      shadow-sm
                      transition-all
                      duration-200
                      peer-checked:right-[2px]
                    "
                  />
                </label>
              </div>
            </FormGroup>

            {/* اسم الحدث */}

            <FormGroup label="اسم الحدث">
              {isRepeated ? (
                <SelectWrapper
                  icon={
                    <CalendarDays size={16} />
                  }
                >
                  <select
                    value={eventName}
                    onChange={(e) =>
                      setEventName(
                        e.target.value
                      )
                    }
                    className={selectClass}
                    disabled={
                      eventsIsLoading
                    }
                  >
                    <option value="">
                      {eventsIsLoading
                        ? "جاري تحميل الأحداث..."
                        : "اختر الحدث المكرر"}
                    </option>

                    {events
                      .filter(
                        (event: any) =>
                          event.IsRepeated ===
                          true
                      )
                      .map(
                        (event: any) => (
                          <option
                            key={event.Code}
                            value={event.Code}
                          >
                            {event.DescA}
                          </option>
                        )
                      )}
                  </select>
                </SelectWrapper>
              ) : (
                <InputWrapper
                  icon={
                    <CalendarDays size={16} />
                  }
                >
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) =>
                      setEventName(
                        e.target.value
                      )
                    }
                    placeholder="اكتب اسم الحدث"
                    className={inputClass}
                  />
                </InputWrapper>
              )}
            </FormGroup>
          </div>

          {/* ==================================================
              13. اسم الترنيمة
              ================================================== */}

          <FormGroup label="اسم الترنيمه">
            <SelectWrapper
              isAdmin={isAdmin}
              icon={<Music2 size={16} />}
              onAdd={() =>
                console.log(
                  "إضافة ترنيمة"
                )
              }
            >
              <select
                value={hymnName}
                onChange={(e) =>
                  setHymnName(
                    e.target.value
                  )
                }
                className={selectClass}
                disabled={songsIsLoading}
              >
                <option value="">
                  {songsIsLoading
                    ? "جاري تحميل الترانيم..."
                    : "اختر ترنيمه"}
                </option>

                {songs.map((song: any) => (
                  <option
                    key={song.Code}
                    value={song.Code}
                  >
                    {song.DescA}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              14. اسم المتكلم
              ================================================== */}

          <FormGroup label="اسم المتكلم">
            <SelectWrapper
              isAdmin={isAdmin}
              icon={<User size={16} />}
              onAdd={() =>
                console.log(
                  "إضافة متكلم"
                )
              }
            >
              <select
                value={speakerName}
                onChange={(e) =>
                  setSpeakerName(
                    e.target.value
                  )
                }
                className={selectClass}
                disabled={
                  speakersIsLoading
                }
              >
                <option value="">
                  {speakersIsLoading
                    ? "جاري تحميل القائمين ع العمل..."
                    : "اختر متكلم"}
                </option>

                {speakers.map(
                  (speaker: any) => (
                    <option
                      key={speaker.Code}
                      value={speaker.Code}
                    >
                      {speaker.DescA}
                    </option>
                  )
                )}
              </select>
            </SelectWrapper>
          </FormGroup>

          {/* ==================================================
              15. نوع المحتوى - ADMIN
              ================================================== */}

          {isAdmin && (
            <FormGroup label="نوع المحتوى">
              <SelectWrapper
                icon={
                  <Layers size={16} />
                }
              >
                <select
                  value={contentType}
                  onChange={(e) =>
                    setContentType(
                      e.target.value
                    )
                  }
                  className={selectClass}
                  disabled={
                    contentTypesIsLoading
                  }
                >
                  <option value="">
                    {contentTypesIsLoading
                      ? "جاري تحميل أنواع المحتوى..."
                      : "اختر نوع المحتوى"}
                  </option>

                  {contentTypes.map(
                    (contentType: any) => (
                      <option
                        key={contentType.Code}
                        value={
                          contentType.Code
                        }
                      >
                        {contentType.DescA}
                      </option>
                    )
                  )}
                </select>
              </SelectWrapper>
            </FormGroup>
          )}
        </div>

        {/* ==================================================
            UPLOAD CHANNELS
            ================================================== */}

        <div className="mt-5">
          <div
            className="
              grid
              grid-cols-4
              gap-5
              max-[1100px]:grid-cols-2
              max-[600px]:grid-cols-1
            "
          >
            {/* MAIN CHANNEL */}

            <FormGroup label="قناة / صفحة الرفع الرئيسية">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Video size={16} />}
                onAdd={() =>
                  console.log(
                    "إضافة قناة رفع"
                  )
                }
              >
                <select
                  value={mainUploadChannel}
                  onChange={(e) =>
                    setMainUploadChannel(
                      e.target.value
                    )
                  }
                  className={selectClass}
                >
                  <option value="">
                    اختر قناة / صفحة الرفع
                  </option>

                  <option value="youtube">
                    YouTube
                  </option>

                  <option value="facebook">
                    Facebook
                  </option>

                  <option value="instagram">
                    Instagram
                  </option>

                  <option value="all">
                    جميع المنصات
                  </option>
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* YOUTUBE */}

            <FormGroup label="رابط YouTube">
              <InputWrapper
                icon={<Video size={16} />}
              >
                <input
                  type="url"
                  value={youtubeLink}
                  onChange={(e) =>
                    setYoutubeLink(
                      e.target.value
                    )
                  }
                  placeholder="رابط YouTube"
                  className={inputClass}
                />
              </InputWrapper>
            </FormGroup>

            {/* FACEBOOK */}

            <FormGroup label="رابط Facebook">
              <InputWrapper
                icon={<Share2 size={16} />}
              >
                <input
                  type="url"
                  value={facebookLink}
                  onChange={(e) =>
                    setFacebookLink(
                      e.target.value
                    )
                  }
                  placeholder="رابط Facebook"
                  className={inputClass}
                />
              </InputWrapper>
            </FormGroup>

            {/* INSTAGRAM */}

            <FormGroup label="رابط Instagram">
              <InputWrapper
                icon={<Globe2 size={16} />}
              >
                <input
                  type="url"
                  value={instagramLink}
                  onChange={(e) =>
                    setInstagramLink(
                      e.target.value
                    )
                  }
                  placeholder="رابط Instagram"
                  className={inputClass}
                />
              </InputWrapper>
            </FormGroup>
          </div>

          {/* ==================================================
              SOCIAL LINKS
              ================================================== */}

          {youtubeLink.trim() &&
            facebookLink.trim() &&
            instagramLink.trim() && (
              <div className="mt-4">
                <div className="mb-2 text-[11px] font-semibold text-[#718096]">
                  روابط النشر
                </div>

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-3
                    max-[600px]:grid-cols-1
                  "
                >
                  <a
                    href={youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      h-10
                      items-center
                      justify-center
                      gap-2
                      rounded-[9px]
                      border
                      border-red-200
                      bg-white
                      px-3
                      text-xs
                      font-semibold
                      text-red-600
                      transition
                      hover:bg-red-50
                    "
                  >
                    <Video size={15} />
                    فتح YouTube
                  </a>

                  <a
                    href={facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      h-10
                      items-center
                      justify-center
                      gap-2
                      rounded-[9px]
                      border
                      border-blue-200
                      bg-white
                      px-3
                      text-xs
                      font-semibold
                      text-blue-600
                      transition
                      hover:bg-blue-50
                    "
                  >
                    <Share2 size={15} />
                    فتح Facebook
                  </a>

                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      h-10
                      items-center
                      justify-center
                      gap-2
                      rounded-[9px]
                      border
                      border-pink-200
                      bg-white
                      px-3
                      text-xs
                      font-semibold
                      text-pink-600
                      transition
                      hover:bg-pink-50
                    "
                  >
                    <Globe2 size={15} />
                    فتح Instagram
                  </a>
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}