"use client";

import { Package } from "lucide-react";

import FormGroup from "./form/FormGroup";
import InputWrapper from "./form/InputWrapper";

type ProductContentSectionProps = {
  content1: string;
  setContent1: (value: string) => void;

  content2: string;
  setContent2: (value: string) => void;

  content3: string;
  setContent3: (value: string) => void;

  content4: string;
  setContent4: (value: string) => void;

  content5: string;
  setContent5: (value: string) => void;
};

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

export default function ProductContentSection({
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
}: ProductContentSectionProps) {
  return (
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
      {/* HEADER */}

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
            h-[38px]
            w-[38px]
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

      {/* BODY */}

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
          {/* CONTENT 1 */}

          <FormGroup label="المحتوى 1">
            <InputWrapper icon={<Package size={16} />}>
              <input
                type="text"
                value={content1}
                onChange={(e) => setContent1(e.target.value)}
                placeholder="المحتوى 1"
                className={inputClass}
              />
            </InputWrapper>
          </FormGroup>

          {/* CONTENT 2 */}

          <FormGroup label="المحتوى 2">
            <InputWrapper icon={<Package size={16} />}>
              <input
                type="text"
                value={content2}
                onChange={(e) => setContent2(e.target.value)}
                placeholder="المحتوى 2"
                className={inputClass}
              />
            </InputWrapper>
          </FormGroup>

          {/* CONTENT 3 */}

          <FormGroup label="المحتوى 3">
            <InputWrapper icon={<Package size={16} />}>
              <input
                type="text"
                value={content3}
                onChange={(e) => setContent3(e.target.value)}
                placeholder="المحتوى 3"
                className={inputClass}
              />
            </InputWrapper>
          </FormGroup>

          {/* CONTENT 4 */}

          <FormGroup label="المحتوى 4">
            <InputWrapper icon={<Package size={16} />}>
              <input
                type="text"
                value={content4}
                onChange={(e) => setContent4(e.target.value)}
                placeholder="المحتوى 4"
                className={inputClass}
              />
            </InputWrapper>
          </FormGroup>

          {/* CONTENT 5 */}

          <FormGroup label="المحتوى 5">
            <InputWrapper icon={<Package size={16} />}>
              <input
                type="text"
                value={content5}
                onChange={(e) => setContent5(e.target.value)}
                placeholder="المحتوى 5"
                className={inputClass}
              />
            </InputWrapper>
          </FormGroup>
        </div>
      </div>
    </section>
  );
}