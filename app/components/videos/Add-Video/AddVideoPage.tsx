/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useAddVideo } from "@/app/hooks/useAddVideo";

import {
  RefreshCw,
  Save,
  UploadCloud,
  Video,
  Grid3X3,
  Grid2X2,
  Rows3,
  Calendar,
  Folder,
  Building2,
  Layers,
  Languages,
  Package,
  CalendarDays,
  Workflow,
  ListOrdered,
  Music2,
  Share2,
  Globe2,
  Plus,
  FileVideo,
  HardDrive,
  Trash2,
  Search,
  Image as ImageIcon,
  ImagePlus,
  ChevronDown,
} from "lucide-react";


import SpeakersSelector from "../../ui/SpeakersSelector";
import AddItemModal from "@/app/(archive)/videos/add/AddItemModal";
import { formatFileSize, formatServerDate } from "@/app/helpers/videoHelper";
import { getArabicDayName } from "@/app/helpers/getArabicDayName";


// ==================================================
// PAGE
// ==================================================

export default function AddVideoPage() {
  const {
    // Authentication
    isAdmin,
    authLoading,
    isAuthenticated,

    // Refs
    videoInputRef,
    thumbnailInputRef,
    dateInputRef,

    // Video
    videoSource,
    videoFile,
    videoUrl,
    videoDuration,
    isVideoDragging,
    handleVideoSelect,
    handleVideoDragOver,
    handleVideoDragLeave,
    handleVideoDrop,
    handleRemoveVideo,

    // Server videos
    showServerBrowser,
    serverVideos,
    serverSearch,
    setServerSearch,
    serverPage,
    setServerPage,
    serverTotalPages,
    serverTotal,
    serverVideosError,
    isLoadingServerVideos,
    loadServerVideos,
    openServerBrowser,
    chooseServerVideo,
    chooseDeviceSource,
    selectedServerVideo,

    // Thumbnail
    thumbnailFile,
    thumbnailUrl,
    handleThumbnailSelect,
    handleRemoveThumbnail,

    // Basic information
    date,
    setDate,
    openDatePicker,

    // Social links
    youtubeLink,
    setYoutubeLink,
    facebookLink,
    setFacebookLink,
    instagramLink,
    setInstagramLink,

    // Content
    content1,
    setContent1,
    content2,
    setContent2,
    content3,
    setContent3,
    content4,
    setContent4,
    content5,
    setContent5,
    contentType,
    setContentType,

    // Lookup data
    itemsType,
    itemsTypeIsLoading,
    eventTypes,
    eventTypesIsLoading,
    productionLines,
    productionLinesIsLoading,
    sectors,
    sectorsIsLoading,
    productEntitiesOne,
    productEntitiesOneIsLoading,
    productEntitiesTwo,
    productEntitiesTwoIsLoading,
    songs,
    songsIsLoading,
    speakers,
    speakersIsLoading,
    events,
    eventsIsLoading,
    refetchEvents,
    items,
    itemsIsLoading,
    itemsSer,
    itemsSerIsLoading,
    channels,
    channelsIsLoading,
    translations,
    translationsIsLoading,
    contentTypes,
    contentTypesIsLoading,

    // Add mutations
    addEvent,
    isAddingEvent,

    // Product
    productType,
    setProductType,
    item,
    setItem,
    productName,
    setProductName,
    productSerial,
    setProductSerial,

    // Production
    production1,
    setProduction1,
    production2,
    setProduction2,
    productionLine,
    setProductionLine,

    // Sector / translation
    sector,
    setSector,
    translation,
    setTranslation,

    // Event
    eventType,
    setEventType,
    eventName,
    setEventName,
    eventNameText,
    setEventNameText,
    showEventSuggestions,
    setShowEventSuggestions,
    filteredEvents,

    // Hymn / speakers / channel
    hymnName,
    setHymnName,
    selectedSpeakers,
    setSelectedSpeakers,
    manualSpeakers,
    setManualSpeakers,
    channelName,
    setChannelName,

    // Repeated
    isRepeated,
    setIsRepeated,

    // Layout
    formLayout,
    changeFormLayout,

    // Upload
    uploadProgress,
    uploadPhase,
    isSaving,

    // Error
    error,

    // Add Item Modal
    isAddModalOpen,
    newValue,
    setNewValue,
    openAddModal,
    closeAddModal,
    getAddModalTitle,
    handleAddItem,
    isAddingLookup,

    // Actions
    handleRefresh,
    handleSave,
  } = useAddVideo();

  // ==================================================
  // AUTH
  // ==================================================

  if (authLoading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[calc(100vh-74px)] items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm text-slate-500">
            جاري التحقق من الصلاحيات...
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) return null;

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <main
      dir="rtl"
      className="mx-auto w-full max-w-400 px-5 py-17.5 max-[768px]:px-3 max-[768px]:py-8.75"
    >
      {/* ==================================================
          PAGE HEADING
          ================================================== */}

      <div className="mb-6.25 flex items-center justify-between gap-5 max-[600px]:flex-col max-[600px]:items-start">
        <div>
          <h2 className="mb-1 text-2xl font-bold text-[#172033]">
            إضافة فيديو
          </h2>

          <p className="text-[13px] text-[#718096]">
            قم بإضافة فيديو جديد وتنظيمه داخل أرشيف الفيديوهات
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isSaving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#e6eaf0] bg-white px-4 text-xs font-semibold text-[#4a5568] transition hover:bg-[#eff6ff] hover:text-[#2563eb] disabled:opacity-50"
          >
            <RefreshCw size={16} />
            تحديث
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] bg-[#2563eb] px-4 text-xs font-semibold text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            حفظ الفيديو
          </button>
        </div>
      </div>

      {/* ==================================================
          ERROR
          ================================================== */}

      {error && (
        <div className="mb-5 rounded-[9px] border border-red-200 bg-red-50 px-4 py-3 text-xs leading-7 text-red-700">
          {error}
        </div>
      )}

      {/* ==================================================
          UPLOAD PROGRESS
          ================================================== */}

      {isSaving && (
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#e6eaf0] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {uploadPhase === "uploading" ? (
                <UploadCloud size={19} className="text-blue-600" />
              ) : (
                <RefreshCw size={19} className="animate-spin text-blue-600" />
              )}

              <span className="text-sm font-semibold text-[#172033]">
                {videoSource === "server"
                  ? "جاري إنشاء المسودة باستخدام ملف السيرفر..."
                  : uploadPhase === "uploading"
                    ? "جاري رفع الفيديو..."
                    : "تم رفع الملف، جاري حفظ البيانات على السيرفر..."}
              </span>
            </div>

            <span className="text-sm font-bold tabular-nums text-blue-600">
              {uploadProgress}%
            </span>
          </div>

          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-[#eaf0f7]"
            role="progressbar"
            aria-valuenow={uploadProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-[#2563eb] transition-[width] duration-200 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-[11px] text-[#718096]">
            <span>
              {videoSource === "server"
                ? "لا يتم نقل الملف؛ يتم ربط المسودة بالملف الموجود على السيرفر"
                : uploadPhase === "uploading"
                  ? "يتم نقل الملف إلى السيرفر"
                  : "في انتظار استجابة السيرفر"}
            </span>

            {videoSource === "device" && videoFile && (
              <span>{formatFileSize(videoFile.size)}</span>
            )}

            {videoSource === "server" && selectedServerVideo && (
              <span>{formatFileSize(selectedServerVideo.size)}</span>
            )}
          </div>
        </section>
      )}

      {/* ==================================================
          VIDEO INFORMATION
          ================================================== */}

      <section className="mb-5.5 overflow-hidden rounded-[14px] border border-[#e6eaf0] bg-white shadow-[0_5px_20px_rgba(15,23,42,0.035)]">
        <div className="flex items-center justify-between border-b border-[#e6eaf0] px-6 py-5 max-[600px]:px-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[10px] bg-[#eef2ff] text-[#4f46e5]">
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

          <div className="hidden shrink-0 items-center gap-1 md:flex">
            <button
              type="button"
              onClick={() => changeFormLayout("grid3")}
              title="ثلاثة أعمدة"
              className={`rounded-md p-1.5 transition ${
                formLayout === "grid3"
                  ? "bg-[#EEF4FF] text-[#2563EB]"
                  : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
              }`}
            >
              <Grid3X3 size={17} />
            </button>

            <button
              type="button"
              onClick={() => changeFormLayout("grid2")}
              title="عمودين"
              className={`rounded-md p-1.5 transition ${
                formLayout === "grid2"
                  ? "bg-[#EEF4FF] text-[#2563EB]"
                  : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
              }`}
            >
              <Grid2X2 size={17} />
            </button>

            <button
              type="button"
              onClick={() => changeFormLayout("full")}
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

        <div className="p-6.25 max-[600px]:p-4">
          <div
            className={`grid gap-5 ${
              formLayout === "grid3"
                ? "grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
                : formLayout === "grid2"
                  ? "grid-cols-2 max-[600px]:grid-cols-1"
                  : "grid-cols-1"
            }`}
          >
            {/* DATE */}

            <FormGroup label="التاريخ" required>
              <InputWrapper icon={<Calendar size={16} />}>
                <div
                  className={`${inputClass} relative w-full cursor-pointer`}
                  onClick={openDatePicker}
                >
                  <div className="pointer-events-none flex h-full w-full items-center overflow-hidden whitespace-nowrap text-[13px] text-[#172033]">
                    {getArabicDayName(date)}
                  </div>

                  <input
                    ref={dateInputRef}
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    tabIndex={-1}
                  />
                </div>
              </InputWrapper>
            </FormGroup>

            {/* ITEM */}

            <FormGroup label="الصنف" required>
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Folder size={16} />}
                onAdd={() => openAddModal("item")}
              >
                <select
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className={selectClass}
                  disabled={itemsIsLoading}
                >
                  <option value="">
                    {itemsIsLoading ? "جاري تحميل الأصناف..." : "اختر الصنف"}
                  </option>

                  {items.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* PRODUCTION 1 */}

            <FormGroup label="جهة انتاج 1" required>
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Building2 size={16} />}
                onAdd={() => openAddModal("production1")}
              >
                <select
                  value={production1}
                  onChange={(e) => setProduction1(e.target.value)}
                  className={selectClass}
                  disabled={productEntitiesOneIsLoading}
                >
                  <option value="">
                    {productEntitiesOneIsLoading
                      ? "جاري تحميل جهة الانتاج..."
                      : "اختر جهة الانتاج"}
                  </option>

                  {productEntitiesOne.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* PRODUCTION 2 */}

            <FormGroup label="جهة انتاج 2">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Building2 size={16} />}
                onAdd={() => openAddModal("production2")}
              >
                <select
                  value={production2}
                  onChange={(e) => setProduction2(e.target.value)}
                  className={selectClass}
                  disabled={productEntitiesTwoIsLoading}
                >
                  <option value="">
                    {productEntitiesTwoIsLoading
                      ? "جاري تحميل جهة الانتاج..."
                      : "اختر جهة الانتاج"}
                  </option>

                  {productEntitiesTwo.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* SECTOR */}

            <FormGroup label="القطاع" required>
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Layers size={16} />}
                onAdd={() => openAddModal("sector")}
              >
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className={selectClass}
                  disabled={sectorsIsLoading}
                >
                  <option value="">
                    {sectorsIsLoading ? "جاري تحميل القطاعات..." : "اختر القطاع"}
                  </option>

                  {sectors.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* TRANSLATION */}

            <FormGroup label="الترجمة">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Languages size={16} />}
                onAdd={() => openAddModal("translation")}
              >
                <select
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  className={selectClass}
                  disabled={translationsIsLoading}
                >
                  <option value="">
                    {translationsIsLoading
                      ? "جاري تحميل الترجمات..."
                      : "اختر ترجمة للمنتج"}
                  </option>

                  {translations.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* PRODUCT TYPE */}

            <FormGroup label="نوع المنتج">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Package size={16} />}
                onAdd={() => openAddModal("productType")}
              >
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className={selectClass}
                  disabled={itemsTypeIsLoading}
                >
                  <option value="">
                    {itemsTypeIsLoading
                      ? "جاري تحميل أنواع المنتجات..."
                      : "اختر نوع المنتج"}
                  </option>

                  {itemsType.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* EVENT TYPE */}

            <FormGroup label="نوع الحدث">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<CalendarDays size={16} />}
                onAdd={() => openAddModal("eventType")}
              >
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className={selectClass}
                  disabled={eventTypesIsLoading}
                >
                  <option value="">
                    {eventTypesIsLoading
                      ? "جاري تحميل أنواع الأحداث..."
                      : "اختر نوع الحدث"}
                  </option>

                  {eventTypes.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* PRODUCTION LINE */}

            <FormGroup label="خط الانتاج">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Workflow size={16} />}
                onAdd={() => openAddModal("productionLine")}
              >
                <select
                  value={productionLine}
                  onChange={(e) => setProductionLine(e.target.value)}
                  className={selectClass}
                  disabled={productionLinesIsLoading}
                >
                  <option value="">
                    {productionLinesIsLoading
                      ? "جاري تحميل خطوط الانتاج..."
                      : "اختر خط انتاج"}
                  </option>

                  {productionLines.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* PRODUCT NAME */}

            <FormGroup label="اسم المنتج" required>
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="اسم المنتج"
                  className={inputClass}
                />
              </InputWrapper>
            </FormGroup>

            {/* PRODUCT SERIAL */}

            <FormGroup label="تسلسل المنتج">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<ListOrdered size={16} />}
                onAdd={() => openAddModal("productSerial")}
              >
                <select
                  value={productSerial}
                  onChange={(e) => setProductSerial(e.target.value)}
                  className={selectClass}
                  disabled={itemsSerIsLoading}
                >
                  <option value="">
                    {itemsSerIsLoading
                      ? "جاري تحميل التسلسل..."
                      : "اختر تسلسل المنتج"}
                  </option>

                  {itemsSer.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* REPEATED + EVENT NAME */}

            <div className="col-span-1 grid grid-cols-[0.65fr_1.35fr] items-end gap-5 max-[600px]:grid-cols-1">
              <FormGroup label="حالة الحدث">
                <div className="flex h-11 w-full items-center justify-between rounded-[9px] border border-[#dfe5ed] bg-[#fbfcfe] px-3">
                  <span
                    className={`text-xs font-medium transition-colors ${
                      isRepeated ? "text-[#2563eb]" : "text-[#718096]"
                    }`}
                  >
                    {isRepeated ? "مكرر" : "غير مكرر"}
                  </span>

                  <label className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={isRepeated}
                      onChange={(e) => {
                        setIsRepeated(e.target.checked);
                        setEventName("");
                        setEventNameText("");
                      }}
                      className="peer sr-only"
                    />

                    <span className="absolute inset-0 rounded-full bg-[#cbd5e1] transition-all duration-200 peer-checked:bg-[#2563eb] peer-focus:ring-2 peer-focus:ring-blue-500/20" />

                    <span className="absolute right-4.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 peer-checked:right-0.5" />
                  </label>
                </div>
              </FormGroup>

              <FormGroup label="اسم الحدث">
                {isRepeated ? (
                  <SelectWrapper icon={<CalendarDays size={16} />}>
                    <select
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className={selectClass}
                      disabled={eventsIsLoading}
                    >
                      <option value="">
                        {eventsIsLoading
                          ? "جاري تحميل الأحداث..."
                          : "اختر الحدث المكرر"}
                      </option>

                      {events.map((entry: any) => (
                        <option key={entry.Code} value={entry.Code}>
                          {entry.DescA}
                        </option>
                      ))}
                    </select>
                  </SelectWrapper>
                ) : (
                  <div className="relative w-full">
                    <InputWrapper icon={<CalendarDays size={16} />}>
                      <input
                        type="text"
                        value={eventNameText}
                        onChange={(e) => {
                          const value = e.target.value;

                          setEventNameText(value);
                          setEventName("");
                          setShowEventSuggestions(value.trim().length > 0);
                        }}
                        onFocus={() => {
                          if (eventNameText.trim()) {
                            setShowEventSuggestions(true);
                          }
                        }}
                        onBlur={() => {
                          setTimeout(() => {
                            setShowEventSuggestions(false);
                          }, 150);
                        }}
                        placeholder="اكتب اسم الحدث"
                        className={inputClass}
                      />
                    </InputWrapper>

                    {showEventSuggestions && eventNameText.trim() && (
                      <div className="absolute right-0 left-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-[9px] border border-[#e6eaf0] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
                        {filteredEvents.length > 0 ? (
                          <div className="max-h-55 overflow-y-auto py-1">
                            {filteredEvents.map((entry: any) => (
                              <button
                                key={entry.Code}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  setEventNameText(entry.DescA);
                                  setEventName(String(entry.Code));
                                  setShowEventSuggestions(false);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2.5 text-right text-xs text-[#334155] transition hover:bg-[#f5f8ff] hover:text-[#2563eb]"
                              >
                                <CalendarDays size={14} className="shrink-0 text-[#94a3b8]" />
                                <span className="truncate">{entry.DescA}</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3">
                            <div className="mb-2 text-[11px] text-[#718096]">
                              لا يوجد حدث مطابق
                            </div>

                            <button
                              type="button"
                              disabled={isAddingEvent}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={async () => {
                                const value = eventNameText.trim();

                                if (!value || isAddingEvent) return;

                                try {
                                  const result = await addEvent({
                                    DescA: value,
                                  }).unwrap();

                                  const newCode =
                                    result?.Code ?? result?.data?.Code;

                                  if (newCode == null) {
                                    return;
                                  }

                                  setEventNameText(value);
                                  setEventName(String(newCode));
                                  setShowEventSuggestions(false);

                                  await refetchEvents();
                                } catch {
                                  // RTK Query error can be handled with a toast if desired.
                                }
                              }}
                              className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-3 text-xs font-semibold text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Plus size={15} />
                              {isAddingEvent
                                ? "جاري الإضافة..."
                                : `إضافة "${eventNameText.trim()}"`}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </FormGroup>
            </div>

            {/* HYMN */}

            <FormGroup label="اسم الترنيمة">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Music2 size={16} />}
                onAdd={() => openAddModal("song")}
              >
                <select
                  value={hymnName}
                  onChange={(e) => setHymnName(e.target.value)}
                  className={selectClass}
                  disabled={songsIsLoading}
                >
                  <option value="">
                    {songsIsLoading ? "جاري تحميل الترانيم..." : "اختر ترنيمة"}
                  </option>

                  {songs.map((entry: any) => (
                    <option key={entry.Code} value={entry.Code}>
                      {entry.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* SPEAKERS */}

            <FormGroup label="اسم المتكلم">
              <SpeakersSelector
                onAdd={() => openAddModal("speaker")}
                isAdmin={isAdmin}
                speakers={speakers}
                selectedCodes={selectedSpeakers}
                manualSpeakers={manualSpeakers}
                disabled={speakersIsLoading}
                loading={speakersIsLoading}
                onSelectedChange={setSelectedSpeakers}
                onManualChange={setManualSpeakers}
              />
            </FormGroup>

            {/* CONTENT TYPE */}

            {isAdmin && (
              <FormGroup label="نوع المحتوى">
                <SelectWrapper icon={<Layers size={16} />}>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className={selectClass}
                    disabled={contentTypesIsLoading}
                  >
                    <option value="">
                      {contentTypesIsLoading
                        ? "جاري تحميل أنواع المحتوى..."
                        : "اختر نوع المحتوى"}
                    </option>

                    {contentTypes.map((entry: any) => (
                      <option key={entry.Code} value={entry.Code}>
                        {entry.DescA}
                      </option>
                    ))}
                  </select>
                </SelectWrapper>
              </FormGroup>
            )}
          </div>

          {/* SOCIAL LINKS */}

          <div className="mt-5">
            <div className="grid grid-cols-4 gap-5 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
              <FormGroup label="قناة / صفحة الرفع الرئيسية">
                <SelectWrapper
                  isAdmin={isAdmin}
                  icon={<Video size={16} />}
                  onAdd={() => openAddModal("channel")}
                >
                  <select
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className={selectClass}
                    disabled={channelsIsLoading}
                  >
                    <option value="">
                      {channelsIsLoading ? "جاري تحميل القنوات..." : "اختر قناة"}
                    </option>

                    {channels.map((entry: any) => (
                      <option key={entry.Code} value={entry.Code}>
                        {entry.DescA}
                      </option>
                    ))}
                  </select>
                </SelectWrapper>
              </FormGroup>

              <FormGroup label="رابط YouTube">
                <InputWrapper icon={<Video size={16} />}>
                  <input
                    type="url"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    placeholder="رابط YouTube"
                    className={inputClass}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="رابط Facebook">
                <InputWrapper icon={<Share2 size={16} />}>
                  <input
                    type="url"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                    placeholder="رابط Facebook"
                    className={inputClass}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup label="رابط Instagram">
                <InputWrapper icon={<Globe2 size={16} />}>
                  <input
                    type="url"
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.target.value)}
                    placeholder="رابط Instagram"
                    className={inputClass}
                  />
                </InputWrapper>
              </FormGroup>
            </div>

            {youtubeLink.trim() &&
              facebookLink.trim() &&
              instagramLink.trim() && (
                <div className="mt-4">
                  <div className="mb-2 text-[11px] font-semibold text-[#718096]">
                    روابط النشر
                  </div>

                  <div className="grid grid-cols-3 gap-3 max-[600px]:grid-cols-1">
                    <a
                      href={youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 items-center justify-center gap-2 rounded-[9px] border border-red-200 bg-white px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <Video size={15} />
                      فتح YouTube
                    </a>

                    <a
                      href={facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 items-center justify-center gap-2 rounded-[9px] border border-blue-200 bg-white px-3 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      <Share2 size={15} />
                      فتح Facebook
                    </a>

                    <a
                      href={instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 items-center justify-center gap-2 rounded-[9px] border border-pink-200 bg-white px-3 text-xs font-semibold text-pink-600 transition hover:bg-pink-50"
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

      {/* ==================================================
          PRODUCT CONTENT
          ================================================== */}

      <section className="mt-5 overflow-hidden rounded-[14px] border border-[#e6eaf0] bg-white shadow-[0_5px_20px_rgba(15,23,42,0.035)]">
        <SectionHeader
          icon={<Package size={19} />}
          title="محتوى المنتج"
          description="البيانات الأساسية لمحتوى المنتج"
        />

        <div className="p-6 max-[600px]:p-4">
          <div className="grid grid-cols-5 gap-5 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-2 max-[500px]:grid-cols-1">
            {[
              { label: "المحتوى 1", value: content1, setter: setContent1 },
              { label: "المحتوى 2", value: content2, setter: setContent2 },
              { label: "المحتوى 3", value: content3, setter: setContent3 },
              { label: "المحتوى 4", value: content4, setter: setContent4 },
              { label: "المحتوى 5", value: content5, setter: setContent5 },
            ].map((field) => (
              <FormGroup key={field.label} label={field.label}>
                <InputWrapper icon={<Package size={16} />}>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.label}
                    className={inputClass}
                  />
                </InputWrapper>
              </FormGroup>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          VIDEO FILE
          ================================================== */}

      <section className="mb-5.5 mt-5 overflow-hidden rounded-[14px] border border-[#e6eaf0] bg-white shadow-[0_5px_20px_rgba(15,23,42,0.035)]">
        <div className="flex min-h-19.5 items-center justify-between gap-3 border-b border-[#e6eaf0] px-6 py-5 max-[600px]:flex-col max-[600px]:items-start max-[600px]:px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9.5 w-9.5 items-center justify-center rounded-[10px] bg-red-50 text-red-500">
              <FileVideo size={20} />
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-[#172033]">
                ملف الفيديو
              </h3>

              <span className="mt-0.5 block text-[11px] text-[#718096]">
                اختر ملف الفيديو المراد إضافته للأرشيف
              </span>
            </div>
          </div>

          <span className="text-xs text-[#718096]">
            {videoSource === "server"
              ? selectedServerVideo?.name ?? "لم يتم اختيار فيديو من السيرفر"
              : videoFile?.name ?? "لم يتم اختيار فيديو"}
          </span>
        </div>

        <div className="p-6 max-[600px]:p-4">
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,.mkv,.avi,.mov"
            onChange={handleVideoSelect}
            hidden
          />

          {/* SOURCE SELECTOR */}

          <div className="mb-5 grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
            <button
              type="button"
              onClick={chooseDeviceSource}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                videoSource === "device"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <UploadCloud size={18} />
              اختيار من الجهاز
            </button>

            <button
              type="button"
              onClick={openServerBrowser}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                videoSource === "server"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <HardDrive size={18} />
              اختيار من ملفات السيرفر
            </button>
          </div>

          {/* DEVICE SOURCE */}

          {videoSource === "device" ? (
            <div
              onDragOver={handleVideoDragOver}
              onDragLeave={handleVideoDragLeave}
              onDrop={handleVideoDrop}
              className={`rounded-xl border-2 border-dashed p-3 transition-colors ${
                isVideoDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-transparent"
              }`}
            >
              <p className="mb-3 text-center text-xs text-slate-500">
                اسحب ملف الفيديو وأفلته هنا، أو اضغط لاختياره من جهازك
              </p>

              {!videoFile ? (
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="flex min-h-57.5 w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] px-5 text-center transition hover:border-blue-400 hover:bg-[#eff6ff]"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
                    <UploadCloud size={30} />
                  </div>

                  <h3 className="mb-1 text-sm font-bold text-[#334155]">
                    لم يتم اختيار ملف فيديو
                  </h3>

                  <p className="text-xs text-[#64748b]">
                    اضغط هنا لاختيار الفيديو من جهازك
                  </p>

                  <span className="mt-3 text-[11px] text-[#94a3b8]">
                    MP4 · WebM · MOV · AVI · MKV
                  </span>
                </button>
              ) : (
                <div className="overflow-hidden rounded-xl border border-[#e6eaf0] bg-[#0f172a]">
                  <div className="flex min-h-62.5 items-center justify-center bg-black">
                    <video
                      src={videoUrl}
                      controls
                      className="max-h-125 w-full object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 bg-white p-4 max-[600px]:flex-col max-[600px]:items-stretch">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                        <FileVideo size={21} />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-[#172033]">
                          {videoFile.name}
                        </div>

                        <div className="mt-1 flex gap-4 text-[11px] text-[#94a3b8]">
                          <span>{formatFileSize(videoFile.size)}</span>
                          {videoDuration && <span>{videoDuration}</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      حذف الفيديو
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* SERVER SOURCE */

            <div className="space-y-4">
              {selectedServerVideo && (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 max-[600px]:flex-col max-[600px]:items-stretch">
                  <div className="flex min-w-0 items-center gap-3">
                    <HardDrive className="shrink-0 text-emerald-700" size={22} />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-emerald-900">
                        {selectedServerVideo.name}
                      </p>

                      <p className="mt-1 break-all text-[11px] text-emerald-700">
                        {selectedServerVideo.relativePath}
                      </p>

                      <p className="mt-1 text-[11px] text-emerald-700">
                        {formatFileSize(selectedServerVideo.size)} · آخر تعديل:{" "}
                        {formatServerDate(selectedServerVideo.modifiedAt)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                    إلغاء الاختيار
                  </button>
                </div>
              )}

              {showServerBrowser && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        ملفات الفيديو الموجودة على السيرفر
                      </h4>

                      <p className="mt-1 text-[11px] text-slate-500">
                        اختر ملفًا موجودًا بالفعل؛ لن يتم رفعه أو نسخه مرة أخرى.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => void loadServerVideos(1, serverSearch)}
                      disabled={isLoadingServerVideos}
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                    >
                      <RefreshCw
                        size={14}
                        className={isLoadingServerVideos ? "animate-spin" : ""}
                      />
                      تحديث
                    </button>
                  </div>

                  {/* SEARCH */}

                  <div className="mb-3 flex gap-2">
                    <div className="relative min-w-0 flex-1">
                      <Search
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        value={serverSearch}
                        onChange={(e) => setServerSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setServerPage(1);
                            void loadServerVideos(1, serverSearch);
                          }
                        }}
                        placeholder="ابحث باسم الفيديو..."
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-9 pl-3 text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setServerPage(1);
                        void loadServerVideos(1, serverSearch);
                      }}
                      className="h-10 rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      بحث
                    </button>
                  </div>

                  {serverVideosError && (
                    <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                      {serverVideosError}
                    </div>
                  )}

                  {/* FILES */}

                  {isLoadingServerVideos ? (
                    <div className="flex min-h-32 items-center justify-center gap-2 text-xs text-slate-500">
                      <RefreshCw size={16} className="animate-spin" />
                      جاري تحميل ملفات السيرفر...
                    </div>
                  ) : serverVideos.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white py-10 text-center text-xs text-slate-500">
                      لا توجد ملفات فيديو مطابقة.
                    </div>
                  ) : (
                    <div className="max-h-100 space-y-2 overflow-y-auto">
                      {serverVideos.map((file) => {
                        const isSelected =
                          selectedServerVideo?.relativePath === file.relativePath;

                        return (
                          <button
                            key={file.relativePath}
                            type="button"
                            onClick={() => chooseServerVideo(file)}
                            className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-right transition max-[600px]:items-start ${
                              isSelected
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                            }`}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <FileVideo size={20} className="shrink-0 text-blue-600" />

                              <span className="min-w-0">
                                <span className="block truncate text-xs font-semibold text-slate-800">
                                  {file.name}
                                </span>

                                <span className="mt-1 block truncate text-[10px] text-slate-500">
                                  {file.relativePath}
                                </span>

                                <span className="mt-1 block text-[10px] text-slate-400">
                                  {formatFileSize(file.size)} ·{" "}
                                  {formatServerDate(file.modifiedAt)}
                                </span>
                              </span>
                            </span>

                            <span
                              className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold ${
                                isSelected
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {isSelected ? "تم الاختيار" : "اختيار"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* PAGINATION */}

                  <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-slate-500">
                    <span>إجمالي الملفات: {serverTotal}</span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={serverPage <= 1 || isLoadingServerVideos}
                        onClick={() =>
                          void loadServerVideos(serverPage - 1, serverSearch)
                        }
                        className="rounded-md border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-40"
                      >
                        السابق
                      </button>

                      <span>
                        {serverPage} / {serverTotalPages}
                      </span>

                      <button
                        type="button"
                        disabled={
                          serverPage >= serverTotalPages ||
                          isLoadingServerVideos
                        }
                        onClick={() =>
                          void loadServerVideos(serverPage + 1, serverSearch)
                        }
                        className="rounded-md border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-40"
                      >
                        التالي
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!showServerBrowser && selectedServerVideo && (
                <button
                  type="button"
                  onClick={openServerBrowser}
                  className="w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 py-3 text-xs font-semibold text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                >
                  تغيير ملف الفيديو من السيرفر
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          THUMBNAIL
          ================================================== */}

      <section className="mb-5.5 overflow-hidden rounded-[14px] border border-[#e6eaf0] bg-white shadow-[0_5px_20px_rgba(15,23,42,0.035)]">
        <SectionHeader
          icon={<ImageIcon size={20} />}
          title="صور تعريفية"
          description="صورة تعريفية تظهر أثناء تصفح أرشيف الفيديوهات"
        />

        <div className="p-6 max-[600px]:p-4">
          <input
            ref={thumbnailInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleThumbnailSelect}
            hidden
          />

          <div className="flex items-center gap-6 max-[600px]:flex-col max-[600px]:items-stretch">
            <div className="flex h-45 w-70 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] max-[600px]:w-full">
              {thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                  <ImagePlus size={30} />
                  <span className="text-xs">لم يتم اختيار صورة</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => thumbnailInputRef.current?.click()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#e6eaf0] bg-white px-4 text-xs font-semibold text-[#4a5568] transition hover:bg-[#eff6ff] hover:text-[#2563eb]"
              >
                <ImagePlus size={16} />
                اختيار صورة
              </button>

              {thumbnailFile && (
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] border border-red-200 bg-white px-4 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  حذف الصورة
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          ADD ITEM MODAL
          ================================================== */}

      <AddItemModal
        isOpen={isAddModalOpen}
        title={getAddModalTitle()}
        value={newValue}
        onChange={setNewValue}
        onClose={closeAddModal}
        onSave={handleAddItem}
        loading={isAddingLookup}
      />
    </main>
  );
}

// ==================================================
// SECTION HEADER
// ==================================================

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#e6eaf0] px-6 py-4 max-[600px]:px-4">
      <div className="flex h-9.5 w-9.5 items-center justify-center rounded-[10px] bg-[#eef2ff] text-[#4f46e5]">
        {icon}
      </div>

      <div>
        <h3 className="text-[15px] font-bold text-[#172033]">
          {title}
        </h3>

        <span className="mt-0.5 block text-[11px] text-[#718096]">
          {description}
        </span>
      </div>
    </div>
  );
}

// ==================================================
// FORM GROUP
// ==================================================

function FormGroup({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.75">
      <label className="text-xs font-semibold text-[#4a5568]">
        {label}

        {required && (
          <span
            className="mr-1 text-[14px] font-bold text-red-500"
            title="هذا الحقل مطلوب"
            aria-label="حقل مطلوب"
          >
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

// ==================================================
// INPUT WRAPPER
// ==================================================

function InputWrapper({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[#a0aec0]">
        {icon}
      </span>

      {children}
    </div>
  );
}

// ==================================================
// SELECT WRAPPER
// ==================================================

function SelectWrapper({
  icon,
  children,
  onAdd,
  disabled = false,
  isAdmin = false,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onAdd?: () => void;
  disabled?: boolean;
  isAdmin?: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative min-w-0 flex-1">
        <span className="pointer-events-none absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[#a0aec0]">
          {icon}
        </span>

        <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[#718096]">
          <ChevronDown size={16} strokeWidth={2} />
        </span>

        {children}
      </div>

      {isAdmin && (
        <button
          type="button"
          title="إضافة"
          aria-label="إضافة"
          onClick={onAdd}
          disabled={disabled}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] border border-[#dfe5ed] bg-white text-[#718096] transition-all duration-200 hover:border-[#2563eb] hover:bg-[#eff6ff] hover:text-[#2563eb] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

// ==================================================
// INPUT STYLE
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

// ==================================================
// SELECT STYLE
// ==================================================

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
