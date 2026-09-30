'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Bookmark, CalendarDays, Pause, Play, UserRound, Volume2 } from 'lucide-react'
import type { AudioRecord } from '@/data/media'

type AudioCardProps = {
  item: AudioRecord
}

export function AudioCard({ item }: AudioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-[#dce5f2] bg-white" aria-label={item.title}>
      <div className="relative h-[180px] overflow-hidden bg-[#10192c] sm:h-[153px]">
        <Image src={item.cover} alt={`غلاف ${item.title}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" loading={item.id === 1 ? 'eager' : 'lazy'} className="object-cover saturate-[.72] transition-transform duration-300 group-hover:scale-[1.035] motion-reduce:transition-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1427]/40 to-[#070e1f]/70" />
        <div className="absolute inset-x-[14px] top-[13px] flex items-center justify-between text-white/80" aria-hidden="true">
          <Volume2 size={17} />
          <span className="flex h-5 items-center gap-[3px]">
            {[7, 14, 10, 7, 14, 10, 7, 14, 10].map((height, index) => <i key={index} className="block w-0.5 rounded-full bg-white/70" style={{ height }} />)}
          </span>
        </div>
        <button type="button" className={`absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:scale-[1.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${isPlaying ? 'bg-[#5038f5] text-white' : 'bg-white/95 text-[#5038f5] hover:bg-white'}`} aria-label={isPlaying ? `إيقاف معاينة ${item.title}` : `تشغيل معاينة ${item.title}`} aria-pressed={isPlaying} onClick={() => setIsPlaying((value) => !value)}>
          {isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
        </button>
        <span className="absolute bottom-[9px] left-[9px] rounded-md bg-[#040a16]/90 px-[7px] py-1 text-[10px] tabular-nums text-white" dir="ltr">{item.duration}</span>
        {isPlaying && <span className="absolute bottom-2.5 right-2.5 text-[10px] text-white" role="status">معاينة</span>}
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
          <button type="button" className={`grid size-[33px] shrink-0 place-items-center rounded-[9px] border transition ${isSaved ? 'border-[#d7d0ff] bg-[#f7f5ff] text-[#5038f5]' : 'border-[#dce5f2] bg-white text-[#647a9e] hover:border-[#d7d0ff] hover:bg-[#f7f5ff] hover:text-[#5038f5]'}`} aria-label={isSaved ? 'إزالة من المحفوظات' : 'حفظ التسجيل'} aria-pressed={isSaved} onClick={() => setIsSaved((value) => !value)}>
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <button type="button" className={`grid size-[33px] shrink-0 place-items-center rounded-[9px] border transition ${showDetails ? 'border-[#d7d0ff] bg-[#f7f5ff] text-[#5038f5]' : 'border-[#dce5f2] bg-white text-[#647a9e] hover:border-[#d7d0ff] hover:bg-[#f7f5ff] hover:text-[#5038f5]'}`} aria-label="تفاصيل التسجيل" aria-expanded={showDetails} onClick={() => setShowDetails((value) => !value)}>
            <UserRound size={15} />
          </button>
          <span className="ms-auto truncate text-[10px] text-[#7083a2]">{item.speaker}</span>
        </div>
        {showDetails && <div className="mt-[9px] flex flex-col gap-[5px] border-t border-[#edf1f7] pt-[9px] text-[10px] text-[#7183a1]"><span>الفعالية: {item.event}</span><span>المدة: {item.duration}</span></div>}
      </div>
    </article>
  )
}
