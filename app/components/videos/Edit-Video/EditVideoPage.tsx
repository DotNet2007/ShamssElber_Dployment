"use client";


import { Building2, Calendar, CalendarDays, FileVideo, Folder, Globe2, Image as ImageIcon, ImagePlus, Layers, ListOrdered, Languages, Music2, Package, Plus, Save, Share2, Trash2, UploadCloud, User, Video, Workflow, Grid3X3, Grid2X2, Rows3, Pencil, AlertTriangle, X, } from "lucide-react";
import { formatFileSize } from "@/app/helpers/videoHelper";
import { getArabicDayName } from "@/app/helpers/getArabicDayName";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/app/helpers/edit-video/editVideo.helpers";
import { useEditVideo } from "@/app/hooks/useEditVideo";
import { FormGroup, InputWrapper, inputClass, SelectWrapper, selectClass } from "./EditVideoFormControls";



export default function EditVideoPage() {
  const {
    videoInputRef,
    thumbnailInputRef,
    dateInputRef,
    router,
    videoFile,
    videoUrl,
    videoDuration,
    thumbnailFile,
    thumbnailUrl,
    youtubeLink,
    setYoutubeLink,
    facebookLink,
    setFacebookLink,
    instagramLink,
    setInstagramLink,
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
    date,
    setDate,
    production1,
    setProduction1,
    production2,
    setProduction2,
    sector,
    setSector,
    translation,
    setTranslation,
    authLoading,
    isAuthenticated,
    isAdmin,
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
    video,
    isVideoLoading,
    isVideoError,
    videoError,
    isSaving,
    isSubmitting,
    isDeleting,
    addEvent,
    isAddingEvent,
    updateEvent,
    isUpdatingEvent,
    contentType,
    setContentType,
    canEdit,
    canDelete,
    isLocked,
    isVideoDragging,
    setIsVideoDragging,
    existingVideoFileName,
    productType,
    setProductType,
    item,
    setItem,
    productName,
    setProductName,
    productSerial,
    setProductSerial,
    eventType,
    setEventType,
    eventName,
    setEventName,
    eventNameText,
    setEventNameText,
    setOriginalEventNameText,
    showEventSuggestions,
    setShowEventSuggestions,
    filteredEvents,
    productionLine,
    setProductionLine,
    hymnName,
    setHymnName,
    speakerName,
    setSpeakerName,
    channelName,
    setChannelName,
    isRepeated,
    setIsRepeated,
    error,
    formLayout,
    changeFormLayout,
    hasUnsavedChanges,
    showUnsavedModal,
    setShowUnsavedModal,
    setPendingNavigation,
    confirmNavigation,
    cancelNavigation,
    openDatePicker,
    handleVideoSelect,
    handleVideoDrop,
    handleRemoveVideo,
    handleThumbnailSelect,
    handleRemoveThumbnail,
    handleSave,
    handleSubmit,
    showDeleteModal,
    setShowDeleteModal,

    handleDelete
  } = useEditVideo();

  if (authLoading || !isAuthenticated || isVideoLoading) {
    return (
      <main dir="rtl" className="mx-auto w-full max-w-300 px-5 py-17.5">
        <div className="rounded-[14px] border border-[#e6eaf0] bg-white p-8 text-center text-sm text-[#718096]">
          جاري تحميل بيانات الفيديو...
        </div>
      </main>
    );
  }

  if (isVideoError || !video) {
    return (
      <main dir="rtl" className="mx-auto w-full max-w-300 px-5 py-17.5">
        <div className="rounded-[14px] border border-red-100 bg-red-50 p-8 text-center text-sm text-red-700">
          {getApiErrorMessage(videoError, "تعذر تحميل بيانات الفيديو.")}
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-400
        py-10
       
      "
    >
      {/* ==================================================
          PAGE HEADING
          ================================================== */}

      <div
        className="
          mb-6.25
          flex
          items-center
          justify-between
          gap-5
          max-[600px]:flex-col
          max-[600px]:items-start
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <h2 className="mb-1 text-2xl font-bold text-[#172033]">
              تعديل الفيديو
            </h2>

            {video.RecordStatus === "DRAFT" && (
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-amber-200
                  bg-amber-50
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  text-amber-700
                "
              >
                مسودة
              </span>
            )}
          </div>

          <p className="text-[13px] text-[#718096]">
            تعديل بيانات الفيديو وإدارة ملفاته داخل أرشيف الفيديوهات
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (hasUnsavedChanges) {
                setPendingNavigation("/videos/add");
                setShowUnsavedModal(true);
                return;
              }

              router.push("/videos/add");
            }}
            // onClick={() => router.push("/videos/add")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Plus size={16} />
            جديد
          </button>

          {canDelete && (
            <button
              type="button"
              // onClick={handleDelete}
              onClick={() => setShowDeleteModal(true)}
              disabled={isSaving || isSubmitting || isDeleting}
              className="
                inline-flex h-10 items-center justify-center gap-2
                rounded-[9px] border border-red-200 bg-white px-4
                text-xs font-semibold text-red-600 transition
                hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              <Trash2 size={16} />
              {isDeleting ? "جاري الحذف..." : "حذف"}
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isSubmitting || isDeleting || !canEdit || !hasUnsavedChanges}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-[9px]
              bg-[#2563eb]
              px-4
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-[#1d4ed8]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Save size={16} />
            {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>

          {video.RecordStatus === "DRAFT" && canEdit && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving || isSubmitting || isDeleting || !canEdit}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-[9px]
                bg-emerald-600
                px-4
                text-xs
                font-semibold
                text-white
                transition
                hover:bg-emerald-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Share2 size={16} />
              {isSubmitting ? "جاري التقديم..." : "تقديم"}
            </button>
          )}
        </div>
      </div>

      {/* ==================================================
          ERROR
          ================================================== */}

      {error && (
        <div
          className="
            mb-5
            rounded-[9px]
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-xs
            leading-7
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* ==================================================
          VIDEO INFORMATION
          ================================================== */}

      <section
        className="
          mb-5.5
          overflow-hidden
          rounded-[14px]
          border
          border-[#e6eaf0]
          bg-white
          shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        "
      >
        {/* HEADER */}

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
          {/* Left side: Video icon + title */}
          <div className="flex items-center gap-3 flex-1">
            <div
              className="
                flex
                h-9.5
                w-9.5
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

          {/* Right side: Layout Options */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            {/* 3 Columns */}
            <button
              type="button"
              onClick={() => changeFormLayout("grid3")}
              title="ثلاثة أعمدة"
              className={`p-1.5 rounded-md transition ${
                formLayout === "grid3"
                  ? "bg-[#EEF4FF] text-[#2563EB]"
                  : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
              }`}
            >
              <Grid3X3 size={17} />
            </button>

            {/* 2 Columns */}
            <button
              type="button"
              onClick={() => changeFormLayout("grid2")}
              title="عمودين"
              className={`p-1.5 rounded-md transition ${
                formLayout === "grid2"
                  ? "bg-[#EEF4FF] text-[#2563EB]"
                  : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
              }`}
            >
              <Grid2X2 size={17} />
            </button>

            {/* Full Width */}
            <button
              type="button"
              onClick={() => changeFormLayout("full")}
              title="عرض كامل"
              className={`p-1.5 rounded-md transition ${
                formLayout === "full"
                  ? "bg-[#EEF4FF] text-[#2563EB]"
                  : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
              }`}
            >
              <Rows3 size={17} />
            </button>
          </div>
        </div>

        {/* BODY */}

        <div className="p-6.25 max-[600px]:p-4">
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
          `}>
            {/* ==================================================
                1. التاريخ
                ================================================== */}

            <FormGroup label="التاريخ" required>
              <InputWrapper icon={<Calendar size={16} />}>
                <div
                  className={`${inputClass} relative w-full cursor-pointer`}
                  onClick={openDatePicker}
                  
                >
                  {/* Arabic value */}
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
                    {date ?
                      getArabicDayName(date)
                      : "اختر التاريخ"}
                  </div>

                  {/* Native picker */}
                  <input
                    ref={dateInputRef}
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={isLocked}
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
                2. الصنف
                ================================================== */}

            <FormGroup label="الصنف" required>
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Folder size={16} />}
                onAdd={() => console.log("إختر الصنف")}
                disabled={isLocked || itemsIsLoading}
              >
                <select
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || itemsIsLoading}
                >
                  <option value="">
                    {itemsIsLoading
                      ? "جاري تحميل الاصناف ..."
                      : "اختر الصنف"}
                  </option>

                  {items.map((item) => (
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
                3. جهة انتاج 1
                ================================================== */}

            <FormGroup label="جهة انتاج 1" required>
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Building2 size={16} />}
                onAdd={() => console.log("إضافة جهة إنتاج 1")}
                disabled={isLocked || productEntitiesOneIsLoading}
              >
                <select
                  value={production1}
                  onChange={(e) => setProduction1(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || productEntitiesOneIsLoading}
                >
                  <option value="">
                    {productEntitiesOneIsLoading
                      ? "جاري تحميل جهة الانتاج..."
                      : "اختر جهة الانتاج"}
                  </option>

                  {productEntitiesOne.map((productEntityOne) => (
                    <option
                      key={productEntityOne.Code}
                      value={productEntityOne.Code}
                    >
                      {productEntityOne.DescA}
                    </option>
                  ))}
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
                onAdd={() => console.log("إضافة جهة إنتاج 2")}
                disabled={isLocked || productEntitiesTwoIsLoading}
              >

                <select
                  value={production2}
                  onChange={(e) => setProduction2(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || productEntitiesTwoIsLoading}
                >
                  <option value="">
                    {productEntitiesTwoIsLoading
                      ? "جاري تحميل جهة الانتاج..."
                      : "اختر جهة الانتاج"}
                  </option>

                  {productEntitiesTwo.map((productEntityTwo) => (
                    <option
                      key={productEntityTwo.Code}
                      value={productEntityTwo.Code}
                    >
                      {productEntityTwo.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                5. القطاع
                ================================================== */}

            <FormGroup label="القطاع" required>
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Layers size={16} />}
                onAdd={() => console.log("إضافة قطاع")}
                disabled={isLocked || sectorsIsLoading }
              >
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || sectorsIsLoading}
                >
                  <option value="">
                    {sectorsIsLoading
                      ? "جاري تحميل القطاعات..."
                      : "اختر القطاعات "}
                  </option>

                  {sectors.map((sector) => (
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
                6. الترجمه
                ================================================== */}

            <FormGroup label="الترجمه">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Languages size={16} />}
                onAdd={() => console.log("إضافة ترجمه")}
                disabled={isLocked || translationsIsLoading}
              >

                <select
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || translationsIsLoading}
                >
                  <option value="">
                    {translationsIsLoading
                      ? "جاري تحميل الترجمات ..."
                      : "اختر ترجمه للمنتج"}
                  </option>

                  {translations.map((translation) => (
                    <option
                      key={translation.Code}
                      value={translation.Code}
                    >
                      {translation.DescA}
                    </option>
                  ))}
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
                onAdd={() => console.log("إضافة نوع منتج")}
                disabled={isLocked || itemsTypeIsLoading}
              >
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || itemsTypeIsLoading}
                >
                  <option value="">
                    {itemsTypeIsLoading
                      ? "جاري تحميل أنواع المنتجات..."
                      : "اختر نوع المنتج"}
                  </option>

                  {itemsType.map((itemType) => (
                    <option
                      key={itemType.Code}
                      value={itemType.Code}
                    >
                      {itemType.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                8. نوع الحدث
                ================================================== */}

            <FormGroup label="نوع الحدث">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<CalendarDays size={16} />}
                onAdd={() => console.log("إضافة نوع حدث")}
                disabled={isLocked || eventTypesIsLoading}
              >

                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || eventTypesIsLoading}
                >
                  <option value="">
                    {eventTypesIsLoading
                      ? "جاري تحميل أنواع الاحداث..."
                      : "اختر نوع الحدث"}
                  </option>

                  {eventTypes.map((eventType) => (
                    <option
                      key={eventType.Code}
                      value={eventType.Code}
                    >
                      {eventType.DescA}
                    </option>
                  ))}</select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                9. خط الانتاج
                ================================================== */}

            <FormGroup label="خط الانتاج">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Workflow size={16} />}
                onAdd={() => console.log("إضافة خط إنتاج")}
                disabled={isLocked || productionLinesIsLoading}
              >
                <select
                  value={productionLine}
                  onChange={(e) => setProductionLine(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || productionLinesIsLoading}
                >
                  <option value="">
                    {productionLinesIsLoading
                      ? "جاري تحميل خطوط الانتاج..."
                      : "اختر خط إنتاج"}
                  </option>

                  {productionLines.map((productionLine) => (
                    <option
                      key={productionLine.Code}
                      value={productionLine.Code}
                    >
                      {productionLine.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                10. اسم المنتج
                ================================================== */}

            <FormGroup label="اسم المنتج" required>
              <InputWrapper
                icon={<Package size={16} />}
              >
                <input
                  type="text"
                  value={productName}
                  onChange={(e) =>
                    setProductName(e.target.value)
                  }
                  placeholder="اسم المنتج"
                  className={inputClass}
                  disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>


            {/* ==================================================
                11. تسلسل المنتج
                ================================================== */}

            <FormGroup label="تسلسل المنتج">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<ListOrdered size={16} />}
                onAdd={() => console.log("إضافة تسلسل")}
                disabled={isLocked || eventsIsLoading}
              >

                <select
                  value={productSerial}
                  onChange={(e) => setProductSerial(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || eventsIsLoading}
                >
                  <option value="">
                    {itemsSerIsLoading
                      ? "جاري تحميل التسلسل ..."
                      : "اختر تسلسل للمنتج"}
                  </option>

                  {itemsSer.map((itemSer) => (
                    <option
                      key={itemSer.Code}
                      value={itemSer.Code}
                    >
                      {itemSer.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>


            {/* ==================================================
                حالة الحدث + اسم الحدث
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
              {/* =========================================
                  حالة الحدث
                  ========================================= */}

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
                  {/* النص */}
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
                    {isRepeated ? "مكرر" : "غير مكرر"}
                  </span>

                  {/* Toggle */}
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
                      disabled={isLocked || eventsIsLoading}
                      onChange={(e) => {
                        const checked = e.target.checked;

                        setIsRepeated(checked);

                        // مسح اسم الحدث عند تغيير الحالة
                        setEventName("");
                        setEventNameText("");
                        setShowEventSuggestions(false);
                      }}
                      className="peer sr-only"
                    />

                    {/* Toggle Background */}
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

                    {/* Toggle Circle */}
                    <span
                      className="
                        absolute
                        right-4.5
                        top-0.5
                        h-4
                        w-4
                        rounded-full
                        bg-white
                        shadow-sm
                        transition-all
                        duration-200
                        peer-checked:right-0.5
                      "
                    />
                  </label>
                </div>
              </FormGroup>


              {/* =========================================
                  اسم الحدث
                  ========================================= */}

              <FormGroup label="اسم الحدث">

                {isRepeated ? (

                  /* =========================================
                    مكرر → Dropdown
                    ========================================= */

                  <SelectWrapper
                    icon={<CalendarDays size={16} />}
                  >
                    <select
                      value={eventName}
                      onChange={(e) => {
                        setEventName(e.target.value);
                      }}
                      className={selectClass}
                      disabled={isLocked || eventsIsLoading}
                    >
                      <option value="">
                        {eventsIsLoading
                          ? "جاري تحميل الأحداث..."
                          : "اختر الحدث المكرر"}
                      </option>

                      {events.map((event) => (
                        <option
                          key={event.Code}
                          value={event.Code}
                        >
                          {event.DescA}
                        </option>
                      ))}
                    </select>
                  </SelectWrapper>

                ) : (

                  /* =========================================
                    غير مكرر → Autocomplete TextBox
                    ========================================= */

                  <div className="relative w-full">

                    <InputWrapper icon={<CalendarDays size={16} />}>

                      <input
                        type="text"
                        value={eventNameText}

                        onChange={(e) => {
                          const value = e.target.value;

                          setEventNameText(value);

                          // Keep the existing Event Code while editing.
                          // If the name changes, handleSave() will PATCH
                          // the same Event instead of creating a new one.
                          setShowEventSuggestions(
                            value.trim().length > 0
                          );
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
                        disabled={isLocked}
                      />

                    </InputWrapper>


                    {/* =========================================
                        AUTOCOMPLETE
                        ========================================= */}

                    {showEventSuggestions && eventNameText.trim() && (

                      <div
                        className="
                          absolute
                          right-0
                          left-0
                          top-[calc(100%+6px)]
                          z-50
                          overflow-hidden
                          rounded-[9px]
                          border
                          border-[#e6eaf0]
                          bg-white
                          shadow-[0_10px_30px_rgba(15,23,42,0.10)]
                        "
                      >

                        {filteredEvents.length > 0 ? (

                          /* =====================================
                            نتائج موجودة
                            ===================================== */

                          <div className="max-h-55 overflow-y-auto py-1">

                            {filteredEvents.map((event) => (

                              <button
                                key={event.Code}
                                type="button"

                                onMouseDown={(e) => {
                                  e.preventDefault();

                                  setEventNameText(event.DescA);
                                  setEventName(String(event.Code));

                                  // مهم لمعرفة هل الاسم اتغير بعد كده
                                  setOriginalEventNameText(event.DescA);

                                  setShowEventSuggestions(false);
                                }}

                                className="
                                  flex
                                  w-full
                                  items-center
                                  gap-2
                                  px-3
                                  py-2.5
                                  text-right
                                  text-xs
                                  text-[#334155]
                                  transition
                                  hover:bg-[#f5f8ff]
                                  hover:text-[#2563eb]
                                "
                              >

                                <CalendarDays
                                  size={14}
                                  className="shrink-0 text-[#94a3b8]"
                                />

                                <span className="truncate">
                                  {event.DescA}
                                </span>

                              </button>

                            ))}

                          </div>

                        ) : (

                          /* =====================================
                            لا يوجد → إضافة جديدة
                            ===================================== */


                            <div className="p-3">

                              <div className="mb-2 text-[11px] text-[#718096]">
                                {eventName
                                  ? "تم تعديل اسم الحدث"
                                  : "لا يوجد حدث مطابق"}
                              </div>

                              <button
                                type="button"
                                disabled={isAddingEvent || isUpdatingEvent}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                }}
                                onClick={async () => {

                                  const value = eventNameText.trim();

                                  if (!value) return;

                                  try {

                                    // =========================================
                                    // EDIT EXISTING EVENT
                                    // =========================================
                                    if (eventName) {

                                      await updateEvent({
                                        code: Number(eventName),
                                        DescA: value,
                                      }).unwrap();

                                      setOriginalEventNameText(value);
                                      setEventNameText(value);
                                      setShowEventSuggestions(false);

                                      await refetchEvents();

                                      toast.success("تم تعديل الحدث بنجاح");

                                      return;
                                    }

                                    // =========================================
                                    // ADD NEW EVENT
                                    // =========================================

                                    const result = await addEvent({
                                      DescA: value,
                                    }).unwrap();

                                    const newCode =
                                      result?.Code ??
                                      result?.data?.Code;

                                    if (!newCode) {
                                      toast.error(
                                        "تمت إضافة الحدث ولكن لم يتم إرجاع الكود"
                                      );
                                      return;
                                    }

                                    setEventName(String(newCode));
                                    setEventNameText(value);
                                    setOriginalEventNameText(value);
                                    setShowEventSuggestions(false);

                                    await refetchEvents();

                                    toast.success("تمت إضافة الحدث بنجاح");

                                  } catch (error: unknown) {

                                    console.error("Event Error:", error);

                                    toast.error(
                                      getApiErrorMessage(
                                        error,
                                        "حدث خطأ أثناء حفظ الحدث",
                                      ),
                                    );
                                  }
                                }}
                                className="
                                  flex
                                  h-9
                                  w-full
                                  items-center
                                  justify-center
                                  gap-2
                                  rounded-lg
                                  bg-[#2563eb]
                                  px-3
                                  text-xs
                                  font-semibold
                                  text-white
                                  transition
                                  hover:bg-[#1d4ed8]
                                  active:scale-[0.98]
                                  disabled:cursor-not-allowed
                                  disabled:opacity-50
                                "
                              >

                                {eventName ? (
                                  <>
                                    <Pencil size={15} />

                                    {isUpdatingEvent
                                      ? "جاري التعديل..."
                                      : `تعديل "${eventNameText.trim()}"`}
                                  </>
                                ) : (
                                  <>
                                    <Plus size={15} />

                                    {isAddingEvent
                                      ? "جاري الإضافة..."
                                      : `إضافة "${eventNameText.trim()}"`}
                                  </>
                                )}

                              </button>

                            </div>
                          )}

                      </div>

                    )}

                  </div>
                )}

              </FormGroup>
              
            </div>

            

            {/* ==================================================
                13. اسم الترنيمه
                ================================================== */}

            <FormGroup label="اسم الترنيمه">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Music2 size={16} />}
                onAdd={() => console.log("إضافة ترنيمة")}
                disabled={isLocked || songsIsLoading}
              >

                <select
                  value={hymnName}
                  onChange={(e) => setHymnName(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || songsIsLoading}
                >
                  <option value="">
                    {songsIsLoading
                      ? "جاري تحميل الترانيم..."
                      : "اختر ترنيمه"}
                  </option>

                  {songs.map((song) => (
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
                onAdd={() => console.log("إضافة متكلم")}
                 disabled={isLocked || speakersIsLoading}
              >

                <select
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || speakersIsLoading}
                >
                  <option value="">
                    {speakersIsLoading
                      ? "جاري تحميل القائمين ع العمل..."
                      : "اختر متكلم"}
                  </option>

                  {speakers.map((speaker) => (
                    <option
                      key={speaker.Code}
                      value={speaker.Code}
                    >
                      {speaker.DescA}
                    </option>
                  ))}
                </select>

              </SelectWrapper>
            </FormGroup>

            {isAdmin && (
              <FormGroup label="نوع المحتوى">
                <SelectWrapper
                  icon={<Layers size={16} />}
                >
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className={selectClass}
                    disabled={isLocked || contentTypesIsLoading}
                  >
                    <option value="">
                      {contentTypesIsLoading
                        ? "جاري تحميل أنواع المحتوى..."
                        : "اختر نوع المحتوى"}
                    </option>

                    {contentTypes.map((contentType) => (
                      <option
                        key={contentType.Code}
                        value={contentType.Code}
                      >
                        {contentType.DescA}
                      </option>
                    ))}
                  </select>
                </SelectWrapper>
              </FormGroup>
            )}

          </div>

          
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
              {/* قناة / صفحة الرفع الرئيسية */}
              <FormGroup label="قناة / صفحة الرفع الرئيسية">
                <SelectWrapper
                  isAdmin={isAdmin}
                  icon={<Video size={16} />}
                  onAdd={() => console.log("إضافة قناة")}>

                  <select
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className={selectClass}
                    disabled={isLocked || channelsIsLoading}
                  >
                    <option value="">
                      {channelsIsLoading
                        ? "جاري تحميل القنوات..."
                        : "اختر قناة"}
                    </option>

                    {channels.map((channel) => (
                      <option
                        key={channel.Code}
                        value={channel.Code}
                      >
                        {channel.DescA}
                      </option>
                    ))}
                  </select>

                </SelectWrapper>
              </FormGroup>

              {/* YouTube */}

              <FormGroup label="رابط YouTube">
                <InputWrapper icon={<Video size={16} />}>
                  <input
                    type="url"
                    value={youtubeLink}
                    onChange={(e) =>
                      setYoutubeLink(e.target.value)
                    }
                    placeholder="رابط YouTube"
                    className={inputClass}
                   disabled={isLocked}
                  />
                </InputWrapper>
              </FormGroup>

              {/* Facebook */}

              <FormGroup label="رابط Facebook">
                <InputWrapper icon={<Share2  size={16} />}>
                  <input
                    type="url"
                    value={facebookLink}
                    onChange={(e) =>
                      setFacebookLink(e.target.value)
                    }
                    placeholder="رابط Facebook"
                    className={inputClass}
                   disabled={isLocked}
                  />
                </InputWrapper>
              </FormGroup>

              {/* Instagram */}

              <FormGroup label="رابط Instagram">
                <InputWrapper icon={<Globe2  size={16} />}>
                  <input
                    type="url"
                    value={instagramLink}
                    onChange={(e) =>
                      setInstagramLink(e.target.value)
                    }
                    placeholder="رابط Instagram"
                    className={inputClass}
                   disabled={isLocked}
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
                        flex h-10 items-center justify-center gap-2 rounded-[9px]
                        border border-red-200 bg-white px-3 text-xs font-semibold text-red-600
                        transition hover:bg-red-50
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
                        flex h-10 items-center justify-center gap-2 rounded-[9px]
                        border border-blue-200 bg-white px-3 text-xs font-semibold text-blue-600
                        transition hover:bg-blue-50
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
                        flex h-10 items-center justify-center gap-2 rounded-[9px]
                        border border-pink-200 bg-white px-3 text-xs font-semibold text-pink-600
                        transition hover:bg-pink-50
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

      {/* ==================================================
          محتوى المنتج
          ================================================== */}

      <section
        className="
          mt-5
          overflow-hidden
          rounded-[14px]
          border
          border-[#e6eaf0]
          bg-white
          shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-[#e6eaf0]
            px-6
            py-4
            max-[600px]:px-4
          "
        >
          <div
            className="
              flex
              h-9.5
              w-9.5
              items-center
              justify-center
              rounded-[10px]
              bg-[#eef2ff]
              text-[#4f46e5]
            "
          >
            <Package size={19} />
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#172033]">
              محتوى المنتج
            </h3>

            <span className="mt-0.5 block text-[11px] text-[#718096]">
              البيانات الأساسية لمحتوى المنتج
            </span>
          </div>
        </div>

        {/* Body */}

        <div className="p-6 max-[600px]:p-4">
          <div
            className="
              grid
              grid-cols-5
              gap-5
              max-[1100px]:grid-cols-3
              max-[700px]:grid-cols-2
              max-[500px]:grid-cols-1
            "
          >
            {/* Input 1 */}

            <FormGroup label="المحتوى 1">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content1}
                  onChange={(e) =>
                    setContent1(e.target.value)
                  }
                  placeholder="المحتوى 1"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* Input 2 */}

            <FormGroup label="المحتوى 2">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content2}
                  onChange={(e) =>
                    setContent2(e.target.value)
                  }
                  placeholder="المحتوى 2"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* Input 3 */}

            <FormGroup label="المحتوى 3">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content3}
                  onChange={(e) =>
                    setContent3(e.target.value)
                  }
                  placeholder="المحتوى 3"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* Input 4 */}

            <FormGroup label="المحتوى 4">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content4}
                  onChange={(e) =>
                    setContent4(e.target.value)
                  }
                  placeholder="المحتوى 4"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* Input 5 */}

            <FormGroup label="المحتوى 5">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content5}
                  onChange={(e) =>
                    setContent5(e.target.value)
                  }
                  placeholder="المحتوى 5"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>
          </div>
        </div>
      </section>

      {/* ==================================================
          VIDEO FILE
          ================================================== */}

      <section
        className="
          mb-5.5
          overflow-hidden
          rounded-[14px]
          border
          border-[#e6eaf0]
          bg-white
          shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            min-h-19.5
            items-center
            justify-between
            gap-3
            border-b
            border-[#e6eaf0]
            px-6
            py-5
            max-[600px]:flex-col
            max-[600px]:items-start
            max-[600px]:px-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9.5
                w-9.5
                items-center
                justify-center
                rounded-[10px]
                bg-red-50
                text-red-500
              "
            >
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
            {videoFile
              ? videoFile.name
              : existingVideoFileName
                ? existingVideoFileName
              : "لم يتم اختيار فيديو"}
          </span>
        </div>


        {/* BODY */}
        <div className="p-6 max-[600px]:p-4">
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,.mkv,.avi,.mov"
            onChange={handleVideoSelect}
            disabled={isLocked}
            hidden
          />

          {/* DRAG AND DROP ZONE */}
          <div
            onDragOver={(event) => {
              event.preventDefault();

              if (!isLocked) {
                setIsVideoDragging(true);
              }
            }}
            onDragLeave={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node
                )
              ) {
                setIsVideoDragging(false);
              }
            }}
            onDrop={handleVideoDrop}
            className={`
              rounded-xl border-2 border-dashed p-3 transition-colors
              ${
                isVideoDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-transparent"
              }
            `}
          >
            <div className="mb-3 text-center text-xs text-slate-500">
              اسحب الفيديو من جهازك وأفلته هنا، أو اضغط لاختياره
            </div>

            {!videoFile && !existingVideoFileName ? (
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                disabled={isLocked}
                className="
                  flex min-h-57.5 w-full flex-col
                  items-center justify-center rounded-xl
                  border border-dashed border-[#cbd5e1]
                  bg-[#f8fafc] px-5 text-center transition
                  hover:border-blue-400 hover:bg-[#eff6ff]
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                <div
                  className="
                    mb-4 flex h-16 w-16 items-center justify-center
                    rounded-full bg-[#dbeafe] text-[#2563eb]
                  "
                >
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

                <div className=" flex items-center justify-between gap-4 bg-white p-4 max-[600px]:flex-col max-[600px]:items-stretch " >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className=" flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 " > <FileVideo size={21} /></div>

                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-[#172033]"> {videoFile ? videoFile.name : existingVideoFileName || "الفيديو الحالي"} </div>
                      <div className="mt-1 flex gap-4 text-[11px] text-[#94a3b8]"> {videoFile ? ( <span>{formatFileSize(videoFile.size)}</span> ) : ( existingVideoFileName && ( <span>الفيديو الحالي</span> ) )} {videoDuration && <span>{videoDuration}</span>}</div>
                    </div>
                  </div>

                  <button type="button" onClick={handleRemoveVideo} disabled={isLocked} className=" inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 " > <Trash2 size={15} />حذف الفيديو</button>
                </div>
              </div>
            )}
          </div>
        </div>

      </section>

      {/* ==================================================
          Thumbnail
          ================================================== */}

      <section className=" mb-5.5 overflow-hidden rounded-[14px] border border-[#e6eaf0] bg-white shadow-[0_5px_20px_rgba(15,23,42,0.035)] " >
        <div className=" flex items-center gap-3 border-b border-[#e6eaf0] px-6 py-5 max-[600px]:px-4 " >
          <div className=" flex h-9.5 w-9.5 items-center justify-center rounded-[10px] bg-[#eff6ff] text-[#2563eb] " >
            <ImageIcon size={20} />
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#172033]">صور تعريفية</h3>
            <span className="mt-0.5 block text-[11px] text-[#718096]">صورة تعريفية تظهر أثناء تصفح أرشيف الفيديوهات</span>
          </div>
        </div>

        <div className="p-6 max-[600px]:p-4">
          <input ref={thumbnailInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleThumbnailSelect} disabled={isLocked} hidden />
          <div className=" flex items-center gap-6 max-[600px]:flex-col max-[600px]:items-stretch " >
            <div className=" flex h-45 w-70 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] max-[600px]:w-full " >
              {thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`${thumbnailUrl}`} alt="Video thumbnail" className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#94a3b8]"><ImagePlus size={30} /><span className="text-xs">لم يتم اختيار صورة</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => thumbnailInputRef.current?.click() } disabled={isLocked} className=" inline-flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#e6eaf0] bg-white px-4 text-xs font-semibold text-[#4a5568] transition hover:bg-[#eff6ff] hover:text-[#2563eb] " ><ImagePlus size={16} />اختيار صورة</button>

              {thumbnailFile && (<button type="button" onClick={handleRemoveThumbnail} disabled={isLocked} className=" inline-flex h-10 items-center justify-center gap-2 rounded-[9px] border border-red-200 bg-white px-4 text-xs font-semibold text-red-500 transition hover:bg-red-50 " ><Trash2 size={16} />حذف الصورة</button>)}
            </div>
          </div>
        </div>
      </section>



    {showUnsavedModal && (
        <div dir="rtl" className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) { cancelNavigation(); } }} >
            <div role="dialog" aria-modal="true" aria-labelledby="unsaved-title" className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" >
                <div className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><AlertTriangle size={25} /></div>

                    <div className="flex-1">
                        <h3 id="unsaved-title" className="text-lg font-bold text-slate-900" >تعديلات غير محفوظة </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">أنت أجريت تعديلات على بيانات الفيديو ولم تحفظها بعد. هل تريد الخروج بدون حفظ التغييرات؟</p>
                    </div>

                    <button type="button" onClick={cancelNavigation} aria-label="إغلاق النافذة" className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" > <X size={19} /></button>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:flex-row sm:justify-start">
                    <button type="button" onClick={cancelNavigation} className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100" >العودة للتعديل</button>
                    <button type="button" onClick={confirmNavigation} className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">الخروج بدون حفظ</button>
                </div>
            </div>
        </div>
    )}


    {showDeleteModal && (
        <div dir="rtl" className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget && !isDeleting) { setShowDeleteModal(false); } }} >
            <div role="dialog" aria-modal="true" aria-labelledby="delete-modal-title" className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" >
        
            {/* Header */}
            <div className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={25} />
                </div>

                <div className="flex-1">
                <h3 id="delete-modal-title" className="text-lg font-bold text-slate-900" > تأكيد حذف الفيديو </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">هل أنت متأكد أنك تريد حذف هذا الفيديو<span className="mt-1 block font-semibold text-red-600">لا يمكن التراجع عن هذه العملية. </span></p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:flex-row sm:justify-start">
                <button type="button" disabled={isDeleting} onClick={() => setShowDeleteModal(false)} className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">إلغاء </button>
                <button type="button" disabled={isDeleting} onClick={handleDelete} className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60" > <Trash2 size={17} /> {isDeleting ? "جاري الحذف..." : "تأكيد الحذف"} </button>
            </div>
            </div>
        </div>
    )}
    </main>
  );
}
