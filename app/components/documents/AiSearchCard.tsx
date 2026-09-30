"use client";

import { FormEvent, useState } from "react";
import { History, Search, Sparkles } from "lucide-react";

interface AiSearchCardProps {
  onOpenHistory: () => void;
  onSearch: (question: string) => void;
}

export default function AiSearchCard({
  onOpenHistory,
  onSearch,
}: AiSearchCardProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;

    onSearch(question.trim());
  };

  return (
    <section
      className="
        mb-6
        w-full
        overflow-hidden
        rounded-[14px]
        border
        border-indigo-200
        bg-gradient-to-br
        from-white
        to-indigo-50
        shadow-[0_3px_12px_rgba(15,23,42,0.03)]
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          min-h-[68px]
          items-center
          gap-3
          border-b
          border-indigo-200
          bg-gradient-to-br
          from-indigo-50
          to-blue-50
          px-6
          py-5

          max-[600px]:px-[18px]
        "
      >

        {/* Icon */}

        <div
          className="
            flex
            h-[38px]
            w-[38px]
            shrink-0
            items-center
            justify-center
            rounded-[10px]
            bg-white
            text-indigo-600
          "
        >
          <Sparkles className="h-5 w-5" />
        </div>


        <h2 className="text-[17px] font-bold text-slate-800">
          البحث داخل مستنداتي
        </h2>


        {/* History */}

        <button
          type="button"
          title="سجل الأسئلة"
          onClick={onOpenHistory}
          className="
            mr-auto
            inline-flex
            h-9
            items-center
            justify-center
            gap-[7px]
            rounded-lg
            border
            border-indigo-200
            bg-white
            px-[13px]
            text-xs
            font-semibold
            text-indigo-600
            transition

            hover:border-indigo-400
            hover:bg-indigo-50

            max-[600px]:
              w-9
              px-0
          "
        >
          <History className="h-4 w-4" />

          <span className="max-[600px]:hidden">
            سجل الأسئلة
          </span>
        </button>

      </div>


      {/* BODY */}

      <div className="p-6 max-[600px]:p-[18px]">

        <form
          onSubmit={handleSubmit}
          className="
            flex
            flex-row
            items-stretch
            gap-[10px]

            max-[600px]:flex-col
          "
        >

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="اكتب سؤالك عن ملفات PDF..."
            autoComplete="off"
            required
            className="
              h-12
              min-w-0
              flex-1
              rounded-[9px]
              border
              border-slate-300
              bg-white
              px-4
              text-sm
              text-slate-800
              outline-none
              transition

              placeholder:text-slate-400

              focus:border-indigo-500
              focus:ring-[3px]
              focus:ring-indigo-500/10
            "
          />


          <button
            type="submit"
            className="
              flex
              h-12
              items-center
              justify-center
              gap-2
              whitespace-nowrap
              rounded-[9px]
              bg-gradient-to-br
              from-indigo-600
              to-blue-600
              px-[22px]
              text-sm
              font-semibold
              text-white
              transition

              hover:-translate-y-px
              hover:opacity-95

              max-[600px]:w-full
            "
          >
            <Search className="h-[17px] w-[17px]" />

            <span>
              بحث
            </span>
          </button>

        </form>


        <p className="mt-3 text-xs text-slate-400">
          يتم البحث داخل ملفات PDF والإجابة اعتمادًا على محتواها فقط.
        </p>

      </div>

    </section>
  );
}

