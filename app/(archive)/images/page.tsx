import { ArchivePage } from '@/app/components/media/archive-page'
import { imageItems } from '@/data/media'

export default function ImagesArchivePage() {
  return <ArchivePage kind="image" items={imageItems} />
}
