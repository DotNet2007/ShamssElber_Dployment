"use client";

import { useRef } from "react";
import {
  Building2,
  Calendar,
  CalendarDays,
  Folder,
  Image as ImageIcon,
  Layers,
  ListOrdered,
  Package,
  Upload,
  Workflow,
  
} from "lucide-react";

import FormSection from "@/app/components/forms/FormSection";
import FormGroup from "@/app/components/forms/FormGroup";
import InputWrapper from "@/app/components/forms/InputWrapper";
import SelectWrapper from "@/app/components/forms/SelectWrapper";
import ImageUpload from "@/app/components/forms/ImageUpload";

import {
  inputClass,
  selectClass,
} from "@/app/components/forms/formStyles";

import { getArabicDayName } from "@/app/helpers/getArabicDayName";

type DropdownItem = {
  Code: string | number;
  DescA: string;
};

type ImageFormProps = {
  // Date
  imageDate: string;
  setImageDate: (value: string) => void;

  // Selected values
  item: string;
  setItem: (value: string) => void;

  production1: string;
  setProduction1: (value: string) => void;

  production2: string;
  setProduction2: (value: string) => void;

  sector: string;
  setSector: (value: string) => void;

  productType: string;
  setProductType: (value: string) => void;

  eventType: string;
  setEventType: (value: string) => void;

  eventName: string;
  setEventName: (value: string) => void;

  productionLine: string;
  setProductionLine: (value: string) => void;

  productSerial: string;
  setProductSerial: (value: string) => void;

  productName: string;
  setProductName: (value: string) => void;


  // RTK Query data
  items: DropdownItem[];
  productEntitiesOne: DropdownItem[];
  productEntitiesTwo: DropdownItem[];
  sectors: DropdownItem[];
  itemsType: DropdownItem[];
  eventTypes: DropdownItem[];
  productionLines: DropdownItem[];
  events: DropdownItem[];
  itemsSer: DropdownItem[];

  // Loading states
  itemsIsLoading: boolean;
  productEntitiesOneIsLoading: boolean;
  productEntitiesTwoIsLoading: boolean;
  sectorsIsLoading: boolean;
  itemsTypeIsLoading: boolean;
  eventTypesIsLoading: boolean;
  productionLinesIsLoading: boolean;
  eventsIsLoading: boolean;
  itemsSerIsLoading: boolean;


  // Image
  imageFile: File | null;
  previewUrl: string;
  onImageSelect: (file: File) => void;
  onRemoveImage: () => void;

  isAdmin?: boolean;
};

type DropdownFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  items: DropdownItem[];
  isLoading: boolean;
  placeholder: string;
  loadingText: string;
  icon: React.ReactNode;
  required?: boolean;
  isAdmin?: boolean;
};

function DropdownField({
  label,
  value,
  onChange,
  items,
  isLoading,
  placeholder,
  loadingText,
  icon,
  required = false,
  isAdmin = false,
}: DropdownFieldProps) {
  return (
    <FormGroup label={label} required={required}>
      <SelectWrapper isAdmin={isAdmin} icon={icon}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectClass}
          disabled={isLoading}
          required={required}
        >
          <option value="">
            {isLoading ? loadingText : placeholder}
          </option>

          {items.map((entry) => (
            <option
              key={String(entry.Code)}
              value={String(entry.Code)}
            >
              {entry.DescA}
            </option>
          ))}
        </select>
      </SelectWrapper>
    </FormGroup>
  );
}

