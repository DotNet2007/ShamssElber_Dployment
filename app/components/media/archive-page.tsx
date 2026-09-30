'use client'

import { useMemo, useState } from 'react'
import { AudioLines, CalendarDays, Images, Plus, Search, SlidersHorizontal, X } from 'lucide-react'
import { AudioCard } from '@/app/components/media/audio-card'
import { ImageCard } from '@/app/components/media/image-card'
import { archiveConfig, getCategories, matchesArchiveQuery, type ArchiveKind, type ArchiveRecord, type AudioRecord, type ImageRecord } from '@/data/media'

type ArchivePageProps = {
  kind: ArchiveKind
  items: ArchiveRecord[]
}

export function ArchivePage({ kind, items }: ArchivePageProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [showAddInfo, setShowAddInfo] = useState(false)
  const config = archiveConfig[kind]
  const categories = useMemo(() => getCategories(items), [items])
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ar')
    return items.filter((item) => {
      const matchesSearch = !normalizedQuery || matchesArchiveQuery(item, normalizedQuery)
      const matchesCategory = category === 'all' || item.category === category
      const matchesDate = !startDate || item.date >= startDate
      return matchesSearch && matchesCategory && matchesDate
    })
  }, [category, items, query, startDate])

  return (
    <main className="min-h-screen bg-white px-3 pb-16 pt-9 font-[var(--font-arabic)] text-[#111827] sm:px-6 sm:pt-[76px]">
      <div className="mx-auto w-full max-w-[1190px]">
        <header className="mb-6 flex items-center gap-[15px] sm:mb-8">
          <div className="grid size-[50px] shrink-0 place-items-center rounded-[17px] bg-rose-50 text-[#f5222d]" aria-hidden="true">
            {kind === 'audio' ? <AudioLines size={22} /> : <Images size={22} />}
          </div>
          <div>
            <h1 className="m-0 text-[25px] font-bold leading-[1.35] text-[#101828]">{config.title}</h1>
            <p className="mt-1 text-[13px] text-[#6f83a8]">{config.description}</p>
          </div>
        </header>

        <section className="mb-6 flex min-h-[88px] flex-wrap items-center gap-3 rounded-[17px] border border-[#dce5f2] bg-white p-3 shadow-[0_3px_9px_rgb(22_43_77_/_3%)] sm:mb-[25px] sm:flex-nowrap sm:p-5" aria-label="البحث والتصفية">
          <label className="order-first flex h-[45px] min-w-[160px] basis-full items-center gap-2.5 rounded-xl border border-[#dce5f2] bg-[#f8fafc] px-[13px] text-[#6b7d9e] sm:order-none sm:flex-1">
            <Search size={17} className="shrink-0 text-[#8da0be]" aria-hidden="true" />
            <span className="sr-only">ابحث في الأرشيف</span>
            <input className="w-full border-0 bg-transparent text-xs text-[#17233a] outline-none placeholder:text-[#95a5bf]" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={config.searchPlaceholder} />
            {query && <button type="button" className="grid shrink-0 place-items-center bg-transparent text-[#7788a3]" aria-label="مسح البحث" onClick={() => setQuery('')}><X size={14} /></button>}
          </label>
          <label className="flex h-[45px] shrink-0 items-center gap-[9px] rounded-xl border border-[#dce5f2] bg-white px-3 text-[#6b7d9e]">
            <SlidersHorizontal size={15} aria-hidden="true" />
            <span className="sr-only">تصفية حسب التصنيف</span>
            <select className="max-w-[125px] cursor-pointer border-0 bg-transparent text-xs text-[#34435d] outline-none" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">كل التصنيفات</option>
              {categories.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label className="flex h-[45px] min-w-[150px] flex-[1_1_150px] items-center justify-center gap-[7px] rounded-xl border border-[#dce5f2] bg-white px-2.5 text-[#8195b5] sm:flex-none">
            <CalendarDays size={15} aria-hidden="true" />
            <span className="sr-only">عرض العناصر من هذا التاريخ فصاعداً</span>
            <input className="w-[125px] border-0 bg-transparent text-[11px] text-[#536b91] outline-none" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </label>
        </section>

        <section className="overflow-hidden rounded-[17px] border border-[#dce5f2] bg-white shadow-[0_3px_9px_rgb(22_43_77_/_3%)]" aria-labelledby="archive-section-title">
          <div className="flex min-h-[70px] items-center justify-between border-b border-[#dce5f2] px-4 py-[13px] sm:px-[25px] sm:py-[15px]">
            <div className="flex items-center gap-[7px] sm:gap-2.5">
              {kind === 'audio' ? <AudioLines size={18} className="text-[#f5222d]" /> : <Images size={18} className="text-[#f5222d]" />}
              <h2 id="archive-section-title" className="m-0 text-[15px] font-bold text-[#17233a] sm:text-[17px]">{config.sectionTitle}</h2>
              <span className="inline-flex size-[25px] items-center justify-center rounded-full bg-rose-50 text-[11px] text-[#ef3340]" aria-live="polite">{filteredItems.length}</span>
            </div>
            <button type="button" className="inline-flex min-h-[35px] items-center justify-center gap-[7px] rounded-[9px] bg-[#5038f5] px-2.5 text-[11px] text-white transition hover:-translate-y-px hover:bg-[#412ae4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5038f5] sm:min-h-[38px] sm:px-[14px] sm:text-xs" onClick={() => setShowAddInfo(true)}>
              <Plus size={16} />{config.addLabel}
            </button>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 p-3 min-[461px]:grid-cols-2 sm:gap-4 sm:p-5 min-[721px]:grid-cols-3 min-[961px]:grid-cols-4">
              {filteredItems.map((item) => item.kind === 'audio'
                ? <AudioCard key={item.id} item={item as AudioRecord} />
                : <ImageCard key={item.id} item={item as ImageRecord} />)}
            </div>
          ) : (
            <div className="flex min-h-[285px] flex-col items-center justify-center px-5 py-[35px] text-center text-[#8797b0]">
              <Search size={25} className="text-[#9aabc4]" />
              <h3 className="mb-[5px] mt-[13px] text-[15px] text-[#23314b]">لا توجد نتائج مطابقة</h3>
              <p className="m-0 text-xs">جرّب تغيير كلمات البحث أو خيارات التصفية.</p>
              <button type="button" className="mt-[15px] cursor-pointer bg-transparent text-xs text-[#5038f5]" onClick={() => { setQuery(''); setCategory('all'); setStartDate('') }}>مسح عوامل التصفية</button>
            </div>
          )}
        </section>
      </div>

      {showAddInfo && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-slate-900/35 p-5 backdrop-blur-[3px]" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAddInfo(false) }}>
          <section className="relative w-full max-w-[390px] rounded-[18px] border border-[#e3e9f2] bg-white p-7 text-center shadow-[0_22px_70px_rgb(16_24_40_/_20%)]" role="dialog" aria-modal="true" aria-labelledby="add-dialog-title">
            <button type="button" className="absolute left-[14px] top-[14px] grid size-8 place-items-center rounded-[9px] text-[#7788a3] transition hover:bg-[#f3f5f8]" aria-label="إغلاق" onClick={() => setShowAddInfo(false)}><X size={18} /></button>
            <div className="mx-auto mb-[14px] grid size-12 place-items-center rounded-[15px] bg-rose-50 text-[#f5222d]">{kind === 'audio' ? <AudioLines size={22} /> : <Images size={22} />}</div>
            <h2 id="add-dialog-title" className="m-0 text-lg text-[#17233a]">إضافة {kind === 'audio' ? 'تسجيل صوتي' : 'صورة'}</h2>
            <p className="mb-5 mt-2.5 text-[13px] leading-[1.8] text-[#72819a]">هذه النسخة مخصصة لاستعراض الواجهة ببيانات تجريبية. ستتوفر إضافة الملفات عند ربط النظام.</p>
            <button type="button" className="h-[38px] min-w-[92px] rounded-[9px] bg-[#5038f5] text-xs text-white transition hover:bg-[#412ae4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5038f5]" onClick={() => setShowAddInfo(false)}>حسنًا</button>
          </section>
        </div>
      )}
    </main>
  )
}

export default ArchivePage
