import { ArchivePage } from '@/app/components/media/archive-page'
import { audioItems } from '@/data/media'

export default function AudioArchivePage() {
  return <ArchivePage kind="audio" items={audioItems} />
}