export default function ImageForm({
  imageDate,
  setImageDate,

  item,
  setItem,

  production1,
  setProduction1,

  production2,
  setProduction2,

  sector,
  setSector,

  productType,
  setProductType,

  eventType,
  setEventType,

  eventName,
  setEventName,

  productionLine,
  setProductionLine,

  productSerial,
  setProductSerial,

  productName,
  setProductName,


  items,
  productEntitiesOne,
  productEntitiesTwo,
  sectors,
  itemsType,
  eventTypes,
  productionLines,
  events,
  itemsSer,


  itemsIsLoading,
  productEntitiesOneIsLoading,
  productEntitiesTwoIsLoading,
  sectorsIsLoading,
  itemsTypeIsLoading,
  eventTypesIsLoading,
  productionLinesIsLoading,
  eventsIsLoading,
  itemsSerIsLoading,


  imageFile,
  previewUrl,
  onImageSelect,
  onRemoveImage,
  isAdmin = false,
}: ImageFormProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <>
      <FormSection
        title="بيانات الصورة"
        description="المعلومات الأساسية للصورة"
        icon={<ImageIcon size={20} />}
        className="mb-5"
      >
        <div
          dir="rtl"
          className="grid grid-cols-2 gap-5 max-[700px]:grid-cols-1"
        >
          {/* التاريخ */}
          <FormGroup label="التاريخ" required>
            <InputWrapper icon={<Calendar size={16} />}>
              <div
                className={`${inputClass} relative w-full cursor-pointer`}
                onClick={openDatePicker}
              >
                <div className="pointer-events-none flex h-full w-full items-center overflow-hidden whitespace-nowrap text-[13px] text-[#172033]">
                  {imageDate
                    ? getArabicDayName(imageDate)
                    : "اختر التاريخ"}
                </div>

                <input
                  ref={dateInputRef}
                  type="datetime-local"
                  value={imageDate}
                  onChange={(e) => setImageDate(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  tabIndex={-1}
                  required
                />
              </div>
            </InputWrapper>
          </FormGroup>

          {/* الصنف */}
          <DropdownField
            label="الصنف"
            value={item}
            onChange={setItem}
            items={items}
            isLoading={itemsIsLoading}
            placeholder="اختر الصنف"
            loadingText="جاري تحميل الأصناف..."
            icon={<Folder size={16} />}
            required
            isAdmin={isAdmin}
          />

          {/* جهة الإنتاج الأولى */}
          <DropdownField
            label="جهة إنتاج 1"
            value={production1}
            onChange={setProduction1}
            items={productEntitiesOne}
            isLoading={productEntitiesOneIsLoading}
            placeholder="اختر جهة الإنتاج"
            loadingText="جاري تحميل جهات الإنتاج..."
            icon={<Building2 size={16} />}
            required
            isAdmin={isAdmin}
          />

          {/* جهة الإنتاج الثانية */}
          <DropdownField
            label="جهة إنتاج 2"
            value={production2}
            onChange={setProduction2}
            items={productEntitiesTwo}
            isLoading={productEntitiesTwoIsLoading}
            placeholder="اختر جهة الإنتاج"
            loadingText="جاري تحميل جهات الإنتاج..."
            icon={<Building2 size={16} />}
            required
            isAdmin={isAdmin}
          />

          {/* القطاع */}
          <DropdownField
            label="القطاع"
            value={sector}
            onChange={setSector}
            items={sectors}
            isLoading={sectorsIsLoading}
            placeholder="اختر القطاع"
            loadingText="جاري تحميل القطاعات..."
            icon={<Layers size={16} />}
            required
            isAdmin={isAdmin}
          />

          {/* نوع المنتج */}
          <DropdownField
            label="نوع المنتج"
            value={productType}
            onChange={setProductType}
            items={itemsType}
            isLoading={itemsTypeIsLoading}
            placeholder="اختر نوع المنتج"
            loadingText="جاري تحميل أنواع المنتجات..."
            icon={<Package size={16} />}
            isAdmin={isAdmin}
          />

          {/* نوع الحدث */}
          <DropdownField
            label="نوع الحدث"
            value={eventType}
            onChange={setEventType}
            items={eventTypes}
            isLoading={eventTypesIsLoading}
            placeholder="اختر نوع الحدث"
            loadingText="جاري تحميل أنواع الأحداث..."
            icon={<CalendarDays size={16} />}
            isAdmin={isAdmin}
          />

          {/* اسم الحدث */}
          <DropdownField
            label="اسم الحدث"
            value={eventName}
            onChange={setEventName}
            items={events}
            isLoading={eventsIsLoading}
            placeholder="اختر الحدث"
            loadingText="جاري تحميل الأحداث..."
            icon={<CalendarDays size={16} />}
            isAdmin={isAdmin}
          />

          {/* خط الإنتاج */}
          <DropdownField
            label="خط الإنتاج"
            value={productionLine}
            onChange={setProductionLine}
            items={productionLines}
            isLoading={productionLinesIsLoading}
            placeholder="اختر خط الإنتاج"
            loadingText="جاري تحميل خطوط الإنتاج..."
            icon={<Workflow size={16} />}
            isAdmin={isAdmin}
          />

          {/* اسم المنتج */}
          <FormGroup label="اسم المنتج" required>
            <InputWrapper icon={<Package size={16} />}>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="اسم المنتج"
                className={inputClass}
                required
              />
            </InputWrapper>
          </FormGroup>

          {/* تسلسل المنتج */}
          <DropdownField
            label="تسلسل المنتج"
            value={productSerial}
            onChange={setProductSerial}
            items={itemsSer}
            isLoading={itemsSerIsLoading}
            placeholder="اختر تسلسل المنتج"
            loadingText="جاري تحميل التسلسلات..."
            icon={<ListOrdered size={16} />}
            isAdmin={isAdmin}
          />

          
          
        </div>
      </FormSection>

      {/* ملف الصورة */}
      <FormSection
        title="ملف الصورة"
        description="اختار الصورة واعرض المعاينة قبل الحفظ"
        icon={<Upload size={20} />}
      >
        <ImageUpload
          imageFile={imageFile}
          previewUrl={previewUrl}
          onImageSelect={onImageSelect}
          onRemove={onRemoveImage}
        />
      </FormSection>
    </>
  );
}