'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Bookmark, CalendarDays, Eye, Images } from 'lucide-react'
import type { ImageRecord } from '@/data/media'

type ImageCardProps = {
  item: ImageRecord
}

export function ImageCard({ item }: ImageCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-[#dce5f2] bg-white" aria-label={item.title}>
      <div className="relative h-[220px] overflow-hidden bg-[#e9edf3] sm:h-[180px]">
        <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" loading={item.id === 1 ? 'eager' : 'lazy'} className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.035] motion-reduce:transition-none" />
        <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-[5px] rounded-[7px] border border-white/50 bg-slate-900/60 px-2 py-[5px] text-[10px] text-white backdrop-blur-lg"><Images size={13} />صورة</span>
      </div>
      <div className="px-4 pb-4 pt-[15px]">
        <div className="min-h-[54px] text-right">
          <h2 className="m-0 truncate text-[13px] font-bold text-[#17233a]">{item.title}</h2>
          <p className="mt-[7px] truncate text-[10px] text-[#91a2bf]" dir="ltr">{item.fileName}</p>
        </div>
        <div className="flex min-h-[42px] items-center justify-between gap-2 border-t border-[#edf1f7]">
          <span className="shrink-0 rounded-md bg-slate-100 px-2 py-[5px] text-[10px] text-[#6d7f9e]">{item.category}</span>
          <span className="inline-flex min-w-0 items-center gap-[5px] whitespace-nowrap text-[10px] text-[#607697]"><CalendarDays size={13} className="shrink-0 text-[#7287a8]" />{item.dateLabel}</span>
        </div>
        <div className="flex min-h-[35px] items-center gap-1.5" dir="ltr">
          <button type="button" className={`grid size-[33px] shrink-0 place-items-center rounded-[9px] border transition ${isSaved ? 'border-[#d7d0ff] bg-[#f7f5ff] text-[#5038f5]' : 'border-[#dce5f2] bg-white text-[#647a9e] hover:border-[#d7d0ff] hover:bg-[#f7f5ff] hover:text-[#5038f5]'}`} aria-label={isSaved ? 'إزالة من المحفوظات' : 'حفظ الصورة'} aria-pressed={isSaved} onClick={() => setIsSaved((value) => !value)}>
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <button type="button" className={`grid size-[33px] shrink-0 place-items-center rounded-[9px] border transition ${showDetails ? 'border-[#d7d0ff] bg-[#f7f5ff] text-[#5038f5]' : 'border-[#dce5f2] bg-white text-[#647a9e] hover:border-[#d7d0ff] hover:bg-[#f7f5ff] hover:text-[#5038f5]'}`} aria-label="تفاصيل الصورة" aria-expanded={showDetails} onClick={() => setShowDetails((value) => !value)}>
            <Eye size={15} />
          </button>
          <span className="ms-auto truncate text-[10px] text-[#7083a2]">{item.event}</span>
        </div>
        {showDetails && <div className="mt-[9px] flex flex-col gap-[5px] border-t border-[#edf1f7] pt-[9px] text-[10px] text-[#7183a1]"><span>الفعالية: {item.event}</span><span>التصنيف: {item.category}</span></div>}
      </div>
    </article>
  )
}
