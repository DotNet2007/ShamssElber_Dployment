export type MediaBase = {
  id: number
  title: string
  date: string
  dateLabel: string
  category: string
  event: string
  fileName: string
}

export type AudioRecord = MediaBase & {
  kind: 'audio'
  speaker: string
  duration: string
  cover: string
}

export type ImageRecord = MediaBase & {
  kind: 'image'
  image: string
}

export const audioItems: AudioRecord[] = [
  {
    id: 1,
    kind: 'audio',
    title: 'ترنيمة خاصة',
    date: '2026-09-27',
    dateLabel: '27 سبتمبر 2026',
    category: 'ترانيم',
    event: 'لقاء الأحد',
    fileName: 'hymn-special.mp3',
    speaker: 'فريق التسبيح',
    duration: '06:42',
    cover: '/archive/choir.png',
  },
  {
    id: 2,
    kind: 'audio',
    title: 'اجتماع الشباب',
    date: '2026-09-22',
    dateLabel: '22 سبتمبر 2026',
    category: 'اجتماعات',
    event: 'اجتماع الشباب',
    fileName: 'youth-gathering.mp3',
    speaker: 'القس مينا عادل',
    duration: '32:14',
    cover: '/archive/youth-gathering.png',
  },
  {
    id: 3,
    kind: 'audio',
    title: 'عظة الأحد',
    date: '2026-09-25',
    dateLabel: '25 سبتمبر 2026',
    category: 'عظات',
    event: 'قداس الأحد',
    fileName: 'sunday-sermon.mp3',
    speaker: 'القس يوحنا فؤاد',
    duration: '45:20',
    cover: '/archive/sermon.png',
  },
  {
    id: 4,
    kind: 'audio',
    title: 'ترانيم المساء',
    date: '2026-09-20',
    dateLabel: '20 سبتمبر 2026',
    category: 'ترانيم',
    event: 'أمسية التسبيح',
    fileName: 'evening-hymns.mp3',
    speaker: 'فريق كورال الكنيسة',
    duration: '28:06',
    cover: '/archive/church-celebration.png',
  },
  {
    id: 5,
    kind: 'audio',
    title: 'كلمة روحية للشباب',
    date: '2026-09-18',
    dateLabel: '18 سبتمبر 2026',
    category: 'كلمات روحية',
    event: 'مؤتمر الشباب',
    fileName: 'youth-message.mp3',
    speaker: 'الأب بطرس حنا',
    duration: '22:10',
    cover: '/archive/retreat.png',
  },
  {
    id: 6,
    kind: 'audio',
    title: 'صلاة من أجل العائلات',
    date: '2026-09-15',
    dateLabel: '15 سبتمبر 2026',
    category: 'صلوات',
    event: 'لقاء العائلات',
    fileName: 'family-prayer.mp3',
    speaker: 'الخادم مينا فايز',
    duration: '12:35',
    cover: '/archive/baptism.png',
  },
]

export const imageItems: ImageRecord[] = [
  {
    id: 1,
    kind: 'image',
    title: 'احتفال الكنيسة',
    date: '2026-09-27',
    dateLabel: '27 سبتمبر 2026',
    category: 'احتفالات',
    event: 'عيد الكنيسة',
    fileName: 'church-celebration-01.jpg',
    image: '/archive/church-celebration.png',
  },
  {
    id: 2,
    kind: 'image',
    title: 'عظة الأحد',
    date: '2026-09-25',
    dateLabel: '25 سبتمبر 2026',
    category: 'اجتماعات',
    event: 'قداس الأحد',
    fileName: 'sunday-service-02.jpg',
    image: '/archive/sermon.png',
  },
  {
    id: 3,
    kind: 'image',
    title: 'اجتماع الشباب',
    date: '2026-09-22',
    dateLabel: '22 سبتمبر 2026',
    category: 'اجتماعات',
    event: 'اجتماع الشباب',
    fileName: 'youth-meeting-03.jpg',
    image: '/archive/youth-gathering.png',
  },
  {
    id: 4,
    kind: 'image',
    title: 'خدمة المجتمع',
    date: '2026-09-20',
    dateLabel: '20 سبتمبر 2026',
    category: 'خدمة',
    event: 'يوم المحبة',
    fileName: 'community-service-04.jpg',
    image: '/archive/community-service.png',
  },
  {
    id: 5,
    kind: 'image',
    title: 'لقاء الخدام',
    date: '2026-09-18',
    dateLabel: '18 سبتمبر 2026',
    category: 'لقاءات',
    event: 'اجتماع الخدام',
    fileName: 'volunteer-meeting-05.jpg',
    image: '/archive/volunteers.png',
  },
  {
    id: 6,
    kind: 'image',
    title: 'مؤتمر الشباب',
    date: '2026-09-15',
    dateLabel: '15 سبتمبر 2026',
    category: 'مؤتمرات',
    event: 'مؤتمر الشباب السنوي',
    fileName: 'youth-conference-06.jpg',
    image: '/archive/retreat.png',
  },
  {
    id: 7,
    kind: 'image',
    title: 'أمسية الترانيم',
    date: '2026-09-12',
    dateLabel: '12 سبتمبر 2026',
    category: 'ترانيم',
    event: 'أمسية التسبيح',
    fileName: 'hymns-evening-07.jpg',
    image: '/archive/choir.png',
  },
  {
    id: 8,
    kind: 'image',
    title: 'معمودية جديدة',
    date: '2026-09-08',
    dateLabel: '8 سبتمبر 2026',
    category: 'احتفالات',
    event: 'قداس الأحد',
    fileName: 'baptism-08.jpg',
    image: '/archive/baptism.png',
  },
]

export type ArchiveRecord = AudioRecord | ImageRecord
export type ArchiveKind = ArchiveRecord['kind']

export const archiveConfig = {
  audio: {
    title: 'الصوتيات',
    description: 'إدارة وتصفح جميع التسجيلات الصوتية',
    sectionTitle: 'التسجيلات الصوتية',
    addLabel: 'إضافة صوت',
    searchPlaceholder: 'ابحث باسم التسجيل...',
  },
  image: {
    title: 'الصور',
    description: 'إدارة وتصفح جميع الصور',
    sectionTitle: 'معرض الصور',
    addLabel: 'إضافة صورة',
    searchPlaceholder: 'ابحث باسم الصورة...',
  },
} as const

export function getCategories(items: ArchiveRecord[]) {
  return [...new Set(items.map((item) => item.category))]
}

export function matchesArchiveQuery(item: ArchiveRecord, query: string) {
  const searchable = [item.title, item.category, item.event, item.fileName]
  if (item.kind === 'audio') searchable.push(item.speaker)
  return searchable.some((value) => value.toLocaleLowerCase('ar').includes(query))
}

